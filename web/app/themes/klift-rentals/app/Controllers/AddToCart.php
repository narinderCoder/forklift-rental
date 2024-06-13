<?php

declare(strict_types=1);

namespace App\Controllers;
// include_once WC_ABSPATH . 'includes/wc-cart-functions.php';
// include_once WC_ABSPATH . 'includes/class-wc-cart.php';
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
use WC;
use WC_Product_Query, WP_Query;
use function rest_ensure_response;

class AddToCart
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
        // add_action('woocommerce_loaded', [$this, 'registerRoutes'], 20); // Use a higher priority
        
    }

    /**
     * Creates the API Endpoint in WordPress
     */
    public function registerRoutes(): void
    {
        /**
         * Product Search
         * Example API call: GET <http://klifts.test/wp-json/sage-endpoint/v1/add-to-cart/>
         */
        self::registerRoute(
            'add-to-cart',
            WP_REST_Server::CREATABLE,
            [$this, 'addToCart'],
            '',
            [
                
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
    public function addToCart(WP_REST_Request $request)
    {
        try {
            // Check if WooCommerce is active
            if (!function_exists('WC')) {
                return new WP_Error('woocommerce_not_active', 'WooCommerce is not active', array('status' => 500));
            }
    
            // Initialize WooCommerce
          
            $product_id = (int) $request->get_param('product_id') ?? 0;
            $quantity = (int) $request->get_param('quantity') ?? 1;
            $options = $request->get_param('options') ?? array();
            $variation_id = (int) $request->get_param('variation_id') ?? 0;
    
            // Validate product ID
            if ($product_id <= 0) {
                return new WP_Error('invalid_product_id', 'Invalid product ID', array('status' => 400));
            }
    
            // Get product
            $product = wc_get_product($product_id);
            if (!$product) {
                return new WP_Error('no_product', 'Product not found', array('status' => 404));
            }
    
            // Handle variable product options
            // $variation_id = 0;
            // if ($product->is_type('variable')) {
            //     // Find matching variation
            //     $variation_id = $this->findMatchingVariation($product, $options);
            //     if (!$variation_id) {
            //         return new WP_Error('no_variation', 'No matching variation found', array('status' => 404));
            //     }
            // }

            // if ( class_exists( 'WooCommerce' ) ) {
            //     // WooCommerce is available, proceed with your code here
            //     // Make sure to check for $product_id, $quantity, etc., before calling add_to_cart()
            //     $added_to_cart = WC()->cart->add_to_cart( $product_id, $quantity, $variation_id, $options );
            //     // Handle the rest of your logic here
            // } else {
            //     // WooCommerce is not available, handle the error gracefully
            //     return new WP_Error( 'woocommerce_not_available', 'WooCommerce is not active or initialized.', array( 'status' => 500 ) );
            // }
           // return $added_to_cart = WC()->cart;
        //    if ( is_null( WC()->cart ) ) {
        //         wc_load_cart();
        //    }
            global $woocommerce;
            
            $cart_item_key = $woocommerce->cart->add_to_cart($product_id,1,$variation_id,$options);
    
            if (!$cart_item_key) {
                return new WP_Error('cannot_add_to_cart', 'Failed to add to cart', array('status' => 500));
            }
    
            return new WP_REST_Response(array('success' => true, 'cart_item_key' => $cart_item_key), 200);
        } catch (Exception $exception) {
            return new WP_Error('internal_error', 'Internal server error', array('status' => 500));
        }
    }
    


    /**
 * Find matching variation ID based on selected options
 *
 * @param WC_Product_Variable $product
 * @param array $options
 * @return int|false
 */
private function findMatchingVariation($product, $options)
{
    $available_variations = $product->get_available_variations();
    foreach ($available_variations as $variation) {
        $match = true;
        foreach ($options as $attribute => $value) {
            if ($variation['attributes']['attribute_' . $attribute] !== $value) {
                $match = false;
                break;
            }
        }
        if ($match) {
            return $variation['variation_id'];
        }
    }
    return false;
}


}