# @nvmcp/core - Essential Commands & Features

**The foundation of NVMCP CLI** - Everything you need to get started with MCP server management.

---

## 🎯 What's Included

**@nvmcp/core** provides the essential functionality every developer needs:

- **Project Creation** - Bootstrap MCP workspaces with templates
- **MCP Server Management** - Install, configure, and manage MCP servers
- **Configuration System** - Type-safe configuration with validation
- **AI Discovery** - Natural language MCP server discovery
- **Health Diagnostics** - System checks and troubleshooting
- **Editor Integration** - Connect to Cursor AI and other editors

---

## 📦 Installation

```bash
# Install just the core functionality
npm install -g @nvmcp/core

# Or install the complete NVMCP CLI (includes core)
npm install -g nvmcp
```

---

## 🚀 Core Commands

### **Project Management**

```bash
# Create new MCP workspace
nvmcp create my-project                    # Basic template
nvmcp create ai-app --template full        # Full-featured template
nvmcp create minimal-app --template minimal # Minimal template

# Initialize configuration in existing project
nvmcp config init my-project
```

### **MCP Server Management**

```bash
# List available MCP servers
nvmcp list                                 # All servers
nvmcp list --installed                     # Only installed
nvmcp list --format json                   # JSON output

# Install MCP servers
nvmcp install filesystem                   # Install filesystem server
nvmcp install github --version 1.2.0      # Specific version
nvmcp install custom-server --local ./path # Local installation

# Search for MCP servers
nvmcp search "database"                    # Keyword search
nvmcp search "file operations" --limit 5   # Limited results
```

### **Configuration Management**

```bash
# Set configuration values with type validation
nvmcp config set GITHUB_TOKEN ghp_abc123 --type secret
nvmcp config set PROJECT_PATH ./data --type path
nvmcp config set API_URL https://api.example.com --type url
nvmcp config set DEBUG_MODE true --type boolean

# Get configuration values
nvmcp config get                           # All config
nvmcp config get GITHUB_TOKEN              # Specific key
nvmcp config list --format table           # Formatted output

# Team collaboration
nvmcp config lock --generate               # Create lock file
nvmcp config lock --install                # Install from lock file
```

### **AI-Powered Discovery**

```bash
# Natural language discovery
nvmcp discover "I need to work with files and GitHub"
nvmcp discover "database operations and API integrations"
nvmcp discover "web scraping tools" --auto-install

# Advanced discovery options
nvmcp discover "elasticsearch" --format detailed
nvmcp discover "monitoring tools" --limit 3
nvmcp discover "file ops" --context       # Include project context
```

### **Health & Diagnostics**

```bash
# System health checks
nvmcp doctor                               # Full system check
nvmcp doctor --check node                 # Check Node.js setup
nvmcp doctor --check config               # Validate configuration
nvmcp doctor --fix                        # Auto-fix issues
nvmcp doctor --verbose                    # Detailed diagnostics
```

### **Editor Integration**

```bash
# Connect to Cursor AI
nvmcp connect-cursor                       # Basic connection
nvmcp connect-cursor --transport http      # HTTP transport
nvmcp connect-cursor --port 4000           # Custom port
nvmcp connect-cursor --mcp filesystem      # Install MCP first
nvmcp connect-cursor --global              # Global configuration
```

---

## 🔧 Configuration System

### **Configuration File Structure**

The `.nvmcp/config.json` file manages your MCP workspace:

```json
{
  "name": "my-project",
  "version": "1.0.0",
  "mcp_servers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "./data"],
      "env": {
        "BASE_PATH": "${PROJECT_PATH}"
      },
      "transport": "stdio"
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "${GITHUB_TOKEN}"
      }
    }
  },
  "config": {
    "GITHUB_TOKEN": {
      "type": "secret",
      "description": "GitHub Personal Access Token",
      "required": true
    },
    "PROJECT_PATH": {
      "type": "path",
      "description": "Base project path",
      "default": "./data"
    },
    "DEBUG_MODE": {
      "type": "boolean",
      "description": "Enable debug logging",
      "default": false
    }
  }
}
```

### **Configuration Types**

**@nvmcp/core** supports type-safe configuration with validation:

| Type | Description | Example |
|------|-------------|---------|
| `string` | Plain text value | `"production"` |
| `number` | Numeric value | `3000` |
| `boolean` | True/false value | `true` |
| `secret` | Hidden/sensitive value | `"ghp_token123"` |
| `path` | File system path | `"./data"` |
| `url` | URL validation | `"https://api.example.com"` |

### **Environment Variable Substitution**

Reference configuration values in MCP server definitions:

```json
{
  "mcp_servers": {
    "my-server": {
      "env": {
        "API_KEY": "${MY_SECRET_KEY}",
        "BASE_PATH": "${PROJECT_PATH}",
        "DEBUG": "${DEBUG_MODE}"
      }
    }
  }
}
```

---

## 🤖 AI Discovery Engine

### **How It Works**

The AI discovery engine analyzes your natural language queries and project context to suggest relevant MCP servers:

1. **Query Analysis** - Understands intent and requirements
2. **Context Awareness** - Analyzes project structure and dependencies
3. **Semantic Matching** - Matches capabilities to available MCP servers
4. **Relevance Ranking** - Ranks suggestions by relevance and compatibility

### **Discovery Examples**

```bash
# File operations
nvmcp discover "I need to read and write files"
# → Suggests: filesystem, file-utils, directory-tools

# API integrations
nvmcp discover "I need to make HTTP requests and handle APIs"
# → Suggests: fetch, axios-server, rest-client

# Database operations
nvmcp discover "I need to work with databases and SQL"
# → Suggests: sqlite, postgres, database-tools

# Development tools
nvmcp discover "I need git operations and version control"
# → Suggests: github, git-server, version-control
```

### **Project Context Analysis**

The discovery engine considers your project context:

- **package.json dependencies** - Suggests compatible MCP servers
- **File structure** - Identifies project type (web app, CLI tool, etc.)
- **Git configuration** - Recommends version control integrations
- **Existing MCP servers** - Avoids conflicts and suggests complementary tools

---

## 📋 Project Templates

### **Available Templates**

#### **Basic Template**
```bash
nvmcp create my-project --template basic
```
- Simple `.nvmcp/config.json`
- Basic MCP server setup (filesystem)
- Essential configuration

#### **Full Template**
```bash
nvmcp create my-project --template full
```
- Complete configuration with multiple MCP servers
- TypeScript support
- Development tools and linting
- Git integration
- Documentation templates

#### **Minimal Template**
```bash
nvmcp create my-project --template minimal
```
- Bare minimum configuration
- No pre-installed MCP servers
- Perfect for custom setups

### **Template Customization**

Templates can be customized during creation:

```bash
nvmcp create my-project \
  --template full \
  --git \
  --install \
  --author "Your Name" \
  --description "My awesome MCP project"
```

---

## 🔗 Editor Integration

### **Cursor AI Integration**

**@nvmcp/core** provides seamless Cursor AI integration:

```bash
# Basic setup
nvmcp connect-cursor

# Advanced configuration
nvmcp connect-cursor \
  --transport http \
  --port 4000 \
  --global \
  --auth $MCP_TOKEN
```

### **Transport Protocols**

Support for multiple communication protocols:

#### **stdio (Default)**
```bash
nvmcp connect-cursor --transport stdio
```
- Standard input/output communication
- Lowest latency
- Best for local development

#### **HTTP**
```bash
nvmcp connect-cursor --transport http --port 3000
```
- HTTP-based communication
- Good for remote setups
- RESTful API interface

#### **Server-Sent Events (SSE)**
```bash
nvmcp connect-cursor --transport sse --port 3001
```
- Real-time updates
- Server-pushed events
- Good for monitoring and notifications

---

## 🩺 Health Diagnostics

### **System Checks**

The `nvmcp doctor` command performs comprehensive health checks:

#### **Node.js Environment**
- Node.js version compatibility (≥18.0.0)
- npm/yarn/pnpm availability
- Package manager configuration

#### **Configuration Validation**
- `.nvmcp/config.json` syntax validation
- Type checking for configuration values
- Environment variable availability
- Path existence verification

#### **MCP Server Health**
- Server installation verification
- Command accessibility
- Environment variable validation
- Transport protocol testing

#### **Registry Connectivity**
- Registry endpoint availability
- Authentication token validation
- Network connectivity tests
- Fallback chain verification

### **Auto-Fix Capabilities**

```bash
nvmcp doctor --fix
```

Common issues that can be auto-fixed:
- Missing configuration files
- Invalid path references
- Outdated package versions
- Registry endpoint updates
- Permission issues

---

## 🚀 Performance

### **Optimizations**

**@nvmcp/core** is optimized for speed and efficiency:

- **Fast Cold Start** - < 200ms for most commands
- **Intelligent Caching** - Registry responses and metadata cached
- **Lazy Loading** - Only load required modules
- **Parallel Operations** - Concurrent server installations
- **Memory Efficient** - Minimal memory footprint

### **Benchmarks**

| Command | Time | Notes |
|---------|------|-------|
| `nvmcp list` | ~150ms | With cache |
| `nvmcp install filesystem` | ~2-3s | Package download + setup |
| `nvmcp config set KEY value` | ~50ms | Local operation |
| `nvmcp doctor` | ~500ms | Full system check |
| `nvmcp discover "query"` | ~800ms | AI-powered analysis |

---

## 🔧 Advanced Usage

### **Custom MCP Servers**

Install MCP servers from local paths or custom registries:

```bash
# Local installation
nvmcp install --local ./my-custom-server

# From custom registry
nvmcp install my-server --registry https://my-registry.com

# Direct npm package
nvmcp install @company/custom-mcp-server
```

### **Multi-Environment Configuration**

Manage different environments with configuration profiles:

```bash
# Development environment
nvmcp config set ENVIRONMENT development
nvmcp config set API_URL https://dev-api.example.com --type url

# Production environment  
nvmcp config set ENVIRONMENT production
nvmcp config set API_URL https://api.example.com --type url
```

### **Configuration Import/Export**

Share configurations across projects:

```bash
# Export configuration
nvmcp config export --output my-config.json

# Import configuration
nvmcp config import --input my-config.json --merge
```

---

## 🐛 Troubleshooting

### **Common Issues**

#### **Command not found: nvmcp**
```bash
# Check installation
npm list -g @nvmcp/core

# Reinstall if needed
npm install -g @nvmcp/core
```

#### **Configuration validation failed**
```bash
# Check config syntax
nvmcp config get --format json

# Validate configuration
nvmcp doctor --check config

# Reinitialize if corrupted
nvmcp config init --force
```

#### **MCP server installation failed**
```bash
# Clear cache and retry
nvmcp install package --no-cache

# Check system requirements
nvmcp doctor --check node

# Verbose logging for debugging
nvmcp install package --verbose
```

### **Debug Mode**

Enable detailed logging for troubleshooting:

```bash
# Set log level
export NVMCP_LOG_LEVEL=debug

# Run command with verbose output
nvmcp install filesystem --verbose

# Check system diagnostics
nvmcp doctor --verbose
```

---

## 📚 API Reference

### **Programmatic Usage**

**@nvmcp/core** can be used programmatically:

```typescript
import { NvmcpCore } from '@nvmcp/core';

const core = new NvmcpCore();

// Create project
await core.create({
  name: 'my-project',
  template: 'full',
  path: './projects'
});

// Install MCP server
await core.install({
  server: 'filesystem',
  version: 'latest'
});

// Configure settings
await core.config.set('GITHUB_TOKEN', 'ghp_token123', {
  type: 'secret',
  description: 'GitHub token'
});
```

---

## 🤝 Contributing to @nvmcp/core

We welcome contributions to the core package! Here's how to get started:

### **Development Setup**

```bash
git clone https://github.com/nvmcp-org/nvmcp-cli.git
cd nvmcp-cli/packages/core
npm install
npm run build
npm test
```

### **Core Areas for Contribution**

- **Command Implementations** - New commands and options
- **Configuration System** - Type validation and schema
- **Discovery Engine** - AI improvements and context analysis
- **Template System** - New project templates
- **Health Diagnostics** - Additional system checks
- **Performance** - Optimization and caching improvements

---

**@nvmcp/core v0.1.0-alpha** - The essential foundation for MCP development 