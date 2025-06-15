/**
 * Federate command arguments schemas
 * @fileoverview Validation schemas for federation command arguments
 * @author NVMCP Contributors
 * @since 0.1.0
 */

import { z } from 'zod';

/**
 * Base federate command arguments schema
 */
export const FederateCommandArgsSchema = z.object({
  verbose: z.boolean().default(false),
  quiet: z.boolean().default(false),
});

/**
 * Federate publish arguments schema
 */
export const FederatePublishArgsSchema = FederateCommandArgsSchema.extend({
  commitHash: z.string().min(1),
  semanticVersion: z.string().regex(/^\d+\.\d+\.\d+/),
  namespace: z.string().default('@team'),
  registry: z.string().url().optional(),
});

/**
 * Federate consume arguments schema
 */
export const FederateConsumeArgsSchema = FederateCommandArgsSchema.extend({
  module: z.string().min(1),
  moduleVersion: z.string().default('latest'),
  configureOnce: z.boolean().default(false),
  fallback: z.string().optional(),
}); 