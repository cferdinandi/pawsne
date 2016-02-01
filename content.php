<?php

/**
 * content.php
 * Template for post content.
 */

// Get post options
$options = keel_get_post_options();

?>

<article <?php if ( is_single() ) { echo 'class="container"'; } ?>>

	<header>
		<?php
			/**
			 * Headers
			 * Unlinked h1 for invidual blog posts. Linked h1 for collections of posts.
			 */
		?>

		<h1 class="no-margin-bottom">
			<?php if ( is_single() ) : ?>
				<?php the_title(); ?>
			<?php else : ?>
				<a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
			<?php endif; ?>
		</h1>

		<aside class="text-muted">
			<p>
				<time datetime="<?php the_time( 'Y-m-d' ); ?>" pubdate><?php the_time( 'F j, Y' ) ?></time>
				<?php edit_post_link( __( 'Edit', 'keel' ), ' / ', '' ); ?>
			</p>
		</aside>
	</header>

	<?php
		// The page or post content
		the_content(
			'<p>' .
			sprintf(
				__( 'Read More%s...', 'keel' ),
				'<span class="screen-reader"> of ' . get_the_title() . '</span>'
			) .
			'</p>'
		);
	?>


	<?php if ( is_single() ) : ?>

		<?php
			// Add call-to-action after individual blog posts
			if ( array_key_exists( 'blog_posts_message', $options ) && !empty( $options['blog_posts_message'] ) ) :
		?>
			<div class="padding-top padding-bottom">
				<?php echo stripslashes( $options['blog_posts_message'] ); ?>
			</div>
		<?php endif; ?>

		<?php
			// Add comments template to blog posts
			if ( $options['disable_comments'] !== 'on' ) {
				comments_template();
			}
		?>
	<?php endif; ?>

	<?php
		// If this is not the last post on the page, insert a divider
		if ( !keel_is_last_post($wp_query) ) :
	?>
	    <hr>
	<?php endif; ?>

</article>