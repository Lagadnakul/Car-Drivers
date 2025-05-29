import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create a function to handle environment variables
const getEnvVars = (mode) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    'process.env': Object.keys(env).reduce((prev, key) => {
      prev[key] = JSON.stringify(env[key]);
      return prev;
    }, {})
  };
};

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  
  define: getEnvVars(mode),
  
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@components': path.resolve(__dirname, './src/components'),
      '@constants': path.resolve(__dirname, './src/constants'),
      '@services': path.resolve(__dirname, './src/services'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@utils': path.resolve(__dirname, './src/utils')
    }
  },

  server: {
    port: 5173,
    open: true,
    host: true,
    watch: {
      usePolling: true
    },
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
        secure: false,
        ws: true
      }
    }
  },

  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: mode === 'development',
    minify: 'terser',
    rollupOptions: {
      output: {
        assetFileNames: ({ name }) => {
          const ext = path.extname(name).slice(1);
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return 'assets/images/[name]-[hash][extname]';
          }
          return 'assets/[ext]/[name]-[hash][extname]';
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['react-icons', 'framer-motion'],
          utils: ['axios', 'jwt-decode']
        }
      }
    }
  },

  css: {
    modules: {
      localsConvention: 'camelCase',
      generateScopedName: '[name]__[local]__[hash:base64:5]'
    },
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/assets/styles/variables.scss";`
      }
    },
    devSourcemap: true
  },

  optimizeDeps: {
    include: [
      'react', 
      'react-dom', 
      'react-router-dom',
      'axios',
      'react-icons',
      'framer-motion',
      'jwt-decode'
    ]
  },

  envPrefix: 'VITE_',
  
  esbuild: {
    target: 'esnext',
    supported: {
      'top-level-await': true
    }
  },

  preview: {
    port: 5173,
    host: true
  }
}));