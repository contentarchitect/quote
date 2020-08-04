import { Block } from "@contentarchitect/editor"
import view from "./view.vue"
import icon from "./icon.svg"

export default class Quote extends Block {
	static get viewComponent () {
		return view;
	}

	static get icon () {
		return icon;
	}

	static defaultData () {
		return {
			content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
			cite: "Anonym"
		}
	}

	toHTML () {
		let str = ""

		str += this.content

		if (this.cite && this.cite !== '') {
			str += `<cite>${this.cite}</cite>`
		}

		return `<blockquote>${str}</blockquote>`;
	}
	
	static serializeFromHTML (doc) {
		let obj = { content: "", cite: "" }

		const blockquote = doc.getElementsByTagName("blockquote")[0]
		const cite = blockquote ? blockquote.getElementsByTagName("cite")[0] : undefined

		if (cite) {
			blockquote.removeChild(cite);
			obj.cite = cite.innerHTML;
		}

		if (blockquote) {
			obj.content = blockquote.innerHTML;
		}

		return obj;
	}
}