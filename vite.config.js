import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path'; // Node.js 런타임이 기본 제공하는 모듈 (파일 경로)
import { env } from 'node:process';

const isDev = env.NODE_ENV;

export default defineConfig({
    base: '/moongirl/',
    plugins: [
      react(),
    ],
    css: {
      devSourcemap: true,
      modules: {
        generateScopedName: isDev
          ? '[name]_[local]__[hash:base64:5]'
          : '[hash:base64:4]',
      },
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
      },
    },
    // 빌드 시, 청크 파일 생성 매뉴얼 구성
    build: {
      outDir: 'build',
      rollupOptions: {
        output: {
          manualChunks: {
            react: ['react', 'react-dom'],
            reactRouter: ['react-router-dom'],
            extra: ['zustand', '@tanstack/react-query'],
          },
        },
      },
    },
    server: {
      // 캐시 무효화를 활성화합니다.
      force: true,
    },
  });