/**
 * @fileoverview NVMCP Configuration types and schemas
* @description Zod schemas and TypeScript types for NVMCP configuration
 */

import { z } from 'zod';

/**
 * Configuration entry schema
 */
export const ConfigEntrySchema = z.object({
  key: z.string(),
  value: z.string(),
  type: z.enum(['secret', 'config', 'path', 'url']),
  description: z.string().optional(),
  mcp_servers: z.array(z.string()).default([]),
  created_at: z.string(),
  updated_at: z.string(),
  encrypted: z.boolean().default(false),
});

export type ConfigEntry = z.infer<typeof ConfigEntrySchema>; 