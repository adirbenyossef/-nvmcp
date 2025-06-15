/**
 * Search command arguments schema
 * @fileoverview Validation schema for search command in store package
 * @author NVMCP Contributors
 * @since 0.1.0
 */

import { z } from 'zod';

/**
 * Search command arguments validation schema
 */
export const SearchArgsSchema = z.object({
  query: z.string().min(1),
  limit: z.number().min(1).max(50).default(10),
  category: z.string().optional(),
  language: z.string().optional(),
  featured: z.boolean().default(false),
  verified: z.boolean().default(false),
});

/**
 * Search result item schema
 */
export const SearchResultSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  category: z.string().optional(),
  language: z.string().optional(),
  quality_score: z.number().optional(),
  featured: z.boolean().default(false),
  verified: z.boolean().default(false),
  repository_url: z.string().url().optional(),
});

/**
 * Inferred TypeScript types
 */
export type SearchArgs = z.infer<typeof SearchArgsSchema>;
export type SearchResult = z.infer<typeof SearchResultSchema>; 