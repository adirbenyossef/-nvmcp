/**
 * Search command handler
 * @fileoverview Handler logic for search command execution
 * @author NVMCP Contributors
 * @since 0.1.0
 */

import { SearchArgsSchema, type SearchArgs } from '../schemas/search-args.js';
import { performSearch } from './search-service.js';

/**
 * Handle search command execution
 * @param argv - Command arguments
 * @returns Promise resolving when command completes
 */
export async function handleSearchCommand(argv: unknown): Promise<void> {
  const args = SearchArgsSchema.parse(argv);
  
  try {
    await executeSearch(args);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`Search failed: ${message}`);
    process.exit(1);
  }
}

async function executeSearch(args: SearchArgs): Promise<void> {
  console.log(`Searching for "${args.query}" (limit: ${args.limit})`);
  const results = await performSearch(args);
  console.log(`Found ${results.length} results`);
} 