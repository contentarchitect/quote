<template>
	<blockquote>
		<div v-edit:[blockquoteSettings].block="value.content"></div>
		<cite class="cite" v-edit:[citeSettings]="value.cite"></cite>
	</blockquote>
</template>

<script>
import { EditDirective } from "@contentarchitect/editor"

export default {
	directives: {
		edit: EditDirective
	},
	props: ['value'],
	data () {
		return {
			blockquoteSettings: {
				placeholder: "Type your text"
			},
			citeSettings: {
				placeholder: "Type the citation"
			}
		}
	}
}
</script>