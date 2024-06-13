<?php

declare(strict_types=1);

namespace App\Routes\Traits;

trait RestRouteParams
{

    /**
     * Used as a base for a WP_Query call to have the defaults already defined,
     * and can be combined with wp_parse_args($args, $defaultQueryArgs) to merge
     * them together
     *
     * @return array
     */
    protected function defaultQueryArgs(array|string $post_type = 'post'): array
    {
        return [
            'post_type'      =>  $post_type,
            'posts_per_page' => 12,
            'orderby'        => 'date',
            'order'          => 'DESC',
        ];
    }

    
    #[ArrayShape(['engine' => "string", 'per_page' => "int", 'fields' => "string"])]
    protected function defaultSearchWPQueryArgs(): array
    {
        return [
            'engine'   => 'default',
            'per_page' => 10,
            'fields' => 'all',
        ];
    }
}
