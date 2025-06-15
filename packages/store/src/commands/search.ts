/**
 * Search command module
 * @fileoverview Main search command configuration for store package
 * @author NVMCP Contributors
 * @since 0.1.0
 */

import type { CommandModule } from 'yargs';
import { buildSearchCommand } from './search-builder.js';
import { handleSearchCommand } from './search-handler.js';

/**
 * Search command module for yargs
 */
export const searchCommand: CommandModule = {
  command: 'search <query>',
  aliases: ['s'],
  describe: 'Search for MCP servers',
  builder: buildSearchCommand,
  handler: handleSearchCommand,
};

/**
 * Command metadata
 */
export const searchCommandMeta = {
  name: 'search',
  version: '0.1.0-alpha',
  package: '@nvmcp/store',
} as const; 