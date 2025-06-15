/**
 * Federate subcommand arguments schemas
 * @fileoverview Additional validation schemas for federation subcommands
 * @author NVMCP Contributors
 * @since 0.1.0
 */

import { z } from 'zod';
import { FederateCommandArgsSchema } from './federate-args.js';

/**
 * Federate hot-swap arguments schema
 */
export const FederateHotSwapArgsSchema = FederateCommandArgsSchema.extend({
  module: z.string().min(1),
  targetVersion: z.string().regex(/^\d+\.\d+\.\d+/),
  zeroDowntime: z.boolean().default(true),
  rollbackOnFailure: z.boolean().default(true),
});

/**
 * Federate dependents arguments schema
 */
export const FederateDependentsArgsSchema = FederateCommandArgsSchema.extend({
  module: z.string().min(1),
  format: z.enum(['table', 'json', 'tree']).default('table'),
});

/**
 * Federate snapshot arguments schema
 */
export const FederateSnapshotArgsSchema = FederateCommandArgsSchema.extend({
  environment: z.string().min(1),
  outputPath: z.string().default('./nvmcp-snapshot.json'),
  includeDevDependencies: z.boolean().default(false),
});

/**
 * TypeScript types inferred from schemas
 */
export type FederateHotSwapArgs = z.infer<typeof FederateHotSwapArgsSchema>;
export type FederateDependentsArgs = z.infer<typeof FederateDependentsArgsSchema>;
export type FederateSnapshotArgs = z.infer<typeof FederateSnapshotArgsSchema>; 