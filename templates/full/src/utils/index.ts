// Utilities for {{name}}

/**
 * Logger utility
 */
export class Logger {
  private prefix: string

  constructor(prefix = '{{name}}') {
    this.prefix = prefix
  }

  public info(message: string, ...args: unknown[]): void {
    console.log(`[${this.prefix}] ℹ️  ${message}`, ...args)
  }

  public warn(message: string, ...args: unknown[]): void {
    console.warn(`[${this.prefix}] ⚠️  ${message}`, ...args)
  }

  public error(message: string, ...args: unknown[]): void {
    console.error(`[${this.prefix}] ❌ ${message}`, ...args)
  }

  public debug(message: string, ...args: unknown[]): void {
    if (process.env.DEBUG) {
      console.debug(`[${this.prefix}] 🐛 ${message}`, ...args)
    }
  }

  public success(message: string, ...args: unknown[]): void {
    console.log(`[${this.prefix}] ✅ ${message}`, ...args)
  }
}

/**
 * Configuration utility
 */
export class ConfigManager {
  private config: Record<string, unknown> = {}

  public set(key: string, value: unknown): void {
    this.config[key] = value
  }

  public get<T = unknown>(key: string, defaultValue?: T): T {
    return (this.config[key] as T) ?? defaultValue!
  }

  public has(key: string): boolean {
    return key in this.config
  }

  public delete(key: string): void {
    delete this.config[key]
  }

  public clear(): void {
    this.config = {}
  }

  public getAll(): Record<string, unknown> {
    return { ...this.config }
  }
}

/**
 * Event emitter utility
 */
export class EventEmitter {
  private events: Map<string, Array<(...args: unknown[]) => void>> = new Map()

  public on(event: string, listener: (...args: unknown[]) => void): void {
    if (!this.events.has(event)) {
      this.events.set(event, [])
    }
    this.events.get(event)!.push(listener)
  }

  public off(event: string, listener: (...args: unknown[]) => void): void {
    const listeners = this.events.get(event)
    if (listeners) {
      const index = listeners.indexOf(listener)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }

  public emit(event: string, ...args: unknown[]): void {
    const listeners = this.events.get(event)
    if (listeners) {
      listeners.forEach(listener => listener(...args))
    }
  }

  public once(event: string, listener: (...args: unknown[]) => void): void {
    const onceListener = (...args: unknown[]) => {
      listener(...args)
      this.off(event, onceListener)
    }
    this.on(event, onceListener)
  }
}

/**
 * Validation utilities
 */
export class Validator {
  public static isString(value: unknown): value is string {
    return typeof value === 'string'
  }

  public static isNumber(value: unknown): value is number {
    return typeof value === 'number' && !isNaN(value)
  }

  public static isBoolean(value: unknown): value is boolean {
    return typeof value === 'boolean'
  }

  public static isObject(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null && !Array.isArray(value)
  }

  public static isArray(value: unknown): value is unknown[] {
    return Array.isArray(value)
  }

  public static isFunction(value: unknown): value is Function {
    return typeof value === 'function'
  }

  public static isUrl(value: string): boolean {
    try {
      new URL(value)
      return true
    } catch {
      return false
    }
  }

  public static isEmail(value: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(value)
  }
}

/**
 * Async utilities
 */
export class AsyncUtils {
  public static async delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  public static async timeout<T>(promise: Promise<T>, ms: number): Promise<T> {
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error(`Operation timed out after ${ms}ms`)), ms)
    )
    return Promise.race([promise, timeoutPromise])
  }

  public static async retry<T>(
    fn: () => Promise<T>,
    maxAttempts = 3,
    delayMs = 1000
  ): Promise<T> {
    let lastError: Error

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        return await fn()
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error))
        
        if (attempt === maxAttempts) {
          throw lastError
        }
        
        await this.delay(delayMs * attempt)
      }
    }

    throw lastError!
  }
}

/**
 * String utilities
 */
export class StringUtils {
  public static capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
  }

  public static camelCase(str: string): string {
    return str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
        index === 0 ? word.toLowerCase() : word.toUpperCase()
      )
      .replace(/\s+/g, '')
  }

  public static kebabCase(str: string): string {
    return str
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .replace(/\s+/g, '-')
      .toLowerCase()
  }

  public static snakeCase(str: string): string {
    return str
      .replace(/([a-z])([A-Z])/g, '$1_$2')
      .replace(/\s+/g, '_')
      .toLowerCase()
  }

  public static truncate(str: string, length: number, suffix = '...'): string {
    if (str.length <= length) return str
    return str.slice(0, length - suffix.length) + suffix
  }
}

// Create default instances
export const logger = new Logger()
export const config = new ConfigManager()
export const events = new EventEmitter()

// Default export
export default {
  Logger,
  ConfigManager,
  EventEmitter,
  Validator,
  AsyncUtils,
  StringUtils,
  logger,
  config,
  events
} 