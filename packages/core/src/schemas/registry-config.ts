/**
 * Main registry configuration schema
 * @fileoverview Core registry configuration with validation
 * @author NVMCP Contributors
 * @since 0.1.0
 */

import { z } from 'zod';
import { RegistrySecuritySchema, RegistryHealthCheckSchema } from './registry.js';

/**
 * Complete registry configuration schema
 */
export const RegistryConfigSchema = z.object({
  name: z.string(),
  url: z.string().url(),
  token: z.string().optional(),
  scope: z.string().optional(),
  priority: z.number().default(100),
  type: z.enum(['official', 'community', 'enterprise', 'local']).default('community'),
  enabled: z.boolean().default(true),
  timeout: z.number().default(30000),
  retries: z.number().default(3),
  healthCheck: RegistryHealthCheckSchema.default({}),
  security: RegistrySecuritySchema.default({}),
}); 