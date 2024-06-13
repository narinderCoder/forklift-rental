<!doctype html>
<html @php(language_attributes())>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
   <?php 
     do_action('get_header');
     wp_head() 
    ?>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/fontawesome.min.css" integrity="sha512-UuQ/zJlbMVAw/UU8vVBhnI4op+/tFOpQZVT+FormmIEhRSCnJWyHiBbEVgM4Uztsht41f3FzVWgLuwzUqOObKw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
 <style>
  .bg-primary {
    --bs-bg-opacity: 1;
    background-color: #008fc1 !important;
    background-color: rgba(var(--bs-primary-rgb), var(--bs-bg-opacity)) !important;
   }

   .custom-navbar ul.sub-menu {
    position: absolute;
    z-index: 9999;
    background: white;
    padding: 0;
    display: none;
  }

  .custom-navbar ul.sub-menu li {
      list-style: none;
  }

  .custom-navbar ul.sub-menu li a {
      color: #333!important;
  }

  .custom-navbar .menu-item:hover .sub-menu {
    display: block;
  }
 </style>
  </head>
  <?php
 
 // Check if WooCommerce is active and initialized
 if ( class_exists( 'WooCommerce' ) ) {
     // Check if the cart object is available
     if ( is_object( WC()->cart ) ) {
         // Get the cart contents count
         $cart_contents_count = WC()->cart->get_cart_contents_count();
        
     } 
 }  
 ?>
  <body data-cart="<?= $cart_contents_count ?? 0 ?>" <?php body_class() ?> style="overflow-x:hidden"> 
  <?php  wp_body_open();  
   
include(get_template_directory().'/resources/views/includes/header.php')
  ?>