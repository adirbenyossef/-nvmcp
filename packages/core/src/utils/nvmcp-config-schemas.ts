/**
 * @fileoverview NVMCP Configuration and lock file schemas
* @description Complete schemas for .nvmcp configuration and lock files
 */

import { z } from 'zod';
import { ConfigEntrySchema } from './nvmcp-config-types.js';
import { MCPServerConfigSchema } from './mcp-server-config.js';

/**
 * .nvmcp configuration file schema
 */
export const NVMCPConfigSchema = z.object({
  version: z.string().default('1.0.0'),
  project_name: z.string().optional(),
  project_id: z.string().optional(),
  config_entries: z.record(ConfigEntrySchema),
  mcp_servers: z.record(MCPServerConfigSchema),
  lock_file_url: z.string().optional(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type NVMCPConfig = z.infer<typeof NVMCPConfigSchema>; 