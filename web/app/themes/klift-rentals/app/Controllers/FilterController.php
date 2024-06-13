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
class FilterController
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
         * Example API call: GET <http://klifts.test/wp-json/sage-endpoint/v1/get-product-filters/>
         */
        self::registerRoute(
            'get-product-filters',
            WP_REST_Server::READABLE,
            [$this, 'getData'],
            '',
            array( 
                'parent' => array(
                    'type' => 'int',
                    'sanitize_callback' => 'absint',
                    'default' => 0,
                ),
            )
        );
        
       
    }

    /**
     * @param WP_REST_Request $request
     *
     * @return WP_HTTP_Response|WP_REST_Response|WP_Error
     */

     public function getData(WP_REST_Request $request)
    {
        try {
           
             $parent = $request->get_param('parent') ?? 0;
             $category_type = $request->get_param('category_type') ?? 'Rent';
             $data = [];
             if($category_type == 'Rent'){
                $data = [
                    'categories' => $this->getProductCategories($parent,'Rent'),
                    'attributes' => $this->productAttributes()
                ];
             }elseif($category_type == 'Engine'){
                $data = [
                    'categories' => $this->getProductCategories($parent,'Engine'),   
                ];
             }elseif($category_type == 'CHL Forklift Dealer'){
                $data = [
                    'categories' => $this->getProductCategories($parent,'CHL Forklift Dealer'),   
                ];
             }

            return new WP_REST_Response(array(
                'data' => $data 
            ), 200);
 
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
