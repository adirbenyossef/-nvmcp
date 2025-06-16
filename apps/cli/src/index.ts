#!/usr/bin/env node

/**
 * π NVMCP CLI - Main Entry Point
 * @fileoverview Main CLI entry point for π NVMCP
 * @description Command-line interface for the π NVMCP toolkit
 * @author π NVMCP Contributors
 * @since 0.1.0-alpha
 */

import { displayBanner, getVersionInfo, getWelcomeMessage } from '@nvmcp/core';

/**
 * Main CLI application function
 */
async function main(): Promise<void> {
  displayBanner();
  console.log('');
  console.log(getWelcomeMessage());
  console.log(getVersionInfo());
  console.log('');
  console.log('🚀 CLI functionality coming soon!');
  console.log('💡 Use π nvmcp --help for more information');
}

// Only run if this is the main module
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((error: unknown) => {
    console.error('CLI Error:', error);
    process.exit(1);
  });
} 