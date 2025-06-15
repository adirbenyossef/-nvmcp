/**
 * @fileoverview MCP Requirements schemas
 * @description Zod schemas for MCP server configuration requirements
 */

import { z } from 'zod';

/**
 * Field types for MCP server configuration
 */
export const FieldTypeSchema = z.enum([
  'string',
  'password',
  'path',
  'url',
  'email',
  'number',
  'boolean',
  'enum',
  'json',
  'env_var',
]);

export type FieldType = z.infer<typeof FieldTypeSchema>;

/**
 * Validation rules for configuration fields
 */
export const ValidationRuleSchema = z.object({
  required: z.boolean().default(false),
  min_length: z.number().optional(),
  max_length: z.number().optional(),
  pattern: z.string().optional(),
  must_exist: z.boolean().optional(),
  allowed_values: z.array(z.string()).optional(),
  default_value: z.unknown().optional(),
});

export type ValidationRule = z.infer<typeof ValidationRuleSchema>;

/**
 * Configuration field definition
 */
export const ConfigFieldSchema = z.object({
  name: z.string(),
  type: FieldTypeSchema,
  label: z.string().optional(),
  description: z.string(),
  required: z.boolean().default(false),
  sensitive: z.boolean().default(false),
  env_var: z.boolean().default(false),
  validation: ValidationRuleSchema.optional(),
  default_value: z.unknown().optional(),
  help_text: z.string().optional(),
  help_url: z.string().optional(),
  placeholder: z.string().optional(),
  depends_on: z.string().optional(),
  group: z.string().optional(),
}).transform(data => ({
  ...data,
  sensitive: data.sensitive ?? false,
  env_var: data.env_var ?? false,
  required: data.required ?? false,
}));

export type ConfigField = z.infer<typeof ConfigFieldSchema>; 