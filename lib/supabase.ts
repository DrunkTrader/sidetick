import { createClient } from "@supabase/supabase-js";

type GoogleUserSyncInput = {
  sidetickUserId: string;
  googleId: string;
  email: string | null;
  name: string | null;
};

function getSupabaseConfig(): {
  url: string;
  serviceRoleKey: string;
  usersTable: string;
} | null {
  const url = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const usersTable = process.env.SUPABASE_USERS_TABLE ?? "oauth_users";

  if (!url && !serviceRoleKey) {
    return null;
  }

  if (!url || !serviceRoleKey) {
    throw new Error("Incomplete Supabase configuration for Google user sync");
  }

  return { url, serviceRoleKey, usersTable };
}

export async function syncGoogleUserToSupabase(input: GoogleUserSyncInput): Promise<void> {
  const config = getSupabaseConfig();
  if (!config) {
    return;
  }
  const { url, serviceRoleKey, usersTable } = config;

  const supabase = createClient(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  const { error } = await supabase.from(usersTable).upsert(
    {
      sidetick_user_id: input.sidetickUserId,
      google_id: input.googleId,
      email: input.email,
      name: input.name,
      auth_provider: "GOOGLE",
      last_login_at: new Date().toISOString(),
    },
    { onConflict: "google_id" },
  );

  if (error) {
    throw new Error(`Supabase sync failed: ${error.message}`);
  }
}
