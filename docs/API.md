# nvmcp CLI API Reference

## 📋 **Command Reference**

### **`nvmcp create <name>`**

Create a new MCP workspace with scaffolding and templates.

#### **Syntax**
\`\`\`bash
nvmcp create <name> [options]
\`\`\`

#### **Arguments**
- \`<name>\` - Name of the workspace to create (required)

#### **Options**
| Option | Alias | Type | Default | Description |
|--------|-------|------|---------|-------------|
| \`--template\` | \`-t\` | string | \`basic\` | Template to use for workspace creation |
| \`--author\` | \`-a\` | string | - | Author name for the workspace |
| \`--description\` | \`-d\` | string | - | Description for the workspace |
| \`--license\` | \`-l\` | string | \`MIT\` | License for the workspace |
| \`--repository\` | \`-r\` | string | - | Repository URL for the workspace |
| \`--skip-git\` | - | boolean | \`false\` | Skip git repository initialization |
| \`--skip-install\` | - | boolean | \`false\` | Skip dependency installation |

#### **Templates**
- \`basic\` - Basic MCP workspace with essential structure
- \`full\` - Complete workspace with all MCP components
- \`minimal\` - Minimal workspace for simple projects
- \`custom\` - Custom template from registry

#### **Examples**
\`\`\`bash
# Create basic workspace
nvmcp create my-workspace

# Create with full template
nvmcp create my-app --template full

# Create with metadata
nvmcp create my-project \\
  --author "John Doe" \\
  --description "My MCP project" \\
  --license "Apache-2.0"

# Create without git/install
nvmcp create quick-test --skip-git --skip-install
\`\`\`

#### **Generated Structure**

**Basic Template:**
\`\`\`
my-workspace/
├── src/
│   ├── index.ts
│   └── types/
├── test/
├── docs/
├── package.json
├── tsconfig.json
├── .gitignore
├── .nvmcprc
└── README.md
\`\`\`

**Full Template:**
\`\`\`
my-workspace/
├── src/
│   ├── index.ts
│   ├── server/
│   ├── client/
│   ├── tools/
│   ├── resources/
│   ├── types/
│   └── utils/
├── test/
│   ├── unit/
│   └── integration/
├── docs/
├── examples/
├── scripts/
├── package.json
├── tsconfig.json
├── .gitignore
├── .nvmcprc
└── README.md
\`\`\`

---

### **`nvmcp add <package>`**

Install and configure MCP packages in your workspace.

#### **Syntax**
\`\`\`bash
nvmcp add <package> [options]
\`\`\`

#### **Arguments**
- \`<package>\` - MCP package to install (required)

#### **Options**
| Option | Alias | Type | Default | Description |
|--------|-------|------|---------|-------------|
| \`--save-dev\` | \`-D\` | boolean | \`false\` | Save as development dependency |
| \`--exact\` | \`-E\` | boolean | \`false\` | Install exact version |
| \`--registry\` | \`-r\` | string | - | Use specific registry |
| \`--force\` | \`-f\` | boolean | \`false\` | Force installation |

#### **Examples**
\`\`\`bash
# Install core MCP package
nvmcp add @mcp/core

# Install as dev dependency
nvmcp add @mcp/testing --save-dev

# Install exact version
nvmcp add @mcp/database@1.2.3 --exact

# Install from specific registry
nvmcp add my-package --registry https://my-registry.com
\`\`\`

---

### **`nvmcp doctor`**

Run comprehensive system diagnostics to check your environment.

#### **Syntax**
\`\`\`bash
nvmcp doctor [options]
\`\`\`

#### **Options**
| Option | Alias | Type | Default | Description |
|--------|-------|------|---------|-------------|
| \`--fix\` | \`-f\` | boolean | \`false\` | Automatically fix issues |
| \`--report\` | \`-r\` | string | - | Save report to file |

#### **Checks**
- ✅ Node.js version compatibility
- ✅ npm/pnpm installation
- ✅ Git configuration
- ✅ Registry connectivity
- ✅ Workspace configuration
- ✅ Package integrity
- ✅ Security vulnerabilities
- ✅ Performance metrics

#### **Examples**
\`\`\`bash
# Run diagnostics
nvmcp doctor

# Fix issues automatically
nvmcp doctor --fix

# Save report
nvmcp doctor --report health-report.json
\`\`\`

---

### **`nvmcp plugins`**

Manage CLI plugins and extensions.

#### **Syntax**
\`\`\`bash
nvmcp plugins <subcommand> [options]
\`\`\`

#### **Subcommands**
- \`list\` - List installed plugins
- \`install <plugin>\` - Install a plugin
- \`uninstall <plugin>\` - Remove a plugin
- \`enable <plugin>\` - Enable a plugin
- \`disable <plugin>\` - Disable a plugin
- \`update [plugin]\` - Update plugins

#### **Examples**
\`\`\`bash
# List plugins
nvmcp plugins list

# Install plugin
nvmcp plugins install @nvmcp/plugin-typescript

# Enable/disable
nvmcp plugins enable my-plugin
nvmcp plugins disable my-plugin

# Update all plugins
nvmcp plugins update
\`\`\`

---

## 🔧 **Configuration API**

### **Global Configuration**

Location: \`~/.nvmcp/config.json\`

\`\`\`typescript
interface GlobalConfig {
  registries: RegistryConfig[]
  templates: TemplateConfig[]
  plugins: PluginConfig[]
  cache: CacheConfig
  security: SecurityConfig
  performance: PerformanceConfig
  ui: UIConfig
}
\`\`\`

### **Local Configuration**

Location: \`./.nvmcprc\`

\`\`\`typescript
interface LocalConfig {
  workspace: {
    name: string
    template: string
    createdAt: string
  }
  development: {
    autoReload: boolean
    verbose: boolean
  }
}
\`\`\`

### **Registry Configuration**

\`\`\`typescript
interface RegistryConfig {
  url: string
  token?: string
  scope?: string
}
\`\`\`

### **Template Configuration**

\`\`\`typescript
interface TemplateConfig {
  name: string
  description: string
  source: string
  version?: string
  variables?: Record<string, string>
}
\`\`\`

---

## 🏗️ **Workspace API**

### **Package.json Structure**

\`\`\`typescript
interface WorkspaceConfig {
  name: string
  version: string
  description?: string
  author?: string
  license: string
  repository?: string
  homepage?: string
  keywords: string[]
  engines: {
    node: string
    npm?: string
  }
  scripts: Record<string, string>
  dependencies: Record<string, string>
  devDependencies: Record<string, string>
  mcpPackages: Record<string, string>
}
\`\`\`

### **MCP Package Metadata**

\`\`\`typescript
interface PackageMetadata {
  name: string
  version: string
  description?: string
  author?: string
  license?: string
  repository?: string
  homepage?: string
  keywords: string[]
  main?: string
  types?: string
  exports?: Record<string, unknown>
  dependencies: Record<string, string>
  peerDependencies: Record<string, string>
  mcpConfig?: {
    type: 'server' | 'client' | 'tool' | 'resource'
    capabilities: string[]
    protocols: string[]
    security?: {
      sandbox: boolean
      permissions: string[]
    }
  }
}
\`\`\`

---

## 🔌 **Plugin API**

### **Plugin Interface**

\`\`\`typescript
interface Plugin {
  name: string
  version: string
  description: string
  
  // Lifecycle hooks
  onLoad?(): Promise<void>
  onUnload?(): Promise<void>
  
  // Command extensions
  commands?: CommandModule[]
  
  // Template extensions
  templates?: TemplateConfig[]
  
  // Configuration schema
  configSchema?: ZodSchema
}
\`\`\`

### **Command Extension**

\`\`\`typescript
interface CommandModule {
  command: string
  describe: string
  builder: (yargs: Argv) => Argv
  handler: (argv: Arguments) => Promise<void>
}
\`\`\`

### **Template Extension**

\`\`\`typescript
interface TemplateExtension {
  name: string
  description: string
  generate: (options: GenerateOptions) => Promise<void>
  validate?: (options: GenerateOptions) => boolean
}
\`\`\`

---

## 📊 **Logging API**

### **Logger Interface**

\`\`\`typescript
interface Logger {
  info(message: string, ...args: unknown[]): void
  warn(message: string, ...args: unknown[]): void
  error(message: string, ...args: unknown[]): void
  fatal(message: string, ...args: unknown[]): void
  debug(message: string, ...args: unknown[]): void
  success(message: string, ...args: unknown[]): void
}
\`\`\`

### **Log Levels**

| Level | Value | Description |
|-------|-------|-------------|
| \`fatal\` | 60 | Critical system failures |
| \`error\` | 50 | Operation failures |
| \`warn\` | 40 | Potential issues |
| \`info\` | 30 | General information |
| \`debug\` | 20 | Detailed debugging |

### **Log Configuration**

\`\`\`typescript
interface LogConfig {
  level: 'fatal' | 'error' | 'warn' | 'info' | 'debug'
  transport: {
    target: string
    options: {
      colorize: boolean
      translateTime: boolean
      ignore: string
      messageFormat: string
    }
  }
}
\`\`\`

---

## 🚀 **Performance API**

### **Performance Metrics**

\`\`\`typescript
interface PerformanceMetrics {
  startupTime: number
  commandExecutionTime: number
  memoryUsage: {
    rss: number
    heapTotal: number
    heapUsed: number
    external: number
  }
  networkRequests: {
    count: number
    totalTime: number
    averageTime: number
  }
}
\`\`\`

### **Performance Targets**

| Metric | Target | Description |
|--------|--------|-------------|
| Startup Time | <200ms | CLI initialization |
| Workspace Creation | <5s | Complete scaffolding |
| Package Installation | <30s | Average package install |
| Memory Usage | <50MB | Peak memory consumption |

---

## 🔐 **Security API**

### **Security Configuration**

\`\`\`typescript
interface SecurityConfig {
  allowUnsignedPackages: boolean
  trustedRegistries: string[]
  sandboxMode: boolean
  auditLevel: 'none' | 'low' | 'moderate' | 'high' | 'critical'
}
\`\`\`

### **Package Validation**

\`\`\`typescript
interface ValidationResult {
  valid: boolean
  signature?: string
  checksum?: string
  vulnerabilities: Vulnerability[]
  warnings: string[]
}

interface Vulnerability {
  id: string
  severity: 'low' | 'moderate' | 'high' | 'critical'
  title: string
  description: string
  recommendation: string
}
\`\`\`

---

## 🔄 **Error Handling**

### **Error Types**

\`\`\`typescript
class NvmcpError extends Error {
  code: string
  details?: Record<string, unknown>
}

class ValidationError extends NvmcpError {}
class NetworkError extends NvmcpError {}
class FileSystemError extends NvmcpError {}
class ConfigurationError extends NvmcpError {}
\`\`\`

### **Error Codes**

| Code | Description |
|------|-------------|
| \`INVALID_WORKSPACE_NAME\` | Workspace name validation failed |
| \`DIRECTORY_EXISTS\` | Target directory already exists |
| \`NETWORK_TIMEOUT\` | Network request timed out |
| \`PACKAGE_NOT_FOUND\` | Package not found in registry |
| \`PERMISSION_DENIED\` | Insufficient permissions |
| \`CONFIG_INVALID\` | Configuration validation failed |

---

## 📚 **Examples**

### **Complete Workflow**

\`\`\`bash
# 1. Create workspace
nvmcp create my-mcp-project --template full --author "Developer"

# 2. Navigate to workspace
cd my-mcp-project

# 3. Add core packages
nvmcp add @mcp/core
nvmcp add @mcp/database
nvmcp add @mcp/testing --save-dev

# 4. Run diagnostics
nvmcp doctor

# 5. Install plugins
nvmcp plugins install @nvmcp/plugin-typescript
nvmcp plugins install @nvmcp/plugin-eslint

# 6. Build and test
npm run build
npm test
\`\`\`

### **Custom Template**

\`\`\`bash
# Add custom template
nvmcp config templates add \\
  --name "my-template" \\
  --source "https://github.com/user/template.git" \\
  --description "My custom MCP template"

# Use custom template
nvmcp create my-project --template my-template
\`\`\`

### **Registry Management**

\`\`\`bash
# Add private registry
nvmcp config registries add \\
  --url "https://npm.company.com" \\
  --scope "@company" \\
  --token "your-token"

# Install from private registry
nvmcp add @company/internal-package
\`\`\` 