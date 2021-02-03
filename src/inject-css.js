
/**
 * WordPress dependencies.
 */
const { __ } = wp.i18n;

const { parse } = wp.blocks;

const {
	select,
	subscribe
} = wp.data;

const {
	flattenDeep
} = lodash;

const addStyle = style => {
	let element = document.getElementById( 'themeisle-css-editor-styles' );

	if ( null === element ) {
		element = document.createElement( 'style' );
		element.setAttribute( 'type', 'text/css' );
		element.setAttribute( 'id', 'themeisle-css-editor-styles' );
		document.getElementsByTagName( 'head' )[0].appendChild( element );
	}

	if ( element.textContent === style ) {
		return null;
	}

	return element.textContent = style;
};

/*
	This function will get the `customCss` value from all the blocks and its children
*/
const getCustomCssFromBlocks = ( blocks, reusableBlocks ) => {
	if ( ! blocks ) {
		return '';
	}

	// Return the block and its children. The result is an array deeply nested that match the structure of the block in the editor.
	const getChildrensFromBlock = ( block ) => {
		const childrends = [];
		if ( 'core/block' === block.name && null !== reusableBlocks ) {
			const reBlocks = reusableBlocks.find( i => block.attributes.ref === i.id );
			if ( reBlocks && reBlocks.content ) {
				childrends.push(  parse(  reBlocks.content.raw || reBlocks.content ).map( ( children ) => [ children, getChildrensFromBlock( children ) ])  );
			};
		}

		if ( undefined !== block.innerBlocks && 0 < ( block.innerBlocks ).length ) {
			childrends.push( block.innerBlocks.map( ( children ) => [ children, getChildrensFromBlock( children ) ]) );
		}

		return childrends;
	};

	// Get all the blocks and their children
	const allBlocks = blocks.map( ( block ) => {
		return [ block, getChildrensFromBlock( block ) ];
	});

	// Transform the deply nested array in a simple one and then get the `customCss` value where is the case
	const extractCustomCss = flattenDeep( allBlocks ).map( ( block ) => {
		if ( block.attributes && block.attributes.hasCustomCSS ) {
			if ( block.attributes.customCSS && ( null !== block.attributes.customCSS ) ) {
				return block.attributes.customCSS + '\n';
			}
		}
		return '';
	});

	// Build the global style
	const style = extractCustomCss.reduce( ( acc, localStyle ) => acc + localStyle, '' );

	// For debugging
	// console.log( 'Get all the block', allBlocks );
	// console.log( 'Extract customCss', extractCustomCss );
	// console.log( 'Final Result\n', style );


	return style;
};

const subscribed = subscribe( () => {
	const { getBlocks } = select( 'core/block-editor' ) || select( 'core/editor' );
	const blocks = getBlocks();
	const reusableBlocks = select( 'core' ).getEntityRecords( 'postType', 'wp_block' );
	const blocksStyle = getCustomCssFromBlocks( blocks, reusableBlocks );
	addStyle( blocksStyle );
});
