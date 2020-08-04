(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('@contentarchitect/editor')) :
	typeof define === 'function' && define.amd ? define(['@contentarchitect/editor'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Quote = factory(global.ContentArchitect));
}(this, (function (editor) { 'use strict';

	//

	var script = {
		directives: {
			edit: editor.EditDirective
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
	};

	function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
	    if (typeof shadowMode !== 'boolean') {
	        createInjectorSSR = createInjector;
	        createInjector = shadowMode;
	        shadowMode = false;
	    }
	    // Vue.extend constructor export interop.
	    const options = typeof script === 'function' ? script.options : script;
	    // render functions
	    if (template && template.render) {
	        options.render = template.render;
	        options.staticRenderFns = template.staticRenderFns;
	        options._compiled = true;
	        // functional template
	        if (isFunctionalTemplate) {
	            options.functional = true;
	        }
	    }
	    // scopedId
	    if (scopeId) {
	        options._scopeId = scopeId;
	    }
	    let hook;
	    if (moduleIdentifier) {
	        // server build
	        hook = function (context) {
	            // 2.3 injection
	            context =
	                context || // cached call
	                    (this.$vnode && this.$vnode.ssrContext) || // stateful
	                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
	            // 2.2 with runInNewContext: true
	            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
	                context = __VUE_SSR_CONTEXT__;
	            }
	            // inject component styles
	            if (style) {
	                style.call(this, createInjectorSSR(context));
	            }
	            // register component module identifier for async chunk inference
	            if (context && context._registeredComponents) {
	                context._registeredComponents.add(moduleIdentifier);
	            }
	        };
	        // used by ssr in case component is cached and beforeCreate
	        // never gets called
	        options._ssrRegister = hook;
	    }
	    else if (style) {
	        hook = shadowMode
	            ? function (context) {
	                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
	            }
	            : function (context) {
	                style.call(this, createInjector(context));
	            };
	    }
	    if (hook) {
	        if (options.functional) {
	            // register for functional component in vue file
	            const originalRender = options.render;
	            options.render = function renderWithStyleInjection(h, context) {
	                hook.call(context);
	                return originalRender(h, context);
	            };
	        }
	        else {
	            // inject component registration as beforeCreate hook
	            const existing = options.beforeCreate;
	            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
	        }
	    }
	    return script;
	}

	/* script */
	const __vue_script__ = script;

	/* template */
	var __vue_render__ = function() {
	  var _vm = this;
	  var _h = _vm.$createElement;
	  var _c = _vm._self._c || _h;
	  return _c("blockquote", [
	    _c("div", {
	      directives: [
	        {
	          name: "edit",
	          rawName: "v-edit:[blockquoteSettings].block",
	          value: _vm.value.content,
	          expression: "value.content",
	          arg: _vm.blockquoteSettings,
	          modifiers: { block: true }
	        }
	      ]
	    }),
	    _vm._v(" "),
	    _c("cite", {
	      directives: [
	        {
	          name: "edit",
	          rawName: "v-edit:[citeSettings]",
	          value: _vm.value.cite,
	          expression: "value.cite",
	          arg: _vm.citeSettings
	        }
	      ],
	      staticClass: "cite"
	    })
	  ])
	};
	var __vue_staticRenderFns__ = [];
	__vue_render__._withStripped = true;

	  /* style */
	  const __vue_inject_styles__ = undefined;
	  /* scoped */
	  const __vue_scope_id__ = undefined;
	  /* module identifier */
	  const __vue_module_identifier__ = undefined;
	  /* functional template */
	  const __vue_is_functional_template__ = false;
	  /* style inject */
	  
	  /* style inject SSR */
	  
	  /* style inject shadow dom */
	  

	  
	  const __vue_component__ = /*#__PURE__*/normalizeComponent(
	    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
	    __vue_inject_styles__,
	    __vue_script__,
	    __vue_scope_id__,
	    __vue_is_functional_template__,
	    __vue_module_identifier__,
	    false,
	    undefined,
	    undefined,
	    undefined
	  );

	var icon = { render: function () { var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{attrs:{"xmlns":"http://www.w3.org/2000/svg","height":"24","width":"24"}},[_c('path',{attrs:{"d":"M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"}}),_c('path',{attrs:{"d":"M0 0h24v24H0z","fill":"none"}})]) } };

	class Quote extends editor.Block {
		static get viewComponent () {
			return __vue_component__;
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
			let str = "";

			str += this.content;

			if (this.cite && this.cite !== '') {
				str += `<cite>${this.cite}</cite>`;
			}

			return `<blockquote>${str}</blockquote>`;
		}
		
		static serializeFromHTML (doc) {
			let obj = { content: "", cite: "" };

			const blockquote = doc.getElementsByTagName("blockquote")[0];
			const cite = blockquote ? blockquote.getElementsByTagName("cite")[0] : undefined;

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

	return Quote;

})));
