<?php require 'sections/header.php'; ?>
 
	 
 <?php
global $wp_query; 
$cat_obj = $wp_query->get_queried_object(); 
$termID = $cat_obj->slug ?? 0; 
$parent = $cat_obj->parent ?? 0; 
$product_cats = wp_get_post_terms(get_the_ID(), 'product_cat');
//  print_r($product_cats);
$category_type ='';
 foreach ($product_cats as $cat) {
    $category_type = get_field('category_type', 'product_cat_' . $cat->term_id);
    break;
} 
?>
<?php if ($category_type == 'Rent'): ?>
   <div id="RentalDetailPage" data-id="<?= get_the_ID() ?>"></div>
<?php elseif ($category_type == 'Sale'): ?>
   <div id="RentalDetailPage" data-id="<?= get_the_ID() ?>"></div>
<?php elseif ($category_type == 'Engine'): ?>
   <div id="NewForkLiftsDetailPage" data-id="<?= get_the_ID() ?>"></div>
<?php elseif ($category_type == 'Brand New Forklift'): ?>
   <div id="NewForkLiftsDetailPage" data-id="<?= get_the_ID() ?>"></div>
<?php elseif ($category_type == 'Material Handling and Packaging'): ?>
   <div id="PackingPallet" data-id="<?= get_the_ID() ?>"></div>
<?php elseif ($category_type == 'CHL Forklift Dealer'): ?>
   <div id="chlForkliftDealerProduct" data-id="<?= get_the_ID() ?>"></div>
<?php endif; ?> 
<?php require 'sections/footer.php'; ?>