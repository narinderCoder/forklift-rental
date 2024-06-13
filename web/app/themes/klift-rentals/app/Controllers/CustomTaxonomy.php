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

class CustomTaxonomy
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
    }

    /**
     * Creates the API Endpoint in WordPress
     */
    public function registerRoutes(): void
    {
         /**
         * Product Search
         * Example API call: GET <http://klift-rentals.test/wp-json/sage-endpoint/v1/custom-taxonomy/>
         */
        self::registerRoute(
            'custom-taxonomy',
            WP_REST_Server::READABLE,
            [$this, 'getCustomTaxanomy'],
            '(?P<type>[\w-]+)',
            array(
                'type' => array(
                    'type' => 'string',
                )
                 
            )
        );
        
    }

    /**
     * @param WP_REST_Request $request
     *
     * @return WP_HTTP_Response|WP_REST_Response|WP_Error
     */

     public function getCustomTaxanomy(WP_REST_Request $request)
{
    try {
        $type = $request->get_param('type');
        
        

        $args = array(
            'taxonomy'   => $type, // Taxonomy name
            'hide_empty' => false,    // Set to true if you want to hide empty brands
        );
    
        $brands = get_terms( $args );

        $response = array();
    
        foreach ( $brands as $brand ) {
            // Get image URL from custom field (post meta)
            $image_url = get_field( 'image', 'brand_' . $brand->term_id );
    
            $response[] = array(
                'id'         => $brand->term_id,
                'name'       => $brand->name,
                'image_url'  => $image_url,
                // You can add more fields as needed
            );
        }
    
        return new WP_REST_Response([
            'data' => $response
        ], 200);
        
    } catch (Exception $exception) {
        // Log the error
        error_log('Error in ProductCategory API: ' . $exception->getMessage());

        // Return error response
        return new WP_REST_Response(array(
            'success' => false,
            'status' => 500,
            'message' => 'An error occurred while fetching product categories.',
        ), 500);
    }
}

    
}