/**
 * @fileoverview NVMCP Lock file schemas
* @description Schemas for .nvmcp.lock file for team collaboration
 */

import { z } from 'zod';
import { MCPServerConfigSchema } from './mcp-server-config.js';

/**
 * .nvmcp.lock file schema for sharing configurations
 */
export const NVMCPLockSchema = z.object({
  version: z.string(),
  project_name: z.string(),
  project_id: z.string(),
  mcp_servers: z.record(MCPServerConfigSchema),
  config_template: z.record(z.object({
    key: z.string(),
    type: z.enum(['secret', 'config', 'path', 'url']),
    description: z.string(),
    required: z.boolean(),
    default_value: z.string().optional(),
  })),
  docker_configs: z.record(z.object({
    image: z.string(),
    tag: z.string(),
    env_mapping: z.record(z.string()),
    volumes: z.array(z.string()).optional(),
    ports: z.array(z.string()).optional(),
  })).optional(),
  created_at: z.string(),
  checksum: z.string(),
});

export type NVMCPLock = z.infer<typeof NVMCPLockSchema>; 