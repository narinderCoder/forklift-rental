<?php

declare(strict_types=1);

namespace App\Routes;

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
use WP_Query;
use function rest_ensure_response;

class Search
{

    use RestRouteTrait;
    use RestRouteValidate;
    use RestRouteParams;

    /**
     * Home constructor.
     */
    public function __construct()
    {
        add_action('rest_api_init', [$this, 'registerRoutes',]);
    }
    /**
     * Creates the API Endpoint in WordPress
     */
    public function registerRoutes(): void
    {
        /**
         * Blog Posts
         * Example API call: GET https://klift-rentals.test/wp-json/sage-endpoint/v1/search-posts/
         */
        self::registerRoute(
            'search-posts',
            WP_REST_Server::READABLE,
            [$this, 'getPosts'],
            '(?P<paged>[\d]+)',
            [
                [
                    'paged'      => [
                        'type'              => 'int',
                        'sanitize_callback' => 'absint',
                        'default'           => 1,
                    ],
                    'search'          => [
                        'type'              => 'string',
                        'sanitize_callback' => [$this, 'sanitizeText'],
                    ]
                ],
            ]
        );
    }
 /**
     * @param WP_REST_Request $request
     *
     * @return WP_HTTP_Response|WP_REST_Response|WP_Error
     */
    public function getPosts(WP_REST_Request $request): WP_HTTP_Response|WP_REST_Response|WP_Error
    {
        try {
            $paged        = $request->get_param('paged') ?? 1;
            $per_page     = $request->get_param('per_page') ?? 12;
            $search       = $request->get_param('search') ?? '';
            $formatted_data          = new WP_REST_Response(['data'=>[
                'search'=>$search,
                'per_page'=>$per_page,
                'paged'=>$paged,
            ]], 200);
            $formatted_data->header('X-WP-Total', 0);
            $formatted_data->header('X-WP-TotalPages', 0);
        } catch (Exception $exception) {
            $formatted_data = [
                'success' => false,
                'status'  => 500,
                'message' => $exception
                    ->getMessage(),
            ];
        }
        return rest_ensure_response((object) $formatted_data);
    }
}