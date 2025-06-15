/**
 * Config command arguments schemas
 * @fileoverview Validation schemas for config command arguments
 * @author NVMCP Contributors
 * @since 0.1.0
 */

import { z } from 'zod';

/**
 * Base config command arguments schema
 */
export const ConfigCommandArgsSchema = z.object({
  verbose: z.boolean().default(false),
  quiet: z.boolean().default(false),
});

/**
 * Config set arguments schema
 */
export const ConfigSetArgsSchema = ConfigCommandArgsSchema.extend({
  key: z.string().min(1),
  value: z.string(),
  type: z.enum(['secret', 'config', 'path', 'url']).default('config'),
  description: z.string().optional(),
}); 