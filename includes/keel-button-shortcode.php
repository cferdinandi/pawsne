<?php

	/**
	 * Add a shortcode for button links
	 */

	function keel_button_shortcode( $atts ) {

		// Get user options
		$btn = extract(shortcode_atts(array(
			'link'  => '',
			'label' => ''
		), $atts));

		// Bail if no link or label is set
		if ( empty( $btn['link'] ) || empty( $btn['label'] ) ) return;

		return '<a class="btn" href="' . $btn['link'] . '">' . $btn['label'] . '</a>';

	}
	add_shortcode( 'button', 'keel_button_shortcode' );