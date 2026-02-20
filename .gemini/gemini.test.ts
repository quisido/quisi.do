import { describe, expect, it } from 'vitest';
import settings from './settings.json' with { type: 'json' };
import vsCodeMcp from '../.vscode/mcp.json' with { type: 'json' };

describe('.gemini/settings.json', (): void => {
  describe('mcpServers', (): void => {
    it('should match the VS Code MCP servers', (): void => {
      expect(settings.mcpServers).toEqual(vsCodeMcp.servers);
    });
  });
});
