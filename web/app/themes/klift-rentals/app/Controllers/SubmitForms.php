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
class SubmitForms
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
         * Example API call: POST <http://klifts.test/wp-json/sage-endpoint/v1/custom-form-submission/>
         */
        self::registerRoute(
            'custom-form-submission',
            WP_REST_Server::CREATABLE,
            [$this, 'createFormData'],
            '(?P<meta_type>[\w-]+)',
            array(
                'meta_type' => array(
                    'type' => 'string',
                ), 
            )
        );
    }

    /**
     * @param WP_REST_Request $request
     *
     * @return WP_HTTP_Response|WP_REST_Response|WP_Error
     */
    public function createFormData(WP_REST_Request $request)
    {
        try {
            $meta_type = $request->get_param('meta_type');
        
            switch ($meta_type) {
                case 'post-comment':
                    $parent_comment = $request->get_param('parent_comment') ?? 0;
                    $post_id = $request->get_param('post_id');
                    $content = $request->get_param('content');
                    $user_id = $request->get_param('id') ?? 0;
                   return  $this->save_comment($post_id,$content,$user_id,$parent_comment);
                    break;
                case 'post-contact-us':      
                    return $this->saveContactUs($request);
                    break;
                case 'post-quote':   
                    return $this->getQuoteSave($request);
                    break;
                default:
                    # code...
                    break;
            }
            //return $this->getProductRecords($args,$paged,$limit); 
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