import crypto from 'crypto';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const SECRET = process.env.ADMIN_SESSION_SECRET || 'fallback-secret';
const MAX_AGE_MS = 60 * 60 * 24 * 1000; // 24 hours

export const COOKIE_NAME = 'admin_session';

// ─── Token generation ───
export const generateToken = (username: string): string => {
  const payload = `${username}.${Date.now()}`;
  const signature = crypto
    .createHmac('sha256', SECRET)
    .update(payload)
    .digest('hex');
  return `${payload}.${signature}`;
};

// ─── Token verify (Edge-safe) ───
export const verifyAdminToken = (token: string | undefined): boolean => {
  if (!token) return false;

  try {
    const parts = token.split('.');
    if (parts.length !== 3) return false;

    const [username, timestamp, signature] = parts;
    const payload = `${username}.${timestamp}`;
    const expected = crypto
      .createHmac('sha256', SECRET)
      .update(payload)
      .digest('hex');

    const a = Buffer.from(signature, 'hex');
    const b = Buffer.from(expected, 'hex');
    if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return false;

    const age = Date.now() - parseInt(timestamp, 10);
    if (!Number.isFinite(age) || age < 0 || age > MAX_AGE_MS) return false;

    return true;
  } catch {
    return false;
  }
};

// ─── Extract username ───
export const getAdminUsername = (
  token: string | undefined
): string | null => {
  if (!token) return null;
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    return parts[0] || null;
  } catch {
    return null;
  }
};

// ─── Server helpers ───
export const getAdminSession = async (): Promise<
  { username: string } | null
> => {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;
  if (!verifyAdminToken(token)) return null;
  const username = getAdminUsername(token);
  return username ? { username } : null;
};

export const requireAdmin = async (
  fromPath = '/admin'
): Promise<{ username: string }> => {
  const session = await getAdminSession();
  if (!session) {
    redirect(`/admin-login?from=${encodeURIComponent(fromPath)}`);
  }
  return session;
};