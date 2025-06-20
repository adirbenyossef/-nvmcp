// {{name}} - Comprehensive MCP Workspace
// Generated by π nvmcp CLI

export * from './types/index.js'
export * from './server/index.js'
export * from './client/index.js'
export * from './tools/index.js'
export * from './resources/index.js'
export * from './utils/index.js'

/**
 * Main entry point for {{name}}
 * 
 * This is a comprehensive MCP workspace with server, client, tools, and resources.
 */
export function main(): void {
  console.log('🚀 Welcome to {{name}}!')
  console.log('🌟 Full MCP Workspace with:')
  console.log('   📡 MCP Server')
  console.log('   📱 MCP Client')
  console.log('   🔧 Custom Tools')
  console.log('   📁 Resource Management')
  console.log('   🛠️ Utilities')
  console.log('')
  console.log('🎯 Next steps:')
  console.log('   npm run dev:server  # Start MCP server')
  console.log('   npm run dev:client  # Start MCP client')
  console.log('   npm run test        # Run test suite')
}

// Auto-run if this is the main module
if (import.meta.url === `file://${process.argv[1]}`) {
  main()
} 