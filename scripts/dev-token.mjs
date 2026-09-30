// Mint a short-lived editor token for local development (mimics what your admin app does).
//   node scripts/dev-token.mjs [pagePath] [expiresIn]
//   node scripts/dev-token.mjs /about 30m
import { SignJWT } from "jose";

const [, , pagePath = "/", expiresIn = "30m"] = process.argv;
const secret = process.env.EDITOR_JWT_SECRET;
if (!secret) {
  console.error("Set EDITOR_JWT_SECRET (same value as in .env.local).");
  process.exit(1);
}

const token = await new SignJWT({ name: "Dev editor", path: "*" })
  .setProtectedHeader({ alg: "HS256" })
  .setSubject("dev-user")
  .setIssuedAt()
  .setExpirationTime(expiresIn)
  .sign(new TextEncoder().encode(secret));

const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
console.log(`${base}/editor${pagePath === "/" ? "" : pagePath}?token=${token}`);
