{{-- resources/views/woocommerce/single-product.blade.php --}}
@extends('layouts.app')

@section('content')
  @php
    do_action('woocommerce_before_single_product');
  @endphp

  @if (post_password_required())
    {!! get_the_password_form() !!}
    @php return @endphp
  @endif

  <div id="product-<?php the_ID(); ?>" @php wc_product_class() @endphp>
    @php
      do_action('woocommerce_before_single_product_summary');
    @endphp

    <div class="summary entry-summary">
      @php
        woocommerce_template_single_title();
        woocommerce_template_single_rating();
        woocommerce_template_single_price();
        woocommerce_template_single_excerpt();
        woocommerce_template_add_to_cart();
        woocommerce_template_single_meta();
        woocommerce_template_single_sharing();
      @endphp
    </div>

    @php
      do_action('woocommerce_after_single_product_summary');
    @endphp
  </div>

  @php do_action('woocommerce_after_single_product') @endphp
@endsection
