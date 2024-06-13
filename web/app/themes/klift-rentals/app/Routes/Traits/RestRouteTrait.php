<?php

declare(strict_types=1);

namespace App\Routes\Traits;

use WP_REST_Server;

trait RestRouteTrait
{
    /**
     * The api url namespace
     *
     * @var string
     */
    private string $apiNamespace = 'sage-endpoint';

    /**
     * The api version
     *
     * @var string
     */
    private string $apiVersion = 'v1';

    /**
     * The method to help speed up registering the routes
     *
     * @param  string       $route       The route name
     * @param  string       $rest_type
     * @param  array        $callback    The method callback
     * @param  bool|string  $query_args  Any query args for the route name
     * @param  array        $args        Any args for the route
     */
    protected function registerRoute(string $route = '', string $rest_type = WP_REST_Server::READABLE, array $callback = [], bool|string $query_args = false, array $args = [])
    :void
    {
        $rest_prefix = "$this->apiNamespace/$this->apiVersion";
        if ($query_args) {
            $route = "$route/$query_args";
        }

        register_rest_route(
            $rest_prefix,
            $route,
            [
                'methods'             => $rest_type,
                'callback'            => $callback,
                'args'                => $args,
                'permission_callback' => '__return_true',
            ],
        );
    }

}
