import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// https://vite.dev/config/
export default ({ mode }) => {
  const env = loadEnv(mode, __dirname, '')
  
  return defineConfig({
    plugins: [
      react(),
      tailwindcss(),
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        '@styles': resolve(__dirname, 'src/styles'),
        '@pages': resolve(__dirname, 'src/pages'),
        '@images': resolve(__dirname, 'src/images'),
        '@components': resolve(__dirname, 'src/components'),
        '@common': resolve(__dirname, 'src/components/common'),
        '@layout': resolve(__dirname, 'src/components/layout'),
        '@routes': resolve(__dirname, 'src/components/routes'),
        '@home': resolve(__dirname, 'src/components/home'),
        '@properties': resolve(__dirname, 'src/components/properties'),
        '@adds': resolve(__dirname, 'src/components/adds'),
        '@settings': resolve(__dirname, 'src/components/settings'),
        '@hooks': resolve(__dirname, 'src/hooks'),
        '@contexts': resolve(__dirname, 'src/contexts'),
        '@constants': resolve(__dirname, 'src/constants'),
        '@services': resolve(__dirname, 'src/services'),
        '@utils': resolve(__dirname, 'src/utils'),
      },
    },
    server: {
      proxy: {
        '/api': {
          target: env.VITE_API_URL,
          changeOrigin: true,
          secure: false,
          rewrite: path => path.replace(/^\/api/, ''),
        },
      },
    },
  })
}