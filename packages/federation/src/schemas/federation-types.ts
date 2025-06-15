/**
 * @fileoverview Federation runtime types and errors
 * @description Core types for federation runtime and error handling
 */

import { z } from 'zod';

/**
 * Federation Runtime schema
 */
export const FederationRuntimeSchema = z.object({
  sharedScope: z.record(z.unknown()),
  remotes: z.record(z.string()),
  modules: z.record(z.unknown()),
});

export type FederationRuntime = z.infer<typeof FederationRuntimeSchema>;

/**
 * Federation Error class
 */
export class FederationError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly module?: string,
    public readonly version?: string
  ) {
    super(message);
    this.name = 'FederationError';
  }
}

/**
 * V-Mog Registry Error class
 */
export class VMogRegistryError extends Error {
  constructor(
    message: string,
    public readonly operation: string,
    public readonly namespace?: string
  ) {
    super(message);
    this.name = 'VMogRegistryError';
  }
}

/**
 * Hot Swap Error class
 */
export class HotSwapError extends Error {
  constructor(
    message: string,
    public readonly module: string,
    public readonly fromVersion: string,
    public readonly toVersion: string
  ) {
    super(message);
    this.name = 'HotSwapError';
  }
} 