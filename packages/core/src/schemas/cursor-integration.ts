/**
 * @fileoverview Cursor IDE integration schemas
 * @description Zod schemas for Cursor MCP server integration
 */

import { z } from 'zod';

/**
 * Cursor MCP Server Configuration schema
 */
export const CursorMCPServerConfigSchema = z.object({
  command: z.string(),
  args: z.array(z.string()),
  env: z.record(z.string()).optional(),
  transport: z.enum(['stdio', 'http', 'sse']).default('stdio'),
  port: z.number().min(1024).max(65535).optional(),
  host: z.string().default('localhost').optional(),
  auth: z.object({
    token: z.string().optional(),
    type: z.enum(['bearer', 'api-key']).default('bearer').optional(),
  }).optional(),
  timeout: z.number().default(30000),
  description: z.string().optional(),
  capabilities: z.array(z.string()).default([]),
  metadata: z.record(z.unknown()).optional(),
});

export type CursorMCPServerConfig = z.infer<typeof CursorMCPServerConfigSchema>;

/**
 * Cursor Integration Configuration schema
 */
export const CursorIntegrationConfigSchema = z.object({
  enabled: z.boolean().default(false),
  global: z.boolean().default(false),
  configPath: z.string().optional(),
  servers: z.record(CursorMCPServerConfigSchema).default({}),
  defaultPlugins: z.array(z.string()).default([
    '@nvmcp/typescript-tools',
    '@nvmcp/testing-tools',
    '@nvmcp/workspace-manager',
  ]),
  transportOptions: z.object({
    stdio: z.object({
      maxPayloadSize: z.string().default('10MB'),
      bufferSize: z.number().default(8192),
    }).optional(),
    http: z.object({
      cors: z.boolean().default(true),
      rateLimiting: z.string().default('1000rpm'),
      compression: z.boolean().default(true),
      keepAlive: z.boolean().default(true),
    }).optional(),
    sse: z.object({
      heartbeat: z.number().default(30000),
      reconnectInterval: z.number().default(5000),
      maxReconnectAttempts: z.number().default(5),
    }).optional(),
  }).default({}),
  security: z.object({
    tokenRotation: z.boolean().default(true),
    tokenTTL: z.number().default(604800),
    allowedOrigins: z.array(z.string()).default(['vscode://cursor']),
    auditLogging: z.boolean().default(true),
    permissionScopes: z.array(z.enum(['read', 'write', 'execute', 'admin'])).default(['read', 'write']),
  }).default({}),
});

export type CursorIntegrationConfig = z.infer<typeof CursorIntegrationConfigSchema>; 