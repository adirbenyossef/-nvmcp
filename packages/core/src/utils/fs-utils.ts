/**
 * @fileoverview File system utilities for core package
 * @description Simple fs utilities to replace fs-extra functionality
 */

import { promises as fs } from 'fs';

/**
 * Check if a path exists
 */
export async function pathExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

/**
 * Read and parse JSON file
 */
export async function readJson(filePath: string): Promise<unknown> {
  const content = await fs.readFile(filePath, 'utf8');
  return JSON.parse(content);
}

/**
 * Write JSON file with formatting
 */
export async function writeJson(
  filePath: string, 
  data: unknown, 
  options?: { spaces?: number }
): Promise<void> {
  const content = JSON.stringify(data, null, options?.spaces || 2);
  await fs.writeFile(filePath, content, 'utf8');
}

/**
 * Write text file
 */
export async function writeFile(filePath: string, content: string): Promise<void> {
  await fs.writeFile(filePath, content, 'utf8');
}

/**
 * Ensure directory exists (create if needed)
 */
export async function ensureDir(dirPath: string): Promise<void> {
  try {
    await fs.mkdir(dirPath, { recursive: true });
  } catch (error) {
    if (error instanceof Error && 'code' in error && error.code !== 'EEXIST') {
      throw error;
    }
  }
}

// Re-export fs.promises for convenience
export { fs }; 