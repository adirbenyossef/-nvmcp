/**
 * 𝝿 NVMCP Logo and Branding
 * @fileoverview ASCII art and branding utilities
 * @author 𝝿 NVMCP Contributors
 * @since 0.1.0
 */

/**
 * Large NVMCP ASCII art logo
 */
export const ASCII_LOGO = `
  ███╗   ██╗██╗   ██╗███╗   ███╗ ██████╗██████╗ 
  ████╗  ██║██║   ██║████╗ ████║██╔════╝██╔══██╗
  ██╔██╗ ██║██║   ██║██╔████╔██║██║     ██████╔╝
  ██║╚██╗██║╚██╗ ██╔╝██║╚██╔╝██║██║     ██╔═══╝ 
  ██║ ╚████║ ╚████╔╝ ██║ ╚═╝ ██║╚██████╗██║     
  ╚═╝  ╚═══╝  ╚═══╝  ╚═╝     ╚═╝ ╚═════╝╚═╝     
                                                
                MCP Workspace Manager
`;

/**
 * Compact 𝝿 NVMCP banner
 */
export const BANNER = `
  ╭─────────────────────────────────╮
  │            𝝿 nvmcp              │
  │      MCP Workspace Manager      │
  ╰─────────────────────────────────╯
`;

/**
 * Mini 𝝿 logo for inline use
 */
export const MINI_LOGO = '𝝿 nvmcp';

/**
 * Version info with 𝝿 branding
 */
export function getVersionInfo(): string {
  return `${MINI_LOGO} v0.1.0-alpha`;
}

/**
 * Welcome message with 𝝿 branding
 */
export function getWelcomeMessage(): string {
  return `Welcome to ${MINI_LOGO} - MCP Workspace Manager for Model Context Protocol! 🚀`;
}

/**
 * Display the full ASCII logo
 */
export function displayLogo(): void {
  console.log(ASCII_LOGO);
}

/**
 * Display the compact banner
 */
export function displayBanner(): void {
  console.log(BANNER);
} 