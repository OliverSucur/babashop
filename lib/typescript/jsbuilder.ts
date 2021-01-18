const [diagnostics, emit] = await Deno.bundle(
    "./lib/typescript/app.ts",
);

await Deno.writeTextFile("./lib/javascript/build.app.js", emit);