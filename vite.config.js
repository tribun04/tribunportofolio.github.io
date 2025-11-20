import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/tribunportofolio.github.io/', // <-- set to "/" for username.github.io, or "/repo-name/" for project site
  plugins: [react()],
})
