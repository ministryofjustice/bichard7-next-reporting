const ignorePlugin = require("esbuild-plugin-ignore")

require("esbuild")
  .build({
    entryPoints: [
      "src/automation-report/index.ts",
      "src/common-platform-report/index.ts",
      "src/mps-report/index.ts",
      "src/top-exceptions-report/index.ts"
    ],
    bundle: true,
    logLevel: "info",
    outdir: "build",
    minify: true,
    target: "node16",
    platform: "node",
    plugins: [
      ignorePlugin([
        {
          resourceRegExp: /pg-native$/,
          contextRegExp: /node_modules\/pg/
        }
      ])
    ]
  })
  .catch(() => process.exit(1))
