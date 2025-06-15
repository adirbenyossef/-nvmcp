/**
 * Plugin configuration schema
 * @fileoverview Validation schemas for NVMCP plugin system
 * @author NVMCP Contributors
 * @since 0.1.0
 */

import { z } from 'zod';

/**
 * Plugin configuration schema for extensibility
 */
export const PluginConfigSchema = z.object({
  name: z.string(),
  version: z.string(),
  enabled: z.boolean().default(true),
  description: z.string().optional(),
  config: z.record(z.unknown()).optional(),
});

/**
 * Plugin metadata schema for discovery
 */
export const PluginMetadataSchema = z.object({
  id: z.string(),
  author: z.string().optional(),
  homepage: z.string().url().optional(),
  repository: z.string().url().optional(),
});

/**
 * Inferred TypeScript types
 */
export type PluginConfig = z.infer<typeof PluginConfigSchema>;
export type PluginMetadata = z.infer<typeof PluginMetadataSchema>; 