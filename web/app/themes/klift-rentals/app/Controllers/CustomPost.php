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
use App\Traits\PostTrait;
class CustomPost
{

    use RestRouteTrait;
    use RestRouteValidate;
    use RestRouteParams;
    use PostTrait;

    /**
     * ProductSearchController constructor.
     */
    public function __construct()
    {
        // remove_action('rest_api_init', 'rest_api_default_filters', 10);
        add_action('rest_api_init', [$this, 'registerRoutes']);
    }

    /**
     * Creates the API Endpoint in WordPress
     */
    public function registerRoutes(): void
    {
         /**
         * Product Search
         * Example API call: GET <http://klifts.test/wp-json/sage-endpoint/v1/custom-posts/>
         */
        self::registerRoute(
            'custom-posts',
            WP_REST_Server::READABLE,
            [$this, 'getCustomPosts'],
            '(?P<post_type>[\w-]+)',
            array(
                'post_type' => array(
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

public function getCustomPosts(WP_REST_Request $request)
{
    try {
       
        $post_type = $request->get_param('post_type');
        $type = $request->get_param('meta_key') ?? 'posts';
        $slug = $request->get_param('slug') ?? 'my-custom-slug';
         $loadComment = $request->get_param('loadComment') ?? 10;
        switch ($type) {
            case 'posts':
                $author = $request->get_param('author') ?? 0;
                $args = array(
                    'post_type' => $post_type,
                    'post_status' => 'publish',
                    'posts_per_page' => -1,
                ); 
                $data = $this->getPosts($args); 
                break;
            case 'recent-posts':
                $args = array(
                    'post_type'      => $post_type,
                    'posts_per_page' => -1,
                    'fields'         => 'ids', // Retrieve only post IDs to minimize data retrieval
                    'date_query'     => array(
                        array(
                            'after' => '1 week ago', // Change this to your desired time frame
                        ),
                    ),
                ); 
                $data = $this->getRecentPosts($args);  
                break;
            case 'post-detail':
                $data = $this->getPost($slug,$loadComment); 
                break;
                    
            default:
                 $data = [];
                break;
        }

 
        return new WP_REST_Response([
            'data' => $data
        ], 200);
        
    } catch (Exception $exception) {
        // Log the error
        // error_log('Error in ProductCategory API: ' . $exception->getMessage());

        // Return error response
        return new WP_REST_Response(array(
            'success' => false,
            'status' => 500,
            'message' => 'An error occurred while fetching product categories.',
        ), 500);
    }
}

    
}