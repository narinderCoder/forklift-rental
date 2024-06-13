<!-- <footer class="content-info">
  @php(dynamic_sidebar('sidebar-footer'))
</footer> -->
<?php 
$test_field = get_field('footer_content', 'option'); 
?>



<footer class="text-white bg-primary">
      <div class="container"  style="padding: 3.75rem 0.5rem">

       <div class="row">
       <div class="col-5">
          <img
            src="{{$test_field['logo']}}"
            alt="forklift rentals"
            class="h-auto w-36"
          />
          <p class="text-lg leading-8 font-weight-normal">
           {{$test_field['footer_about_us'] ?? ''}}
          </p>
        </div>

        <div class="col-7">
         
        <div class="row">
        <div class="col-5">
              <p class="text-2xl font-medium text-white">Customer Rating</p>
              <div class="text-lg font-normal leading-8 ">
                <div class="flex flex-row items-center justify-start gap-1 my-2">
                  <Rating initialRating={rating} maxRating={maxRating} />
                  <p>
                   5.0/5.0
                  </p>
                </div>
                <p class="opacity-80">Based on {numberOfRates} ratings</p>
              </div>
            </div>
         
          <div class="col-7">
            <p class="text-2xl font-medium">Contact Us</p>
            <div class="flex flex-col w-full gap-2">
              <div class="footer-contact-us">
                <h3 class="min-w-10">Email:</h3>
                <a
                  href="mailto:{{$test_field['email'] ?? ''}}"
                  class="w-full overflow-hidden text-ellipsis"
                >
                {{$test_field['email'] ?? ''}}
                </a>
              </div>
              <div class="footer-contact-us">
                <h3 class="min-w-10">Phone:</h3>
                <a
                  href="tel:{{$test_field['phone_number'] ?? ''}}"
                  class="w-full overflow-hidden text-ellipsis"
                >
                {{$test_field['phone_number'] ?? ''}}
                </a>
              </div>
              <div class="footer-contact-us">
                <h3 class="min-w-10">Location:</h3>
                <p class="w-full"> {{$test_field['location'] ?? ''}}</p>
              </div>
            </div>
          </div>

        </div>
          
        </div>
       </div>

      </div>



      <hr class="border border-white opacity-15" />
      <p class="text-base text-center">2021. All rights reserved.</p>
    </footer>