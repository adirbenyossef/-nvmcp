/**
 * Workspace configuration schema
 * @fileoverview Defines validation schemas for NVMCP workspace configuration
 * @author NVMCP Contributors
 * @since 0.1.0
 */

import { z } from 'zod';

/**
 * Workspace engines configuration schema
 */
export const WorkspaceEnginesSchema = z.object({
  node: z.string().default('>=18.0.0'),
  npm: z.string().optional(),
});

/**
 * Main workspace configuration schema
 */
export const WorkspaceConfigSchema = z.object({
  name: z.string(),
  version: z.string(),
  description: z.string().optional(),
  author: z.string().optional(),
  license: z.string().default('MIT'),
  repository: z.string().url().optional(),
  homepage: z.string().url().optional(),
  keywords: z.array(z.string()).default([]),
  engines: WorkspaceEnginesSchema.optional(),
  scripts: z.record(z.string()).optional(),
  dependencies: z.record(z.string()).default({}),
  devDependencies: z.record(z.string()).default({}),
  mcpPackages: z.record(z.string()).default({}),
}); 