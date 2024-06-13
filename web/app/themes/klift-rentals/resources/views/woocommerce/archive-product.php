<?php require 'sections/header.php'; ?><?php  
global $wp_query; 
$cat_obj = $wp_query->get_queried_object(); 
$termID = $cat_obj->slug ?? 0; 
$args = array(
    'taxonomy'   => 'product_cat',  
    'hide_empty' => false,  
    'parent'     => 0,  
    'meta_query' => array(
        array(
            'key'     => 'category_type', // Your ACF field key
            'value'   => 'Rent',
            'compare' => '=',
        ),
    ),
);
$arr = get_terms($args);  
//  print_r($parent_categories);
?>  
 <?php if(!empty($arr[0])): ?>
    <div id="rentProductReact" data-slug="<?= $arr[0]->slug ?>" data-name="<?= $arr[0]->name ?? '' ?>"></div> 
 <?php endif; ?>

<?php require 'sections/footer.php'; ?>
      