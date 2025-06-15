# NVMCP CLI - Complete Command Reference

**Version:** 0.1.0-alpha  
**Built for developers, by developers** 🚀

This is the complete reference for all NVMCP CLI commands. For quick start guides and tutorials, see the [main README](README.md).

---

## Table of Contents

- [Installation](#installation)
- [Global Options](#global-options)
- [Core Commands](#core-commands)
- [Configuration Commands](#configuration-commands)
- [Discovery Commands](#discovery-commands)
- [Integration Commands](#integration-commands)
- [Registry Commands](#registry-commands)
- [System Commands](#system-commands)
- [Advanced Commands](#advanced-commands)
- [Examples & Workflows](#examples--workflows)

---

## Installation

```bash
# Global installation (recommended)
npm install -g nvmcp

# Try without installing
npx nvmcp --help

# Build from source
git clone https://github.com/your-org/nvmcp-cli.git
cd nvmcp-cli && npm install && npm run build && npm link
```

---

## Global Options

These options work with all commands:

| Option | Description | Example |
|--------|-------------|---------|
| `--help, -h` | Show help information | `nvmcp --help` |
| `--version, -v` | Show version information | `nvmcp --version` |
| `--verbose` | Enable verbose logging | `nvmcp install filesystem --verbose` |
| `--quiet, -q` | Suppress non-error output | `nvmcp list --quiet` |
| `--config <path>` | Use custom config file | `nvmcp --config ./custom.json list` |
| `--no-cache` | Disable caching | `nvmcp search database --no-cache` |

---

## Core Commands

### `nvmcp create`

Create a new MCP workspace with templates and configuration.

**Syntax:**
```bash
nvmcp create <name> [options]
```

**Options:**
| Option | Description | Default |
|--------|-------------|---------|
| `--template <type>` | Template type: basic, full, minimal | `basic` |
| `--path <directory>` | Target directory | Current directory |
| `--git` | Initialize git repository | `false` |
| `--install` | Auto-install dependencies | `false` |

**Examples:**
```bash
# Basic workspace
nvmcp create my-project

# Full-featured workspace with git
nvmcp create ai-assistant --template full --git

# Minimal setup in specific directory
nvmcp create simple-mcp --template minimal --path ./projects
```

### `nvmcp install`

Install MCP servers from registries.

**Syntax:**
```bash
nvmcp install <server> [options]
```

**Options:**
| Option | Description | Default |
|--------|-------------|---------|
| `--registry <name>` | Specific registry to use | Auto-detect |
| `--version <version>` | Specific version | `latest` |
| `--global` | Install globally | `false` |
| `--dev` | Install as dev dependency | `false` |

**Examples:**
```bash
# Install from default registry
nvmcp install filesystem

# Install specific version
nvmcp install github --version 1.2.0

# Install from specific registry
nvmcp install custom-server --registry enterprise
```

### `nvmcp list`

List available MCP servers from configured registries.

**Syntax:**
```bash
nvmcp list [options]
```

**Options:**
| Option | Description | Default |
|--------|-------------|---------|
| `--registry <name>` | Filter by registry | All registries |
| `--category <cat>` | Filter by category | All categories |
| `--format <type>` | Output format: table, json, yaml | `table` |
| `--installed` | Show only installed servers | `false` |

**Examples:**
```bash
# List all available servers
nvmcp list

# List from specific registry
nvmcp list --registry awesome-mcp

# Show installed servers only
nvmcp list --installed

# JSON output for scripting
nvmcp list --format json
```

### `nvmcp search`

Search for MCP servers using keywords and filters.

**Syntax:**
```bash
nvmcp search <query> [options]
```

**Options:**
| Option | Description | Default |
|--------|-------------|---------|
| `--category <cat>` | Filter by category | All |
| `--registry <name>` | Search specific registry | All |
| `--limit <num>` | Limit results | `10` |
| `--sort <field>` | Sort by: name, downloads, rating | `relevance` |

**Examples:**
```bash
# Basic search
nvmcp search "file operations"

# Search with filters
nvmcp search database --category storage --limit 5

# Search specific registry
nvmcp search "web scraping" --registry community
```

---

## Configuration Commands

### `nvmcp config init`

Initialize a new `.nvmcp` configuration file.

**Syntax:**
```bash
nvmcp config init [name] [options]
```

**Options:**
| Option | Description | Default |
|--------|-------------|---------|
| `--template <type>` | Config template | `basic` |
| `--force` | Overwrite existing config | `false` |
| `--global` | Create global config | `false` |

**Examples:**
```bash
# Initialize basic config
nvmcp config init my-project

# Force overwrite existing
nvmcp config init --force

# Global configuration
nvmcp config init --global
```

### `nvmcp config set`

Set configuration values with type validation.

**Syntax:**
```bash
nvmcp config set <key> <value> [options]
```

**Options:**
| Option | Description | Types |
|--------|-------------|-------|
| `--type <type>` | Value type validation | `string`, `number`, `boolean`, `secret`, `path`, `url` |
| `--description <desc>` | Add description | - |
| `--required` | Mark as required | `false` |
| `--global` | Set in global config | `false` |

**Examples:**
```bash
# Set secret with validation
nvmcp config set GITHUB_TOKEN ghp_abc123 --type secret

# Set path with validation
nvmcp config set DATA_PATH ./data --type path

# Set with description
nvmcp config set API_URL https://api.example.com --type url --description "Main API endpoint"
```

### `nvmcp config get`

Get configuration values.

**Syntax:**
```bash
nvmcp config get [key] [options]
```

**Options:**
| Option | Description | Default |
|--------|-------------|---------|
| `--global` | Get from global config | `false` |
| `--format <type>` | Output format | `table` |
| `--show-secrets` | Show secret values | `false` |

**Examples:**
```bash
# Get all config
nvmcp config get

# Get specific key
nvmcp config get GITHUB_TOKEN

# Show secrets (use carefully!)
nvmcp config get --show-secrets
```

### `nvmcp config list`

List all configuration keys and values.

**Syntax:**
```bash
nvmcp config list [options]
```

**Options:**
| Option | Description | Default |
|--------|-------------|---------|
| `--global` | List global config | `false` |
| `--format <type>` | Output format | `table` |
| `--keys-only` | Show only keys | `false` |

### `nvmcp config lock`

Generate and manage lock files for team collaboration.

**Syntax:**
```bash
nvmcp config lock [options]
```

**Options:**
| Option | Description | Default |
|--------|-------------|---------|
| `--generate` | Generate lock file | `false` |
| `--install` | Install from lock file | `false` |
| `--upload <url>` | Upload to remote location | - |
| `--download <url>` | Download from remote | - |

**Examples:**
```bash
# Generate lock file
nvmcp config lock --generate

# Install from lock file
nvmcp config lock --install

# Upload to S3
nvmcp config lock --generate --upload s3://bucket/project.lock
```

---

## Discovery Commands

### `nvmcp discover`

AI-powered natural language MCP server discovery.

**Syntax:**
```bash
nvmcp discover "<query>" [options]
```

**Options:**
| Option | Description | Default |
|--------|-------------|---------|
| `--format <type>` | Output format: simple, detailed, json | `simple` |
| `--limit <num>` | Limit results | `5` |
| `--auto-install` | Auto-install top result | `false` |
| `--context` | Include project context | `true` |

**Examples:**
```bash
# Natural language discovery
nvmcp discover "I need to work with files and GitHub"

# Detailed explanations
nvmcp discover "database operations" --format detailed

# Auto-install top suggestion
nvmcp discover "web scraping tools" --auto-install

# Limit results
nvmcp discover "API integrations" --limit 3
```

---

## Integration Commands

### `nvmcp connect-cursor`

Connect MCP workspace to Cursor AI editor.

**Syntax:**
```bash
nvmcp connect-cursor [options]
```

**Options:**
| Option | Description | Default |
|--------|-------------|---------|
| `--transport <type>` | Transport: stdio, http, sse | `stdio` |
| `--port <number>` | Port for HTTP/SSE | `3000` |
| `--mcp <server>` | Install specific MCP first | - |
| `--search <query>` | Search and install before connecting | - |
| `--global` | Global Cursor configuration | `false` |

**Examples:**
```bash
# Basic connection
nvmcp connect-cursor

# HTTP transport on custom port
nvmcp connect-cursor --transport http --port 4000

# Install MCP and connect
nvmcp connect-cursor --mcp filesystem

# Search, install, and connect
nvmcp connect-cursor --search "git operations"
```

---

## Registry Commands

### `nvmcp registry list`

List configured registries and their status.

**Syntax:**
```bash
nvmcp registry list [options]
```

**Options:**
| Option | Description | Default |
|--------|-------------|---------|
| `--format <type>` | Output format | `table` |
| `--status` | Include health status | `false` |
| `--verbose` | Show detailed info | `false` |

### `nvmcp registry add`

Add a new registry to the configuration.

**Syntax:**
```bash
nvmcp registry add <url> [options]
```

**Options:**
| Option | Description | Default |
|--------|-------------|---------|
| `--name <name>` | Registry name | Auto-generated |
| `--type <type>` | Registry type: official, community, enterprise, private | `community` |
| `--priority <num>` | Priority (1-100) | `50` |
| `--token <token>` | Authentication token | - |
| `--trust-level <level>` | Trust level: trusted, verified, unverified | `verified` |

**Examples:**
```bash
# Add community registry
nvmcp registry add https://registry.example.com --name "Example Registry"

# Add enterprise registry with auth
nvmcp registry add https://enterprise.company.com/mcp \
  --name "Enterprise" \
  --type enterprise \
  --token $ENTERPRISE_TOKEN \
  --priority 90
```

### `nvmcp registry remove`

Remove a registry from configuration.

**Syntax:**
```bash
nvmcp registry remove <name> [options]
```

**Options:**
| Option | Description | Default |
|--------|-------------|---------|
| `--force` | Force removal without confirmation | `false` |

### `nvmcp registry verify`

Verify registry health and connectivity.

**Syntax:**
```bash
nvmcp registry verify [options]
```

**Options:**
| Option | Description | Default |
|--------|-------------|---------|
| `--registry <name>` | Verify specific registry | All registries |
| `--timeout <ms>` | Request timeout | `5000` |
| `--fix` | Auto-fix common issues | `false` |

---

## System Commands

### `nvmcp doctor`

Comprehensive system diagnostics and health checks.

**Syntax:**
```bash
nvmcp doctor [options]
```

**Options:**
| Option | Description | Default |
|--------|-------------|---------|
| `--check <component>` | Check specific: node, npm, config, registry, mcp | All |
| `--fix` | Auto-fix issues where possible | `false` |
| `--format <type>` | Output format | `table` |
| `--verbose` | Detailed diagnostic info | `false` |

**Examples:**
```bash
# Full system check
nvmcp doctor

# Check specific component
nvmcp doctor --check node

# Auto-fix issues
nvmcp doctor --fix

# Verbose diagnostics
nvmcp doctor --verbose
```

### `nvmcp version`

Show version information for NVMCP CLI and components.

**Syntax:**
```bash
nvmcp version [options]
```

**Options:**
| Option | Description | Default |
|--------|-------------|---------|
| `--format <type>` | Output format | `table` |
| `--components` | Show all component versions | `false` |

---

## Advanced Commands

### `nvmcp federate`

Module federation commands for enterprise deployments.

**Subcommands:**
- `publish` - Publish federated modules
- `consume` - Consume federated modules  
- `hot-swap` - Hot-swap modules without downtime
- `snapshot` - Create deployment snapshots

**Examples:**
```bash
# Publish federated module
nvmcp federate publish --semantic-version 0.1.0 --namespace @company

# Consume federated module
nvmcp federate consume @company/shared-mcp --version 0.1.0

# Hot-swap module
nvmcp federate hot-swap @company/api-client 0.2.0
```

### `nvmcp marketplace`

Access MCP marketplace features.

**Syntax:**
```bash
nvmcp marketplace <command> [options]
```

**Subcommands:**
- `search` - Search marketplace
- `browse` - Browse categories
- `info` - Get package information
- `reviews` - Show package reviews

**Examples:**
```bash
# Search marketplace
nvmcp marketplace search "aws tools"

# Browse by category
nvmcp marketplace browse --category "databases"

# Get package info
nvmcp marketplace info @aws/s3-mcp
```

---

## Examples & Workflows

### Individual Developer Workflow

```bash
# 1. Create new project
nvmcp create my-ai-project --template full --git

# 2. Initialize configuration
cd my-ai-project
nvmcp config init my-ai-project

# 3. Discover and install MCP servers
nvmcp discover "I need file operations and GitHub integration"
nvmcp install filesystem
nvmcp install github

# 4. Configure secrets
nvmcp config set GITHUB_TOKEN ghp_your_token --type secret
nvmcp config set PROJECT_PATH ./data --type path

# 5. Connect to Cursor
nvmcp connect-cursor

# 6. Verify everything works
nvmcp doctor
```

### Team Collaboration Workflow

```bash
# Team Lead: Set up shared configuration
nvmcp create team-project --template full
nvmcp config init team-project
nvmcp install filesystem github sqlite
nvmcp config set SHARED_API_URL https://api.company.com --type url
nvmcp config lock --generate

# Team Members: Install from lock file
git clone repo && cd team-project
nvmcp config lock --install
nvmcp config set GITHUB_TOKEN your_personal_token --type secret
nvmcp connect-cursor
```

### Enterprise Setup Workflow

```bash
# 1. Add enterprise registry
nvmcp registry add https://enterprise.company.com/mcp \
  --name "Enterprise Registry" \
  --type enterprise \
  --token $ENTERPRISE_TOKEN \
  --priority 90

# 2. Create enterprise workspace
nvmcp create enterprise-app --template full

# 3. Install enterprise MCP servers
nvmcp install @company/auth-mcp --registry "Enterprise Registry"
nvmcp install @company/logging-mcp --registry "Enterprise Registry"

# 4. Set up federation
nvmcp federate publish --namespace @company --semantic-version 0.1.0

# 5. Configure multi-environment
nvmcp config set ENVIRONMENT production
nvmcp config set API_URL https://prod-api.company.com --type url
```

### Advanced Discovery Workflow

```bash
# Context-aware discovery
nvmcp discover "I'm building a web scraper that needs to store data in PostgreSQL"

# Multiple discovery queries
nvmcp discover "authentication and authorization tools"
nvmcp discover "monitoring and logging solutions"
nvmcp discover "data transformation utilities"

# Auto-install workflow
nvmcp discover "GitHub API integration" --auto-install --format detailed
```

---

## Configuration File Reference

### `.nvmcp/config.json` Structure

```json
{
  "name": "project-name",
  "version": "1.0.0",
  "mcp_servers": {
    "server-name": {
      "command": "npx",
      "args": ["-y", "@package/server", "arg1"],
      "env": {
        "ENV_VAR": "${CONFIG_KEY}"
      },
      "transport": "stdio"
    }
  },
  "config": {
    "CONFIG_KEY": {
      "type": "secret|string|number|boolean|path|url",
      "description": "Description of the config",
      "required": true,
      "default": "default-value"
    }
  },
  "registries": [
    {
      "name": "registry-name",
      "url": "https://registry.example.com",
      "type": "official|community|enterprise|private",
      "priority": 50,
      "trust_level": "trusted|verified|unverified"
    }
  ]
}
```

### `.nvmcp.lock` Structure

```json
{
  "lockfile_version": "1.0.0",
  "generated": "2024-01-15T10:30:00Z",
  "project": {
    "name": "project-name",
    "version": "1.0.0"
  },
  "mcp_servers": {
    "server-name": {
      "version": "1.2.3",
      "resolved": "https://registry.npmjs.org/package/-/package-1.2.3.tgz",
      "integrity": "sha512-...",
      "registry": "registry-name"
    }
  },
  "config_schema": {
    "required_keys": ["GITHUB_TOKEN", "API_URL"],
    "optional_keys": ["DEBUG_MODE"]
  }
}
```

---

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NVMCP_CONFIG_PATH` | Custom config file path | `.nvmcp/config.json` |
| `NVMCP_CACHE_DIR` | Cache directory | `~/.nvmcp/cache` |
| `NVMCP_REGISTRY_TIMEOUT` | Registry request timeout (ms) | `5000` |
| `NVMCP_LOG_LEVEL` | Log level: debug, info, warn, error | `info` |
| `NVMCP_NO_UPDATE_CHECK` | Disable update checks | `false` |

---

## Exit Codes

| Code | Description |
|------|-------------|
| `0` | Success |
| `1` | General error |
| `2` | Invalid command or arguments |
| `3` | Configuration error |
| `4` | Network/registry error |
| `5` | MCP server error |
| `6` | Permission error |
| `7` | File system error |

---

## Troubleshooting

### Common Issues

**Command not found: nvmcp**
```bash
# Check installation
npm list -g nvmcp

# Reinstall if needed
npm install -g nvmcp
```

**Registry connection failed**
```bash
# Check registry status
nvmcp registry verify

# Use different registry
nvmcp install package --registry community
```

**Configuration validation failed**
```bash
# Check config syntax
nvmcp config get --format json

# Reinitialize if corrupted
nvmcp config init --force
```

**MCP server installation failed**
```bash
# Clear cache and retry
nvmcp install package --no-cache

# Check system requirements
nvmcp doctor --check node
```

### Debug Mode

Enable verbose logging for troubleshooting:

```bash
# Enable debug logging
export NVMCP_LOG_LEVEL=debug
nvmcp install package --verbose

# Or use the verbose flag
nvmcp install package --verbose
```

---

## Support

- 📖 **Documentation**: [https://nvmcp.dev](https://nvmcp.dev)
- 💬 **Discord**: [https://discord.gg/nvmcp](https://discord.gg/nvmcp)
- 🐛 **Issues**: [GitHub Issues](https://github.com/your-org/nvmcp-cli/issues)
- 💡 **Discussions**: [GitHub Discussions](https://github.com/your-org/nvmcp-cli/discussions)

---

**NVMCP CLI v0.1.0-alpha** - Built with ❤️ by developers, for developers 