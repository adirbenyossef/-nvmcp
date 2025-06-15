// MCP Tools Implementation for {{name}}

import type { MCPTool } from '../types/index.js'
import { MCPToolSchema } from '../types/index.js'

/**
 * Example Calculator Tool
 */
export class CalculatorTool implements MCPTool {
  public readonly name = 'calculator'
  public readonly description = 'Perform basic mathematical calculations'
  public readonly inputSchema = {
    type: 'object' as const,
    properties: {
      operation: {
        type: 'string',
        enum: ['add', 'subtract', 'multiply', 'divide'],
        description: 'The mathematical operation to perform'
      },
      a: {
        type: 'number',
        description: 'First operand'
      },
      b: {
        type: 'number',
        description: 'Second operand'
      }
    },
    required: ['operation', 'a', 'b']
  }

  public async execute(params: Record<string, unknown>): Promise<unknown> {
    const { operation, a, b } = params as { operation: string; a: number; b: number }

    switch (operation) {
      case 'add':
        return { result: a + b }
      case 'subtract':
        return { result: a - b }
      case 'multiply':
        return { result: a * b }
      case 'divide':
        if (b === 0) {
          throw new Error('Division by zero is not allowed')
        }
        return { result: a / b }
      default:
        throw new Error(`Unknown operation: ${operation}`)
    }
  }
}

/**
 * Example Text Tool
 */
export class TextTool implements MCPTool {
  public readonly name = 'text_processor'
  public readonly description = 'Process and manipulate text content'
  public readonly inputSchema = {
    type: 'object' as const,
    properties: {
      operation: {
        type: 'string',
        enum: ['uppercase', 'lowercase', 'reverse', 'length', 'words'],
        description: 'The text operation to perform'
      },
      text: {
        type: 'string',
        description: 'The text to process'
      }
    },
    required: ['operation', 'text']
  }

  public async execute(params: Record<string, unknown>): Promise<unknown> {
    const { operation, text } = params as { operation: string; text: string }

    switch (operation) {
      case 'uppercase':
        return { result: text.toUpperCase() }
      case 'lowercase':
        return { result: text.toLowerCase() }
      case 'reverse':
        return { result: text.split('').reverse().join('') }
      case 'length':
        return { result: text.length }
      case 'words':
        return { result: text.split(/\s+/).length }
      default:
        throw new Error(`Unknown operation: ${operation}`)
    }
  }
}

/**
 * Example File System Tool
 */
export class FileSystemTool implements MCPTool {
  public readonly name = 'file_system'
  public readonly description = 'Basic file system operations'
  public readonly inputSchema = {
    type: 'object' as const,
    properties: {
      operation: {
        type: 'string',
        enum: ['list', 'exists', 'stats'],
        description: 'The file system operation to perform'
      },
      path: {
        type: 'string',
        description: 'The file or directory path'
      }
    },
    required: ['operation', 'path']
  }

  public async execute(params: Record<string, unknown>): Promise<unknown> {
    const { operation, path } = params as { operation: string; path: string }

    // In a real implementation, you would use fs/promises
    switch (operation) {
      case 'list':
        return { result: [`${path}/file1.txt`, `${path}/file2.txt`] }
      case 'exists':
        return { result: true }
      case 'stats':
        return { 
          result: {
            size: 1024,
            isFile: true,
            isDirectory: false,
            modified: new Date().toISOString()
          }
        }
      default:
        throw new Error(`Unknown operation: ${operation}`)
    }
  }
}

/**
 * Tool Registry
 */
export class ToolRegistry {
  private tools: Map<string, MCPTool> = new Map()

  constructor() {
    // Register default tools
    this.registerTool(new CalculatorTool())
    this.registerTool(new TextTool())
    this.registerTool(new FileSystemTool())
  }

  /**
   * Register a new tool
   */
  public registerTool(tool: MCPTool): void {
    // Validate tool against schema
    MCPToolSchema.parse(tool)
    this.tools.set(tool.name, tool)
  }

  /**
   * Get a tool by name
   */
  public getTool(name: string): MCPTool | undefined {
    return this.tools.get(name)
  }

  /**
   * List all tools
   */
  public listTools(): MCPTool[] {
    return Array.from(this.tools.values())
  }

     /**
    * Execute a tool
    */
   public async executeTool(name: string, params: Record<string, unknown>): Promise<unknown> {
     const tool = this.getTool(name)
     if (!tool) {
       throw new Error(`Tool '${name}' not found`)
     }

     return tool.execute(params)
   }
}

// Create default registry
export const defaultToolRegistry = new ToolRegistry()

// Default export
export default ToolRegistry 