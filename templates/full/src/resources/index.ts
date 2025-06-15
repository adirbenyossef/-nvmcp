// MCP Resources Implementation for {{name}}

import type { MCPResource } from '../types/index.js'
import { MCPResourceSchema } from '../types/index.js'

/**
 * Example File Resource
 */
export class FileResource implements MCPResource {
  constructor(
    public readonly uri: string,
    public readonly name: string,
    public readonly description: string,
    public readonly mimeType?: string
  ) {}

  /**
   * Read the resource content
   */
  public async read(): Promise<string> {
    // In a real implementation, this would read from the actual file
    return `Content of ${this.name} at ${this.uri}`
  }
}

/**
 * Example API Resource
 */
export class APIResource implements MCPResource {
  constructor(
    public readonly uri: string,
    public readonly name: string,
    public readonly description: string,
    public readonly mimeType: string = 'application/json'
  ) {}

  /**
   * Fetch the resource content from API
   */
  public async read(): Promise<string> {
    // In a real implementation, this would make an HTTP request
    return JSON.stringify({
      message: `API response from ${this.uri}`,
      timestamp: new Date().toISOString(),
      data: { example: 'value' }
    })
  }
}

/**
 * Example Database Resource
 */
export class DatabaseResource implements MCPResource {
  constructor(
    public readonly uri: string,
    public readonly name: string,
    public readonly description: string,
    public readonly mimeType: string = 'application/json'
  ) {}

  /**
   * Query the database resource
   */
  public async read(): Promise<string> {
    // In a real implementation, this would query a database
    return JSON.stringify({
      query: `SELECT * FROM ${this.name}`,
      results: [
        { id: 1, name: 'Example 1' },
        { id: 2, name: 'Example 2' }
      ]
    })
  }
}

/**
 * Resource Registry
 */
export class ResourceRegistry {
  private resources: Map<string, MCPResource> = new Map()

  constructor() {
    // Register default resources
    this.registerResource(new FileResource(
      'file:///example.txt',
      'Example File',
      'An example text file resource'
    ))
    
    this.registerResource(new APIResource(
      'https://api.example.com/data',
      'Example API',
      'An example API endpoint resource'
    ))
    
    this.registerResource(new DatabaseResource(
      'db://localhost/example',
      'Example Database',
      'An example database resource'
    ))
  }

  /**
   * Register a new resource
   */
  public registerResource(resource: MCPResource): void {
    // Validate resource against schema
    MCPResourceSchema.parse(resource)
    this.resources.set(resource.uri, resource)
  }

  /**
   * Get a resource by URI
   */
  public getResource(uri: string): MCPResource | undefined {
    return this.resources.get(uri)
  }

  /**
   * List all resources
   */
  public listResources(): MCPResource[] {
    return Array.from(this.resources.values())
  }

  /**
   * Read a resource
   */
  public async readResource(uri: string): Promise<string> {
    const resource = this.getResource(uri)
    if (!resource) {
      throw new Error(`Resource '${uri}' not found`)
    }

    // Check if resource has a read method
    if ('read' in resource && typeof resource.read === 'function') {
      return (resource as { read: () => Promise<string> }).read()
    }

    // Default content
    return `Resource: ${resource.name}\nURI: ${resource.uri}\nDescription: ${resource.description}`
  }

  /**
   * Search resources by name or description
   */
  public searchResources(query: string): MCPResource[] {
    const lowerQuery = query.toLowerCase()
    return this.listResources().filter(resource =>
      resource.name.toLowerCase().includes(lowerQuery) ||
      resource.description.toLowerCase().includes(lowerQuery)
    )
  }
}

// Create default registry
export const defaultResourceRegistry = new ResourceRegistry()

// Default export
export default ResourceRegistry 