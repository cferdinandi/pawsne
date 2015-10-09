<?php

	/**
	 * Fields
	 */

	function keel_photoswipe_settings_field_activate() {
		$options = keel_photoswipe_get_theme_options();
		?>
		<label for="activate">
			<input type="checkbox" name="keel_photoswipe_theme_options[activate]" id="activate" <?php checked( 'on', $options['activate'] ); ?> />
			<?php _e( 'Activate PhotoSwipe image galleries', 'keel_photoswipe' ); ?>
		</label>
		<?php
	}

	function keel_photoswipe_settings_field_wrapper_atts() {
		$options = keel_photoswipe_get_theme_options();
		?>
		<input type="text" name="keel_photoswipe_theme_options[wrapper_atts]" id="ps-wrapper-atts" value="<?php echo stripslashes( esc_attr( $options['wrapper_atts'] ) ); ?>" /><br />
		<label class="description" for="ps-wrapper-atts"><?php _e( 'Attributes to apply to the PhotoSwipe wrapper', 'keel_photoswipe' ); ?></label>
		<?php
	}

	function keel_photoswipe_settings_field_link_atts() {
		$options = keel_photoswipe_get_theme_options();
		?>
		<input type="text" name="keel_photoswipe_theme_options[link_atts]" id="ps-link-atts" value="<?php echo stripslashes( esc_attr( $options['link_atts'] ) ); ?>" /><br />
		<label class="description" for="ps-link-atts"><?php _e( 'Attributes to apply to individual photo links', 'keel_photoswipe' ); ?></label>
		<?php
	}

	function keel_photoswipe_settings_field_caption_atts() {
		$options = keel_photoswipe_get_theme_options();
		?>
		<input type="text" name="keel_photoswipe_theme_options[caption_atts]" id="ps-caption-atts" value="<?php echo stripslashes( esc_attr( $options['caption_atts'] ) ); ?>" /><br />
		<label class="description" for="ps-caption-atts"><?php _e( 'Attributes to apply to photo captions', 'keel_photoswipe' ); ?></label>
		<?php
	}



	/**
	 * Theme Option Defaults & Sanitization
	 */

	// Get the current options from the database. If none are specified, use these defaults.
	function keel_photoswipe_get_theme_options() {
		$saved = (array) get_option( 'keel_photoswipe_theme_options' );
		$dev_options = keel_developer_options();
		$defaults = array(
			'activate' => 'on',
			'wrapper_atts' => $dev_options['photoswipe_options'] ? '' : 'class="row" data-masonry',
			'link_atts' => $dev_options['photoswipe_options'] ? '' : 'class="grid-third" data-masonry-content',
			'caption_atts' => $dev_options['photoswipe_options'] ? '' : 'hidden',
		);

		$defaults = apply_filters( 'keel_photoswipe_default_theme_options', $defaults );

		$options = wp_parse_args( $saved, $defaults );
		$options = array_intersect_key( $options, $defaults );

		return $options;
	}



	// Sanitize and validate updated theme options
	function keel_photoswipe_theme_options_validate( $input ) {
		$output = array();

		if ( !isset( $input['activate'] ) )
			$output['activate'] = 'off';

		if ( isset( $input['wrapper_atts'] ) && ! empty( $input['wrapper_atts'] ) )
			$output['wrapper_atts'] = wp_filter_post_kses( $input['wrapper_atts'] );

		if ( isset( $input['link_atts'] ) && ! empty( $input['link_atts'] ) )
			$output['link_atts'] = wp_filter_post_kses( $input['link_atts'] );

		if ( isset( $input['caption_atts'] ) && ! empty( $input['caption_atts'] ) )
			$output['caption_atts'] = wp_filter_post_kses( $input['caption_atts'] );

		return apply_filters( 'keel_photoswipe_theme_options_validate', $output, $input );
	}


	/**
	 * Menu
	 */

	// Register the theme options page and its fields
	function keel_photoswipe_theme_options_init() {
		$dev_options = keel_developer_options();

		register_setting(
			'keel_photoswipe_options', // Options group, see settings_fields() call in keel_photoswipe_theme_options_render_page()
			'keel_photoswipe_theme_options', // Database option, see keel_photoswipe_get_theme_options()
			'keel_photoswipe_theme_options_validate' // The sanitization callback, see keel_photoswipe_theme_options_validate()
		);

		// Register our settings field group
		add_settings_section(
			'general', // Unique identifier for the settings section
			'', // Section title (we don't want one)
			'__return_false', // Section callback (we don't want anything)
			'keel_photoswipe_theme_options' // Menu slug, used to uniquely identify the page; see keel_photoswipe_theme_options_add_page()
		);

		// Register our individual settings fields
		// add_settings_field( $id, $title, $callback, $page, $section );
		// $id - Unique identifier for the field.
		// $title - Setting field title.
		// $callback - Function that creates the field (from the Theme Option Fields section).
		// $page - The menu page on which to display this field.
		// $section - The section of the settings page in which to show the field.

		add_settings_field( 'keel_photoswipe_activate', __( 'Activate', 'keel_photoswipe' ), 'keel_photoswipe_settings_field_activate', 'keel_photoswipe_theme_options', 'general' );
		if ( $dev_options['photoswipe_options'] ) {
			add_settings_field( 'keel_photoswipe_wrapper_atts', __( 'Wrapper Attributes', 'keel_photoswipe' ), 'keel_photoswipe_settings_field_wrapper_atts', 'keel_photoswipe_theme_options', 'general' );
			add_settings_field( 'keel_photoswipe_link_atts', __( 'Link Attributes', 'keel_photoswipe' ), 'keel_photoswipe_settings_field_link_atts', 'keel_photoswipe_theme_options', 'general' );
			add_settings_field( 'keel_photoswipe_caption_atts', __( 'Caption Attributes', 'keel_photoswipe' ), 'keel_photoswipe_settings_field_caption_atts', 'keel_photoswipe_theme_options', 'general' );
		}
	}
	add_action( 'admin_init', 'keel_photoswipe_theme_options_init' );



	// Create theme options menu
	// The content that's rendered on the menu page.
	function keel_photoswipe_theme_options_render_page() {
		?>
		<div class="wrap">
			<h2><?php _e( 'PhotoSwipe Image Galleries', 'keel_photoswipe' ); ?></h2>

			<p>Create beautiful, interactive image galleries using the WordPress <code>[gallery]</code> shortcode. <a target="_blank" href="https://codex.wordpress.org/Gallery_Shortcode">Learn more about WordPress galleries</a>, or <a target="_blank" href="http://photoswipe.com/">see PhotoSwipe in action</a>.</p>

			<form method="post" action="options.php">
				<?php
					settings_fields( 'keel_photoswipe_options' );
					do_settings_sections( 'keel_photoswipe_theme_options' );
					submit_button();
				?>
			</form>
		</div>
		<?php
	}



	// Add the theme options page to the admin menu
	function keel_photoswipe_theme_options_add_page() {
		$theme_page = add_submenu_page(
			'upload.php', // parent slug
			'Photo Galleries', // Label in menu
			'Photo Galleries', // Label in menu
			'edit_theme_options', // Capability required
			'keel_photoswipe_theme_options', // Menu slug, used to uniquely identify the page
			'keel_photoswipe_theme_options_render_page' // Function that renders the options page
		);
	}
	add_action( 'admin_menu', 'keel_photoswipe_theme_options_add_page' );



	// Restrict access to the theme options page to admins
	function keel_photoswipe_option_page_capability( $capability ) {
		return 'edit_theme_options';
	}
	add_filter( 'option_page_capability_keel_photoswipe_options', 'keel_photoswipe_option_page_capability' );