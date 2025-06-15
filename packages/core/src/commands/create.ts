/**
 * Create command module
 * @fileoverview Main create command configuration and export
 * @author NVMCP Contributors
 * @since 0.1.0
 */

import type { CommandModule } from 'yargs';
import { buildCreateCommand } from './create-builder.js';
import { addCreateOptions } from './create-options.js';
import { handleCreateCommand } from './create-handler.js';

/**
 * Create command module for yargs
 */
export const createCommand: CommandModule = {
  command: 'create <name>',
  describe: 'Create a new MCP workspace',
  builder: (yargs) => addCreateOptions(buildCreateCommand(yargs)),
  handler: handleCreateCommand,
};

/**
 * Command metadata
 */
export const createCommandMeta = {
  name: 'create',
  version: '0.1.0-alpha',
} as const; 