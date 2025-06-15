/**
 * NVMCP Core Schemas
 * @fileoverview Central export for all core validation schemas
 * @author NVMCP Contributors
 * @since 0.1.0
 */

// Registry schemas
export * from './registry.js';
export * from './registry-config.js';

// Workspace schemas
export * from './workspace.js';

// Template schemas  
export * from './template.js';

// Plugin schemas
export * from './plugin.js';

// Command argument schemas
export * from './create-args.js';
export * from './config-args.js';
export * from './config-sub-args.js';

// IDE Integration schemas
export * from './cursor-integration.js';

// MCP Protocol schemas
export * from './mcp-protocol.js';
export * from './mcp-requirements.js';

// Legacy compatibility
export const version = '0.1.0-alpha';
export const name = '@nvmcp/core/schemas'; 