export type WelcomeEmailInput = {
  email?: string | null;
  phone: string;
};

export async function sendWelcomeEmail(input: WelcomeEmailInput): Promise<void> {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("Missing RESEND_API_KEY");
  }

  if (!input.email) {
    return;
  }
}
