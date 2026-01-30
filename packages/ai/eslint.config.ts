import configs, { defineConfig } from '@quisido/eslint-config';
import { type Config } from 'eslint/config';

const CONFIG: readonly Config[] = defineConfig(...configs);

export default CONFIG;
