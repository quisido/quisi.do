import DEFAULT_CONFIG, {
  defineConfig,
  INLINE_CONFIG,
  PLUGIN_OPTIONS,
  type UserConfig,
} from '@quisido/vitest-config';
import react from '@vitejs/plugin-react';

const CONFIG: UserConfig = defineConfig({
  ...DEFAULT_CONFIG,
  plugins: [...PLUGIN_OPTIONS, react()],
  test: {
    ...INLINE_CONFIG,
    environment: 'happy-dom',
  },
});

export default CONFIG;
