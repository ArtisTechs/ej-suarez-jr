import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1]
const defaultProductionBase = process.env.GITHUB_ACTIONS === 'true' && repositoryName ? `/${repositoryName}/` : '/'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  base: process.env.VITE_BASE_PATH ?? (command === 'build' ? defaultProductionBase : '/'),
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
}))
