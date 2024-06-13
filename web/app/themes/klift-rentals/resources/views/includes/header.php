<nav class="navbar navbar-expand-lg bg-primary custom-navbar">
  <div class="container"> 
    <a class="brandnavbar-brand" href="<?= home_url('/') ?>">
            <img src="<?= asset('images/logo.png') ?>" alt="logo" width="150" height="45" class="h-auto w-36" />
        </a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">

          <?php if (has_nav_menu('primary_navigation')): ?>
     
            <?=  wp_nav_menu([
                    'theme_location' => 'primary_navigation',
                    'container' => 'div', // Wrap the menu in a <nav> element
                    'container_class' => ' mx-auto mb-2 mb-lg-0',  
                    'menu_class' => 'navbar-nav mx-2 mb-2 mb-lg-0 text-white',
                    'echo' => false]) ?>
            <?php endif ?>
         <div id="getCartTotals"></div>  
    </div>
  </div>
</nav>