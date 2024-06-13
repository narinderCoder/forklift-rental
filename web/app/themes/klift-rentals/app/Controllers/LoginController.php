<?php

namespace App\Controllers;

use \Firebase\JWT\JWT;
use WP_REST_Request;
use WP_REST_Response;
use WP_Error;

class LoginController {

    public function __construct() {
        add_action('rest_api_init', function() {
            register_rest_route('custom/v1', '/login', array(
                'methods' => 'POST',
                'callback' => [$this, 'handle_custom_login'],
                'permission_callback' => '__return_true', // Allow public access
            ));
        });
    }

    public function handle_custom_login(WP_REST_Request $request) {
        $username = $request->get_param('username');
        $password = $request->get_param('password');

        if (empty($username) || empty($password)) {
            return new WP_REST_Response(array('message' => 'Invalid username or password.'), 400);
        }

        $user = wp_authenticate($username, $password);

        if (is_wp_error($user)) {
            return new WP_REST_Response(array('message' => 'Invalid username or password.'), 403);
        }

        // Generate JWT token
        $user_id = $user->ID;
        $issued_at = time();
        $expiration_time = $issued_at + (60 * 60); // JWT valid for 1 hour
        $payload = array(
            'iss' => get_site_url(), // Issuer
            'iat' => $issued_at, // Issued at
            'exp' => $expiration_time, // Expiration time
            'user_id' => $user_id
        );

        $secret_key = 'your_secret_key'; // Replace with your secret key
        $jwt = JWT::encode($payload, $secret_key);

        // Retrieve user information
        $user_data = array(
            'ID' => $user_id,
            'username' => $user->user_login,
            'email' => $user->user_email,
            'display_name' => $user->display_name,
            'token' => $jwt
        );

        return new WP_REST_Response($user_data, 200);
    }
}

// Initialize the LoginController
new LoginController();
