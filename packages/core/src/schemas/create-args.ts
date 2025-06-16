/**
 * π NVMCP Create command arguments schema
 * @fileoverview Validation schema for create command arguments
 * @author π NVMCP Contributors
 * @since 0.1.0
 */

import { z } from 'zod';

/**
 * Create command arguments validation schema
 */
export const CreateArgsSchema = z.object({
  name: z.string().min(1),
  template: z.enum(['basic', 'full', 'minimal', 'custom']).default('basic'),
  author: z.string().optional(),
  description: z.string().optional(),
  license: z.string().default('MIT'),
  repository: z.string().url().optional(),
  skipGit: z.boolean().default(false),
  skipInstall: z.boolean().default(false),
  verbose: z.boolean().default(false),
  quiet: z.boolean().default(false),
});

/**
 * Inferred TypeScript type for create command arguments
 */
export type CreateArgs = z.infer<typeof CreateArgsSchema>; 