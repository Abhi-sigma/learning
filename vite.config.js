import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs';

const certPath = "./server.crt";
const keyPath = "./server.key";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host:true,
    https: {
      key:fs.readFileSync(keyPath),
      cert: fs.readFileSync(certPath),
    }},
  plugins: [react()]
})
