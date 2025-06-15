/**
 * @fileoverview Registry command argument schemas
 * @description Zod schemas for registry command arguments
 */

import { z } from 'zod';

/**
 * Add registry arguments schema
 */
export const AddRegistryArgsSchema = z.object({
  url: z.string().url(),
  name: z.string().optional(),
  scope: z.string().optional(),
  token: z.string().optional(),
  type: z.enum(['official', 'community', 'enterprise', 'local']).default('community'),
  priority: z.number().min(0).max(100).default(50),
  trustLevel: z.enum(['trusted', 'verified', 'unverified']).default('unverified'),
  requireSigned: z.boolean().default(false),
  timeout: z.number().min(1000).max(60000).default(30000),
});

export type AddRegistryArgs = z.infer<typeof AddRegistryArgsSchema>;

/**
 * List registry options schema
 */
export const ListRegistryOptionsSchema = z.object({
  format: z.enum(['table', 'json', 'yaml']).default('table'),
  verbose: z.boolean().default(false),
  healthCheck: z.boolean().default(false),
});

export type ListRegistryOptions = z.infer<typeof ListRegistryOptionsSchema>;

/**
 * Verify registry options schema
 */
export const VerifyRegistryOptionsSchema = z.object({
  registry: z.string().optional(),
  timeout: z.number().min(1000).max(60000).default(30000),
  json: z.boolean().default(false),
});

export type VerifyRegistryOptions = z.infer<typeof VerifyRegistryOptionsSchema>; 