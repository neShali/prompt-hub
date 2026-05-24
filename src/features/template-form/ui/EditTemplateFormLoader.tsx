'use client';

import { useEffect, useState } from 'react';

import { getSavedTemplateById } from '@/features/template-form/model/storage';
import { TTemplateFormValues } from '@/features/template-form/model/schema';

import { TemplateForm } from './TemplateForm';

const fallbackValues: TTemplateFormValues = {
  title: 'Черновик шаблона',
  description: 'Описание шаблона для редактирования и проверки формы.',
  category: 'development',
  variables: 'task, context, format',
  isPublic: false,
  promptText: `## Role
Ты — помощник по структурированию задач.

## Context
{{context}}

## Task
Помоги решить задачу: {{task}}

## Format
{{format}}`,
};

type TEditTemplateFormLoaderProps = {
  templateId: string;
};

export function EditTemplateFormLoader({ templateId }: TEditTemplateFormLoaderProps) {
  const [initialValues, setInitialValues] = useState<TTemplateFormValues | null>(null);

  useEffect(() => {
    const savedTemplate = getSavedTemplateById(templateId);
    setInitialValues(savedTemplate ?? fallbackValues);
  }, [templateId]);

  if (!initialValues) {
    return null;
  }

  return <TemplateForm initialValues={initialValues} mode="edit" templateId={templateId} />;
}
