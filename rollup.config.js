import svg from 'rollup-plugin-vue-inline-svg'
import vue from 'rollup-plugin-vue'
import { terser } from "rollup-plugin-terser";

export default {
	input: 'src/main.js',
	external: ["vue", '@contentarchitect/editor'],
	output: [
		{
			file: 'dist/quote.js',
			format: 'umd',
			name: 'Quote',
			globals: {
				vue: "Vue",
				'@contentarchitect/editor': 'ContentArchitect'
			}
		},
		{
			file: 'dist/quote.min.js',
			format: 'umd',
			name: 'Quote',
			globals: {
				vue: "Vue",
				'@contentarchitect/editor': 'ContentArchitect'
			},
			plugins: [
				terser()
			]
		}
	],
	plugins: [
		svg(),
		vue()
	]
}