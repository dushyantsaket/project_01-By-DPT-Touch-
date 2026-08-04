import { OAuth2Client } from "google-auth-library";

const clientId =
  process.env.GOOGLE_CLIENT_ID ||
  "185402022199-vv7mfv6b367oo1f0seh6apv7771dda61.apps.googleusercontent.com";

const client = new OAuth2Client({
  clientId,
});

export async function verifyIdToken(idToken) {
  const loginTicket = await client.verifyIdToken({
    idToken,
    audience: clientId,
  });

  return loginTicket.getPayload();
}

export { clientId };
