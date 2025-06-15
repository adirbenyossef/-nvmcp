/**
 * Create command options
 * @fileoverview Additional options configuration for create command
 * @author NVMCP Contributors
 * @since 0.1.0
 */

import type { Argv } from 'yargs';

/**
 * Add metadata and control options to create command
 * @param yargs - Yargs instance
 * @returns Configured yargs instance with options
 */
export function addCreateOptions(yargs: Argv): Argv {
  return yargs
    .option('author', { alias: 'a', describe: 'Author name', type: 'string' })
    .option('description', { alias: 'd', describe: 'Description', type: 'string' })
    .option('license', { alias: 'l', describe: 'License', type: 'string', default: 'MIT' })
    .option('repository', { alias: 'r', describe: 'Repository URL', type: 'string' })
    .option('skip-git', { describe: 'Skip git initialization', type: 'boolean', default: false })
    .option('skip-install', { describe: 'Skip dependency installation', type: 'boolean', default: false })
    .example('$0 create my-workspace', 'Create a basic MCP workspace')
    .example('$0 create my-app --template full', 'Create with full template')
    .example('$0 create my-project --author "John Doe"', 'Create with metadata');
} 
