{{--
  Template Name: CUSTOM PRODUCT CATEGORY TEMPLATE
--}}

@extends('layouts.app')

@section('content')

  @while(have_posts()) @php(the_post())
    <!-- @include('partials.page-header') -->
    @include('partials.content-page')
  @endwhile
  <?php
    // $acf_data = get_fields(get_the_ID()) ?? [];   
    // $benefits = $acf_data['benefit_section'] ?? [];
    // $why_choose_us_section = $acf_data['why_choose_us']['points'] ?? [];
    // $why_choose_us_description = $acf_data['why_choose_us']['description'] ?? '';
  ?>
  <div id="CatagorySection"></div>

  <div id="homePageReact"></div> 
@endsection
