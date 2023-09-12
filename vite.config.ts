import { defineConfig } from 'vite';
import react from "@vitejs/plugin-react";
import {resolve} from "path";

/** @type {import('vite').UserConfig} */
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: [
            {
                find: '@',
                replacement: resolve("./src"),
            },
            {
                find: 'atom-design',
                replacement: resolve("./src/lib"),
            }
        ]
    },
    build: {
        outDir: './out'
    }
});
