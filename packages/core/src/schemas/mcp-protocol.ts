/**
 * @fileoverview MCP Protocol schemas
 * @description Zod schemas for MCP (Model Context Protocol) communication
 */

import { z } from 'zod';

/**
 * MCP Tool Definition schema
 */
export const MCPToolSchema = z.object({
  name: z.string(),
  description: z.string(),
  inputSchema: z.object({
    type: z.literal('object'),
    properties: z.record(z.unknown()),
    required: z.array(z.string()).optional(),
  }),
  handler: z.string().optional(),
});

export type MCPTool = z.infer<typeof MCPToolSchema>;

/**
 * MCP Request schema
 */
export const MCPRequestSchema = z.object({
  jsonrpc: z.literal('2.0'),
  id: z.union([z.string(), z.number()]),
  method: z.string(),
  params: z.unknown().optional(),
});

export type MCPRequest = z.infer<typeof MCPRequestSchema>;

/**
 * MCP Response schema
 */
export const MCPResponseSchema = z.object({
  jsonrpc: z.literal('2.0'),
  id: z.union([z.string(), z.number()]),
  result: z.unknown().optional(),
  error: z.object({
    code: z.number(),
    message: z.string(),
    data: z.unknown().optional(),
  }).optional(),
});

export type MCPResponse = z.infer<typeof MCPResponseSchema>;

/**
 * Connection Status schema
 */
export const ConnectionStatusSchema = z.object({
  connected: z.boolean(),
  server: z.string(),
  transport: z.enum(['stdio', 'http', 'sse']),
  lastPing: z.date().optional(),
  latency: z.number().optional(),
  errors: z.array(z.string()).default([]),
  capabilities: z.array(z.string()).default([]),
});

export type ConnectionStatus = z.infer<typeof ConnectionStatusSchema>;

/**
 * Cursor Configuration File schema
 */
export const CursorConfigFileSchema = z.object({
  mcpServers: z.record(z.object({
    command: z.string(),
    args: z.array(z.string()).optional(),
    env: z.record(z.string()).optional(),
    transport: z.enum(['stdio', 'http', 'sse']).optional(),
    description: z.string().optional(),
  })),
});

export type CursorConfigFile = z.infer<typeof CursorConfigFileSchema>; 