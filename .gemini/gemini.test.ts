import { describe, expect, it } from 'vitest';
import { mcpServers as geminiMcpServers } from './settings.json' with { type: 'json' };
import { servers as vsCodeMcpServers } from '../.vscode/mcp.json' with { type: 'json' };

describe('.gemini/settings.json', (): void => {
  describe('mcpServers', (): void => {
    it('should match the VS Code MCP servers', (): void => {
      expect(geminiMcpServers).toEqual(vsCodeMcpServers);
    });
  });
});
