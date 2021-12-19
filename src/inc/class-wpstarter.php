<?php

class WPStarter extends Timber\Site {
	function __construct() {
		show_admin_bar(false);

		add_theme_support('post-formats');
		add_theme_support('post-thumbnails');
		add_theme_support('menus');
		add_theme_support('html5', array('comment-list', 'comment-form', 'search-form', 'gallery', 'caption'));

		remove_action('template_redirect', 'rest_output_link_header', 11, 0);
		remove_action('template_redirect', 'wp_shortlink_header', 11);
		remove_action('admin_print_scripts', 'print_emoji_detection_script');
		remove_action('wp_print_styles', 'print_emoji_styles');
		remove_action('admin_print_styles', 'print_emoji_styles');
		remove_action('wp_head', 'adjacent_posts_rel_link_wp_head', 10);
		remove_action('wp_head', 'rest_output_link_wp_head');
		remove_action('wp_head', 'wp_oembed_add_discovery_links');
		remove_action('wp_head', 'print_emoji_detection_script', 7);
		remove_action('wp_head', 'wlwmanifest_link');
		remove_action('wp_head', 'index_rel_link');
		remove_action('wp_head', 'rsd_link');
		remove_action('wp_head', 'wp_generator');
		remove_action('wp_head', 'feed_links', 2);
		remove_action('wp_head', 'feed_links_extra', 3);
		remove_action('wp_head', 'noindex', 1);
		remove_action('wp_head', 'parent_post_rel_link');
		remove_action('wp_head', 'rel_canonical');
		remove_action('wp_head', 'start_post_rel_link');
		remove_action('wp_head', 'wp_oembed_add_host_js');
		remove_action('wp_head', 'wp_resource_hints', 2);
		remove_action('wp_head', 'wp_shortlink_wp_head');

		add_filter('timber_context', array($this, 'add_to_context'));
		add_filter('get_twig', array($this, 'add_to_twig'));
		add_filter('nav_menu_css_class', array($this, 'special_nav_class'), 10, 2);
		add_filter('gettext', array($this, 'change_howdy'), 10, 3);
		add_filter('acf/fields/wysiwyg/toolbars' , array($this, 'customize_wysiwyg_toolbars'));
		add_filter('wp_check_filetype_and_ext', array($this, 'allow_svg_workaround'), 10, 4);
		add_filter('upload_mimes', array($this, 'allow_svg'));
		add_filter('enter_title_here', array($this, 'change_title_text'));
		
		add_action('init', array($this, 'add_custom_options_page'));
		add_action('wp_dashboard_setup', array($this, 'remove_dashboard_widgets'));
		add_action('admin_head', array($this, 'remove_add_media_buttons'));
		add_action('admin_head', array($this, 'customize_meta_boxes'));
		add_action('admin_head', array($this, 'remove_cpt_view_buttons'));
		add_action('wp_before_admin_bar_render', array($this, 'admin_bar_render'));
		add_action('customize_register', array($this, 'remove_styles_sections'), 20, 1);
		add_action('wp_enqueue_scripts', array($this, 'dequeue_block_library_styles'));
		add_action('wp_footer', array($this, 'deregister_scripts'));
		parent::__construct();
	}

	function add_custom_options_page() {
		if (function_exists('acf_add_options_page')) {
			acf_add_options_page(array(
				'page_title' 	=> 'Site',
				'menu_title'	=> 'Site',
				'menu_slug' 	=> 'global',
				'capability'	=> 'edit_posts',
				'icon_url'    => 'dashicons-admin-site',
				'redirect'		=> false
			));
		}
	}

	function add_to_context($context) {
		$jsonPath = get_template_directory() . '/manifest.json';
		$jsonContents = file_get_contents($jsonPath);
		$manifest = json_decode($jsonContents, true);
		$context['manifest'] = $manifest;
		$context['site'] = $this;
		// $context['options'] = get_fields('option');
		$context['is_mobile'] = wp_is_mobile();
		return $context;
	}

	function add_to_twig($twig) {
    $twig->addFunction(new Timber\Twig_Function('classList', function ($classes = null) {
      $classes = func_get_args();
			$output = '';

			foreach ($classes as $class) {
        if (is_string($class) && !empty($class)) {
          $output = $output . ' ' . $class;
        }
      }

      return $output;
    }));

		$twig->addExtension(new Twig_Extension_StringLoader());

		$twig->addFilter(new Timber\Twig_Filter('get_svg_text', function ($path) {
			return file_get_contents( $path );
		}));

		return $twig;
	}

	function deregister_scripts() {
		wp_deregister_script('wp-embed');
	}

	function dequeue_block_library_styles() {
		wp_dequeue_style('wp-block-library');
	}

	// function special_nav_class($classes, $item){
	// 	if (in_array('current-menu-item', $classes)) {
	// 		$classes = array('is-active');
	// 	} else {
	// 		$classes = array('');
	// 	}

	// 	return $classes;
	// }

	function customize_meta_boxes() {
		$slug = get_post_field('post_name');
	
		remove_meta_box('postimagediv', 'page', 'side');

		echo '
			<style>
				label[for="parent_id"],
				select[name="parent_id"],
				label[for="menu_order"],
				input[name="menu_order"],
				input[name="menu_order"] + p {
					display: none;
				}
			</style>
		';
	}

	function remove_add_media_buttons() {
		remove_action('media_buttons', 'media_buttons');
	}

	// function remove_cpt_view_buttons() {
	// 	global $post_type;

	// 	if (
	// 		$post_type == 'person'
	// 	) {
	// 		echo '<style type="text/css">
	// 			#edit-slug-box,
	// 			#view-post-btn,
	// 			#post-preview,
	// 			#wp-admin-bar-view,
	// 			.row-actions .view,
	// 			.updated p a {
	// 				display: none;
	// 			}
	// 			.row-actions .trash {
	// 				font-size: 0px;
	// 			}
	// 			.row-actions .trash a {
	// 				font-size: 13px;
	// 			}
	// 		</style>';
	// 	}
	// }

	function remove_styles_sections($wp_customize) {
    $wp_customize->remove_control('site_icon');
	}

	function admin_bar_render() {
		global $wp_admin_bar;
		$wp_admin_bar->remove_menu('comments');
		$wp_admin_bar->remove_menu('new-content');
	}

	function change_howdy($translated, $text, $domain) {
		if (!is_admin() || 'default' != $domain) {
			return $translated;
		}

		if (false !== strpos($translated, 'Howdy')) {
			return str_replace('Howdy', 'Welcome', $translated);
		}

		return $translated;
	}

	function customize_wysiwyg_toolbars($toolbars) {
		$toolbars['Very Simple'] = array();
		$toolbars['Very Simple'][1] = array('link');

		return $toolbars;
	}

	function allow_svg_workaround($data, $file, $filename, $mimes) {
		global $wp_version; 
		
		if ($wp_version == '4.7' || ((float) $wp_version < 4.7)) {
			return $data;
		}
	
		$filetype = wp_check_filetype($filename, $mimes);
	
		return [
			'ext' => $filetype['ext'],
			'type' => $filetype['type'],
			'proper_filename' => $data['proper_filename']
		];
	}

	function allow_svg($mimes) {
		$mimes['svg'] = 'image/svg+xml';
		return $mimes;
	}

	function remove_dashboard_widgets() {
		global $wp_meta_boxes;
		unset($wp_meta_boxes['dashboard']['normal']['core']['dashboard_activity']);
		unset($wp_meta_boxes['dashboard']['normal']['core']['dashboard_recent_comments']);
		unset($wp_meta_boxes['dashboard']['normal']['core']['dashboard_incoming_links']);
		unset($wp_meta_boxes['dashboard']['normal']['core']['dashboard_plugins']);
		unset($wp_meta_boxes['dashboard']['side']['core']['dashboard_primary']);
		unset($wp_meta_boxes['dashboard']['side']['core']['dashboard_secondary']);
		unset($wp_meta_boxes['dashboard']['side']['core']['dashboard_quick_press']);
		unset($wp_meta_boxes['dashboard']['side']['core']['dashboard_recent_drafts']);
		unset($wp_meta_boxes['dashboard']['normal']['core']['tinypng_dashboard_widget']);
	}

	// function change_title_text($title){
	// 	$screen = get_current_screen();
 
	// 	if  ('faq' == $screen->post_type) {
	// 		$title = 'Enter question here';
	// 	}
 
	// 	return $title;
	// }
}
