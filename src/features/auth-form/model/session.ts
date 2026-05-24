export type TAuthUser = {
  name?: string;
  email: string;
  authorizedAt: string;
};

export const AUTH_CHANGED_EVENT = 'prompt-hub:auth-changed';

const USER_STORAGE_KEY = 'prompt-hub:user';
const NEXT_PATH_STORAGE_KEY = 'prompt-hub:next-path';
const AUTH_COOKIE_KEY = 'prompt-hub-user';
const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

const canUseStorage = () => typeof window !== 'undefined' && Boolean(window.localStorage);
const canUseDocument = () => typeof document !== 'undefined';

const notifyAuthChanged = () => {
  if (typeof window === 'undefined') return;

  window.dispatchEvent(new Event(AUTH_CHANGED_EVENT));
};

export const normalizeUserEmail = (email: string) => email.trim().toLowerCase();

const normalizeUser = (user: TAuthUser): TAuthUser => ({
  ...user,
  email: normalizeUserEmail(user.email),
});

const readCookie = (name: string) => {
  if (!canUseDocument()) return null;

  const cookie = document.cookie
    .split('; ')
    .find((item) => item.startsWith(`${name}=`));

  if (!cookie) return null;

  return cookie.slice(name.length + 1);
};

const writeAuthCookie = (user: TAuthUser) => {
  if (!canUseDocument()) return;

  const encodedUser = encodeURIComponent(JSON.stringify(normalizeUser(user)));

  document.cookie = `${AUTH_COOKIE_KEY}=${encodedUser}; path=/; max-age=${COOKIE_MAX_AGE_SECONDS}; SameSite=Lax`;
};

const clearAuthCookie = () => {
  if (!canUseDocument()) return;

  document.cookie = `${AUTH_COOKIE_KEY}=; path=/; max-age=0; SameSite=Lax`;
};

const getUserFromCookie = (): TAuthUser | null => {
  const rawValue = readCookie(AUTH_COOKIE_KEY);

  if (!rawValue) return null;

  // Удобный режим для Lighthouse CLI:
  // --extra-headers "{\"Cookie\":\"prompt-hub-user=1\"}"
  if (rawValue === '1') {
    return {
      email: 'lighthouse@prompthub.local',
      authorizedAt: new Date().toISOString(),
    };
  }

  try {
    const parsedValue = JSON.parse(decodeURIComponent(rawValue)) as TAuthUser;

    if (!parsedValue.email) return null;

    return normalizeUser(parsedValue);
  } catch {
    return null;
  }
};

export const getCurrentUser = (): TAuthUser | null => {
  if (!canUseStorage()) {
    return getUserFromCookie();
  }

  try {
    const rawValue = window.localStorage.getItem(USER_STORAGE_KEY);

    if (rawValue) {
      const parsedValue = JSON.parse(rawValue) as TAuthUser;

      if (parsedValue.email) {
        const user = normalizeUser(parsedValue);
        writeAuthCookie(user);

        return user;
      }
    }
  } catch {
    return getUserFromCookie();
  }

  return getUserFromCookie();
};

export const setCurrentUser = (user: TAuthUser) => {
  const normalizedUser = normalizeUser(user);

  writeAuthCookie(normalizedUser);

  if (canUseStorage()) {
    window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(normalizedUser));
  }

  notifyAuthChanged();
};

export const clearCurrentUser = () => {
  clearAuthCookie();

  if (canUseStorage()) {
    window.localStorage.removeItem(USER_STORAGE_KEY);
  }

  notifyAuthChanged();
};

export const setNextPath = (path: string) => {
  if (!canUseStorage()) return;

  window.localStorage.setItem(NEXT_PATH_STORAGE_KEY, path);
};

export const consumeNextPath = () => {
  if (!canUseStorage()) return null;

  const nextPath = window.localStorage.getItem(NEXT_PATH_STORAGE_KEY);
  window.localStorage.removeItem(NEXT_PATH_STORAGE_KEY);

  return nextPath;
};
