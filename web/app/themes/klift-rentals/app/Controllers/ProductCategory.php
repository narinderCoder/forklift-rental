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

class ProductCategory
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
         * Example API call: GET <http://klift-rentals.test/wp-json/sage-endpoint/v1/product-categories/>
         */
        self::registerRoute(
            'product-categories',
            WP_REST_Server::READABLE,
            [$this, 'getProductCategories'], 
            '',
            [
               'slug' => [
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

     public function getProductCategories(WP_REST_Request $request)
{
    try {
        $args = array(
            'taxonomy'   => 'product_cat', // Assuming your product categories are under the 'product_cat' taxonomy
            'hide_empty' => false, // Include categories with no products
            'parent'     => 0, // Get only parent categories
        );
        
        $parent_categories = get_terms($args);  
        $response_data = array(); 
        $selectedParent ='';
        foreach ($parent_categories as $k => $parent_category) {
           $category_type = get_field('category_type', 'product_cat_' . $parent_category->term_id);
           if($category_type == 'Rent' || $category_type == 'Sale'){
                $categories = array();
                $subcategories_data = array();
                // Get category image URL
                $thumbnail_id = get_term_meta($parent_category->term_id, 'thumbnail_id', true);
                $image_url = wp_get_attachment_url($thumbnail_id);
            
                
                $sub_args = array(
                    'taxonomy'   => 'product_cat', 
                    'hide_empty' => false,
                    'parent'     => $parent_category->term_id, // Get subcategories of the current parent
                );

                if($selectedParent == ''){
                    $selectedParent = $parent_category->slug;
                }
            
                $subcategories = get_terms($sub_args); 
            
                foreach ($subcategories as $subcategory) {
                    // Get subcategory image URL
                    $subcategory_thumbnail_id = get_term_meta($subcategory->term_id, 'thumbnail_id', true);
                    $subcategory_image_url = wp_get_attachment_url($subcategory_thumbnail_id);
                    
                    // Get the parent category
                    $parent_category = get_term_by('id', $subcategory->parent, 'product_cat');

                    // Get the parent category link
                    $parent_category_link = '';
                    if ($parent_category) {
                        $parent_category_link = get_term_link($parent_category);
                        $parent_category_link = !is_wp_error($parent_category_link) ? esc_url($parent_category_link) : '';
                    }

                    // Construct custom URL by appending subcategory slug to the parent category link
                    $link = $parent_category_link ? trailingslashit($parent_category_link) . $subcategory->slug : '';

                    $categories[] = array(
                        'id' => $subcategory->term_id,
                        'name' => $subcategory->name,
                        'slug' => $subcategory->slug,
                        'parent' =>$parent_category->slug,
                        'link' => $link,
                        'image_url' => $subcategory_image_url, // Include subcategory image URL
                        
                    ); 
                    $subcategories_data = $this->getChildCategories($subcategory,$subcategories_data);
                } 
                $response_data[] = array(
                    
                        'id' => $parent_category->term_id,
                        'name' => $parent_category->name,
                        'slug' => $parent_category->slug,
                        'category_type'=> $category_type,
                        'image_url' => $image_url, // Include parent category image URL 
                        'categories' => $categories,
                        'subcategories' => $subcategories_data
                        
                );
            }
        }
        
        return new WP_REST_Response([
            'selectedParent' => $selectedParent,
            'parent_categories' => $response_data,
            // 'categories' => $subcate,
           
            // 'subcategories' => $subcategories_data
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


public function getChildCategories($parent_category,$subcate=[]) {

   // Get subcategories for each parent category
        $sub_args = array(
            'taxonomy'   => 'product_cat',
            'hide_empty' => false,
            'parent'     => $parent_category->term_id, // Get subcategories of the current parent
        );

        $subcategories = get_terms($sub_args);
       // $subcate = array();
            foreach ($subcategories as $subcategory) {
                // Get subcategory image URL
                $subcategory_thumbnail_id = get_term_meta($subcategory->term_id, 'thumbnail_id', true);
                $subcategory_image_url = wp_get_attachment_url($subcategory_thumbnail_id); 
                // Get the parent category
                $parent_category = get_term_by('id', $subcategory->parent, 'product_cat'); 
                // Get the parent category link
                $parent_category_link = '';
                if ($parent_category) {
                    $parent_category_link = get_term_link($parent_category);
                    $parent_category_link = !is_wp_error($parent_category_link) ? esc_url($parent_category_link) : '';
                } 
                // Construct custom URL by appending subcategory slug to the parent category link
                $link = $parent_category_link ? trailingslashit($parent_category_link) . $subcategory->slug : '';

                $subcate[] = array(
                    'id' => $subcategory->term_id,
                    'name' => $subcategory->name,
                    'slug' => $subcategory->slug,
                    'parent' =>$parent_category->slug,
                    'link' => $link,
                    'image_url' => $subcategory_image_url, // Include subcategory image URL
                ); 
            }
        return $subcate;
}

    
}