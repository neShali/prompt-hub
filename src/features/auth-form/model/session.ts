export type TAuthUser = {
  name?: string;
  email: string;
  authorizedAt: string;
};

export const AUTH_CHANGED_EVENT = 'prompt-hub:auth-changed';

const USER_STORAGE_KEY = 'prompt-hub:user';
const NEXT_PATH_STORAGE_KEY = 'prompt-hub:next-path';

const canUseStorage = () => typeof window !== 'undefined' && Boolean(window.localStorage);

const notifyAuthChanged = () => {
  if (typeof window === 'undefined') return;

  window.dispatchEvent(new Event(AUTH_CHANGED_EVENT));
};

export const normalizeUserEmail = (email: string) => email.trim().toLowerCase();

export const getCurrentUser = (): TAuthUser | null => {
  if (!canUseStorage()) return null;

  try {
    const rawValue = window.localStorage.getItem(USER_STORAGE_KEY);
    if (!rawValue) return null;

    const parsedValue = JSON.parse(rawValue) as TAuthUser;

    if (!parsedValue.email) return null;

    return {
      ...parsedValue,
      email: normalizeUserEmail(parsedValue.email),
    };
  } catch {
    return null;
  }
};

export const setCurrentUser = (user: TAuthUser) => {
  if (!canUseStorage()) return;

  window.localStorage.setItem(
    USER_STORAGE_KEY,
    JSON.stringify({
      ...user,
      email: normalizeUserEmail(user.email),
    })
  );

  notifyAuthChanged();
};

export const clearCurrentUser = () => {
  if (!canUseStorage()) return;

  window.localStorage.removeItem(USER_STORAGE_KEY);
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
