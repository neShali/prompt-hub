import { getCurrentUser, normalizeUserEmail } from '@/features/auth-form/model/session';
import { TTemplateFormValues } from '@/features/template-form/model/schema';

export type TSavedTemplate = TTemplateFormValues & {
  id: string;
  ownerEmail: string;
  updatedAt: string;
};

const STORAGE_KEY_PREFIX = 'prompt-hub:templates';

const canUseStorage = () => typeof window !== 'undefined' && Boolean(window.localStorage);

const getCurrentUserEmail = () => {
  const user = getCurrentUser();

  return user ? normalizeUserEmail(user.email) : null;
};

const getStorageKey = () => {
  const email = getCurrentUserEmail();

  return email ? `${STORAGE_KEY_PREFIX}:${email}` : null;
};

export const getSavedTemplates = (): TSavedTemplate[] => {
  const storageKey = getStorageKey();

  if (!canUseStorage() || !storageKey) return [];

  try {
    const rawValue = window.localStorage.getItem(storageKey);

    return rawValue ? (JSON.parse(rawValue) as TSavedTemplate[]) : [];
  } catch {
    return [];
  }
};

export const getSavedTemplateById = (id: string) =>
  getSavedTemplates().find((template) => template.id === id) ?? null;

export const saveTemplate = (values: TTemplateFormValues, templateId?: string) => {
  const storageKey = getStorageKey();
  const ownerEmail = getCurrentUserEmail();

  if (!canUseStorage() || !storageKey || !ownerEmail) {
    throw new Error('Для сохранения шаблона нужно войти в аккаунт.');
  }

  const templates = getSavedTemplates();
  const now = new Date().toISOString();
  const id = templateId ?? `template-${Date.now()}`;

  const nextTemplate: TSavedTemplate = {
    ...values,
    id,
    ownerEmail,
    updatedAt: now,
  };

  const nextTemplates = templateId
    ? templates.map((template) => (template.id === templateId ? nextTemplate : template))
    : [nextTemplate, ...templates];

  window.localStorage.setItem(storageKey, JSON.stringify(nextTemplates));

  return nextTemplate;
};
