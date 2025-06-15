/**
 * @fileoverview NVMCP Configuration Manager
* @description Main configuration manager for .nvmcp files
 */

import { readFile, writeFile, mkdir, access } from 'fs/promises';
import { join } from 'path';
import { NVMCPConfig, NVMCPConfigSchema } from './nvmcp-config-schemas.js';
import { NVMCPLock, NVMCPLockSchema } from './nvmcp-lock-schemas.js';
import { ConfigEntry } from './nvmcp-config-types.js';
import { MCPServerConfig } from './mcp-server-config.js';
import { ui } from './ui-simple.js';

/**
 * .nvmcp configuration manager
 */
export class NVMCPConfigManager {
  private configPath: string;
  private lockPath: string;
  private config: NVMCPConfig | null = null;

  constructor(projectRoot?: string) {
    const root = projectRoot || process.cwd();
    this.configPath = join(root, '.nvmcp', 'config.json');
    this.lockPath = join(root, '.nvmcp.lock');
  }

  /**
   * Initialize .nvmcp configuration
   */
  async init(projectName?: string): Promise<void> {
    ui.startTask('init', 'Initializing .nvmcp configuration');

    const configDir = join(process.cwd(), '.nvmcp');
    
    try {
      await mkdir(configDir, { recursive: true });
    } catch {
      // Directory might already exist
    }

    const config: NVMCPConfig = {
      version: '1.0.0',
      project_name: projectName || 'nvmcp-project',
      project_id: this.generateProjectId(),
      config_entries: {},
      mcp_servers: {},
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    await this.saveConfig(config);
    this.config = config;

    ui.completeTask('init', '✅ .nvmcp configuration initialized');
    ui.info('Location', this.configPath);
    ui.info('Project ID', config.project_id);
  }

  /**
   * Load existing configuration
   */
  async load(): Promise<NVMCPConfig> {
    if (this.config) return this.config;

    try {
      const configData = await readFile(this.configPath, 'utf8');
      const parsed = JSON.parse(configData);
      this.config = NVMCPConfigSchema.parse(parsed);
      return this.config;
    } catch (error) {
      throw new Error(`Failed to load .nvmcp config: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Check if .nvmcp is initialized
   */
  async isInitialized(): Promise<boolean> {
    try {
      await access(this.configPath);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Set configuration value
   */
  async setConfig(
    key: string, 
    value: string, 
    type: 'secret' | 'config' | 'path' | 'url' = 'config',
    description?: string,
    mcpServers: string[] = []
  ): Promise<void> {
    const config = await this.load();

    config.config_entries[key] = {
      key,
      value,
      type,
      description,
      mcp_servers: mcpServers,
      created_at: config.config_entries[key]?.created_at || new Date().toISOString(),
      updated_at: new Date().toISOString(),
      encrypted: type === 'secret',
    };

    config.updated_at = new Date().toISOString();
    await this.saveConfig(config);

    ui.success('Configuration Updated', `${key} = ${type === 'secret' ? '[HIDDEN]' : value}`);
  }

  /**
   * Get configuration value
   */
  async getConfig(key: string): Promise<string | undefined> {
    const config = await this.load();
    return config.config_entries[key]?.value;
  }

  /**
   * Generate unique project ID
   */
  private generateProjectId(): string {
    return `nvmcp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Save configuration to file
   */
  private async saveConfig(config: NVMCPConfig): Promise<void> {
    this.config = config;
    await writeFile(this.configPath, JSON.stringify(config, null, 2));
  }
} 