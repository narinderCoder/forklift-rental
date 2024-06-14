<?php
/*
Plugin Name: Custom Form Data Plugin
Description: A plugin to save and display custom form data.
Version: 1.0
Author: Narinder Singh
*/

// Create custom table on plugin activation
function create_custom_form_table() {
    global $wpdb;
    $table_name = $wpdb->prefix . 'custom_enquiries';
    $charset_collate = $wpdb->get_charset_collate();

    $sql = "CREATE TABLE $table_name (
        id mediumint(9) NOT NULL AUTO_INCREMENT,
        name varchar(255) NULL,
        email varchar(255) NULL, 
        phone varchar(255) NULL, 
        company_address varchar(255) NULL, 
        city_name varchar(255) NULL, 
        state_name varchar(255) NULL, 
        pincode varchar(255) NULL, 
        company_name varchar(255) NULL, 
        question TEXT NULL, 
        user_id int DEFAULT 0, 
        product_id int DEFAULT 0, 
        enquiry_type varchar(255) NULL, 
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY  (id)
    ) $charset_collate;";

    require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
    dbDelta($sql);
}

register_activation_hook(__FILE__, 'create_custom_form_table');

// Register custom admin menu
add_action('admin_menu', 'custom_form_data_menu');

function custom_form_data_menu() {
    add_menu_page(
        'Enquiries',
        'Enquiries',
        'manage_options',
        'custom-form-data',
        'custom_form_data_page',
        'dashicons-list-view',
        6
    );

      // Add submenus for different enquiry types
      add_submenu_page(
        'custom-form-data',
        'Contact us',
        'Contact us',
        'manage_options',
        'custom-form-data',
        'custom_form_data_page'
    );

    add_submenu_page(
        'custom-form-data',
        'Get a Quote',
        'Get a Quote',
        'manage_options',
        'custom-form-data-type1',
        'custom_form_data_page_type1'
    );
}

// Enqueue the necessary scripts
function custom_form_data_scripts() {
    wp_enqueue_script('jquery');
    wp_enqueue_script('datatables', 'https://cdn.datatables.net/1.10.21/js/jquery.dataTables.min.js', array('jquery'), null, true);
    wp_enqueue_script('custom-form-data', plugin_dir_url(__FILE__) . 'custom-form-data.js', array('jquery', 'datatables'), '1.0', true);
    wp_localize_script('custom-form-data', 'custom_form_data_ajax', array(
        'ajax_url' => admin_url('admin-ajax.php'),
        'nonce'    => wp_create_nonce('custom_form_data_nonce'),
    ));
    wp_enqueue_style('datatables-style', 'https://cdn.datatables.net/1.10.21/css/jquery.dataTables.min.css');
}
add_action('admin_enqueue_scripts', 'custom_form_data_scripts');


// AJAX handler for fetching data
// add_action('wp_ajax_fetch_custom_form_data', 'fetch_custom_form_data');

// function fetch_custom_form_data() {
//     check_ajax_referer('custom_form_data_nonce', 'nonce');

//     global $wpdb;
//     $table_name = $wpdb->prefix . 'custom_enquiries';

//     $name_filter = isset($_POST['name']) ? sanitize_text_field($_POST['name']) : '';
//     $email_filter = isset($_POST['email']) ? sanitize_text_field($_POST['email']) : '';

//     $query = "SELECT * FROM $table_name WHERE 1=1";
//     if (!empty($name_filter)) {
//         $query .= $wpdb->prepare(" AND name LIKE %s", '%' . $wpdb->esc_like($name_filter) . '%');
//     }
//     if (!empty($email_filter)) {
//         $query .= $wpdb->prepare(" AND email LIKE %s", '%' . $wpdb->esc_like($email_filter) . '%');
//     }

//     $results = $wpdb->get_results($query, ARRAY_A);

//     wp_send_json_success($results);
// }

function fetch_custom_form_data() {
    check_ajax_referer('custom_form_data_nonce', 'nonce');

    global $wpdb;
    $table_name = $wpdb->prefix . 'custom_enquiries'; 
    $type_filter = isset($_POST['type']) ? sanitize_text_field($_POST['type']) : 'contact-us';
  

    $query = "SELECT * FROM $table_name WHERE enquiry_type='$type_filter'";
    if (!empty($name_filter)) {
        $query .= $wpdb->prepare(" AND name LIKE %s", '%' . $wpdb->esc_like($name_filter) . '%');
    }
    if (!empty($email_filter)) {
        $query .= $wpdb->prepare(" AND email LIKE %s", '%' . $wpdb->esc_like($email_filter) . '%');
    }

    $results = $wpdb->get_results($query, ARRAY_A);

    wp_send_json_success($results);
}
add_action('wp_ajax_fetch_custom_form_data', 'fetch_custom_form_data');


function custom_form_data_page() {
    global $wpdb;
    $table_name = $wpdb->prefix . 'custom_enquiries';

    $type = 'contact-us';

   $results = $wpdb->get_results("SELECT * FROM $table_name WHERE enquiry_type='$type'", ARRAY_A);
 
 
    ?>
    <div class="wrap">
        <h1>Contact Us</h1>
        <input type="hidden" id="filter_type" value="<?=$type?>">
        <table id="custom-form-data-table" class="wp-list-table widefat fixed striped table-view-list">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Message</th>
                    
                </tr>
            </thead>
            <tbody>
                 
            </tbody>
        </table>
    </div>
    <?php
}
function custom_form_data_page_type1() {
    global $wpdb;
    $table_name = $wpdb->prefix . 'custom_enquiries';

    $type = 'get-a-quote';

   $results = $wpdb->get_results("SELECT * FROM $table_name WHERE enquiry_type='$type'", ARRAY_A);
 


    ?>
    <div class="wrap">
        <h1>GET A QUOTES</h1>
        <input type="hidden" id="filter_type" value="<?=$type?>">
        <table id="custom-form-data-table" class="wp-list-table widefat fixed striped table-view-list">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Company Name</th>
                    <th>Company Address</th>
                    <th>City</th>
                    <th>State</th>
                    <th>Zipcode</th>
                    <th>Comment</th>
                </tr>
            </thead>
            <tbody>
             
            </tbody>
        </table>
    </div>
    <?php
}