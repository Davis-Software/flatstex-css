'use strict'

const path = require('path')
const { babel } = require('@rollup/plugin-babel')
const { nodeResolve } = require('@rollup/plugin-node-resolve')
const replace = require('@rollup/plugin-replace')

const BUNDLE = process.env.BUNDLE === 'true'
const ESM = process.env.ESM === 'true'

let fileDest = `flatstex${ESM ? '.esm' : ''}`
const external = ['@popperjs/core']
const plugins = [
    babel({
        exclude: 'node_modules/**',
        babelHelpers: 'bundled'
    })
]
const globals = {
    '@popperjs/core': 'Popper'
}

if (BUNDLE) {
    fileDest += '.bundle'
    // Remove last entry in external array to bundle Popper
    external.pop()
    delete globals['@popperjs/core']
    plugins.push(
        replace({
            'process.env.NODE_ENV': '"production"',
            preventAssignment: true
        }),
        nodeResolve()
    )
}

const rollupConfig = {
    input: path.resolve(__dirname, `../js/index.${ESM ? 'esm' : 'umd'}.js`),
    output: {
        file: path.resolve(__dirname, `../dist/js/${fileDest}.js`),
        format: ESM ? 'esm' : 'umd',
        globals,
        generatedCode: 'es2015'
    },
    external,
    plugins
}

if (!ESM) {
    rollupConfig.output.name = 'flatstex'
}

module.exports = rollupConfig