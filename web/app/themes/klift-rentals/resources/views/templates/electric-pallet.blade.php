{{--
  Template Name: Material Handling and Packaging
--}}
@extends('layouts.app')

@section('content')
<?php
      
   
     global $wp_query; 
     $cat_obj = $wp_query->get_queried_object(); 
     $termID = $cat_obj->slug ?? 0; 
     $parent = $cat_obj->parent ?? 0;  
     $term_slug = $cat_obj->ID ?? ''; 
    
   $categories = get_terms(array(
    'taxonomy'   => 'product_cat',
    'hide_empty' => false,
    'parent'     => 0,
    'meta_query' => array(
        array(
            'key'     => 'category_type', // ACF field key
            'value'   => 'Material Handling and Packaging', // ACF field value to filter by
            'compare' => '=', // Comparison operator: equal to
        ),
    ),
    'number'     => 1, // Limit the number of results to 1
));

if (empty($categories) && !is_wp_error($categories)) {
 die;
}

 
 
 ?>
   <div id="engineListingApp" data-type="Material Handling and Packaging" data-page="{{ $term_slug }}" data-slug="<?= $categories[0]->slug ?? 0 ?>" data-name="<?= $cat_obj->name ?? '' ?>"></div>
@endsection


