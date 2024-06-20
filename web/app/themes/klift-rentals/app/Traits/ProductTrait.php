<?php

declare(strict_types=1);

namespace App\Traits;

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

trait ProductTrait{

    
# GETTING THE PRODUCTS 

    public function getProductRecords($args,$paged,$limit){
        
        $products_query = new WP_Query($args);
        $formatted_products = array();

        while ($products_query->have_posts()) {
            $products_query->the_post();
            global $product; 
            $product_id = $product->get_id();
            $product_data = wc_get_product( $product_id );
            $product_permalink = get_permalink($product_id);
            $formatted_variations = array(); 
            if ($product && $product->is_type('variable')) {
                $variations = $product->get_available_variations(); 
                if(!empty($variations)){
                    foreach ( $variations as $variation ) {

                        $variation_obj = wc_get_product( $variation['variation_id'] ); 
                        $variation_price_html = $variation_obj->get_price_html(); 
    
    
                        $variation_price = $variation_obj->get_price();
                        $variation_regular_price = $variation_obj->get_regular_price();
                        $variation_sale_price = $variation_obj->get_sale_price();
    
                        if ($variation_sale_price && $variation_regular_price) {
                            $discount_percentage = round((($variation_regular_price - $variation_sale_price) / $variation_regular_price) * 100);
                            $variation_price_html = '<del class="p3 text-center text-decoration-line-through text-secondary opacity-50">' . wc_price($variation_regular_price) . '</del>';
                            $variation_price_html .= '<p class="p1 text-center  text-secondary">' . wc_price($variation_sale_price) . '</p>';
                           
                             $variation_price_html .= ' <button class="px-2 text-center py-0.5 text-white rounded-4 bg-primary p3">Save ' . $discount_percentage . '%</button>';
                        } else {
                            $variation_price_html = wc_price($variation_price);
                        }

                        // $variation_obj = wc_get_product( $variation['variation_id'] ); 
                        // $variation_price_html = $variation_obj->get_price_html();
                        $formatted_variations[] = array(
                            'id' => $variation['variation_id'],
                            'attributes' => $variation['attributes'],
                            'price' => $variation_price_html,
                            'currency' => get_woocommerce_currency_symbol()
                            //'variation' => $variation
                        );
                    }
                }
            }
            //$product->get_price_html(),
            $gallery_image_ids = $product->get_gallery_image_ids();
            $gallery_images = [];
            foreach ($gallery_image_ids as $image_id) {
                $gallery_images[] = wp_get_attachment_url($image_id); 
            }
                $formatted_attributes =[];
                $attributes = $product->get_attributes(); 
                foreach($attributes as $attr=>$attr_deets){ 
                    $attribute_label = wc_attribute_label($attr); 
                    if ( isset( $attributes[ $attr ] ) || isset( $attributes[ 'pa_' . $attr ] ) ) { 
                        $attribute = isset( $attributes[ $attr ] ) ? $attributes[ $attr ] : $attributes[ 'pa_' . $attr ]; 
                        if ( $attribute['is_taxonomy'] ) {
                            $values = implode( ', ', wc_get_product_terms( $product->id, $attribute['name'], array( 'fields' => 'names' ) ) ); 
                            $formatted_attributes[]=[
                                'title' => $attribute_label, 
                                'info' => $values,
                                'values' => preg_split('/\s*[,|]\s*/', $values),//explode(' | ',$values),
                                'name' => $attribute['name'],
                                'type' => 0
                            ];
                                
                        } else {
                            $formatted_attributes[]=[
                                'name' => $attribute_label, 
                                'info' => $attribute['value'],
                                'values' =>  preg_split('/\s*[,|]\s*/', $attribute['value']),
                                'title' => $attribute['name'],
                                'type' => 1
                            ];
                        }
                    }
                }
                

                $custom_fields = get_fields($product->ID);
                $formatted_products[] = array(
                    'id'    => $product->get_id(),
                    'name'  => get_the_title(),
                    'price' =>  $product->get_price_html(),
                    'isVariable' => $product->is_type('variable'),
                    'short_description' => $product->get_short_description(),
                    'image' => wp_get_attachment_url($product->get_image_id()),
                    'variations' => $formatted_variations,
                    'images' => $gallery_images,
                    'attributes' => $formatted_attributes, 
                    'detail_page_url'  => $product_permalink, 
                    'custom_fields' => $custom_fields
                );
        }

        // Reset post data to avoid conflicts
        wp_reset_postdata();
        // Return response with formatted products
        return new WP_REST_Response([
            'data' => $formatted_products,
            'meta' => [
                'page'       => $paged,
                'per_page'   => $limit,
                'total'      => $products_query->found_posts,
            ],
        ], 200);
    }


  # Get All Product Attributes
  
  public function productAttributes(){

        // Retrieve all product attributes
        $product_attributes = wc_get_attribute_taxonomies();

        $attributes_list = array();

        foreach ($product_attributes as $attribute) {
            // Get attribute slug
            $attribute_slug = $attribute->attribute_name;

            // Get attribute label
            $attribute_label = $attribute->attribute_label;

            // Get attribute options
            $attribute_options = array();
            $terms = get_terms( array(
                'taxonomy'   => 'pa_' . $attribute_slug,
                'hide_empty' => false,
            ) );
            foreach ($terms as $term) {
                $attribute_options[] = $term->name;
            }

            // Store attribute information
            $attributes_list[] = array(
                'slug'  => $attribute_slug,
                'label' => $attribute_label,
                'options' => $attribute_options
            );
        }

        return $attributes_list;
  }

# Product Categories

public function getProductCategories($parent=0,$type='Rent',$product_fetch=0){
    // Retrieve product categories
      $product_categories = get_terms( array(
            'taxonomy'   => 'product_cat', // Taxonomy for product categories
            'hide_empty' => false, // Show empty categories
            'parent'     => 0, // Get only parent categories
            'meta_query' => array(
                array(
                    'key'     => 'category_type', // ACF field key
                    'value'   => $type, // ACF field value to filter by
                    'compare' => '=', // Comparison operator: equal to
                ),
            ),
        ) );



        // Function to recursively get category hierarchy
        function get_category_hierarchy($t,$parent_id, $level = 0,$product_fetch=0) {
            $categories = get_terms( array(
                'taxonomy'   => 'product_cat',
                'hide_empty' => false,
                'parent'     => $parent_id,
                'meta_query' => array(
                    array(
                        'key'     => 'category_type', // ACF field key
                        'value'   => $t, // ACF field value to filter by
                        'compare' => '=', // Comparison operator: equal to
                    ),
                ),
            ) );
            $category_hierarchy = [];
            foreach ($categories as $category) {
                $data = [
                    'id'     => $category->term_id,
                    'name'   => $category->name,
                    'slug'   => $category->slug,
                    'level'  => $level,
                    'children' => get_category_hierarchy($t,$category->term_id, $level + 1),
                ];

                
                array_push($category_hierarchy,$data);
            }
            return  $category_hierarchy;
        }

        // Get hierarchical category structure
         return get_category_hierarchy($type,$parent,0,$product_fetch); 
}


public function getCategoriesWithProducts($categories,$type){ 

        // Get hierarchical category structure
        $subcategories = [];
        $subcategories = $this->getCategoryHierarchyWithProducts($type,$categories->term_id,0); 
         $categories->subcategories = $subcategories;
        return $categories;
}

 // Function to recursively get category hierarchy
 function getCategoryHierarchyWithProducts($t,$parent_id, $level = 0) {
    $categories = get_terms( 
            array(
            'taxonomy'   => 'product_cat',
            'hide_empty' => false,
            'parent'     => $parent_id,
            'meta_query' => array(
                array(
                    'key'     => 'category_type', // ACF field key
                    'value'   => $t, // ACF field value to filter by
                    'compare' => '=', // Comparison operator: equal to
                ),
            ),
        ) 
    );
    $category_hierarchy = [];
    foreach ($categories as $category) {
        $data = [
            'id'     => $category->term_id,
            'name'   => $category->name,
            'slug'   => $category->slug,
            'level'  => $level,
            'children' => $this->getCategoryHierarchyWithProducts($t,$category->term_id, $level + 1),
        ];
         
        $limit = 100;
        $paged = 1;
        $args = array(
            'paged' => 1,
            'post_type' => 'product',
            'post_status' => 'publish',
            'posts_per_page' => 100, 
            'tax_query' => array(
                array(
                    'taxonomy' => 'product_cat',
                    'field' => 'term_id',
                    'terms' => $category->term_id,
                ),
            ),
        );

       
           
           $data['products'] =  $this->getCategoryProductRecord($args,1,$limit);
        
        array_push($category_hierarchy,$data);
    }
    return  $category_hierarchy;
}

# GETTING THE PRODUCTS 

public function getCategoryProductRecord($args,$paged,$limit){
        
    $products_query = new WP_Query($args);
    $formatted_products = array();

    while ($products_query->have_posts()) {
        $products_query->the_post();
        global $product; 
        $product_id = $product->get_id();
        $product_data = wc_get_product( $product_id );
        $product_permalink = get_permalink($product_id);
        $formatted_variations = array(); 
        if ($product && $product->is_type('variable')) {
            $variations = $product->get_available_variations(); 
            if(!empty($variations)){
                foreach ( $variations as $variation ) {

                    $variation_obj = wc_get_product( $variation['variation_id'] ); 
                    $variation_price_html = $variation_obj->get_price_html();
                    $formatted_variations[] = array(
                        'id' => $variation['variation_id'],
                        'attributes' => $variation['attributes'],
                        'price' => $variation_price_html,
                        'currency' => get_woocommerce_currency_symbol()
                    );
                }
            }
        }
        //$product->get_price_html(),
        $gallery_image_ids = $product->get_gallery_image_ids();
        $gallery_images = [];
        foreach ($gallery_image_ids as $image_id) {
            $gallery_images[] = wp_get_attachment_url($image_id);
            // Do something with the image URL
        // echo '<img src="' . esc_url($image_url) . '" alt="Gallery Image">';
        }
            $formatted_attributes =[];
            $attributes = $product->get_attributes(); 
            foreach($attributes as $attr=>$attr_deets){ 
                $attribute_label = wc_attribute_label($attr); 
                if ( isset( $attributes[ $attr ] ) || isset( $attributes[ 'pa_' . $attr ] ) ) { 
                    $attribute = isset( $attributes[ $attr ] ) ? $attributes[ $attr ] : $attributes[ 'pa_' . $attr ]; 
                    if ( $attribute['is_taxonomy'] ) { 
                        $formatted_attributes[]=['name' => $attribute_label,'slug' => $attribute['slug'], 'info' =>implode( ', ', wc_get_product_terms( $product->id, $attribute['name'], array( 'fields' => 'names' ) ) )];
                         
                    } else {
                        $formatted_attributes[]=['name' => $attribute_label,'slug' => $attribute['slug'], 'info' => $attribute['value']];
                    }
                }
            }
            $formatted_products[] = array(
                'id'    => $product->get_id(),
                'name'  => get_the_title(),
                'price' => $product->get_price_html(),
                'isVariable' => $product->is_type('variable'),
                'short_description' => $product->get_short_description(),
                'image' => wp_get_attachment_url($product->get_image_id()),
                'variations' => $formatted_variations,
                'images' => $gallery_images,
                'attributes' => $formatted_attributes, 
                'detail_page_url'  => $product_permalink,
            );
    }

    // Reset post data to avoid conflicts
    wp_reset_postdata();
    // Return response with formatted products
    return  $formatted_products;
    return  [
        $formatted_products,
        'meta' => [
            'page'       => $paged,
            'per_page'   => $limit,
            'total'      => $products_query->found_posts,
        ],
    ];
}



// Get product details

public function getProduct($product_id){

    $query = new WP_Query(array(
        'p' => $product_id,  // Use 'p' parameter for querying by ID
        'post_type' => 'product',
        'post_status' => 'publish',
    ));

    $attribute_array = [];

    if (!$query->have_posts()) {
        return new WP_Error('no_product', 'Product not found', array('status' => 404));
    }
        $query->the_post();
        $product = wc_get_product(get_the_ID()); 
        $product_id = $product->get_id();
        $product_data = wc_get_product( $product_id );
        $product_permalink = get_permalink($product_id);
        $formatted_variations = array(); 
        $selected_variation = [];
        $product_cats = wp_get_post_terms(get_the_ID(), 'product_cat');
        if ($product && $product->is_type('variable')) {
            $variations = $product->get_available_variations(); 
            if(!empty($variations)){
                foreach ( $variations as $variation ) { 
                    $variation_obj = wc_get_product( $variation['variation_id'] ); 
                    $variation_price_html = $variation_obj->get_price_html(); 


                    $variation_price = $variation_obj->get_price();
                    $variation_regular_price = $variation_obj->get_regular_price();
                    $variation_sale_price = $variation_obj->get_sale_price();

                    if ($variation_sale_price && $variation_regular_price) {
                        $discount_percentage = round((($variation_regular_price - $variation_sale_price) / $variation_regular_price) * 100);
                        $variation_price_html = '<del class="p3 text-center text-decoration-line-through text-secondary opacity-50">' . wc_price($variation_regular_price) . '</del>';
                            $variation_price_html .= '<p class="p1 text-center  text-secondary">' . wc_price($variation_sale_price) . '</p>';
                           
                             $variation_price_html .= ' <button class="px-2 text-center py-0.5 text-white rounded-4 bg-primary p3">Save ' . $discount_percentage . '%</button>';
                       } else {
                        $variation_price_html = wc_price($variation_price);
                    }

                    
               


                    $fields = [
                        'model_no' => esc_html(get_post_meta($variation['variation_id'], '_model_no', true)),
                        'fork_size' => esc_html(get_post_meta($variation['variation_id'], '_fork_size', true)),
                        'load_capacity' => esc_html(get_post_meta($variation['variation_id'], '_load_capacity', true)),
                        'height_lowered' => esc_html(get_post_meta($variation['variation_id'], '_height_lowered', true)),
                        'height_raised' => esc_html(get_post_meta($variation['variation_id'], '_height_raised', true)),
                        'wheel_diameter' => esc_html(get_post_meta($variation['variation_id'], '_wheel_diameter', true)),
                        'wt_lbs' => esc_html(get_post_meta($variation['variation_id'], '_wt_lbs', true)),
                    ];

                  //  $data = $variation_obj->get_attributes();


                    $atts =[];
                    $str = '';
                    foreach ($variation_obj->get_attributes() as $key => $value) { 
                        if(!in_array($key,$attribute_array)){ 
                            $attribute_array[] = $key;
                        } 
                        if(!empty($str)){
                            $str .='_';
                        }
                       
                        $str .=$value;
                        $atts[] =[
                            'key' => $key,
                            'value' => $value,
                            'slug' => $str,
                            'id' => $variation['variation_id'],
                        ];
                    }
             
                    // $attribute_array[] =;
                    $current_variation =  array(
                        'id' => $variation['variation_id'],
                        'atts' => $atts,
                        'attributes' => $variation['attributes'],
                        'price' => $variation_price_html,
                        'currency' => get_woocommerce_currency_symbol(),
                        //'variation' => $variation,
                        'fields' => $fields
                    );
                    $formatted_variations[] = $current_variation;
                    if(empty($selected_variation)){
                        $selected_variation = $current_variation;
                    }
                }
            }
        }
        //$product->get_price_html(),
        $gallery_image_ids = $product->get_gallery_image_ids();
        $gallery_images = [];
        foreach ($gallery_image_ids as $image_id) {
            $gallery_images[] = wp_get_attachment_url($image_id); 
        }
        $formatted_attributes =[];
        $attributes = $product->get_attributes(); 
        foreach($attributes as $attr => $attr_deets){ 
            
            $attribute_label = wc_attribute_label($attr); 
            if ( isset( $attributes[ $attr ] ) || isset( $attributes[ 'pa_' . $attr ] ) ) { 
                $attribute = isset( $attributes[ $attr ] ) ? $attributes[ $attr ] : $attributes[ 'pa_' . $attr ]; 
                if ( $attribute['is_taxonomy'] ) {
                    $values = implode( ', ', wc_get_product_terms( $product->id, $attribute['name'], array( 'fields' => 'names' ) ) ); 
                    $formatted_attributes[]=[
                        'title' => $attribute_label, 
                        'info' => $values,
                        'values' => preg_split('/\s*[,|]\s*/', $values),//explode(' | ',$values),
                        'name' => $attribute['name'],
                        'type' => 0
                    ];
                        
                } else {
                    $formatted_attributes[]=[
                        'name' => $attribute_label, 
                        'info' => $attribute['value'],
                        'values' =>  preg_split('/\s*[,|]\s*/', $attribute['value']),
                        'title' => $attribute['name'],
                        'type' => 1
                    ];
                }
            }
        }
        $custom_fields = get_fields($product->ID);
        $review_count = $product->get_review_count();
        $average_rating = $product->get_average_rating();
       $data = array(
            'id'    => $product->get_id(),
            'name'  => get_the_title(),
            'price' => $product->get_price_html(),
            'isVariable' => $product->is_type('variable'),
            'description' => $product->get_description(),
            'short_description' => $product->get_short_description(),
            'image' => wp_get_attachment_url($product->get_image_id()),
            'variations' => $formatted_variations,
            'images' => $gallery_images,
            'attributes' => $formatted_attributes, 
            'detail_page_url'  => $product_permalink,
            'variation_attributes' => $attribute_array,
            'custom_fields' => $custom_fields,
            'review_count' => $review_count,
            'average_rating' => $average_rating,
            'selected_variation' => $selected_variation,
            'product_cats' => $product_cats
        );

        wp_reset_postdata();  

        return $data;
}


    function calculate_distance($lat1, $lon1, $lat2, $lon2, $unit = 'km') {
        $theta = $lon1 - $lon2;
        $dist = sin(deg2rad($lat1)) * sin(deg2rad($lat2)) +  cos(deg2rad($lat1)) * cos(deg2rad($lat2)) * cos(deg2rad($theta));
        $dist = acos($dist);
        $dist = rad2deg($dist);
        $miles = $dist * 60 * 1.1515;
        $unit = strtoupper($unit);
        if ($unit == "K") {
            return ($miles * 1.609344);
        } else if ($unit == "N") {
            return ($miles * 0.8684);
        } else {
            return $miles;
        }
    }



    function filter_companies_by_radius($lat, $lng, $radius = 10) {
        global $wpdb;
    
        // Calculate the bounding box coordinates
        $radius = floatval($radius);
        $lat = floatval($lat);
        $lng = floatval($lng);
    
        $km_per_degree = 111.12; // Approximately 111.12 kilometers per degree of latitude
    
        $lat_delta = $radius / $km_per_degree;
        $lng_delta = $radius / (cos(deg2rad($lat)) * $km_per_degree);
    
        $lat_min = $lat - $lat_delta;
        $lat_max = $lat + $lat_delta;
        $lng_min = $lng - $lng_delta;
        $lng_max = $lng + $lng_delta;
    
        // Query to filter companies within the bounding box
        $query = "
            SELECT DISTINCT t.*, 
                ACOS(SIN(RADIANS(m.meta_value)) * SIN(RADIANS($lat)) +
                     COS(RADIANS(m.meta_value)) * COS(RADIANS($lat)) *
                     COS(RADIANS(m2.meta_value) - RADIANS($lng))) * 6371 AS distance
            FROM {$wpdb->terms} AS t
            INNER JOIN {$wpdb->termmeta} AS m ON t.term_id = m.term_id
            INNER JOIN {$wpdb->termmeta} AS m2 ON t.term_id = m2.term_id
            WHERE m.meta_key = 'company_latitude'
            AND m2.meta_key = 'company_longitude'
            AND m.meta_value BETWEEN $lat_min AND $lat_max
            AND m2.meta_value BETWEEN $lng_min AND $lng_max
            HAVING distance <= $radius
            ORDER BY distance ASC;
        ";
    
        $results = $wpdb->get_results($query);
    
        return $results;
    }
    




}