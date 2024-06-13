<?php

declare(strict_types=1);

namespace App\Controllers;

# Sage Classes
use App\Routes\Traits\RestRouteParams;
use App\Routes\Traits\RestRouteTrait;
use App\Routes\Traits\RestRouteValidate;

# Vendor Packages
use Exception;

# WordPress
use WP_Error;
use WP_HTTP_Response;
use WP_REST_Server;
use WP_REST_Request;
use WP_REST_Response;
use WC_Product_Query, WP_Query;
use function rest_ensure_response;

class HeaderController
{

    use RestRouteTrait;
    use RestRouteValidate;
    use RestRouteParams;

    /**
     * ProductSearchController constructor.
     */
    public function __construct()
    {
        remove_action('rest_api_init', 'rest_api_default_filters', 10);
        add_action('rest_api_init', [$this, 'registerRoutes']);
        add_action('woocommerce_loaded', [$this, 'registerRoutes'], 20); // Use a higher priority
    }

    /**
     * Creates the API Endpoint in WordPress
     */
    public function registerRoutes(): void
    {
        /**
         * Product Search
         * Example API call: GET <https://klifts.test/wp-json/sage-endpoint/v1/header-footer/>
         */
        self::registerRoute(
            'header-footer',
            WP_REST_Server::READABLE,
            [$this, 'getViews'], 
            '',
            [
               
            ]
        ); 
    }

    /**
     * @param WP_REST_Request $request
     *
     * @return WP_HTTP_Response|WP_REST_Response|WP_Error
     */

    public function getViews(WP_REST_Request $request)
    {

        
    //     $cart_contents_count = 0; 
    //     if ( class_exists( 'WooCommerce' ) ) { 
    //         if ( is_object( WC()->cart ) ) { 
    //             $cart_contents_count = WC()->cart->get_cart_contents_count();
                
    //         } 
    //     }  
    //    $cart_contents_count;
        $view = \Roots\view('sections.header',[
             
        ])->render(); 
        $footer = \Roots\view('sections.footer')->render(); 
        // Return the rendered view as JSON response
        return new WP_REST_Response([
            'header' => $view,
            'footer' => $footer
        ], 200);
    }
 
}