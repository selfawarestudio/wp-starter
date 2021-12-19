<?php

if (! class_exists('Timber')) {
	add_action('admin_notices', function () {
		echo '<div class="error"><p>Timber not activated. Make sure you activate the plugin in <a href="' . esc_url(admin_url('plugins.php#timber')) . '">' . esc_url(admin_url('plugins.php')) . '</a></p></div>';
	});
	add_filter('template_include', function ($template) {
		return get_stylesheet_directory() . '/static/no-timber.html';
	});

	return;
}

require_once __DIR__ . '/inc/class-wpstarter.php';

Timber::$dirname = array('templates', 'templates/partials', 'templates/layouts');

new WPStarter();
