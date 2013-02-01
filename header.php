<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="<?php bloginfo('charset'); ?>" />
	<meta name="generator" content="WordPress <?php bloginfo('version'); ?>" />
	<title><?php bloginfo('name'); ?> <?php if ( is_single() ) { ?> &raquo; Blog Archive <?php } ?> <?php wp_title(); ?></title>

	<!-- Stylesheet -->
	<link rel="stylesheet" href="<?php bloginfo('stylesheet_url'); ?>" media="screen" />

	<!-- Mobile Screen Resizing -->
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.5" />

	<!-- Icons -->
	<link rel="shortcut icon" href="<?php bloginfo('stylesheet_directory'); ?>/img/favicon.ico" />

	<!-- Feeds & Pings -->
	<link rel="alternate" type="application/rss+xml" title="<?php bloginfo('name'); ?> RSS Feed" href="http://feeds.feedburner.com/pawsne" />
	<link rel="pingback" href="<?php bloginfo('pingback_url'); ?>" />
	
	<?php wp_head(); ?>

</head>

<?php
	$page = $_SERVER['REQUEST_URI'];
	$page = str_replace("/","",$page);
	$page = str_replace(".php","",$page);
	$page = $page ? $page : 'default'
?>

<body id="<?php echo $page ?>">

	<!-- Old Browser Warning -->
	<!--[if lte IE 7]>
	<div class="old-browser">
		<div class="old-browser-inner">
			<p>Did you know that your web browser (<em>the program you're using to access the internet</em>) is a bit old? Some of the content on this site might look a bit funny as a result. <a href="http://browsehappy.com/">Upgrade your browser</a> for a faster, better, and safer web experience.</p>
		</div>
	</div>
	<![endif]-->

	<div class="navbar">
		<div class="navbar-inner">

			<a class="logo" href="<?php echo get_option('home'); ?>/"><i class="icon paw-print"></i> <?php bloginfo('name'); ?></a>

			<a class="screen-reader" href="#skipnav">Skip over navigation</a>

			<ul class="nav hide-desktop">
				<li><a data-toggle="collapse" href="#" data-target=".nav-mobile">Menu</a></li>
			</ul>

			<div class="nav-mobile">
				<ul class="nav">
					<div class="dotted hide-desktop"></div>
					<li><a href="<?php echo get_option('home'); ?>/">Home</a></li>
					<div class="dotted hide-desktop"></div>
					<li class="dropdown" id="about-nav">
						<a class="dropdown-toggle" data-toggle="dropdown" href="#about-nav">About <b class="caret"></b></a>
						<ul class="dropdown-menu">
							<li><a href="<?php echo get_option('home'); ?>/about/">Our Story</a></li>
							<li><a href="<?php echo get_option('home'); ?>/hbo/">HBO Special</a></li>
							<li><a href="<?php echo get_option('home'); ?>/contact/">Contact</a></li>
						</ul>
					</li>
					<div class="dotted hide-desktop"></div>
					<li class="dropdown hide-desktop" id="adopt-nav">
						<a class="dropdown-toggle" data-toggle="dropdown" href="#adopt-nav">Adopt <b class="caret"></b></a>
						<ul class="dropdown-menu">
							<li><a href="<?php echo get_option('home'); ?>/adopt/">Our Dogs</a></li>
							<li><a href="<?php echo get_option('home'); ?>/adoption-form/">Adoption Form</a></li>
							<li><a href="<?php echo get_option('home'); ?>/resources/">Resources</a></li>
						</ul>
					</li>
					<div class="dotted hide-desktop"></div>
					<li class="dropdown" id="help-nav">
						<a class="dropdown-toggle" data-toggle="dropdown" href="#help-nav">How to Help <b class="caret"></b></a>
						<ul class="dropdown-menu">
							<li><a href="<?php echo get_option('home'); ?>/donate/">Donate</a></li>
							<li><a href="<?php echo get_option('home'); ?>/volunteer/">Volunteer</a></li>
							<li><a href="<?php echo get_option('home'); ?>/paws-harness-program/">Buy a Harness</a></li>
							<li><a href="<?php echo get_option('home'); ?>/paws-partners/">PAWS Partners</a></li>
						</ul>
					</li>
					<div class="dotted hide-desktop"></div>
					<li><a href="<?php echo get_option('home'); ?>/news/">Blog</a></li>
				</ul>
			</div>

		</div>
	</div>

	<div class="container" id="skipnav">