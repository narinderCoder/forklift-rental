{{--
  Template Name: Skid Steer Rental
--}}
@extends('layouts.app')

@section('content')
 
<?php 
$acf_data = get_fields(get_the_ID()) ?? [];  
$category = $acf_data['category'] ?? []; 
?> 
<div id="skidSteers" data-id="{{get_the_ID()}}"></div>
 
@endsection


