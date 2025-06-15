# {{name}}

{{description}}

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development
npm run dev

# Start MCP server
npm run dev:server

# Start MCP client
npm run dev:client

# Build for production
npm run build

# Run tests
npm test
```

## 📁 Project Structure

```
{{name}}/
├── src/
│   ├── index.ts          # Main entry point
│   ├── server/
│   │   └── index.ts      # MCP Server implementation
│   ├── client/
│   │   └── index.ts      # MCP Client implementation
│   ├── tools/
│   │   └── index.ts      # MCP Tools (Calculator, Text, FileSystem)
│   ├── resources/
│   │   └── index.ts      # MCP Resources (File, API, Database)
│   ├── types/
│   │   └── index.ts      # Type definitions and schemas
│   └── utils/
│       └── index.ts      # Utility functions
├── test/
│   ├── unit/             # Unit tests
│   └── integration/      # Integration tests
├── examples/             # Usage examples
├── docs/                 # Documentation
├── dist/                 # Built output
├── package.json
├── tsconfig.json
└── README.md
```

## 🔧 MCP Development

This workspace provides a complete MCP (Model Context Protocol) implementation:

### 🏗️ Architecture

- **Server**: Full MCP server with tools and resources
- **Client**: MCP client for connecting to servers
- **Tools**: Interactive functions (Calculator, Text Processor, File System)
- **Resources**: Content providers (Files, APIs, Databases)
- **Types**: Complete type safety with Zod schemas
- **Utils**: Helper utilities for logging, config, events, validation

### 🛠️ Built-in Tools

#### Calculator Tool
```typescript
// Perform mathematical calculations
await toolRegistry.executeTool('calculator', {
  operation: 'add',
  a: 10,
  b: 5
})
```

#### Text Processor Tool
```typescript
// Process text content
await toolRegistry.executeTool('text_processor', {
  operation: 'uppercase',
  text: 'hello world'
})
```

#### File System Tool
```typescript
// File system operations
await toolRegistry.executeTool('file_system', {
  operation: 'list',
  path: '/path/to/directory'
})
```

### 📁 Built-in Resources

#### File Resource
```typescript
// Read file content
const content = await resourceRegistry.readResource('file:///example.txt')
```

#### API Resource
```typescript
// Fetch API data
const data = await resourceRegistry.readResource('https://api.example.com/data')
```

#### Database Resource
```typescript
// Query database
const results = await resourceRegistry.readResource('db://localhost/example')
```

### 🔌 Usage Examples

#### Starting MCP Server
```typescript
import { createServer } from './server/index.js'

const server = createServer({
  name: '{{name}}',
  capabilities: {
    tools: true,
    resources: true
  }
})

await server.start()
```

#### Using MCP Client
```typescript
import { createClient } from './client/index.js'

const client = createClient()
await client.initialize()

// List available tools
const tools = await client.listTools()

// Call a tool
const result = await client.callTool('calculator', {
  operation: 'add',
  a: 10,
  b: 5
})
```

### 📦 Adding MCP Packages

```bash
# Add core MCP functionality
nvmcp add @mcp/core

# Add database support
nvmcp add @mcp/database

# Add testing utilities
nvmcp add @mcp/testing --save-dev

# Add custom tools
nvmcp add @mcp/tools-filesystem
nvmcp add @mcp/tools-web
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run unit tests only
npm run test:unit

# Run integration tests only
npm run test:integration

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage
```

## 🔧 Development

### Adding Custom Tools

1. Create a new tool class implementing `MCPTool`
2. Register it with the tool registry
3. Add tests for your tool

```typescript
export class MyCustomTool implements MCPTool {
  public readonly name = 'my_tool'
  public readonly description = 'My custom tool'
  public readonly inputSchema = {
    type: 'object' as const,
    properties: {
      input: { type: 'string', description: 'Input parameter' }
    },
    required: ['input']
  }

  public async execute(params: Record<string, unknown>): Promise<unknown> {
    // Tool implementation
    return { result: 'success' }
  }
}
```

### Adding Custom Resources

1. Create a new resource class implementing `MCPResource`
2. Register it with the resource registry
3. Add tests for your resource

```typescript
export class MyCustomResource implements MCPResource {
  constructor(
    public readonly uri: string,
    public readonly name: string,
    public readonly description: string,
    public readonly mimeType?: string
  ) {}

  public async read(): Promise<string> {
    // Resource implementation
    return 'resource content'
  }
}
```

## 📚 Documentation

- [MCP Protocol](https://modelcontextprotocol.io)
- [nvmcp Documentation](https://nvmcp.dev/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Zod Documentation](https://zod.dev)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

{{license}} 