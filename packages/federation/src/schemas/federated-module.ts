/**
 * @fileoverview Federated Module schemas
 * @description Core schemas for federated modules and V-Mog registry
 */

import { z } from 'zod';

/**
 * Core federated module schema
 */
export const FederatedModuleSchema = z.object({
  name: z.string(),
  version: z.string(),
  namespace: z.string(),
  commitHash: z.string(),
  dependencies: z.record(z.string()),
  entryPoints: z.record(z.object({
    path: z.string(),
    hash: z.string(),
    signature: z.string(),
  })),
  fallbackStrategies: z.array(z.object({
    type: z.enum(['version', 'registry', 'implementation', 'graceful']),
    priority: z.number(),
    conditions: z.array(z.unknown()),
    action: z.unknown(),
  })),
  runtimeRequirements: z.array(z.unknown()),
  federationConfig: z.object({
    shared: z.array(z.unknown()),
    remotes: z.array(z.unknown()),
    exposes: z.array(z.unknown()),
    singleton: z.boolean(),
    eager: z.boolean(),
    requiredVersion: z.string(),
  }),
  artifacts: z.object({
    bucket: z.string(),
    key: z.string(),
    region: z.string(),
  }),
  dependents: z.array(z.object({
    name: z.string(),
    version: z.string(),
    namespace: z.string(),
  })),
  requirementsHash: z.string(),
});

export type FederatedModule = z.infer<typeof FederatedModuleSchema>; 