import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig(({ mode }) => {
  const isDev = mode === 'development';
  const version = process.env.npm_package_version || '2.15.0';

  return {
    plugins: [
      react(),
      svgr({
        svgrOptions: {
          exportType: 'default',
          ref: true,
          svgo: false,
          titleProp: true,
        },
        include: '**/*.svg',
      }),
    ],
    root: 'public',
    base: './',
    server: {
      port: 5177,
      open: true,
    },
    build: {
      outDir: '../imageviewer',
      emptyOutDir: true,
      sourcemap: isDev,
      rollupOptions: {
        external: ['@zarrita/storage'],
        output: {
          manualChunks: undefined,
          assetFileNames: 'assets/[name]-[hash][extname]',
        },
      },
    },
    worker: {
      format: 'es',
      rollupOptions: {
        output: {
          format: 'es',
        },
      },
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        'nouislider/distribute/nouislider.css': resolve(__dirname, '../../node_modules/nouislider/dist/nouislider.css'),
        'react': resolve(__dirname, '../../node_modules/react'),
        'react-dom': resolve(__dirname, '../../node_modules/react-dom'),
      },
      preserveSymlinks: true,
      dedupe: ['react', 'react-dom'],
    },
    css: {
      preprocessorOptions: {},
    },
    define: {
      'VOLEAPP_BUILD_ENVIRONMENT': JSON.stringify(isDev ? 'development' : 'production'),
      'VOLEAPP_VERSION': JSON.stringify(version),
      'VOLEAPP_BASENAME': JSON.stringify('/'),
      'VOLECORE_VERSION': JSON.stringify('4.5.0'),
    },
  };
});
