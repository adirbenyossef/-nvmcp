import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { execSync } from 'child_process'
import fs from 'fs-extra'
import path from 'path'

const CLI_PATH = path.join(__dirname, '../bin/nvmcp.js')
const TEST_DIR = path.join(__dirname, 'temp')

describe.skip('nvmcp CLI', () => {
  beforeEach(async () => {
    await fs.ensureDir(TEST_DIR)
  })

  afterEach(async () => {
    await fs.remove(TEST_DIR)
  })

  describe('Basic CLI Operations', () => {
    it('should show help when no command provided', () => {
      try {
        execSync(`node ${CLI_PATH}`, { 
          encoding: 'utf-8',
          cwd: TEST_DIR 
        })
      } catch (error: any) {
        const output = error.stderr || error.stdout
        expect(output).toContain('nvmcp <command> [options]')
        expect(output).toContain('create')
        expect(output).toContain('add')
        expect(output).toContain('doctor')
        expect(output).toContain('plugins')
        expect(output).toContain('You must specify a command')
      }
    })

    it('should show version information', () => {
      const result = execSync(`node ${CLI_PATH} --version`, { 
        encoding: 'utf-8',
        cwd: TEST_DIR 
      }).toString()
      
      expect(result).toContain('0.1.0')
    })

    it('should show help with --help flag', () => {
      const result = execSync(`node ${CLI_PATH} --help`, { 
        encoding: 'utf-8',
        cwd: TEST_DIR 
      }).toString()
      
      expect(result).toContain('Create a new MCP workspace')
      expect(result).toContain('Add an MCP package')
      expect(result).toContain('Run system diagnostics')
      expect(result).toContain('For more information, visit https://nvmcp.dev/docs')
    })
  })

  describe('Create Command', () => {
    it('should execute create command with basic template', () => {
      const result = execSync(`node ${CLI_PATH} create test-workspace`, { 
        encoding: 'utf-8',
        cwd: TEST_DIR 
      }).toString()
      
      expect(result).toContain('Creating MCP workspace: test-workspace')
      expect(result).toContain('Using template: basic')
      expect(result).toContain('created successfully')
    })

    it('should execute create command with custom template', () => {
      const result = execSync(`node ${CLI_PATH} create test-app --template full`, { 
        encoding: 'utf-8',
        cwd: TEST_DIR 
      }).toString()
      
      expect(result).toContain('Creating MCP workspace: test-app')
      expect(result).toContain('Using template: full')
    })

    it('should show create command help', () => {
      const result = execSync(`node ${CLI_PATH} create --help`, { 
        encoding: 'utf-8',
        cwd: TEST_DIR 
      }).toString()
      
      expect(result).toContain('Create a new MCP workspace')
      expect(result).toContain('--template')
      expect(result).toContain('basic')
      expect(result).toContain('full')
      expect(result).toContain('minimal')
    })
  })

  describe('Performance Tests', () => {
    it('should start CLI in under 500ms', () => {
      const start = performance.now()
      
      execSync(`node ${CLI_PATH} --help`, { 
        encoding: 'utf-8',
        cwd: TEST_DIR 
      })
      
      const duration = performance.now() - start
      expect(duration).toBeLessThan(500)
    })
  })

  describe('Error Handling', () => {
    it('should handle invalid commands gracefully', () => {
      try {
        execSync(`node ${CLI_PATH} invalid-command`, { 
          encoding: 'utf-8',
          cwd: TEST_DIR 
        })
      } catch (error: any) {
        expect(error.stderr || error.stdout).toContain('Unknown argument')
      }
    })

    it('should handle missing required arguments', () => {
      try {
        execSync(`node ${CLI_PATH} create`, { 
          encoding: 'utf-8',
          cwd: TEST_DIR 
        })
      } catch (error: any) {
        expect(error.stderr || error.stdout).toContain('Not enough non-option arguments')
      }
    })
  })
}) 