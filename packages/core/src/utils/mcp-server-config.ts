/**
 * @fileoverview MCP Server configuration types and schemas
 * @description Zod schemas and TypeScript types for MCP server configuration
 */

import { z } from 'zod';

/**
 * MCP Server configuration schema
 */
export const MCPServerConfigSchema = z.object({
  name: z.string(),
  package: z.string(),
  version: z.string().optional(),
  command: z.string(),
  args: z.array(z.string()).default([]),
  env_vars: z.array(z.string()).default([]),
  transport: z.enum(['stdio', 'http', 'sse']).default('stdio'),
  enabled: z.boolean().default(true),
  auto_start: z.boolean().default(true),
  config_keys: z.array(z.string()).default([]),
  installed_at: z.string(),
  last_used: z.string().optional(),
});

export type MCPServerConfig = z.infer<typeof MCPServerConfigSchema>; 