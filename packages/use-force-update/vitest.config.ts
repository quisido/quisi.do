import DEFAULT_CONFIG, {
  defineConfig,
  INLINE_CONFIG,
  type UserConfig,
} from '@quisido/vitest-config';

const CONFIG: UserConfig = defineConfig({
  ...DEFAULT_CONFIG,
  test: {
    ...INLINE_CONFIG,
    environment: 'jsdom',
  },
});

export default CONFIG;
