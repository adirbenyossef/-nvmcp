/**
 * Registry configuration schema for NVMCP
 * @fileoverview Defines Zod schemas for registry configuration validation
 * @author NVMCP Contributors
 * @since 0.1.0
 */

import { z } from 'zod';

/**
 * Registry security configuration schema
 */
export const RegistrySecuritySchema = z.object({
  requireSigned: z.boolean().default(false),
  allowedLicenses: z.array(z.string()).default(['MIT', 'Apache-2.0', 'BSD-3-Clause']),
  trustLevel: z.enum(['trusted', 'verified', 'unverified']).default('unverified'),
});

/**
 * Registry health check configuration schema
 */
export const RegistryHealthCheckSchema = z.object({
  enabled: z.boolean().default(true),
  endpoint: z.string().default('/health'),
  interval: z.number().default(300000),
}); 