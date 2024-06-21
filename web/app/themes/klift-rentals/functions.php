<?php

/*
|--------------------------------------------------------------------------
| Register The Auto Loader
|--------------------------------------------------------------------------
|
| Composer provides a convenient, automatically generated class loader for
| our theme. We will simply require it into the script here so that we
| don't have to worry about manually loading any of our classes later on.
|
*/
add_theme_support( 'woocommerce' );
if (! file_exists($composer = __DIR__.'/vendor/autoload.php')) {
    wp_die(__('Error locating autoloader. Please run <code>composer install</code>.', 'sage'));
}

require $composer;

 
/*
|--------------------------------------------------------------------------
| Register The Bootloader
|--------------------------------------------------------------------------
|
| The first thing we will do is schedule a new Acorn application container
| to boot when WordPress is finished loading the theme. The application
| serves as the "glue" for all the components of Laravel and is
| the IoC container for the system binding all of the various parts.
|
*/

if (! function_exists('\Roots\bootloader')) {
    wp_die(
        __('You need to install Acorn to use this theme.', 'sage'),
        '',
        [
            'link_url' => 'https://roots.io/acorn/docs/installation/',
            'link_text' => __('Acorn Docs: Installation', 'sage'),
        ]
    );
}

\Roots\bootloader()->boot();

/*
|--------------------------------------------------------------------------
| Register Sage Theme Files
|--------------------------------------------------------------------------
|
| Out of the box, Sage ships with categorically named theme files
| containing common functionality and setup to be bootstrapped with your
| theme. Simply add (or remove) files from the array below to change what
| is registered alongside Sage.
|
*/

collect(['setup', 'filters','Routes/init'])
    ->each(function ($file) {
        if (! locate_template($file = "app/{$file}.php", true, true)) {
            wp_die(
                /* translators: %s is replaced with the relative file path */
                sprintf(__('Error locating <code>%s</code> for inclusion.', 'sage'), $file)
            );
        }
    });



    function add_li_class($classes, $item, $args) {
        $classes[] = 'nav-item mx-2';
        return $classes;
    }
    add_filter('nav_menu_css_class', 'add_li_class', 1, 3);


	add_filter( 'nav_menu_link_attributes', function($atts) {
			$atts['class'] = "nav-link text-white";
			return $atts;
	}, 100, 1 );
	

	

    // Register Custom Taxonomy
function custom_taxonomy_brands() {

	$labels = array(
		'name'                       => _x( 'Brands', 'Taxonomy General Name', 'text_domain' ),
		'singular_name'              => _x( 'Brand', 'Taxonomy Singular Name', 'text_domain' ),
		'menu_name'                  => __( 'Brands', 'text_domain' ),
		'all_items'                  => __( 'All Brands', 'text_domain' ),
		'parent_item'                => __( 'Parent Brand', 'text_domain' ),
		'parent_item_colon'          => __( 'Parent Brand:', 'text_domain' ),
		'new_item_name'              => __( 'New Brand Name', 'text_domain' ),
		'add_new_item'               => __( 'Add New Brand', 'text_domain' ),
		'edit_item'                  => __( 'Edit Brand', 'text_domain' ),
		'update_item'                => __( 'Update Brand', 'text_domain' ),
		'view_item'                  => __( 'View Brand', 'text_domain' ),
		'separate_items_with_commas' => __( 'Separate brands with commas', 'text_domain' ),
		'add_or_remove_items'        => __( 'Add or remove brands', 'text_domain' ),
		'choose_from_most_used'      => __( 'Choose from the most used', 'text_domain' ),
		'popular_items'              => __( 'Popular Brands', 'text_domain' ),
		'search_items'               => __( 'Search Brands', 'text_domain' ),
		'not_found'                  => __( 'Not Found', 'text_domain' ),
		'no_terms'                   => __( 'No brands', 'text_domain' ),
		'items_list'                 => __( 'Brands list', 'text_domain' ),
		'items_list_navigation'      => __( 'Brands list navigation', 'text_domain' ),
	);
	$rewrite = array(
		'slug'                       => 'brand',
		'with_front'                 => true,
		'hierarchical'               => false,
	);
	$args = array(
		'labels'                     => $labels,
		'hierarchical'               => false,
		'public'                     => true,
		'show_ui'                    => true,
		'show_admin_column'          => true,
		'show_in_nav_menus'          => true,
		'show_tagcloud'              => true,
		'rewrite'                    => $rewrite,
	);
	register_taxonomy( 'brand', array( 'product' ), $args );

}
add_action( 'init', 'custom_taxonomy_brands', 0 );


function custom_wc_template_assignment($template) {
    // Check if we are on a single product page
    if (is_singular('product')) {
        // Locate and assign a custom template file named 'custom-single-product.blade.php'
        $custom_template = locate_template('custom-single-product.blade.php');
        if ($custom_template) {
            return $custom_template;
        }
    }
    // Check if we are on a product category archive page
    elseif (is_tax('product_cat')) {
        // Locate and assign a custom template file named 'custom-product-category.blade.php'
        $custom_template = locate_template('custom-product-category.blade.php');
        if ($custom_template) {
            return $custom_template;
        }
    }
    
    // If no custom template found, return the original template
    return $template;
}
add_filter('template_include', 'custom_wc_template_assignment');

// function custom_category_template($template) {
//     if (is_tax('product_cat')) {
//         $term = get_queried_object();
//         $slug = $term->slug; 
// 		$custom_template = locate_template("template-custom.blade.php");
// 		//   print_r($custom_template);
// 		//   die;
//         if ($custom_template && file_exists($custom_template)) {
//             return $custom_template;
//         }
//     }

	
//     return $template;
// }
// add_filter('template_include', 'custom_category_template');

add_filter( 'category_template', 'custom_subcategory_template' );
function custom_subcategory_template( $template ) {

    $cat = get_queried_object();

    if ( isset( $cat ) && $cat->category_parent ) {

    $template = locate_template( 'sub-category.php' );

    }

    return $template;

}

add_filter('sage/blade/loader', function ($blade) {
    // Add the woocommerce directory to the list of view paths
    $woocommerce_path = get_theme_file_path('woocommerce');
    if (is_dir($woocommerce_path)) {
        $blade->view()->addNamespace('woocommerce', $woocommerce_path);
    }
    return $blade;
});



function build_category_hierarchy( $categories, $parent_id = 0 ) {
	$category_hierarchy = array();
  
	foreach ( $categories as $category ) {
		if ( $category->parent == $parent_id ) {
			$category_children = build_category_hierarchy( $categories, $category->term_id );
  
			if ( ! empty( $category_children ) ) {
				$category->children = $category_children;
			}
  
			$category_hierarchy[] = $category;
		}
	}
  
	return $category_hierarchy;
}


// Add the wp_login action hook
add_action('wp_login', 'after_user_login', 10, 2);

/**
 * Function to execute after a user logs in.
 *
 * @param string $user_login Username.
 * @param WP_User $user WP_User object of the logged-in user.
 */
function after_user_login($user_login, $user) {
    // Your custom functionality goes here
    // For example, logging the login event or updating user metadata

    // Example: Log the login event
    log_login_event($user);
}

/**
 * Log the login event by updating user metadata.
 *
 * @param WP_User $user WP_User object of the logged-in user.
 */
function log_login_event($user) {
    // Include the JWT library
 require_once __DIR__ . '/vendor/autoload.php';

    // Get user ID and username
    $user_id = $user->ID;
    $username = $user->user_login;

    // Create the payload for the JWT token
    $issued_at = time();
    $expiration_time = $issued_at + (60 * 60); // Token valid for 1 hour
    $payload = array(
        'iss' => get_site_url(), // Issuer
        'iat' => $issued_at, // Issued at
        'exp' => $expiration_time, // Expiration time
        'user_id' => $user_id,
        'username' => $username
    );
    $secret_key = bin2hex(random_bytes(32));
    // Set your secret key (replace 'your_secret_key' with an actual secret key)
    // $secret_key = 'your_secret_key';

    // Generate the JWT token
    // $jwt_token = \Firebase\JWT\JWT::encode($payload, $secret_key);
    $jwt_token = \Firebase\JWT\JWT::encode($payload, $secret_key, 'HS256');
    // Optionally, you can store the JWT token in the user's meta data or session
    update_user_meta($user_id, 'jwt_token', $jwt_token); 
    // Return the JWT token (optional, depending on your use case)
// print_r($jwt_token);
// die;
    ?>
    <script>
        // Store the token in localStorage
        localStorage.setItem('jwtToken', '<?= esc_js($jwt_token); ?>');
    </script>
    <?php
//     sleep(10);
//    return 1;
// session_start();

// Set session variables
$_SESSION['jwtToken'] = $jwt_token;

}

function log_login_event2($user) {
    // Get user ID and username
    $user_id = $user->ID;
    $username = $user->user_login;

    // Generate the JWT token
    $jwt_token = generate_jwt_token($user_id, $username);

    // Output JavaScript to store the token in localStorage
    ?>
    <script>
        // Store the token in localStorage
        localStorage.setItem('jwtToken', '<?php echo esc_js($jwt_token); ?>');
    </script>
    <?php
}

 
add_action('wp_logout', 'end_session');

function end_session() {
    // session_start(); 
    unset($_SESSION['jwtToken'] );
}

// function register_contact_form_post_type() {
//     register_post_type('contact_us', array(
//         'labels' => array(
//             'name' => __('Contact Form Submissions'),
//             'singular_name' => __('Contact Form Submission'),
//         ),
//         'public' => false,
//         'show_ui' => true,
//         'supports' => array('name','email','phone','message', 'editor'),
//     ));
// }
// add_action('init', 'register_contact_form_post_type');


function register_contact_form_post_type() {
    register_post_type('contact_us', array(
        'labels' => array(
            'name' => __('Contact Form Submissions'),
            'singular_name' => __('Contact Form Submission'),
        ),
        'public' => false,
        'show_ui' => true,
        'capability_type' => 'contact_us',
        'capabilities' => array(
            'read_post'          => 'read_contact_us',
            'edit_post'          => 'edit_contact_us',
            'delete_post'        => 'delete_contact_us',
            'edit_posts'         => 'edit_contact_uses',
            'edit_others_posts'  => 'edit_others_contact_uses',
            'publish_posts'      => 'publish_contact_uses',
            'read_private_posts' => 'read_private_contact_uses',
        ),
        'supports' => array('title', 'editor'),
    ));
}
add_action('init', 'register_contact_form_post_type');


function register_blog_post_type() {
    register_post_type('blog', array(
        'labels' => array(
            'name' => __('Blogs'),
            'singular_name' => __('Blog'),
        ),
        'public' => true,
        'show_ui' => true,
        'capability_type' => 'blog',
        'capabilities' => array(
            'read_post'          => 'read_blog',
            'edit_post'          => 'edit_blog',
            'delete_post'        => 'delete_blog',
            'edit_posts'         => 'edit_blogs',
            'edit_others_posts'  => 'edit_others_blogs',
            'publish_posts'      => 'publish_blogs',
            'read_private_posts' => 'read_private_blogs',
        ),
        'supports' => array('title', 'editor', 'author', 'thumbnail', 'excerpt', 'comments'),
    ));
}
add_action('init', 'register_blog_post_type');


function register_home_slider_post_type() {
    register_post_type('home-slider', array(
        'labels' => array(
            'name' => __('Home Sliders'),
            'singular_name' => __('Home Slider'),
        ),
        'public' => true,
        'show_ui' => true,
        'capability_type' => 'home_slider',
        'capabilities' => array(
            'read_post'          => 'read_home_slider',
            'edit_post'          => 'edit_home_slider',
            'delete_post'        => 'delete_home_slider',
            'edit_posts'         => 'edit_home_sliders',
            'edit_others_posts'  => 'edit_others_home_sliders',
            'publish_posts'      => 'publish_home_sliders',
            'read_private_posts' => 'read_private_home_sliders',
        ),
        'supports' => array('title', 'editor', 'thumbnail', 'excerpt'),
    ));
}
add_action('init', 'register_home_slider_post_type');





function add_contact_us_caps_to_administrator() {
    $role = get_role('administrator');

    $role->add_cap('read_contact_us');
    $role->add_cap('edit_contact_us');
    $role->add_cap('delete_contact_us');
    $role->add_cap('edit_contact_uses');
    $role->add_cap('edit_others_contact_uses');
    $role->add_cap('publish_contact_uses');
    $role->add_cap('read_private_contact_uses');

    $role->add_cap('read_blog');
    $role->add_cap('edit_blog');
    $role->add_cap('delete_blog');
    $role->add_cap('edit_blogs');
    $role->add_cap('edit_others_blogs');
    $role->add_cap('publish_blogs');
    $role->add_cap('read_private_blogs');

     // Add custom post type capabilities
     $role->add_cap('read_home_slider');
     $role->add_cap('edit_home_slider');
     $role->add_cap('delete_home_slider');
     $role->add_cap('edit_home_sliders');
     $role->add_cap('edit_others_home_sliders');
     $role->add_cap('publish_home_sliders');
     $role->add_cap('read_private_home_sliders');


     $role->add_cap('access_acf_options');
}
add_action('admin_init', 'add_contact_us_caps_to_administrator');

function remove_posts_menu_for_author() {
    if (current_user_can('author')) {
        remove_menu_page('edit.php'); // Remove the default "Posts" menu item
        remove_menu_page('edit-comments.php'); // Remove the default "Posts" menu item
        
    }
}
add_action('admin_menu', 'remove_posts_menu_for_author', 999);

// Filter products for authors
function filter_products_for_author($query) {
    if (is_admin() && $query->is_main_query() && $query->get('post_type') === 'product' && !current_user_can('edit_others_products')) {
        $query->set('author', get_current_user_id());
    }
}
add_action('pre_get_posts', 'filter_products_for_author');


add_action('woocommerce_variation_options_pricing', 'add_custom_fields_to_variations', 10, 3);
function add_custom_fields_to_variations($loop, $variation_data, $variation) {
    woocommerce_wp_text_input( 
       [
        'id'          => 'model_no_' . $variation->ID,
        'label'       => __('Model No', 'woocommerce'),
        'class'       => "test",
        'desc_tip'    => 'false',
        'description' => __('Enter the fork size.', 'woocommerce'),
        'palceholder' => 'Model No L x W',
        'value'       => get_post_meta($variation->ID, '_model_no', true)
       ] 
    ); 

    woocommerce_wp_text_input( 
        [
         'id'          => 'fork_size_' . $variation->ID,
         'label'       => __('FORK SIZE', 'woocommerce'),
         'class'       => "test",
         'desc_tip'    => 'false',
         'description' => __('Enter the fork size.', 'woocommerce'),
         'palceholder' => 'FORK SIZE L x W',
         'value'       => get_post_meta($variation->ID, '_fork_size', true)
        ] 
     ); 

    woocommerce_wp_text_input(  [
         'id'          => 'load_capacity_' . $variation->ID,
         'label'       => __('LOAD CAPACITY', 'woocommerce'),
         'class'       => "test",
         'desc_tip'    => 'false',
         'palceholder' => 'LOAD CAPACITY',
         'description' => __('Enter the fork size.', 'woocommerce'),
         'value'       => get_post_meta($variation->ID, '_load_capacity', true)
        ]
     ); 
     woocommerce_wp_text_input(  [
        'id'          => 'height_lowered_' . $variation->ID,
        'label'       => __('HEIGHT LOWERED', 'woocommerce'),
        'class'       => "test",
        'desc_tip'    => 'false',
        'palceholder' => 'HEIGHT LOWERED',
        'description' => __('Enter the fork size.', 'woocommerce'),
        'value'       => get_post_meta($variation->ID, '_height_lowered', true)
       ]
    ); 

    woocommerce_wp_text_input(  [
        'id'          => 'height_raised_' . $variation->ID,
        'label'       => __('HEIGHT RAISED', 'woocommerce'),
        'class'       => "test",
        'desc_tip'    => 'false',
        'palceholder' => 'HEIGHT RAISED',
        'description' => __('Enter the fork size.', 'woocommerce'),
        'value'       => get_post_meta($variation->ID, '_height_raised', true)
       ]
    ); 

    woocommerce_wp_text_input(  [
        'id'          => 'wheel_diameter_' . $variation->ID,
        'label'       => __('WHEEL DIAMETER', 'woocommerce'),
        'class'       => "test",
        'desc_tip'    => 'false',
        'palceholder' => 'WHEEL DIAMETER',
        'description' => __('Enter the fork size.', 'woocommerce'),
        'value'       => get_post_meta($variation->ID, '_wheel_diameter', true)
       ]
    ); 

    woocommerce_wp_text_input(  [
        'id'          => 'wt_lbs_' . $variation->ID,
        'label'       => __('WT.(LBS.)', 'woocommerce'),
        'class'       => "test",
        'desc_tip'    => 'false',
        'palceholder' => 'WT.(LBS.)',
        'description' => __('Enter the fork size.', 'woocommerce'),
        'value'       => get_post_meta($variation->ID, '_wt_lbs', true)
       ]
    ); 
}


add_action('woocommerce_save_product_variation', 'save_custom_fields_variations', 10, 2);
function save_custom_fields_variations($variation_id, $i) {
    if (isset($_POST['fork_size_' . $variation_id])) {
        $fork_size = sanitize_text_field($_POST['fork_size_' . $variation_id]);
        update_post_meta($variation_id, '_fork_size', $fork_size);
    }

    if (isset($_POST['load_capacity_' . $variation_id])) {
        $load_capacity = sanitize_text_field($_POST['load_capacity_' . $variation_id]);
        update_post_meta($variation_id, '_load_capacity', $load_capacity);
    }

    if (isset($_POST['height_lowered_' . $variation_id])) {
        $height_lowered = sanitize_text_field($_POST['height_lowered_' . $variation_id]);
        update_post_meta($variation_id, '_height_lowered', $height_lowered);
    }


    if (isset($_POST['height_raised_' . $variation_id])) {
        $height_raised = sanitize_text_field($_POST['height_raised_' . $variation_id]);
        update_post_meta($variation_id, '_height_raised', $height_raised);
    }

    if (isset($_POST['wheel_diameter_' . $variation_id])) {
        $wheel_diameter = sanitize_text_field($_POST['wheel_diameter_' . $variation_id]);
        update_post_meta($variation_id, '_wheel_diameter', $wheel_diameter);
    }

    if (isset($_POST['wt_lbs_' . $variation_id])) {
        $wt_lbs = sanitize_text_field($_POST['wt_lbs_' . $variation_id]);
        update_post_meta($variation_id, '_wt_lbs', $wt_lbs);
    }
    
    if (isset($_POST['model_no_' . $variation_id])) {
        $model_no = sanitize_text_field($_POST['model_no_' . $variation_id]);
        update_post_meta($variation_id, '_model_no', $model_no);
    }
    
}



if( function_exists('acf_add_options_page') ) {

    // Add a main Options page
    acf_add_options_page(array(
        'page_title'    => 'Theme General Settings',
        'menu_title'    => 'Theme Settings',
        'menu_slug'     => 'theme-general-settings',
        'capability'    => 'access_acf_options',

        'redirect'      => false
    ));

    // // Add subpage under the main Options page
    // acf_add_options_sub_page(array(
    //     'page_title'    => 'Header Settings',
    //     'menu_title'    => 'Header',
    //     'parent_slug'   => 'theme-general-settings',
    // ));

    acf_add_options_sub_page(array(
        'page_title'    => 'Footer Settings',
        'menu_title'    => 'Footer',
        'parent_slug'   => 'theme-general-settings',
        'capability'    => 'access_acf_options',
    ));
}


// Add custom template paths for WooCommerce
add_filter('woocommerce_locate_template', 'sage_child_woocommerce_locate_template', 10, 3);
function sage_child_woocommerce_locate_template($template, $template_name, $template_path) {
    $custom_template = get_theme_file_path('/resources/views/woocommerce/' . $template_name);

    if (file_exists($custom_template)) {
        return $custom_template;
    }
    return $template;
}


function add_custom_user_roles() {
    add_role('customer', __('Customer'), array(
        'read' => true, // true allows this capability
        'edit_posts' => false,
    ));

    add_role('company', __('Company'), array(
        'read' => true,
        'edit_posts' => true, // you can add more capabilities as needed
    ));
}
add_action('init', 'add_custom_user_roles');




// In your theme's functions.php or a custom plugin
function enqueue_custom_script() {
    wp_enqueue_script('custom-script', get_template_directory_uri() . '/js/custom-script.js', array('jquery'), '1.0', true);
    
    // Pass nonce and ajaxUrl to the script
    wp_localize_script('custom-script', 'EnvP', array(
        'ajaxUrl' => admin_url('admin-ajax.php'),
        'nonce' => wp_create_nonce('custom_form_data_nonce')
    ));
}
add_action('wp_enqueue_scripts', 'enqueue_custom_script');




function create_company_taxonomy() {
    $labels = array(
        'name' => 'Companies',
        'singular_name' => 'Company',
        'search_items' => 'Search Companies',
        'all_items' => 'All Companies',
        'parent_item' => 'Parent Company',
        'parent_item_colon' => 'Parent Company:',
        'edit_item' => 'Edit Company',
        'update_item' => 'Update Company',
        'add_new_item' => 'Add New Company',
        'new_item_name' => 'New Company Name',
        'menu_name' => 'Companies',
    );

    $args = array(
        'hierarchical' => false, // Set this to true if you want to use it like categories, false for tags
        'labels' => $labels,
        'show_ui' => true,
        'show_admin_column' => true,
        'query_var' => true,
        'rewrite' => array('slug' => 'company'),
    );

    register_taxonomy('company', array('product'), $args);
}

add_action('init', 'create_company_taxonomy', 0);




add_filter('woocommerce_add_cart_item_data', 'add_custom_data_to_cart_item', 10, 3);
function add_custom_data_to_cart_item($cart_item_data, $product_id, $variation_id) {
    $cart_item_data['custom_data'] = [
        'start_date' => 'test'
    ];
    return $cart_item_data;
}


add_action('woocommerce_checkout_create_order_line_item', 'save_custom_data_in_order_item', 10, 4);
function save_custom_data_in_order_item($item, $cart_item_key, $values, $order) {
    if(isset($values['custom_data'])) {
        $item->add_meta_data('_custom_data', $values['custom_data']);
    }
}


add_filter('woocommerce_rest_prepare_order_line_item_object', 'add_custom_data_to_rest_api', 10, 3);
function add_custom_data_to_rest_api($response, $item, $request) {
    $custom_data = $item->get_meta('_custom_data');
   // if (!empty($custom_data)) {
        $response->data['custom_data'] = $custom_data;
   // }
    return $response;
}

 