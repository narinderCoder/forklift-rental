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
use App\Traits\ProductTrait;
class WcProducts
{

    use RestRouteTrait;
    use RestRouteValidate;
    use RestRouteParams;
    use ProductTrait;

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
         * Example API call: GET <http://klift-rentals.test/wp-json/sage-endpoint/v1/get-featured-products/>
         */
        self::registerRoute(
            'get-featured-products',
            WP_REST_Server::READABLE,
            [$this, 'getFeaturedproducts'],
            '(?P<page>[\w-]+)',
            array(
                'page' => array(
                    'type' => 'string',
                ),
                'per_page' => array(
                    'type'     => 'integer',
                    'default'  => 10,
                   
                )
                 
            )
        );
        
       
    }

    /**
     * @param WP_REST_Request $request
     *
     * @return WP_HTTP_Response|WP_REST_Response|WP_Error
     */

     public function getFeaturedProducts(WP_REST_Request $request)
    {
        try {
            $paged = (int) $request->get_param('page');
            $limit = (int) $request->get_param('per_page');
 
            $tax_query[] = array(
                'taxonomy' => 'product_visibility',
                'field'    => 'name',
                'terms'    => 'featured',
                'operator' => 'IN', // or 'NOT IN' to exclude feature products
            );
            
            // The query
            $args = array(
                'paged'               => $paged,
                'post_type'           => 'product',
                'post_status'         => 'publish', 
                'posts_per_page'      => $limit, 
                'tax_query'           => $tax_query // <===
            );

            return $this->getProductRecords($args,$paged,$limit);
 
        } catch (Exception $exception) {
            // Log the error
            error_log('Error in Product API: ' . $exception->getMessage());

            // Return error response
            return new WP_REST_Response(array(
                'success' => false,
                'status'  => 500,
                'message' => 'An error occurred while fetching products.',
            ), 500);
        }
    }
}
