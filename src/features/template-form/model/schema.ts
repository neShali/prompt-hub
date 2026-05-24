import { z } from 'zod';

import { promptCategoryValues } from '@/shared/types/prompt';

export const templateFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, 'Название должно быть не короче 3 символов')
    .max(90, 'Название должно быть не длиннее 90 символов'),
  description: z
    .string()
    .trim()
    .min(10, 'Описание должно быть не короче 10 символов')
    .max(280, 'Описание должно быть не длиннее 280 символов'),
  category: z.enum(promptCategoryValues),
  promptText: z
    .string()
    .trim()
    .min(20, 'Текст промпта должен быть не короче 20 символов'),
  variables: z.string().optional(),
  isPublic: z.boolean(),
});

export type TTemplateFormValues = z.infer<typeof templateFormSchema>;
