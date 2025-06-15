/**
 * @fileoverview V-Mog Registry schemas
 * @description Schemas for V-Mog registry entries and operations
 */

import { z } from 'zod';

/**
 * V-Mog Registry schema
 */
export const VMogRegistrySchema = z.object({
  namespace: z.string(),
  commitHash: z.string(),
  semanticVersion: z.string(),
  dependencies: z.record(z.string()),
  artifacts: z.object({
    bucket: z.string(),
    key: z.string(),
    region: z.string(),
  }),
});

export type VMogRegistry = z.infer<typeof VMogRegistrySchema>;

/**
 * Enhanced V-Mog Registry Entry schema
 */
export const VMogRegistryEntrySchema = z.object({
  id: z.string(),
  namespace: z.string(),
  name: z.string(),
  version: z.string(),
  commitHash: z.string(),
  publishedAt: z.date(),
  artifacts: z.object({
    bucket: z.string(),
    key: z.string(),
    cdnUrl: z.string(),
  }),
  metadata: z.object({
    buildTime: z.number(),
    nodeVersion: z.string(),
    platform: z.string(),
    arch: z.string(),
  }),
  dependencies: z.array(z.string()),
  consumers: z.array(z.string()),
  status: z.enum(['published', 'deprecated', 'archived']),
});

export type VMogRegistryEntry = z.infer<typeof VMogRegistryEntrySchema>; 