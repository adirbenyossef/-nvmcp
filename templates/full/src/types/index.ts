// Type definitions for {{name}}

import { z } from 'zod'

/**
 * MCP Protocol Schemas
 */
export const MCPMessageSchema = z.object({
  jsonrpc: z.literal('2.0'),
  id: z.union([z.string(), z.number()]).optional(),
  method: z.string().optional(),
  params: z.record(z.unknown()).optional(),
  result: z.unknown().optional(),
  error: z.object({
    code: z.number(),
    message: z.string(),
    data: z.unknown().optional()
  }).optional()
})

export const MCPRequestSchema = MCPMessageSchema.extend({
  method: z.string(),
  params: z.record(z.unknown()).optional()
})

export const MCPResponseSchema = MCPMessageSchema.extend({
  id: z.union([z.string(), z.number()]),
  result: z.unknown().optional(),
  error: z.object({
    code: z.number(),
    message: z.string(),
    data: z.unknown().optional()
  }).optional()
})

/**
 * MCP Tool Schemas
 */
export const MCPToolSchema = z.object({
  name: z.string(),
  description: z.string(),
  inputSchema: z.object({
    type: z.literal('object'),
    properties: z.record(z.unknown()),
    required: z.array(z.string()).optional()
  }),
  execute: z.function().args(z.record(z.unknown())).returns(z.promise(z.unknown()))
})

/**
 * MCP Resource Schemas
 */
export const MCPResourceSchema = z.object({
  uri: z.string(),
  name: z.string(),
  description: z.string(),
  mimeType: z.string().optional()
})

/**
 * Configuration Schemas
 */
export const ServerConfigSchema = z.object({
  name: z.string(),
  version: z.string(),
  capabilities: z.object({
    tools: z.boolean().default(true),
    resources: z.boolean().default(true),
    prompts: z.boolean().default(false),
    sampling: z.boolean().default(false)
  }),
  transport: z.enum(['stdio', 'sse', 'websocket']).default('stdio')
})

export const ClientConfigSchema = z.object({
  serverUrl: z.string().url().optional(),
  timeout: z.number().default(30000),
  retries: z.number().default(3)
})

/**
 * Inferred Types
 */
export type MCPMessage = z.infer<typeof MCPMessageSchema>
export type MCPRequest = z.infer<typeof MCPRequestSchema>
export type MCPResponse = z.infer<typeof MCPResponseSchema>
export type MCPTool = z.infer<typeof MCPToolSchema>
export type MCPResource = z.infer<typeof MCPResourceSchema>
export type ServerConfig = z.infer<typeof ServerConfigSchema>
export type ClientConfig = z.infer<typeof ClientConfigSchema>

/**
 * Common Types
 */
export type MCPCapability = 'tools' | 'resources' | 'prompts' | 'sampling'
export type MCPTransport = 'stdio' | 'sse' | 'websocket'

/**
 * Error Types
 */
export class MCPError extends Error {
  constructor(
    public code: number,
    message: string,
    public data?: unknown
  ) {
    super(message)
    this.name = 'MCPError'
  }
}

export const MCPErrorCodes = {
  PARSE_ERROR: -32700,
  INVALID_REQUEST: -32600,
  METHOD_NOT_FOUND: -32601,
  INVALID_PARAMS: -32602,
  INTERNAL_ERROR: -32603
} as const

/**
 * Utility Types
 */
export type PromiseResult<T> = {
  success: true
  data: T
} | {
  success: false
  error: MCPError
} 