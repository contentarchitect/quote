# Quote

Blockquote block for ContentArchitect editor.
Structure: ```<blockquote>quote....<cite>...</cite></blockquote>```
## Properties

- Citeable.
- Style customization with class options

## Installation

### 1st Method
`npm i -S @contentarchitect/quote` or `yarn add @contentarchitect/quote`

after:

```js
// ... emitted
import Quote from "@contentarchitect/quote"
ContentArchitect.Blocks.register(Quote)
```

### 2nd Method
In your page:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@contentarchitect/editor/dist/ContentArchitect.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@contentarchitect/quote/src/theme.extract.css">

<content-architect>
	<div data-block="Quote">
		<blockquote>
			Lorem ipsum, dolor sit amet consectetur adipisicing elit. Esse odio ab corporis deserunt cupiditate obcaecati, eveniet minima magni facere molestias iure sapiente voluptatibus eligendi reiciendis architecto culpa similique nihil possimus!
		</blockquote>
		<cite>Anonymous</cite>
	</div>
</content-architect>

<script src="https://cdn.jsdelivr.net/npm/vue@2"></script>
<script src="https://cdn.jsdelivr.net/npm/@contentarchitect/editor"></script>
<script src="https://cdn.jsdelivr.net/npm/@contentarchitect/quote"></script>

<script>
ContentArchitect.Blocks.register(Quote)
</script>
```

### 3rd Method
Use bundler.

