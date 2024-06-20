<?php

declare(strict_types=1);

use \App\Controllers\SearchController AS Search;
use \App\Controllers\{
    ProductController,
    ProductCategory,
    GetProductsByCategory,
    CustomPost,
    PageCustomFields,
    CustomTaxonomy,
    WcProducts,
    HeaderController,
    FilterController,
    PostProductsByCategory,
    SubmitForms,
    CustomPage,
    PostProductsNewForflifts,
    SingleProduct,
    AddToCart,
    PostSkidSteerProductsByCategory
};

new HeaderController();
new Search();
new CustomPost();
new PageCustomFields();
new GetProductsByCategory();
new ProductCategory();
new ProductController();
new CustomTaxonomy();
new WcProducts();
new FilterController();
new PostProductsByCategory();
new SubmitForms();
new CustomPage();
new PostProductsNewForflifts();
new SingleProduct();
new AddToCart();
new PostSkidSteerProductsByCategory();
