/**
 * NVMCP Store Schemas
 * @fileoverview Central export for all store validation schemas
 * @author NVMCP Contributors
 * @since 0.1.0
 */

// Search schemas
export * from './search-args.js';

// Registry schemas
export * from './registry-args.js';

// Legacy compatibility
export const version = '0.1.0-alpha';
export const name = '@nvmcp/store/schemas'; 