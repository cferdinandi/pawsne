<?php

/**
 * footer.php
 * Template for footer content.
 */

?>

				</div><!-- /.container -->
			</main><!-- /#main -->
		</div><!-- /[data-sticky-wrap] -->

		<footer class="padding-top-large padding-bottom bg-primary" data-sticky-footer>

			<?php
				$options = keel_get_theme_options();
			?>

			<div class="container container-large text-center" >

				<?php if (false) : //if ( $options['colors'] === 'default' ) : ?>
					<hr>
				<?php endif; ?>

				<?php get_template_part( 'nav', 'secondary' ); ?>

				<div class="row">
					<?php get_template_part( 'nav-social' ); ?>
					<div class="grid-half text-left-medium">
						<?php get_search_form(); ?>
						<?php
							if ( !empty( $options['footer'] ) ) {
								echo stripslashes( $options['footer'] );
							}
						?>
						<p class="padding-top"><a target="_blank" href="url-to-github.com">[NAME OF THEME]</a> by <a target="_blank" href="http://gomakethings.com">Go Make Things</a>.</p>
					</div>
				</div>

			</div>

		</footer>


		<?php wp_footer(); ?>

	</body>
</html>