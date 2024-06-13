<?php

/**
 * Theme setup.
 */

namespace App;

use function Roots\bundle;

/**
 * Register the theme assets.
 *
 * @return void
 */
add_action('wp_enqueue_scripts', function () {
    bundle('app')->enqueue();
    bundle('react')->enqueue();
}, 100);

/**
 * Register the theme assets with the block editor.
 *
 * @return void
 */
add_action('enqueue_block_editor_assets', function () {
    bundle('editor')->enqueue();
}, 100);

/**
 * Register the initial theme setup.
 *
 * @return void
 */
add_action('after_setup_theme', function () {

    add_theme_support('woocommerce');
   // add_theme_support('woocommerce');
    /**
     * Disable full-site editing support.
     *
     * @link https://wptavern.com/gutenberg-10-5-embeds-pdfs-adds-verse-block-color-options-and-introduces-new-patterns
     */
    remove_theme_support('block-templates');

    /**
     * Register the navigation menus.
     *
     * @link https://developer.wordpress.org/reference/functions/register_nav_menus/
     */
    register_nav_menus([
        'primary_navigation' => __('Primary Navigation', 'sage'),
    ]);

    /**
     * Disable the default block patterns.
     *
     * @link https://developer.wordpress.org/block-editor/developers/themes/theme-support/#disabling-the-default-block-patterns
     */
    remove_theme_support('core-block-patterns');

    /**
     * Enable plugins to manage the document title.
     *
     * @link https://developer.wordpress.org/reference/functions/add_theme_support/#title-tag
     */
    add_theme_support('title-tag');

    /**
     * Enable post thumbnail support.
     *
     * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
     */
    add_theme_support('post-thumbnails');

    /**
     * Enable responsive embed support.
     *
     * @link https://developer.wordpress.org/block-editor/how-to-guides/themes/theme-support/#responsive-embedded-content
     */
    add_theme_support('responsive-embeds');

    /**
     * Enable HTML5 markup support.
     *
     * @link https://developer.wordpress.org/reference/functions/add_theme_support/#html5
     */
    add_theme_support('html5', [
        'caption',
        'comment-form',
        'comment-list',
        'gallery',
        'search-form',
        'script',
        'style',
    ]);

    /**
     * Enable selective refresh for widgets in customizer.
     *
     * @link https://developer.wordpress.org/reference/functions/add_theme_support/#customize-selective-refresh-widgets
     */
    add_theme_support('customize-selective-refresh-widgets');
}, 20);

/**
 * Register the theme sidebars.
 *
 * @return void
 */
add_action('widgets_init', function () {
    $config = [
        'before_widget' => '<section class="widget %1$s %2$s">',
        'after_widget' => '</section>',
        'before_title' => '<h3>',
        'after_title' => '</h3>',
    ];

    register_sidebar([
        'name' => __('Primary', 'sage'),
        'id' => 'sidebar-primary',
    ] + $config);

    register_sidebar([
        'name' => __('Footer', 'sage'),
        'id' => 'sidebar-footer',
    ] + $config);
});

add_theme_support('wc-product-gallery-zoom');
add_theme_support('wc-product-gallery-lightbox');
add_theme_support('wc-product-gallery-slider');



    /**
     * Add filter to locate WooCommerce templates in resources/views/woocommerce
     */
    add_filter('woocommerce_locate_template', function ($template, $template_name, $template_path) {
        $custom_template = locate_template('resources/views/woocommercess/' . $template_name);
    
        if (file_exists($custom_template)) {
            return $custom_template;
        }
    
        return $template;
    }, 10, 3);

    require_once __DIR__ . '/woocommerce.php';
      require_once __DIR__ . '/enquiries.php';
    

  // /app/setup.php

// function sage_enqueue_scripts() {
//     wp_enqueue_script('sage/custom', asset('scripts/custom.js')->uri(), ['jquery'], null, true);

//     // Localize script to pass the AJAX URL
//     wp_localize_script('sage/custom', 'ajax_object', [
//         'ajax_url' => admin_url('admin-ajax.php')
//     ]);
// }
// add_action('wp_enqueue_scripts', 'sage_enqueue_scripts');

// add_action('wp_enqueue_scripts', function() {
//     // Enqueue your main script
//     wp_enqueue_script('sage/custom', asset('scripts/custom.js')->uri(), ['jquery'], null, true);

//     // Localize script to pass the AJAX URL
//     wp_localize_script('sage/custom', 'ajax_object', [
//         'ajax_url' => admin_url('admin-ajax.php')
//     ]);
// });
