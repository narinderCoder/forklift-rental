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

class PageCustomFields
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
         * Example API call: GET <http://klift-rentals.test/wp-json/sage-endpoint/v1/page-custom-fields/>
         */
        self::registerRoute(
            'page-custom-fields',
            WP_REST_Server::READABLE,
            [$this, 'getCustomFields'],
            '(?P<page_id>[\w-]+)',
            array(
                'page_id' => array(
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

     public function getCustomFields(WP_REST_Request $request)
{
    try {
        $page_id = $request->get_param('page_id');
        $page = get_fields($page_id) ?? []; 
        $data = !empty($page) ? $page : []; 
      
        return new WP_REST_Response([
            'data' => $data
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