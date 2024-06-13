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

class ProductController
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
        add_action('rest_api_init', [$this, 'registerRoutes',]);
    }

    /**
     * Creates the API Endpoint in WordPress
     */
    public function registerRoutes(): void
    {
        /**
         * Product Search
         * Example API call: GET <http://klift-rentals.test/wp-json/sage-endpoint/v1/products/>
         */
        self::registerRoute(
            'products',
            WP_REST_Server::READABLE,
            [$this, 'getProducts'],
            '(?P<paged>[\d]+)',
            [
                'paged'  => [
                    'type'              => 'int',
                    'sanitize_callback' => 'absint',
                    'default'           => 1,
                ],
                'search' => [
                    'type'              => 'string',
                    'sanitize_callback' => [$this, 'sanitizeText'],
                ],
            ]
        );
    }

    /**
     * @param WP_REST_Request $request
     *
     * @return WP_HTTP_Response|WP_REST_Response|WP_Error
     */
    public function getProducts(WP_REST_Request $request)//: WP_HTTP_Response|WP_REST_Response|WP_Error
    {
        try {

           



            $paged = $request->get_param('paged') ?? 1;
            $limit = $request->get_param('limit') ?? 10;
            $search = $request->get_param('search') ?? '';
            // $args = [
            //     'paged'              => $paged,
            //     'posts_per_page'     => 12,
            //     's'                  => $search,
            //     'post_type'          => 'product',
            //     'orderby'            => 'title',
            //     'order'              => 'ASC',
            //     'suppress_filters'   => false,
            //     'meta_query'         => WC()->query->get_meta_query(),
            //     'tax_query'          => WC()->query->get_tax_query(),
            // ];

             $args = array(
                'paginate' => true,
                'limit' => $limit,
                'page'  => $paged
            );
            $results = wc_get_products( $args );
            $total_products = $results->total;
            $results->max_num_pages;
            // echo 'Page 1 of ' . $results->max_num_pages . '\n';
            $products = $results->products;
            
            
           
            // Query products
            // $products_query = new WC_Product_Query($args);
            // $products = $products_query->get_products();

           

            // $total_products = $products_query->found_posts;

            // // Calculate total number of pages based on products per page
            // $products_per_page = 12; // Change this if needed
            $total_pages = $total_products > 0 ? ceil($total_products / $limit) : 0;

             $response_data = [
                'data' => $products,
                'total_products' => $total_products,
                'total_pages' => $total_pages,
            ];
         
            $formatted_data = new WP_HTTP_Response($response_data, 200);
           // print_r($formatted_data);
             $formatted_data->header('X-WP-Total', $total_products);
             $formatted_data->header('X-WP-TotalPages', $total_pages);

        } catch (Exception $exception) {
            $formatted_data = new WP_REST_Response([
                'success' => false,
                'status'  => 500,
                'message' => $exception->getMessage(),
            ], 500);
        }

        return rest_ensure_response((object) $formatted_data);
    }
}