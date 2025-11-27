import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Set base path for GitLab Pages deployment
  // For GitLab Pages, the URL is: https://username.gitlab.io/projectname/
  base: process.env.GITLAB_CI ? '/expiryguard/' : '/',
})
