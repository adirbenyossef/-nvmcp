/**
 * Search service
 * @fileoverview Service for performing MCP server search operations
 * @author NVMCP Contributors
 * @since 0.1.0
 */

import type { SearchArgs, SearchResult } from '../schemas/search-args.js';

/**
 * Search response from backend API
 */
interface SearchResponse {
  success: boolean;
  data?: SearchResult[];
  error?: string;
}

/**
 * Perform search query against backend API
 * @param args - Search arguments
 * @returns Promise resolving to search results
 */
export async function performSearch(args: SearchArgs): Promise<SearchResult[]> {
  const backendUrl = process.env.NVMCP_BACKEND_URL || 'https://api.nvmcp.com';
  const params = buildSearchParams(args);
  const url = `${backendUrl}/api/federation/awesome-mcps?${params.toString()}`;
  
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }
  
  const result = await response.json() as SearchResponse;
  if (!result.success || !result.data) {
    throw new Error(result.error || 'Search failed');
  }
  
  return result.data;
}

function buildSearchParams(args: SearchArgs): URLSearchParams {
  const params = new URLSearchParams();
  params.append('search', args.query);
  params.append('limit', args.limit.toString());
  return params;
} 