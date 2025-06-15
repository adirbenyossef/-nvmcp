// Type definitions for {{name}}

/**
 * Base MCP configuration interface
 */
export interface MCPConfig {
  name: string
  version: string
  capabilities: string[]
  protocols: string[]
}

/**
 * Workspace configuration
 */
export interface WorkspaceConfig {
  name: string
  description: string
  author?: string
  license: string
}

/**
 * Example MCP tool interface
 */
export interface MCPTool {
  name: string
  description: string
  execute(params: Record<string, unknown>): Promise<unknown>
}

/**
 * Example MCP resource interface
 */
export interface MCPResource {
  uri: string
  name: string
  description: string
  mimeType?: string
}

// Export common types
export type MCPCapability = 'tools' | 'resources' | 'prompts' | 'sampling'
export type MCPProtocol = 'stdio' | 'sse' | 'websocket' 