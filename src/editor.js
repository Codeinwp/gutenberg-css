/**
 * WordPress dependencies.
 */
const { __ } = wp.i18n;

const {
	Component,
	Fragment
} = wp.element;

class CSSEditor extends Component {
	constructor() {
		super( ...arguments );
		this.getClassName = this.getClassName.bind( this );

		this.editor;

		this.customCSS = '';
		this.classAr = '';
	}

	componentDidMount() {
		let classes = this.getClassName();

		if ( this.props.attributes.customCSS ) {
			const generatedCSS = ( this.props.attributes.customCSS ).replace( /.ticss-[^#\s]*/g, 'selector' );
			this.customCSS = generatedCSS;
		} else {
			this.customCSS = 'selector {\n}\n';
		}

		this.editor = wp.CodeMirror( document.getElementById( 'themeisle-css-editor' ), {
			value: this.customCSS,
			autoCloseBrackets: true,
			continueComments: true,
			lineNumbers: true,
			lineWrapping: true,
			matchBrackets: true,
			lint: true,
			gutters: [ 'CodeMirror-lint-markers' ],
			styleActiveLine: true,
			styleActiveSelected: true,
			extraKeys: {
				'Ctrl-Space': 'autocomplete',
				'Alt-F': 'findPersistent',
				'Cmd-F': 'findPersistent'
			}
		});

		this.editor.on( 'change', () => {
			const regex = new RegExp( 'selector', 'g' );
			const generatedCSS = this.editor.getValue().replace( regex, `.${ this.classAr }` );
			this.customCSS = generatedCSS;

			if ( ( 'selector {\n}\n' ).replace( /\s+/g, '' ) === this.customCSS.replace( /\s+/g, '' ) ) {
				return this.props.setAttributes({ customCSS: null });
			}

			this.props.setAttributes({ customCSS: this.customCSS });
		});
	}

	componentDidUpdate() {
		let classes = this.getClassName();

		this.props.setAttributes({
			hasCustomCSS: true,
			className: classes
		});
	}

	getClassName() {
		let classes;

		const uniqueId = this.props.clientId.substr( 0, 8 );

		if ( this.props.attributes.className ) {
			classes = this.props.attributes.className;

			if ( ! classes.includes( 'ticss-' ) ) {
				classes = classes.split( ' ' );
				classes.push( `ticss-${ uniqueId }` );
				classes = classes.join( ' ' );
			}

			this.classAr = classes.split( ' ' );
			this.classAr = this.classAr.find( i => i.includes( 'ticss' ) );
		} else {
			classes = `ticss-${ uniqueId }`;
			this.classAr = classes;
		}

		return classes;
	}

	render() {
		return (
			<Fragment>
				<p>{ __( 'Add your custom CSS.' ) }</p>

				<div id="themeisle-css-editor" className="themeisle-css-editor" />

				<p>{ __( 'Use' ) } <code>selector</code> { __( 'to target block wrapper.' ) }</p>

				<p>{ __( '' ) }</p>
				<p>{ __( 'Example:' ) }</p>
				<pre className="themeisle-css-editor-help">
					{ 'selector {\n    background: #000;\n}\n\nselector img {\n    border-radius: 100%;\n}'}
				</pre>

				<p>{ __( 'You can also use other CSS syntax here, such as media queries.' ) }</p>
			</Fragment>
		);
	}
}

export default CSSEditor;
