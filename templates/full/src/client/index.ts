// MCP Client Implementation for {{name}}

import type { MCPRequest, MCPResponse, ClientConfig, MCPTool, MCPResource } from '../types/index.js'
import { ClientConfigSchema, MCPError, MCPErrorCodes } from '../types/index.js'

/**
 * MCP Client class
 */
export class MCPClient {
  private config: ClientConfig
  private requestId = 0

  constructor(config: Partial<ClientConfig> = {}) {
    this.config = ClientConfigSchema.parse(config)
  }

  /**
   * Generate unique request ID
   */
  private generateRequestId(): number {
    return ++this.requestId
  }

  /**
   * Send request to MCP server
   */
  private async sendRequest(method: string, params?: Record<string, unknown>): Promise<MCPResponse> {
    const request: MCPRequest = {
      jsonrpc: '2.0',
      id: this.generateRequestId(),
      method,
      params
    }

    // In a real implementation, this would send over the configured transport
    console.log(`📤 Sending request: ${method}`, params || {})
    
         // Mock response for template
     return {
       jsonrpc: '2.0',
       id: request.id!,
       result: { success: true, method, params }
     }
  }

  /**
   * Initialize connection with server
   */
  public async initialize(): Promise<void> {
    console.log('🔄 Initializing MCP client...')
    
    const response = await this.sendRequest('initialize', {
      protocolVersion: '2024-11-05',
      capabilities: {},
      clientInfo: {
        name: '{{name}}-client',
        version: '0.1.0'
      }
    })

    if (response.error) {
      throw new MCPError(response.error.code, response.error.message, response.error.data)
    }

    console.log('✅ Client initialized successfully')
  }

  /**
   * List available tools from server
   */
  public async listTools(): Promise<MCPTool[]> {
    console.log('📋 Fetching available tools...')
    
    const response = await this.sendRequest('tools/list')
    
    if (response.error) {
      throw new MCPError(response.error.code, response.error.message, response.error.data)
    }

    // In a real implementation, this would parse the actual response
    return []
  }

  /**
   * Call a tool on the server
   */
  public async callTool(name: string, arguments_: Record<string, unknown> = {}): Promise<unknown> {
    console.log(`🔧 Calling tool: ${name}`)
    
    const response = await this.sendRequest('tools/call', {
      name,
      arguments: arguments_
    })

    if (response.error) {
      throw new MCPError(response.error.code, response.error.message, response.error.data)
    }

    return response.result
  }

  /**
   * List available resources from server
   */
  public async listResources(): Promise<MCPResource[]> {
    console.log('📁 Fetching available resources...')
    
    const response = await this.sendRequest('resources/list')
    
    if (response.error) {
      throw new MCPError(response.error.code, response.error.message, response.error.data)
    }

    // In a real implementation, this would parse the actual response
    return []
  }

  /**
   * Read a resource from the server
   */
  public async readResource(uri: string): Promise<unknown> {
    console.log(`📖 Reading resource: ${uri}`)
    
    const response = await this.sendRequest('resources/read', { uri })

    if (response.error) {
      throw new MCPError(response.error.code, response.error.message, response.error.data)
    }

    return response.result
  }

  /**
   * Close the connection
   */
  public async close(): Promise<void> {
    console.log('👋 Closing MCP client connection')
    // In a real implementation, this would properly close the transport
  }
}

/**
 * Create and configure MCP client
 */
export function createClient(config?: Partial<ClientConfig>): MCPClient {
  return new MCPClient(config)
}

// Export for convenience
export default MCPClient 