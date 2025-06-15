/**
 * Config subcommand arguments schemas
 * @fileoverview Additional validation schemas for config subcommands
 * @author NVMCP Contributors
 * @since 0.1.0
 */

import { z } from 'zod';
import { ConfigCommandArgsSchema } from './config-args.js';

/**
 * Config get arguments schema
 */
export const ConfigGetArgsSchema = ConfigCommandArgsSchema.extend({
  key: z.string().min(1),
});

/**
 * Config init arguments schema
 */
export const ConfigInitArgsSchema = ConfigCommandArgsSchema.extend({
  name: z.string().optional(),
  force: z.boolean().default(false),
});

/**
 * Config lock arguments schema
 */
export const ConfigLockArgsSchema = ConfigCommandArgsSchema.extend({
  generate: z.boolean().default(false),
  install: z.boolean().default(false),
  file: z.string().optional(),
  upload: z.string().optional(),
  download: z.string().optional(),
});

/**
 * TypeScript types inferred from schemas
 */
export type ConfigGetArgs = z.infer<typeof ConfigGetArgsSchema>;
export type ConfigInitArgs = z.infer<typeof ConfigInitArgsSchema>;
export type ConfigLockArgs = z.infer<typeof ConfigLockArgsSchema>; 