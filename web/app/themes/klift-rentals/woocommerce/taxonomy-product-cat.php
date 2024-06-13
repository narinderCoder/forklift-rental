<?php require 'sections/header.php'; ?>
<?php  
global $wp_query; 
$cat_obj = $wp_query->get_queried_object(); 
$termID = $cat_obj->slug ?? 0; 
$parent = $cat_obj->parent ?? 0; 
//  print_r($cat_obj);

$term_slug = $cat_obj->slug ?? '';
$type = '';
$current_category = get_queried_object(); 
// Check if ACF is active and if there are ACF fields associated with the current category
if ( function_exists( 'get_field' ) && $current_category ) { 
    $acf_field_value = get_field( 'category_type', $current_category );  
    if ( $acf_field_value ) { 
        $type = $acf_field_value;
    }
}

 

 
?> 
<?php if ($type == "Rent") { ?>
    <div id="rentProductReact" data-slug="<?= $termID ?>"  data-id="<?= $cat_obj->term_id ?? 0  ?>"  data-name="<?= $cat_obj->name ?? '' ?>" data-parent="<?=  $cat_obj->parent > 0 ? $cat_obj->parent : $cat_obj->term_id ?>"></div> 
<?php } elseif ($type == "Sale") { ?>
    <div id="saleProductReact" data-slug="<?= $termID ?>" data-name="<?= $cat_obj->name ?? '' ?>"></div> 
<?php }elseif($type == 'Engine'){ ?>
    <div id="engineListingApp" data-slug="<?= $termID ?>" data-name="<?= $cat_obj->name ?? '' ?>"></div>
<?php }elseif($type == 'Brand New Forklift'){ ?>
    <div id="newForkliftsListingApp" data-slug="<?= $termID ?>" data-name="<?= $cat_obj->name ?? '' ?>"></div>
<?php } ?>

<?php require 'sections/footer.php'; ?>