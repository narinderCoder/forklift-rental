@extends('layouts.app')
@section('content') 

<?php
global $wp_query; 
$cat_obj = $wp_query->get_queried_object(); 
$termID = $cat_obj->slug ?? 0; 
$parent = $cat_obj->parent ?? 0;  
$term_slug = $cat_obj->ID ?? '';
// print_r($cat_obj);
$current_user = wp_get_current_user();
//  print_r($current_user->user_email);
?>
@if($cat_obj->post_type == 'blog')
    <div id="blogDetailReact" 
    data-slug="{{$term_slug}}" 
    data-check="{{$current_user->ID ?? 0}}"
    data-email="{{$current_user->user_email ?? ''}}"
    data-title="{{$cat_obj->post_title}}"></div>
@else
  @while(have_posts()) @php(the_post())
    @includeFirst(['partials.content-single-' . get_post_type(), 'partials.content-single'])
  @endwhile
@endif
@endsection
