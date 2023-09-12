import {build as viteBuild, defineConfig} from 'vite';
import path, {resolve} from 'path';
import fs from 'fs';
import typescript from "@rollup/plugin-typescript";

const typescriptConfig = (base, format) => {
    return {
        target: "ESNext",
        rootDir: resolve(`./src/lib/${base}`),
        declaration: true,
        declarationDir: resolve(`./dist/${format}/${base}`),
        exclude: resolve("./node_modules/**"),
        allowSyntheticDefaultImports: true,
    }
}

const getConfig = ({base = '', external = [], format = 'es'}) => {
    const tsconfig = typescriptConfig(base, format);
    const build = {
        lib: {
            entry: `./src/lib/${base}/index.tsx`,
            name: 'index',
            fileName: 'index',
            formats: [format],
        },
        rollupOptions: {
            external: [
                "react", "react-dom", "react/jsx-runtime",
                ...external,
            ],
            output: {
                globals: {
                    "react": "react",
                    "react-dom": "react-dom",
                    "react/jsx-runtime": "react/jsx-runtime",
                },
            },
            plugins: 'es' === format ? [typescript(tsconfig)] : [],
        },
        outDir: `./dist/${format}/${base}`,
    };
    return { build };
}

const all = async (format = 'es', external = []) => {
    await viteBuild(defineConfig(getConfig({base: '', external, format})))
}

const item = async (name, format = 'es', external = []) => {
    await viteBuild(defineConfig(getConfig({base: name, external, format})));
}

const build = async () => {
    const components = fs.readdirSync('./src/lib/').filter(name => {
        const componentDir = path.resolve('./src/lib/', name)
        const isDir = fs.lstatSync(componentDir).isDirectory()
        return isDir && fs.readdirSync(componentDir).includes('index.tsx')
    });
    const external = components.map(name => `./${name}`);
    await all('umd');
    await all('es', external);
    for (const name of components) {
        await item(name, 'es', external);
    }
}

build().then();
