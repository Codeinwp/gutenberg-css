!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=2)}([function(e,t,n){},function(e,t){wp.i18n.__;var n=wp.blocks.parse,r=wp.data,o=r.select,s=r.subscribe,i="";s((function(){i="",function e(t,r){t.forEach((function(t){if(t.attributes.hasCustomCSS&&t.attributes.customCSS&&null!==t.attributes.customCSS&&(i+=t.attributes.customCSS+"\n"),"core/block"===t.name&&null!==r){var o=r.find((function(e){return t.attributes.ref===e.id}));o&&(o=n(o.content.raw),e(o,r))}void 0!==t.innerBlocks&&0<t.innerBlocks.length&&e(t.innerBlocks,r)}))}((0,(o("core/block-editor")||o("core/editor")).getBlocks)(),o("core").getEntityRecords("postType","wp_block")),function(e){var t=document.getElementById("themeisle-css-editor-styles");null===t&&((t=document.createElement("style")).setAttribute("type","text/css"),t.setAttribute("id","themeisle-css-editor-styles"),document.getElementsByTagName("head")[0].appendChild(t)),t.textContent===e||(t.textContent=e)}(i)}))},function(e,t,n){"use strict";n.r(t);n(0);function r(e){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function o(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function s(e,t){return!t||"object"!==r(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function i(e){return(i=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function c(e,t){return(c=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var l=wp.i18n.__,u=wp.element,a=u.Component,p=u.Fragment,m=function(e){function t(){var e;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),(e=s(this,i(t).apply(this,arguments))).editor,e.customCSS="",e}var n,r,u;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&c(e,t)}(t,e),n=t,(r=[{key:"componentDidMount",value:function(){var e,t,n=this,r=this.props.clientId.substr(0,8);if(this.props.attributes.className?((e=this.props.attributes.className).includes("ticss-")||((e=e.split(" ")).push("ticss-".concat(r)),e=e.join(" ")),t=(t=e.split(" ")).find((function(e){return e.includes("ticss")}))):(e="ticss-".concat(r),t=e),this.props.setAttributes({hasCustomCSS:!0,className:e}),this.props.attributes.customCSS){var o=this.props.attributes.customCSS.replace(/.ticss-[^#\s]*/g,"selector");this.customCSS=o}else this.customCSS="selector {\n}\n";this.editor=wp.CodeMirror(document.getElementById("themeisle-css-editor"),{value:this.customCSS,autoCloseBrackets:!0,continueComments:!0,lineNumbers:!0,lineWrapping:!0,matchBrackets:!0,lint:!0,gutters:["CodeMirror-lint-markers"],styleActiveLine:!0,styleActiveSelected:!0,extraKeys:{"Ctrl-Space":"autocomplete","Alt-F":"findPersistent","Cmd-F":"findPersistent"}}),this.editor.on("change",(function(){var e=new RegExp("selector","g"),r=n.editor.getValue().replace(e,".".concat(t));if(n.customCSS=r,"selector {\n}\n".replace(/\s+/g,"")===n.customCSS.replace(/\s+/g,""))return n.props.setAttributes({customCSS:null});n.props.setAttributes({customCSS:n.customCSS})}))}},{key:"render",value:function(){return wp.element.createElement(p,null,wp.element.createElement("p",null,l("Add your custom CSS.")),wp.element.createElement("div",{id:"themeisle-css-editor",className:"themeisle-css-editor"}),wp.element.createElement("p",null,l("Use")," ",wp.element.createElement("code",null,"selector")," ",l("to target block wrapper.")),wp.element.createElement("p",null,l("")),wp.element.createElement("p",null,l("Example:")),wp.element.createElement("pre",{className:"themeisle-css-editor-help"},"selector {\n    background: #000;\n}\n\nselector img {\n    border-radius: 100%;\n}"),wp.element.createElement("p",null,l("You can also use other CSS syntax here, such as media queries.")))}}])&&o(n.prototype,r),u&&o(n,u),t}(a),f=(n(1),lodash.assign),d=wp.i18n.__,b=wp.blocks.hasBlockSupport,y=wp.components.PanelBody,S=wp.compose.createHigherOrderComponent,h=(wp.blockEditor||wp.editor).InspectorControls,w=wp.element.Fragment,C=wp.hooks.addFilter,g=S((function(e){return function(t){return b(t.name,"customClassName",!0)&&t.isSelected?wp.element.createElement(w,null,wp.element.createElement(e,t),wp.element.createElement(h,null,wp.element.createElement(y,{title:d("Custom CSS"),initialOpen:!1},wp.element.createElement(m,{clientId:t.clientId,setAttributes:t.setAttributes,attributes:t.attributes})))):wp.element.createElement(e,t)}}),"withInspectorControl");C("blocks.registerBlockType","themeisle-custom-css/attribute",(function(e){return b(e,"customClassName",!0)&&(e.attributes=f(e.attributes,{hasCustomCSS:{type:"boolean",default:!1},customCSS:{type:"string",default:null}})),e})),C("editor.BlockEdit","themeisle-custom-css/with-inspector-controls",g)}]);