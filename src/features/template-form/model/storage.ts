import { TTemplateFormValues } from './schema';

export type TSavedTemplate = TTemplateFormValues & {
  id: string;
  updatedAt: string;
};

const STORAGE_KEY = 'prompt-hub:templates';

const canUseStorage = () => typeof window !== 'undefined' && Boolean(window.localStorage);

export const getSavedTemplates = (): TSavedTemplate[] => {
  if (!canUseStorage()) return [];

  const rawValue = window.localStorage.getItem(STORAGE_KEY);

  if (!rawValue) return [];

  try {
    const parsedValue = JSON.parse(rawValue);

    if (Array.isArray(parsedValue)) {
      return parsedValue as TSavedTemplate[];
    }

    return [];
  } catch {
    return [];
  }
};

export const saveTemplate = (
  values: TTemplateFormValues,
  templateId?: string
): TSavedTemplate => {
  const templates = getSavedTemplates();
  const id = templateId ?? `template-${Date.now()}`;
  const nextTemplate: TSavedTemplate = {
    ...values,
    id,
    updatedAt: new Date().toISOString(),
  };

  const nextTemplates = templates.some((template) => template.id === id)
    ? templates.map((template) => (template.id === id ? nextTemplate : template))
    : [nextTemplate, ...templates];

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextTemplates));

  return nextTemplate;
};

export const getSavedTemplateById = (id: string) =>
  getSavedTemplates().find((template) => template.id === id);
