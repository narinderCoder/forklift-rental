<?php
// /app/woocommerce.php

namespace App;

use function Roots\view;

            

// Function to handle AJAX add to cart for product variations
function custom_ajax_add_to_cart() {
    $product_id = intval($_REQUEST['product_id']);
    $variation_id = intval($_REQUEST['variation_id']);
    $quantity = intval($_REQUEST['quantity']);
    if($quantity < 1){
        $response = array('success' => false, 'message' => 'Please add quantity.');
    }elseif ($product_id > 0 && $variation_id > 0 && wc_get_product($product_id) && wc_get_product($variation_id)) {
        // $cart_item_key = WC()->cart->add_to_cart($product_id, $quantity);
        global $woocommerce;
        $cart_item_key = $woocommerce->cart->add_to_cart($product_id,$quantity,$variation_id);
        if ($cart_item_key) {
            $response = array('success' => true, 'message' => 'Product variation added to cart!');
        } else {
            $response = array('success' => false, 'message' => 'Failed to add product variation to cart2.');
        }
    } else {
        $response = array('success' => false, 'message' => 'Invalid product or variation ID.');
    }
    echo json_encode($response);
    wp_die();
}
add_action('wp_ajax_custom_add_to_cart', 'App\\custom_ajax_add_to_cart');
add_action('wp_ajax_nopriv_custom_add_to_cart', 'App\\custom_ajax_add_to_cart');





function custom_ajax_update_cart_item_quantity() {
    // Ensure the script is being run within WordPress and WooCommerce context
    if (!defined('ABSPATH') || !function_exists('WC')) {
        wp_die();
    }
 

    // Retrieve the cart item key and the new quantity from the AJAX request
    $cart_item_key = isset($_REQUEST['cart_item_key']) ? sanitize_text_field($_REQUEST['cart_item_key']) : '';
    $quantity = isset($_REQUEST['quantity']) ? intval($_REQUEST['quantity']) : 0;
    $type = isset($_REQUEST['type']) ?  $_REQUEST['type'] : 'add';

    // Validate the quantity
    if ($quantity < 1 && $type == 'add') {
        $response = array('success' => false, 'message' => 'Quantity must be at least 1.');
        echo json_encode($response);
        wp_die();
    }

    // Get the cart
    $cart = WC()->cart->get_cart(); 
    $response = array('success' => false, 'message' => 'Cart item not found.');
    // Check if the cart item exists
    if($type == 'remove' && isset($cart[$cart_item_key])) { 
            WC()->cart->set_quantity($cart_item_key, $quantity, true);  
            $response = array('success' => true, 'message' => 'Cart item removeed successfully!'); 
    }elseif($type == 'add' && isset($cart[$cart_item_key])) {  
            WC()->cart->set_quantity($cart_item_key, $quantity, true);  
            $response = array('success' => true, 'message' => 'Cart item quantity updated!'); 
    } 
    // Send the response back to the AJAX request
    echo json_encode($response);
    wp_die();
}

// Hook the function to handle both logged-in and guest users
add_action('wp_ajax_custom_update_cart_item_quantity', 'App\\custom_ajax_update_cart_item_quantity');
add_action('wp_ajax_nopriv_custom_update_cart_item_quantity', 'App\\custom_ajax_update_cart_item_quantity');


// add_action('wp_ajax_custom_add_to_cart', 'App\\custom_ajax_add_to_cart');
// add_action('wp_ajax_nopriv_custom_add_to_cart', 'App\\custom_ajax_add_to_cart');



