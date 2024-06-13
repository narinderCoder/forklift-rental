{{--
  Template Name: Industry Solutions
--}}

@extends('layouts.app')

@section('content')

  <!-- @while(have_posts()) @php(the_post())
     @include('partials.page-header')  
    @include('partials.content-page')
  @endwhile -->
  <?php
    // $acf_data = get_fields(get_the_ID()) ?? [];   
    // $benefits = $acf_data['benefit_section'] ?? [];
    // $why_choose_us_section = $acf_data['why_choose_us']['points'] ?? [];
    // $why_choose_us_description = $acf_data['why_choose_us']['description'] ?? '';

    global $wp_query; 
    $cat_obj = $wp_query->get_queried_object(); 
    $termID = $cat_obj->slug ?? 0; 
    $parent = $cat_obj->parent ?? 0;  
    $term_slug = $cat_obj->ID ?? '';
   // print_r($cat_obj->ID);
  ?>
   <div id="IndustrySolutionsReact" data-id="{{$cat_obj->ID ?? 0}}" data-content="{{$cat_obj->post_content ?? ''}}"></div>
@endsection
