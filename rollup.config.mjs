import commonjs from "@rollup/plugin-commonjs";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
// import postcss from "rollup-plugin-postcss";
import del from "rollup-plugin-delete";
import json from "@rollup/plugin-json";
import typescript from "rollup-plugin-typescript2";
import resolve from "@rollup/plugin-node-resolve";
import copy from "rollup-plugin-copy";

export default {
    input: "src/script.ts",
    output: [
        {
            inlineDynamicImports: true,
            dir: "dist",
            format: "cjs",
            sourcemap: true,
        },
    ],
    plugins: [
        del({ targets: "dist/*" }),
        resolve({
            preferBuiltins: true,
            modulesOnly: false,
        }),
        commonjs({
            esmExternals: true,
            transformMixedEsModules: true,
        }),
        peerDepsExternal(),
        typescript({
            tsconfig: "./tsconfig.json",
            useTsconfigDeclarationDir: true,
        }),
        copy({
            targets: [
                { src: "src/index.html", dest: "dist" },
                { src: "src/vendor", dest: "dist" },
                { src: "src/assets/css", dest: "dist/assets" },
                { src: "src/assets/img", dest: "dist/assets" },
                { src: "src/lib", dest: "dist/" },
            ],
        }),
        // postcss({
        //     extract: "styles.css",
        // }),
        json(),
    ],
    external: ["classnames", "require", "prop-types-extra"],
};
