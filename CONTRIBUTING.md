# Contributing to π NVMCP CLI

We welcome contributions from the community! This guide will help you get started with contributing to the π NVMCP CLI project.

## 📋 Table of Contents

- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Documentation](#documentation)
- [Pull Request Process](#pull-request-process)
- [Community Guidelines](#community-guidelines)

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 18.0.0
- **npm**, **yarn**, or **pnpm**
- **Git**
- **TypeScript** knowledge

### Fork and Clone

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/nvmcp-cli.git
cd nvmcp-cli
   ```
3. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/original-org/nvmcp-cli.git
   ```

## 🛠️ Development Setup

### Install Dependencies

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Link for local development
npm link

# Verify installation
nvmcp --version
```

### Development Commands

```bash
# Start development with watch mode
npm run dev

# Build TypeScript
npm run build

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Lint code
npm run lint
npm run lint:fix

# Format code
npm run format

# Type checking
npm run type-check

# Build documentation
npm run docs:build
```

## 📁 Project Structure

```
nvmcp-cli/
├── packages/                      # Monorepo packages
│   ├── core/                      # Core functionality
│   ├── store/                     # Package management
│   ├── federation/                # Federation features
│   ├── cloud/                     # Cloud deployment
│   └── backend/                   # Backend services
│   ├── core/                      # Core business logic
│   │   ├── commands/              # CLI command implementations
│   │   │   ├── add.ts             # Add command
│   │   │   ├── config.ts          # Configuration commands
│   │   │   ├── connect-cursor.ts  # Cursor integration
│   │   │   ├── create.ts          # Workspace creation
│   │   │   ├── discover.ts        # AI discovery
│   │   │   ├── doctor.ts          # System diagnostics
│   │   │   ├── federate.ts        # Federation features
│   │   │   ├── install.ts         # MCP installation
│   │   │   ├── list.ts            # Server listing
│   │   │   ├── marketplace.ts     # Marketplace integration
│   │   │   ├── plugins.ts         # Plugin management
│   │   │   ├── registry.ts        # Registry management
│   │   │   └── search.ts          # Server search
│   │   ├── config/                # Configuration management
│   │   │   └── config-manager.ts  # Config handling
│   │   ├── federation/            # Module federation
│   │   │   ├── federation-runtime.ts
│   │   │   └── vmog-registry.ts
│   │   └── generate/              # Workspace generation
│   │       └── workspace-generator.ts
│   ├── types/                     # TypeScript type definitions
│   │   ├── config.interface.ts    # Configuration types
│   │   ├── cursor.interface.ts    # Cursor integration types
│   │   ├── federation.interface.ts # Federation types
│   │   └── mcp-requirements.interface.ts
│   └── utils/                     # Utility functions
│       ├── config-prompts.ts      # Interactive prompts
│       ├── cursor-integration.ts  # Cursor utilities
│       ├── fs-utils.ts            # File system helpers
│       ├── logger.ts              # Logging utilities
│       ├── nvmcp-config.ts        # NVMCP configuration
│       ├── registry-manager.ts    # Registry utilities
│       └── turbo-ui.ts            # UI components
├── templates/                     # Project templates
│   ├── basic/                     # Basic template
│   ├── full/                      # Full-featured template
│   └── minimal/                   # Minimal template
├── docs/                          # Documentation
├── test/                          # Test suites
│   └── cli.test.ts                # CLI tests
├── bin/                           # Executable scripts
│   └── nvmcp.js                   # Main executable
└── package.json                   # Package configuration
```

## 🔄 Development Workflow

### 1. Create a Feature Branch

```bash
# Sync with upstream
git fetch upstream
git checkout main
git merge upstream/main

# Create feature branch
git checkout -b feature/amazing-feature
```

### 2. Make Your Changes

- **Follow the coding standards** (see below)
- **Add tests** for new functionality
- **Update documentation** if needed
- **Keep commits focused** and atomic

### 3. Test Your Changes

```bash
# Run all tests
npm test

# Run specific tests
npm run test:unit
npm run test:integration

# Test CLI commands manually
nvmcp --help
nvmcp create test-workspace --template basic
nvmcp doctor
```

### 4. Commit Your Changes

We use [Conventional Commits](https://conventionalcommits.org/):

```bash
# Good commit messages
git commit -m "feat: add AI-powered MCP discovery"
git commit -m "fix: resolve registry fallback issue"
git commit -m "docs: update CLI reference with new commands"
git commit -m "test: add integration tests for federation"

# Commit types:
# feat: new feature
# fix: bug fix
# docs: documentation changes
# test: adding or updating tests
# refactor: code refactoring
# style: formatting changes
# perf: performance improvements
# ci: CI/CD changes
```

### 5. Push and Create Pull Request

```bash
# Push to your fork
git push origin feature/amazing-feature

# Create pull request on GitHub
```

## 📝 Coding Standards

### TypeScript Guidelines

- **Strict TypeScript** - No `any` types allowed
- **Type-first development** - Define interfaces and types first
- **Functional programming** - Prefer pure functions when possible
- **Error handling** - Use Result types instead of throwing errors

### Code Style

We use **ESLint** and **Prettier** for consistent formatting:

```typescript
// Good: Type-safe with proper interfaces
interface MCPServer {
  readonly name: string;
  readonly version: string;
  readonly description: string;
  readonly author: string;
}

const installServer = async (serverName: string): Promise<Result<MCPServer, Error>> => {
  try {
    const server = await fetchServerInfo(serverName);
    return { ok: true, value: server };
  } catch (error) {
    return { ok: false, error: error as Error };
  }
};

// Bad: Using any type
const installServer = async (serverName: any): Promise<any> => {
  // Don't do this
};
```

### File Naming

- **kebab-case** for file names: `config-manager.ts`
- **camelCase** for variables and functions: `configManager`
- **PascalCase** for classes and interfaces: `ConfigManager`
- **UPPER_SNAKE_CASE** for constants: `DEFAULT_REGISTRY_URL`

### Directory Structure

- **One export per file** when possible
- **Co-locate related files** in the same directory
- **Use index.ts** for directory exports
- **Separate types** into their own files

## 🧪 Testing

### Test Structure

We use **Vitest** for testing with the following structure:

```
test/
├── unit/                    # Unit tests
│   ├── commands/            # Command tests
│   ├── config/              # Configuration tests
│   └── utils/               # Utility tests
├── integration/             # Integration tests
│   ├── cli/                 # CLI integration tests
│   └── registry/            # Registry integration tests
├── e2e/                     # End-to-end tests
└── fixtures/                # Test fixtures and data
```

### Writing Tests

```typescript
import { describe, it, expect, vi } from 'vitest';
import { installCommand } from '@nvmcp/store';

describe('install command', () => {
  it('should install MCP server successfully', async () => {
    // Arrange
    const mockServer = {
      name: 'filesystem',
      version: '1.0.0',
      description: 'File system MCP server'
    };
    const mockFetch = vi.fn().mockResolvedValue(mockServer);

    // Act
    const result = await installCommand('filesystem', { force: false });

    // Assert
    expect(result.ok).toBe(true);
    expect(result.value).toEqual(mockServer);
  });

  it('should handle installation errors gracefully', async () => {
    // Arrange
    const mockError = new Error('Network error');
    const mockFetch = vi.fn().mockRejectedValue(mockError);

    // Act
    const result = await installCommand('invalid-server', { force: false });

    // Assert
    expect(result.ok).toBe(false);
    expect(result.error.message).toBe('Network error');
  });
});
```

### Test Coverage

- **Maintain >90% test coverage** for new code
- **Unit tests** for all business logic
- **Integration tests** for CLI commands
- **E2E tests** for critical user flows

### Running Tests

```bash
# Run all tests
npm test

# Run specific test suites
npm run test:unit
npm run test:integration
npm run test:e2e

# Watch mode for development
npm run test:watch

# Coverage report
npm run test:coverage

# Run tests for specific files
npm test -- config-manager
```

## 📚 Documentation

### Types of Documentation

1. **Code Documentation** - JSDoc comments for functions and classes
2. **CLI Reference** - Complete command documentation
3. **User Guides** - How-to guides and tutorials
4. **API Documentation** - TypeScript API reference
5. **Architecture Docs** - System design and patterns

### Writing Documentation

```typescript
/**
 * Installs an MCP server from the registry
 * 
 * @param serverName - Name of the MCP server to install
 * @param options - Installation options
 * @returns Promise resolving to installation result
 * 
 * @example
 * ```typescript
 * const result = await installServer('filesystem', { force: true });
 * if (result.ok) {
 *   console.log(`Installed ${result.value.name}`);
 * }
 * ```
 */
const installServer = async (
  serverName: string,
  options: InstallOptions
): Promise<Result<MCPServer, Error>> => {
  // Implementation
};
```

### Documentation Guidelines

- **Keep it concise** but comprehensive
- **Include examples** for complex features
- **Update docs** with code changes
- **Use proper markdown** formatting
- **Link between related** docs

## 🔄 Pull Request Process

### Before Submitting

- [ ] **Code compiles** without errors
- [ ] **All tests pass** (`npm test`)
- [ ] **Linting passes** (`npm run lint`)
- [ ] **Documentation updated** if needed
- [ ] **Conventional commits** used

### PR Template

When creating a pull request, include:

```markdown
## 🎯 What does this PR do?

Brief description of the changes.

## 🧪 How to test

Steps to test the changes:

1. ...
2. ...

## 📋 Checklist

- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] Breaking changes documented
- [ ] Follows coding standards

## 🔗 Related Issues

Closes #123
Fixes #456
```

### Review Process

1. **Automated checks** must pass
2. **At least one review** from maintainers
3. **No merge conflicts** with main branch
4. **All conversations resolved**

### Merge Strategy

- **Squash and merge** for feature branches
- **Rebase and merge** for simple fixes
- **No merge commits** in main branch

## 👥 Community Guidelines

### Code of Conduct

- **Be respectful** and inclusive
- **Help newcomers** get started
- **Give constructive feedback**
- **Assume good intentions**

### Communication

- **GitHub Issues** - Bug reports and feature requests
- **GitHub Discussions** - General questions and ideas
- **Discord** - Real-time community chat
- **Pull Requests** - Code review and collaboration

### Recognition

We recognize contributors through:

- **Contributor list** in README
- **Release notes** mentions
- **Community highlights**
- **Maintainer nominations**

## 🎯 Areas for Contribution

### High Priority

- **🔍 Discovery Engine** - Improve AI-powered MCP discovery
- **🔌 Integrations** - Add support for more editors (VS Code, JetBrains)
- **📦 Registry System** - Enhance caching and fallback mechanisms
- **🧪 Testing** - Increase test coverage and add E2E tests

### Medium Priority

- **🛠️ Plugin System** - Build plugins for common workflows
- **📖 Documentation** - Improve guides and examples
- **🎨 CLI UX** - Enhance user interface and experience
- **⚡ Performance** - Optimize command execution speed

### Beginner Friendly

- **📝 Documentation fixes** - Typos, clarity, examples
- **🐛 Bug fixes** - Small, well-defined issues
- **🧪 Test cases** - Add missing test coverage
- **🎨 UI improvements** - Better error messages, help text

## 🆘 Getting Help

### Before Asking

1. **Check existing documentation**
2. **Search GitHub issues**
3. **Review pull requests**

### Where to Ask

- **GitHub Issues** - Bug reports, feature requests
- **GitHub Discussions** - General questions
- **Discord** - Real-time help and community
- **Stack Overflow** - Tag with `nvmcp-cli`

### Providing Information

When asking for help, include:

- **NVMCP CLI version** (`nvmcp --version`)
- **Node.js version** (`node --version`)
- **Operating system**
- **Full error messages**
- **Steps to reproduce**

## 📄 License

By contributing to NVMCP CLI, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for contributing to π NVMCP CLI!** 🎉

Your contributions help make MCP management better for everyone in the community. 