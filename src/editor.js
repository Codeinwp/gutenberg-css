/**
 * WordPress dependencies.
 */
const { __ } = wp.i18n;

const {
	Button,
	Dashicon,
	KeyboardShortcuts
} = wp.components;

const {
	Component,
	Fragment
} = wp.element;

class CSSEditor extends Component {
	constructor() {
		super( ...arguments );

		this.enableFullScreen = this.enableFullScreen.bind( this );
		this.disableFullScreen = this.disableFullScreen.bind( this );

		this.editor;

		this.customCSS = '';

		this.state = {
			isFullScreen: false
		};
	}

	componentDidMount() {
		let classes, classAr;

		const uniqueId = this.props.clientId.substr( 0, 8 );

		if ( this.props.attributes.className ) {
			classes = this.props.attributes.className;

			if ( ! classes.includes( 'ticss-' ) ) {
				classes = classes.split( ' ' );
				classes.push( `ticss-${ uniqueId }` );
				classes = classes.join( ' ' );
			}

			classAr = classes.split( ' ' );
			classAr = classAr.find( i => i.includes( 'ticss' ) );
		} else {
			classes = `ticss-${ uniqueId }`;
			classAr = classes;
		}

		this.props.setAttributes({
			hasCustomCSS: true,
			className: classes
		});

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
				'Ctrl-F': ( cm ) => {
					cm.setOption( 'fullScreen', ! cm.getOption( 'fullScreen' ) );
				},
				'Esc': ( cm ) => {
					cm.getOption( 'fullScreen' ) && cm.setOption( 'fullScreen', false );
				},
				'Alt-F': 'findPersistent',
				'Cmd-F': 'findPersistent'
			}
		});

		this.editor.on( 'change', () => {
			const regex = new RegExp( 'selector', 'g' );
			const generatedCSS = this.editor.getValue().replace( regex, `.${ classAr }` );
			this.customCSS = generatedCSS;

			if ( ( 'selector {\n}\n' ).replace( /\s+/g, '' ) === this.customCSS.replace( /\s+/g, '' ) ) {
				return this.props.setAttributes({ customCSS: null });
			}

			this.props.setAttributes({ customCSS: this.customCSS });
		});
	}

	enableFullScreen() {
		this.editor.setOption( 'fullScreen', true );
		this.setState({ isFullScreen: true });
	}

	disableFullScreen() {
		this.editor.setOption( 'fullScreen', false );
		this.setState({ isFullScreen: false });
	}

	render() {
		return (
			<Fragment>
				<p>{ __( 'Add your custom CSS.' ) }</p>

				<div id="themeisle-css-editor" className="themeisle-css-editor" />

				<div className="themeisle-css-editor-actions">
					<Button
						isDefault
						isLarge
						onClick={ this.enableFullScreen }
					>
						{ __( 'Full Screen Mode' ) }
					</Button>

					<KeyboardShortcuts shortcuts={ {
						'ctrl+f': this.enableFullScreen
					} } />

					<span className="themeisle-css-editor__info">{ __( '(Ctrl + F)' ) }</span>

					{ this.state.isFullScreen && true === this.editor.getOption( 'fullScreen' ) && (
						<Button
							isDefault
							onClick={ this.disableFullScreen }
							className="themeisle-css-editor__close"
						>
							<Dashicon icon="no-alt" />
							{ __( 'Close' ) }
						</Button>
					)}
				</div>

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
