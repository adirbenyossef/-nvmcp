# NVMCP CLI Reference

Complete command-line interface reference for the Node Context Protocol CLI.

## Table of Contents

- [Global Options](#global-options)
- [Core Commands](#core-commands)
- [Configuration Commands](#configuration-commands)
- [Discovery Commands](#discovery-commands)
- [Integration Commands](#integration-commands)
- [Federation Commands](#federation-commands)
- [Registry Commands](#registry-commands)
- [System Commands](#system-commands)
- [Marketplace Commands](#marketplace-commands)
- [Plugin Commands](#plugin-commands)
- [Examples](#examples)

---

## Global Options

These options are available for all commands:

| Option | Description | Default |
|--------|-------------|---------|
| `--verbose, -v` | Enable verbose logging | `false` |
| `--quiet, -q` | Suppress non-essential output | `false` |
| `--help, -h` | Show help information | - |
| `--version` | Show version information | - |

---

## Core Commands

### `nvmcp create <name>`

Create a new MCP workspace with scaffolding and templates.

#### Syntax
```bash
nvmcp create <name> [options]
```

#### Arguments
- `<name>` - Name of the workspace to create (required)

#### Options
| Option | Alias | Type | Default | Description |
|--------|-------|------|---------|-------------|
| `--template` | `-t` | string | `basic` | Template to use for workspace creation |
| `--author` | `-a` | string | - | Author name for the workspace |
| `--description` | `-d` | string | - | Description for the workspace |
| `--license` | `-l` | string | `MIT` | License for the workspace |
| `--repository` | `-r` | string | - | Repository URL for the workspace |
| `--skip-git` | - | boolean | `false` | Skip git repository initialization |
| `--skip-install` | - | boolean | `false` | Skip dependency installation |

#### Templates
- `basic` - Basic MCP workspace with essential structure
- `full` - Complete workspace with all MCP components
- `minimal` - Minimal workspace for simple projects

#### Examples
```bash
# Create basic workspace
nvmcp create my-workspace

# Create with full template
nvmcp create my-app --template full

# Create with metadata
nvmcp create my-project \
  --author "John Doe" \
  --description "My MCP project" \
  --license "Apache-2.0"

# Create without git/install
nvmcp create quick-test --skip-git --skip-install
```

---

### `nvmcp install <name>`

Install MCP servers from the awesome MCP collection or local sources.

#### Syntax
```bash
nvmcp install <name> [options]
```

#### Arguments
- `<name>` - Name of the MCP server to install

#### Options
| Option | Alias | Type | Default | Description |
|--------|-------|------|---------|-------------|
| `--force` | `-f` | boolean | `false` | Force installation even if already installed |
| `--local` | `-l` | string | - | Install from local path |
| `--registry` | `-r` | string | - | Install from specific registry |

#### Examples
```bash
# Install from awesome MCP collection
nvmcp install filesystem

# Force reinstall
nvmcp install github --force

# Install from local path
nvmcp install --local ./my-mcp-server

# Install from specific registry
nvmcp install my-server --registry https://my-registry.com
```

---

### `nvmcp add <package>`

Add MCP packages to workspace (legacy command).

#### Syntax
```bash
nvmcp add <package> [options]
```

#### Arguments
- `<package>` - MCP package to install

#### Options
| Option | Alias | Type | Default | Description |
|--------|-------|------|---------|-------------|
| `--save-dev` | `-D` | boolean | `false` | Save as development dependency |
| `--exact` | `-E` | boolean | `false` | Install exact version |
| `--registry` | `-r` | string | - | Use specific registry |
| `--force` | `-f` | boolean | `false` | Force reinstall |
| `--dry-run` | - | boolean | `false` | Show what would be installed |

#### Examples
```bash
# Install package
nvmcp add @mcp/core

# Install as dev dependency
nvmcp add @mcp/testing --save-dev

# Install exact version
nvmcp add @mcp/database@1.2.3 --exact

# Dry run
nvmcp add package --dry-run
```

---

### `nvmcp list`

List all available MCP servers from configured registries.

#### Syntax
```bash
nvmcp list [options]
```

#### Options
| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `--format` | string | `table` | Output format (`table`, `json`, `yaml`) |
| `--category` | string | - | Filter by category |
| `--verified` | boolean | `false` | Show only verified servers |
| `--featured` | boolean | `false` | Show only featured servers |

#### Examples
```bash
# List all servers
nvmcp list

# List in JSON format
nvmcp list --format json

# List verified servers only
nvmcp list --verified

# List by category
nvmcp list --category "database"
```

---

### `nvmcp search <query>`

Search for MCP servers across all registries.

#### Syntax
```bash
nvmcp search <query> [options]
```

#### Arguments
- `<query>` - Search query

#### Options
| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `--limit` | number | `20` | Maximum number of results |
| `--category` | string | - | Filter by category |
| `--language` | string | - | Filter by programming language |

#### Examples
```bash
# Search for servers
nvmcp search "database operations"

# Search with filters
nvmcp search "web" --category "scraping" --limit 10
```

---

## Configuration Commands

### `nvmcp config init [name]`

Initialize .nvmcp configuration in the current directory.

#### Syntax
```bash
nvmcp config init [name] [options]
```

#### Arguments
- `[name]` - Project name for the configuration

#### Options
| Option | Alias | Type | Default | Description |
|--------|-------|------|---------|-------------|
| `--force` | `-f` | boolean | `false` | Force initialization even if config exists |

#### Examples
```bash
# Initialize configuration
nvmcp config init

# Initialize with project name
nvmcp config init my-project

# Force reinitialize
nvmcp config init --force
```

---

### `nvmcp config set <key> <value>`

Set a configuration value.

#### Syntax
```bash
nvmcp config set <key> <value> [options]
```

#### Arguments
- `<key>` - Configuration key
- `<value>` - Configuration value

#### Options
| Option | Alias | Type | Default | Description |
|--------|-------|------|---------|-------------|
| `--type` | `-t` | string | `config` | Type of value (`secret`, `config`, `path`, `url`) |
| `--description` | `-d` | string | - | Description of the configuration value |

#### Examples
```bash
# Set configuration value
nvmcp config set PROJECT_PATH /home/user/project

# Set secret value
nvmcp config set API_KEY secret123 --type secret

# Set with description
nvmcp config set DATABASE_URL postgresql://localhost:5432/db \
  --type url \
  --description "Main database connection"
```

---

### `nvmcp config get <key>`

Get a configuration value.

#### Syntax
```bash
nvmcp config get <key>
```

#### Arguments
- `<key>` - Configuration key to retrieve

#### Examples
```bash
# Get configuration value
nvmcp config get PROJECT_PATH

# Get secret value (will show as hidden)
nvmcp config get API_KEY
```

---

### `nvmcp config list`

List all configuration values and MCP servers.

#### Syntax
```bash
nvmcp config list
```

#### Examples
```bash
# List all configurations
nvmcp config list
```

---

### `nvmcp config remove <key>`

Remove a configuration value.

#### Syntax
```bash
nvmcp config remove <key>
```

#### Arguments
- `<key>` - Configuration key to remove

#### Examples
```bash
# Remove configuration
nvmcp config remove OLD_API_KEY
```

---

### `nvmcp config lock`

Manage .ncp.lock files for sharing configurations.

#### Syntax
```bash
nvmcp config lock [options]
```

#### Options
| Option | Alias | Type | Description |
|--------|-------|------|-------------|
| `--generate` | `-g` | boolean | Generate .ncp.lock file |
| `--install` | `-i` | boolean | Install from .ncp.lock file |
| `--file` | `-f` | string | Path to .ncp.lock file |
| `--upload` | `-u` | string | Upload to S3 (bucket/key format) |
| `--download` | `-d` | string | Download from S3 URL |

#### Examples
```bash
# Generate lock file
nvmcp config lock --generate

# Install from lock file
nvmcp config lock --install

# Install from custom lock file
nvmcp config lock --install --file ./custom.nvmcp.lock

# Upload to S3
nvmcp config lock --generate --upload mybucket/project.lock
```

---

## Discovery Commands

### `nvmcp discover <query>`

AI-powered discovery of relevant MCP servers based on natural language queries.

#### Syntax
```bash
nvmcp discover <query> [options]
```

#### Arguments
- `<query>` - Natural language description of what you need

#### Options
| Option | Alias | Type | Default | Description |
|--------|-------|------|---------|-------------|
| `--limit` | `-l` | number | `10` | Maximum number of suggestions |
| `--format` | `-f` | string | `table` | Output format (`table`, `json`, `detailed`) |
| `--auto-install` | `-a` | boolean | `false` | Automatically install top suggestion |
| `--project-context` | `-p` | boolean | `true` | Analyze project context for better suggestions |

#### Examples
```bash
# Discover file operations
nvmcp discover "I need to work with files and directories"

# Discover with auto-install
nvmcp discover "web scraping capabilities" --auto-install

# Get detailed output
nvmcp discover "database operations" --format detailed
```

---

## Integration Commands

### `nvmcp connect-cursor`

Connect NVMCP workspace to Cursor AI editor via MCP.

#### Syntax
```bash
nvmcp connect-cursor [options]
```

#### Options
| Option | Alias | Type | Default | Description |
|--------|-------|------|---------|-------------|
| `--global` | `-g` | boolean | `false` | Install for all Cursor workspaces |
| `--project` | `-p` | boolean | `false` | Install for current project only |
| `--transport` | `-t` | string | `stdio` | Transport protocol (`stdio`, `http`, `sse`) |
| `--port` | - | number | `3000` | Port for HTTP/SSE transport |
| `--host` | - | string | `localhost` | Host address |
| `--auth` | `-a` | string | - | Authentication token |
| `--plugins` | - | string | - | Comma-separated plugins to expose |
| `--force` | `-f` | boolean | `false` | Force overwrite existing config |
| `--validate` | - | boolean | `false` | Validate Cursor installation |
| `--mcp` | - | string | - | Install specific MCP server |
| `--search` | - | string | - | Search and install MCP server |

#### Examples
```bash
# Connect with default settings
nvmcp connect-cursor

# Connect with HTTP transport
nvmcp connect-cursor --transport http --port 4000

# Install and connect specific MCP
nvmcp connect-cursor --mcp filesystem

# Search and connect
nvmcp connect-cursor --search "file operations"

# Global connection with auth
nvmcp connect-cursor --global --auth $MCP_TOKEN
```

---

## Federation Commands

### `nvmcp federate publish`

Publish a federated module to the registry.

#### Syntax
```bash
nvmcp federate publish [options]
```

#### Options
| Option | Alias | Type | Default | Description |
|--------|-------|------|---------|-------------|
| `--semantic-version` | `-s` | string | - | Semantic version for the module |
| `--commit-hash` | `-c` | string | - | Git commit hash |
| `--namespace` | `-n` | string | `@team` | Module namespace |

#### Examples
```bash
# Publish with auto-detection
nvmcp federate publish

# Publish with specific version
nvmcp federate publish --semantic-version 1.2.0

# Publish to specific namespace
nvmcp federate publish --namespace @company
```

---

### `nvmcp federate consume <module>`

Consume a federated module from the registry.

#### Syntax
```bash
nvmcp federate consume <module> [options]
```

#### Arguments
- `<module>` - Module identifier to consume

#### Options
| Option | Alias | Type | Default | Description |
|--------|-------|------|---------|-------------|
| `--version` | `-v` | string | `latest` | Version to consume |
| `--configure-once` | `-c` | boolean | `false` | Apply global configuration |

#### Examples
```bash
# Consume latest version
nvmcp federate consume @team/shared-utils

# Consume specific version
nvmcp federate consume @team/shared-utils --version 1.0.0

# Configure once globally
nvmcp federate consume @team/config --configure-once
```

---

### `nvmcp federate hot-swap <module> <version>`

Perform zero-downtime hot-swap of a federated module.

#### Syntax
```bash
nvmcp federate hot-swap <module> <version> [options]
```

#### Arguments
- `<module>` - Module to hot-swap
- `<version>` - New version to swap to

#### Options
| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `--zero-downtime` | boolean | `true` | Enable zero-downtime swap |

#### Examples
```bash
# Hot-swap to new version
nvmcp federate hot-swap @team/api-client 2.0.0

# Hot-swap without zero-downtime
nvmcp federate hot-swap @team/utils 1.5.0 --zero-downtime false
```

---

### `nvmcp federate dependents <module>`

List all dependents of a federated module.

#### Syntax
```bash
nvmcp federate dependents <module>
```

#### Arguments
- `<module>` - Module to find dependents for

#### Examples
```bash
# Find dependents
nvmcp federate dependents @team/shared-utils
```

---

### `nvmcp federate snapshot`

Generate a deployment snapshot for environment consistency.

#### Syntax
```bash
nvmcp federate snapshot [options]
```

#### Options
| Option | Alias | Type | Default | Description |
|--------|-------|------|---------|-------------|
| `--environment` | `-e` | string | `production` | Target environment |
| `--output` | `-o` | string | - | Output file path |

#### Examples
```bash
# Generate production snapshot
nvmcp federate snapshot --environment production

# Generate with custom output
nvmcp federate snapshot --environment staging --output snapshot.json
```

---

## Registry Commands

### `nvmcp registry list`

List all configured registries with health status.

#### Syntax
```bash
nvmcp registry list [options]
```

#### Options
| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `--format` | string | `table` | Output format (`table`, `json`, `yaml`) |
| `--verbose` | boolean | `false` | Show detailed information |
| `--health-check` | boolean | `false` | Include real-time health checks |

#### Examples
```bash
# List registries
nvmcp registry list

# Detailed view with health
nvmcp registry list --verbose --health-check

# JSON output
nvmcp registry list --format json
```

---

### `nvmcp registry add <url>`

Add a new registry to the fallback chain.

#### Syntax
```bash
nvmcp registry add <url> [options]
```

#### Arguments
- `<url>` - Registry URL

#### Options
| Option | Alias | Type | Default | Description |
|--------|-------|------|---------|-------------|
| `--name` | `-n` | string | - | Human-readable name |
| `--scope` | `-s` | string | - | Package scope |
| `--token` | `-t` | string | - | Authentication token |
| `--type` | - | string | `community` | Registry type |
| `--priority` | `-p` | number | `50` | Priority order |
| `--trust-level` | - | string | `unverified` | Trust level |
| `--require-signed` | - | boolean | `false` | Require signed packages |
| `--timeout` | - | number | `30000` | Request timeout |

#### Examples
```bash
# Basic registry
nvmcp registry add https://my-registry.com --name "My Registry"

# Enterprise registry
nvmcp registry add https://enterprise.company.com/mcp \
  --name "Enterprise Registry" \
  --type enterprise \
  --token $TOKEN \
  --priority 5 \
  --trust-level trusted
```

---

### `nvmcp registry remove <name-or-url>`

Remove a registry from the configuration.

#### Syntax
```bash
nvmcp registry remove <name-or-url>
```

#### Arguments
- `<name-or-url>` - Registry name or URL to remove

#### Examples
```bash
# Remove by name
nvmcp registry remove "My Registry"

# Remove by URL
nvmcp registry remove https://old-registry.com
```

---

### `nvmcp registry verify`

Verify the health status of all registries.

#### Syntax
```bash
nvmcp registry verify [options]
```

#### Options
| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `--registry` | string | - | Verify specific registry |
| `--timeout` | number | `10000` | Request timeout |
| `--json` | boolean | `false` | JSON output |

#### Examples
```bash
# Verify all registries
nvmcp registry verify

# Verify specific registry
nvmcp registry verify --registry "My Registry"

# JSON output
nvmcp registry verify --json
```

---

### `nvmcp registry stats`

View comprehensive registry statistics.

#### Syntax
```bash
nvmcp registry stats
```

#### Examples
```bash
# View statistics
nvmcp registry stats
```

---

### `nvmcp registry clear-cache`

Clear registry response cache.

#### Syntax
```bash
nvmcp registry clear-cache
```

#### Examples
```bash
# Clear cache
nvmcp registry clear-cache
```

---

## System Commands

### `nvmcp doctor`

Run comprehensive system diagnostics.

#### Syntax
```bash
nvmcp doctor [options]
```

#### Options
| Option | Alias | Type | Default | Description |
|--------|-------|------|---------|-------------|
| `--fix` | `-f` | boolean | `false` | Automatically fix issues |
| `--check` | `-c` | string | - | Run specific check |
| `--verbose` | `-v` | boolean | `false` | Detailed output |

#### Available Checks
- `node` - Node.js version compatibility
- `npm` - Package manager installation
- `git` - Git configuration
- `registry` - Registry connectivity
- `workspace` - Workspace configuration
- `performance` - Performance metrics
- `config` - Configuration validation

#### Examples
```bash
# Run all diagnostics
nvmcp doctor

# Fix issues automatically
nvmcp doctor --fix

# Run specific check
nvmcp doctor --check node

# Verbose output
nvmcp doctor --verbose
```

---

## Marketplace Commands

### `nvmcp marketplace search <query>`

Search the official MCP marketplace.

#### Syntax
```bash
nvmcp marketplace search <query> [options]
```

#### Arguments
- `<query>` - Search query

#### Options
| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `--category` | string | - | Filter by category |
| `--provider` | string | - | Filter by provider |
| `--limit` | number | `20` | Maximum results |

#### Examples
```bash
# Search marketplace
nvmcp marketplace search "aws tools"

# Search with filters
nvmcp marketplace search "database" --category "utilities"
```

---

### `nvmcp marketplace install <name>`

Install from the official marketplace.

#### Syntax
```bash
nvmcp marketplace install <name> [options]
```

#### Arguments
- `<name>` - Package name to install

#### Options
| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `--connect-cursor` | boolean | `false` | Auto-connect to Cursor |

#### Examples
```bash
# Install from marketplace
nvmcp marketplace install aws-powertools

# Install and connect to Cursor
nvmcp marketplace install github-tools --connect-cursor
```

---

### `nvmcp marketplace list`

List all available marketplace packages.

#### Syntax
```bash
nvmcp marketplace list
```

#### Examples
```bash
# List marketplace packages
nvmcp marketplace list
```

---

### `nvmcp marketplace connect <provider>`

Connect to marketplace providers.

#### Syntax
```bash
nvmcp marketplace connect <provider> [options]
```

#### Arguments
- `<provider>` - Provider name (`aws`, `npm`, `github`, `official`)

#### Options
| Option | Type | Description |
|--------|------|-------------|
| `--token` | string | Authentication token |
| `--region` | string | AWS region (for AWS provider) |

#### Examples
```bash
# Connect to AWS marketplace
nvmcp marketplace connect aws --token $AWS_TOKEN --region us-east-1

# Connect to GitHub marketplace
nvmcp marketplace connect github --token $GITHUB_TOKEN
```

---

## Plugin Commands

### `nvmcp plugins list`

List installed plugins.

#### Syntax
```bash
nvmcp plugins list [options]
```

#### Options
| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `--global` | boolean | `false` | List global plugins |

#### Examples
```bash
# List local plugins
nvmcp plugins list

# List global plugins
nvmcp plugins list --global
```

---

### `nvmcp plugins install <plugin>`

Install a plugin.

#### Syntax
```bash
nvmcp plugins install <plugin> [options]
```

#### Arguments
- `<plugin>` - Plugin name to install

#### Options
| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `--global` | boolean | `false` | Install globally |
| `--save` | boolean | `true` | Save to config |

#### Examples
```bash
# Install plugin
nvmcp plugins install @ncp/typescript-tools

# Install globally
nvmcp plugins install @ncp/eslint-plugin --global
```

---

### `nvmcp plugins uninstall <plugin>`

Uninstall a plugin.

#### Syntax
```bash
nvmcp plugins uninstall <plugin> [options]
```

#### Arguments
- `<plugin>` - Plugin name to uninstall

#### Options
| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `--global` | boolean | `false` | Uninstall from global |

#### Examples
```bash
# Uninstall plugin
nvmcp plugins uninstall @ncp/old-plugin

# Uninstall global plugin
nvmcp plugins uninstall @ncp/old-plugin --global
```

---

### `nvmcp plugins enable <plugin>`

Enable a plugin.

#### Syntax
```bash
nvmcp plugins enable <plugin>
```

#### Arguments
- `<plugin>` - Plugin name to enable

#### Examples
```bash
# Enable plugin
nvmcp plugins enable @ncp/typescript-tools
```

---

### `nvmcp plugins disable <plugin>`

Disable a plugin.

#### Syntax
```bash
nvmcp plugins disable <plugin>
```

#### Arguments
- `<plugin>` - Plugin name to disable

#### Examples
```bash
# Disable plugin
nvmcp plugins disable @ncp/old-plugin
```

---

## Examples

### Complete Workflow Examples

#### **Individual Developer Workflow**

```bash
# 1. Create new project
nvmcp create my-ai-project --template full
cd my-ai-project

# 2. Initialize configuration
nvmcp config init my-ai-project

# 3. Install MCP servers
nvmcp install filesystem
nvmcp install github

# 4. Configure servers
nvmcp config set GITHUB_TOKEN ghp_your_token --type secret
nvmcp config set BASE_PATH ./data --type path

# 5. Connect to Cursor
nvmcp connect-cursor

# 6. Verify setup
nvmcp doctor
```

#### **Team Collaboration Workflow**

```bash
# Team lead setup
nvmcp create team-project --template full
cd team-project
nvmcp config init team-project

# Configure shared resources
nvmcp config set TEAM_API_KEY $SHARED_API_KEY --type secret
nvmcp config set SHARED_WORKSPACE /shared/workspace --type path

# Install required MCP servers
nvmcp install database
nvmcp install github
nvmcp install slack

# Generate lock file for team
nvmcp config lock --generate

# Team members setup
nvmcp config lock --install
nvmcp connect-cursor
```

#### **Enterprise Setup Workflow**

```bash
# 1. Add enterprise registry
nvmcp registry add https://enterprise.company.com/mcp \
  --name "Enterprise Registry" \
  --type enterprise \
  --token $ENTERPRISE_TOKEN \
  --priority 1 \
  --trust-level trusted

# 2. Verify registry
nvmcp registry verify --registry "Enterprise Registry"

# 3. Install enterprise MCP servers
nvmcp install @company/security-mcp
nvmcp install @company/compliance-mcp
nvmcp install @company/monitoring-mcp

# 4. Configure enterprise settings
nvmcp config set LDAP_SERVER ldap.company.com --type url
nvmcp config set CERT_PATH /etc/ssl/company.pem --type path
nvmcp config set ENVIRONMENT production

# 5. Connect to enterprise tools
nvmcp marketplace connect aws --token $AWS_TOKEN --region us-east-1
nvmcp connect-cursor --global --auth $ENTERPRISE_MCP_TOKEN

# 6. Verify enterprise setup
nvmcp doctor --check all
```

#### **Plugin Development Workflow**

```bash
# 1. Create plugin workspace
nvmcp create my-plugin --template minimal
cd my-plugin

# 2. Install development plugins
nvmcp plugins install @ncp/plugin-dev-tools --save-dev
nvmcp plugins install @ncp/typescript-support --save-dev

# 3. Develop plugin
# ... plugin development ...

# 4. Test plugin locally
nvmcp plugins install ./dist/my-plugin.tgz --save

# 5. Publish to registry
nvmcp federate publish --semantic-version 1.0.0
```

---

### Advanced Configuration Examples

#### **Multi-Environment Setup**

```bash
# Development environment
nvmcp config set ENVIRONMENT development
nvmcp config set API_URL https://dev-api.company.com --type url
nvmcp config set DEBUG_LEVEL verbose

# Staging environment  
nvmcp config set ENVIRONMENT staging
nvmcp config set API_URL https://staging-api.company.com --type url
nvmcp config set DEBUG_LEVEL info

# Production environment
nvmcp config set ENVIRONMENT production
nvmcp config set API_URL https://api.company.com --type url
nvmcp config set DEBUG_LEVEL error
```

#### **Registry Fallback Configuration**

```bash
# Add multiple registries with priorities
nvmcp registry add https://primary.company.com/mcp \
  --name "Primary Registry" \
  --priority 10 \
  --type enterprise

nvmcp registry add https://backup.company.com/mcp \
  --name "Backup Registry" \
  --priority 20 \
  --type enterprise

nvmcp registry add https://registry.modelcontextprotocol.io \
  --name "Community Registry" \
  --priority 30 \
  --type official

# Verify fallback chain
nvmcp registry list --health-check
```

#### **Custom Transport Configuration**

```bash
# HTTP transport with custom settings
nvmcp connect-cursor \
  --transport http \
  --host 0.0.0.0 \
  --port 8080 \
  --auth $CUSTOM_TOKEN

# SSE transport for real-time updates
nvmcp connect-cursor \
  --transport sse \
  --host api.company.com \
  --port 443 \
  --auth $SSE_TOKEN
```

---

This comprehensive CLI reference covers all available commands and options in the NVMCP CLI. For more detailed information about specific features, see the related documentation:

- [Architecture Guide](ARCHITECTURE.md)
- [Configuration Guide](CONFIGURATION.md)
- [Plugin Development](PLUGIN-DEVELOPMENT.md)
- [Enterprise Guide](ENTERPRISE.md) 