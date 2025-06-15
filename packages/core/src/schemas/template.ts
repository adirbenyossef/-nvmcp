/**
 * Template configuration schema
 * @fileoverview Validation schemas for NVMCP project templates
 * @author NVMCP Contributors
 * @since 0.1.0
 */

import { z } from 'zod';

/**
 * Template configuration schema for project scaffolding
 */
export const TemplateConfigSchema = z.object({
  name: z.string(),
  description: z.string(),
  source: z.string().url(),
  version: z.string().optional(),
  variables: z.record(z.string()).optional(),
});

/**
 * Template variables schema for dynamic template rendering
 */
export const TemplateVariablesSchema = z.record(z.string());

/**
 * Inferred TypeScript types from schemas
 */
export type TemplateConfig = z.infer<typeof TemplateConfigSchema>;
export type TemplateVariables = z.infer<typeof TemplateVariablesSchema>; 