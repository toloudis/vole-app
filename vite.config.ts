import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
  const isDev = mode === 'development';
  const version = process.env.npm_package_version || '2.15.0';

  return {
    plugins: [react()],
    root: 'public',
    base: '/',
    server: {
      port: 5177,
      open: true,
    },
    build: {
      outDir: '../imageviewer',
      emptyOutDir: true,
      sourcemap: isDev,
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    define: {
      'VOLEAPP_BUILD_ENVIRONMENT': JSON.stringify(isDev ? 'development' : 'production'),
      'VOLEAPP_VERSION': JSON.stringify(version),
      'VOLEAPP_BASENAME': JSON.stringify('/'),
      'VOLECORE_VERSION': JSON.stringify('4.5.0'),
    },
  };
});
