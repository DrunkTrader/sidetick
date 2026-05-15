import crypto from "node:crypto";

export function generateBunnyToken(
  videoId: string,
  userId: string,
  expiresInSeconds = 7200,
): string {
  const expiresAt = Math.floor(Date.now() / 1000) + expiresInSeconds;
  const securityKey = process.env.BUNNY_SECURITY_TOKEN;
  const libraryId = process.env.BUNNY_LIBRARY_ID;

  if (!securityKey || !libraryId) {
    throw new Error("Missing Bunny configuration");
  }

  const path = `/${videoId}/playlist.m3u8`;
  const hashBase = `${securityKey}${path}${expiresAt}`;
  const token = crypto
    .createHash("sha256")
    .update(hashBase)
    .digest("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");

  return `https://iframe.mediadelivery.net/play/${libraryId}/${videoId}?token=${token}&expires=${expiresAt}&uid=${userId}`;
}
