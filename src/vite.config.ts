import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import federation from "@originjs/vite-plugin-federation";
import { dependencies } from "./package.json";
import { readFileSync } from "fs";

const manifest: Record<string, string> = JSON.parse(
  readFileSync("./public/manifest.json", "utf-8"),
);

const mfRemotes = [{ service: "system_design", port: 6001 }];

const buildProxyConfig = () =>
  Object.fromEntries(
    mfRemotes.map(({ service, port }) => [
      `/microfrontends/${service}`,
      {
        target: `http://${service}:${port}`,
        rewrite: (p: string) => p.replace(`/microfrontends/${service}`, ""),
      },
    ]),
  );

export default defineConfig(({ command }) => ({
  plugins: [
    react({
      jsxRuntime: "automatic",
    }),
    federation({
      name: "login_frontend",
      filename: "remoteEntry.js",
      remotes: Object.fromEntries(
        Object.entries(manifest).map(([name, path]) => [name, path]),
      ),
      exposes: {
        "./Login": "./src/App.tsx",
      },
      shared: {
        react: {
          version: dependencies.react,
          requiredVersion: dependencies.react,
        },
        "react-dom": {
          version: dependencies["react-dom"],
          requiredVersion: dependencies["react-dom"],
        },
        "react-router-dom": {
          version: dependencies["react-router-dom"],
          requiredVersion: dependencies["react-router-dom"],
        },
        zustand: {
          version: dependencies.zustand,
          requiredVersion: dependencies.zustand,
        },
        "@tanstack/react-query": {
          version: dependencies["@tanstack/react-query"],
          requiredVersion: dependencies["@tanstack/react-query"],
        },
        axios: {
          version: dependencies.axios,
          requiredVersion: dependencies.axios,
        },
      },
    }),
  ],

  resolve: {
    alias: {
      src: "/src",
    },
  },

  server: {
    port: 6003,
    host: true,
    strictPort: true,
    open: false,
    hmr: {
      overlay: false,
    },
    watch: {
      usePolling: true,
    },
    fs: {
      strict: false,
    },
    ...(command === "serve" && {
      proxy: buildProxyConfig(),
    }),
  },
  preview: {
    port: 6003,
    strictPort: true,
    cors: true,
  },

  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: true,
  },

  optimizeDeps: {
    include: ["react", "react-dom", "react-router-dom"],
    exclude: ["@cornerstonejs/core"],
  },
}));
