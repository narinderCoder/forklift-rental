<?php

// declare(strict_types=1);

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
class PostProductsByCategory
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
          // Remove default REST API authentication filters
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
         * Example API call: POST <http://klifts.test/wp-json/sage-endpoint/v1/products-by-category/>
         */
        self::registerRoute(
            'products-by-category',
            WP_REST_Server::CREATABLE,
            [$this, 'getProductsByCategory'],
            '(?P<category_slug>[\w-]+)/(?P<paged>[\d]+)',
            array(
                'category_slug' => array(
                    'type' => 'string',
                ),
                'paged' => array(
                    'type' => 'int',
                    'sanitize_callback' => 'absint',
                    'default' => 1,
                ),
               
                 
            )
        );
    }

    /**
     * @param WP_REST_Request $request
     *
     * @return WP_HTTP_Response|WP_REST_Response|WP_Error
     */
    public function getProductsByCategory(WP_REST_Request $request)
    {
        try {
            $category_slug = $request->get_param('category_slug');
            $category_ids = $request->get_param('categories');
            $paged = $request->get_param('paged') ?? 1;
            $limit =  $request->get_param('limit') ?? 10;
            $search_keyword = $request->get_param('search') ?? '';
    
            // Get category ID from slug
            $category = get_term_by('slug', $category_slug, 'product_cat');
 
            if (!$category) {
                throw new Exception('Category not found');
            } 
           
            
            $cate= []; 
            $cate['taxonomy'] = 'product_cat';
            $cate['field'] = 'term_id';
            if(count($category_ids) > 0){ 
             $cate['terms'] = $category_ids;
            }else{
              $cate['terms'] = $category->term_id;
            }
           
            $tax_query[] = $cate;
            // Get attribute terms from the request
            $attributes = $request->get_param('attributes'); 
            // Loop through attributes and add them to the tax query
                if (!empty($attributes) && is_array($attributes)) {
                        foreach ($attributes as $attribute_slug => $attribute_term) {
                            $tax_query[] = array(
                                'taxonomy' => 'pa_' . $attribute_slug, // Replace 'pa_' with the actual attribute prefix
                                'field' => 'slug',
                                'terms' => $attribute_term,
                            );
                        }
                }

            // Query arguments
           $args = array(
                'paged' => $paged,
                'post_type' => 'product',
                'post_status' => 'publish',
                'posts_per_page' => $limit,
                'tax_query' => $tax_query,
            );

            if (!empty($search_keyword)) {
                $args['s'] = $search_keyword;
                $args['post_title_like'] = $search_keyword; // Specify the search on product title
            } 

            return $this->getProductRecords($args,$paged,$limit); 
        } catch (Exception $exception) {
            // Log the error
            error_log('Error in ProductCategory API: ' . $exception->getMessage());
    
            // Return error response
            return new WP_REST_Response(array(
                'success' => false,
                'status' => 500,
                'message' => 'An error occurred while fetching products by category.',
            ), 500);
        }
    }
    
}