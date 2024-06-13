{{--
  Template Name: CONTACT US TEMPLATE
--}} 

@extends('layouts.app')

@section('content')

   
  <?php
   
    global $wp_query; 
    $cat_obj = $wp_query->get_queried_object(); 
    $termID = $cat_obj->slug ?? 0; 
    $parent = $cat_obj->parent ?? 0;  
    $term_slug = $cat_obj->ID ?? ''; 

    $nonce = wp_create_nonce('custom_form_data_nonce');

    
  ?>
   <div id="contactPageReactApp" data-nonce="{{$nonce}}" data-id="{{$cat_obj->ID ?? 0}}" data-content="{{$cat_obj->post_content ?? ''}}"></div>
@endsection
