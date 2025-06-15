// MCP Server Implementation for {{name}}

import type { MCPRequest, MCPResponse, ServerConfig, MCPTool, MCPResource } from '../types/index.js'
import { ServerConfigSchema, MCPErrorCodes, MCPError } from '../types/index.js'

/**
 * MCP Server class
 */
export class MCPServer {
  private config: ServerConfig
  private tools: Map<string, MCPTool> = new Map()
  private resources: Map<string, MCPResource> = new Map()
  private handlers: Map<string, (params?: Record<string, unknown>) => Promise<unknown>> = new Map()

  constructor(config: Partial<ServerConfig> = {}) {
    this.config = ServerConfigSchema.parse({
      name: '{{name}}',
      version: '0.1.0',
      ...config
    })
    
    this.setupHandlers()
  }

  /**
   * Set up default MCP handlers
   */
  private setupHandlers(): void {
    this.handlers.set('initialize', this.handleInitialize.bind(this))
    this.handlers.set('tools/list', this.handleToolsList.bind(this))
    this.handlers.set('tools/call', this.handleToolsCall.bind(this))
    this.handlers.set('resources/list', this.handleResourcesList.bind(this))
    this.handlers.set('resources/read', this.handleResourcesRead.bind(this))
  }

  /**
   * Handle MCP initialize request
   */
  private async handleInitialize(): Promise<unknown> {
    return {
      protocolVersion: '2024-11-05',
      capabilities: this.config.capabilities,
      serverInfo: {
        name: this.config.name,
        version: this.config.version
      }
    }
  }

  /**
   * Handle tools list request
   */
  private async handleToolsList(): Promise<unknown> {
    return {
      tools: Array.from(this.tools.values())
    }
  }

  /**
   * Handle tool call request
   */
  private async handleToolsCall(params?: Record<string, unknown>): Promise<unknown> {
    if (!params?.name || typeof params.name !== 'string') {
      throw new MCPError(MCPErrorCodes.INVALID_PARAMS, 'Tool name is required')
    }

    const tool = this.tools.get(params.name)
    if (!tool) {
      throw new MCPError(MCPErrorCodes.METHOD_NOT_FOUND, `Tool '${params.name}' not found`)
    }

    // This would call the actual tool implementation
    return {
      content: [{
        type: 'text',
        text: `Tool '${params.name}' executed successfully`
      }]
    }
  }

  /**
   * Handle resources list request
   */
  private async handleResourcesList(): Promise<unknown> {
    return {
      resources: Array.from(this.resources.values())
    }
  }

  /**
   * Handle resource read request
   */
  private async handleResourcesRead(params?: Record<string, unknown>): Promise<unknown> {
    if (!params?.uri || typeof params.uri !== 'string') {
      throw new MCPError(MCPErrorCodes.INVALID_PARAMS, 'Resource URI is required')
    }

    const resource = this.resources.get(params.uri)
    if (!resource) {
      throw new MCPError(MCPErrorCodes.METHOD_NOT_FOUND, `Resource '${params.uri}' not found`)
    }

    return {
      contents: [{
        uri: resource.uri,
        mimeType: resource.mimeType || 'text/plain',
        text: `Content of ${resource.name}`
      }]
    }
  }

  /**
   * Register a new tool
   */
  public registerTool(tool: MCPTool): void {
    this.tools.set(tool.name, tool)
  }

  /**
   * Register a new resource
   */
  public registerResource(resource: MCPResource): void {
    this.resources.set(resource.uri, resource)
  }

  /**
   * Process an MCP request
   */
  public async processRequest(request: MCPRequest): Promise<MCPResponse> {
    try {
      const handler = this.handlers.get(request.method)
      if (!handler) {
        throw new MCPError(MCPErrorCodes.METHOD_NOT_FOUND, `Method '${request.method}' not found`)
      }

      const result = await handler(request.params)

      return {
        jsonrpc: '2.0',
        id: request.id || null,
        result
      }
    } catch (error) {
      const mcpError = error instanceof MCPError ? error : new MCPError(
        MCPErrorCodes.INTERNAL_ERROR,
        error instanceof Error ? error.message : 'Unknown error'
      )

      return {
        jsonrpc: '2.0',
        id: request.id || null,
        error: {
          code: mcpError.code,
          message: mcpError.message,
          data: mcpError.data
        }
      }
    }
  }

  /**
   * Start the server
   */
  public async start(): Promise<void> {
    console.log(`🚀 MCP Server '${this.config.name}' starting...`)
    console.log(`📋 Configuration:`)
    console.log(`   Name: ${this.config.name}`)
    console.log(`   Version: ${this.config.version}`)
    console.log(`   Transport: ${this.config.transport}`)
    console.log(`   Capabilities: ${Object.entries(this.config.capabilities).filter(([_, enabled]) => enabled).map(([cap]) => cap).join(', ')}`)
    console.log(`✅ Server ready!`)
  }
}

/**
 * Create and configure MCP server
 */
export function createServer(config?: Partial<ServerConfig>): MCPServer {
  return new MCPServer(config)
}

// Export for convenience
export default MCPServer