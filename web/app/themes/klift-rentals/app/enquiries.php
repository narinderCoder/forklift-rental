<?php
namespace App;

use function Roots\view;

// AJAX handler for saving data
add_action('wp_ajax_save_custom_form_data', 'App\\save_custom_form_data');
add_action('wp_ajax_nopriv_save_custom_form_data', 'App\\save_custom_form_data');

function save_custom_form_data() {
    // Log to a file for debugging
    error_log('AJAX request received');

    // Check for nonce security
    // if (!check_ajax_referer('custom_form_data_nonce', 'nonce', false)) {
    //     wp_send_json_error(array('message' => 'Invalid nonce'));
    //     return;
    // }

    $nonce = isset($_REQUEST['nonce']) ? $_REQUEST['nonce'] : '';
 

    if (!wp_verify_nonce($nonce, 'custom_form_data_nonce')) {
        wp_send_json_error(array('message' => 'Invalid nonces'));
        return;
    }

    global $wpdb;
    $table_name = $wpdb->prefix . 'custom_enquiries';

    // Print the entire request to debug
    error_log(print_r($_POST, true));
    print_r($_POST);
    die;

    // Retrieve data from the request
    $name = sanitize_text_field($_POST['name']);
    $email = sanitize_email($_POST['email']);
    $phone = sanitize_text_field($_POST['phone']);
    $company_address = sanitize_text_field($_POST['company_address']);
    $city_name = sanitize_text_field($_POST['city_name']);
    $state_name = sanitize_text_field($_POST['state_name']);
    $pincode = sanitize_text_field($_POST['pincode']);
    $company_name = sanitize_text_field($_POST['company_name']);
    $question = sanitize_textarea_field($_POST['question']);
    $user_id = intval($_POST['user_id']);
    $product_id = intval($_POST['product_id']);
    $enquiry_type = sanitize_text_field($_POST['enquiry_type']);

    // Validate required fields
    if (empty($name) || empty($email)) {
        wp_send_json_error(array('message' => 'Name and Email are required fields'));
    }

    // Insert data into the database
    $result = $wpdb->insert($table_name, array(
        'name' => $name,
        'email' => $email,
        'phone' => $phone,
        'company_address' => $company_address,
        'city_name' => $city_name,
        'state_name' => $state_name,
        'pincode' => $pincode,
        'company_name' => $company_name,
        'question' => $question,
        'user_id' => $user_id,
        'product_id' => $product_id,
        'enquiry_type' => $enquiry_type,
    ));

    if ($result === false) {
        wp_send_json_error(array('message' => 'Failed to insert data into the database'));
    } 
    wp_send_json_success(array('message' => 'Data saved successfully'));
}



