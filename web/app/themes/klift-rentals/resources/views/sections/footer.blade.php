<!-- <footer class="content-info">
  @php(dynamic_sidebar('sidebar-footer'))
</footer> -->
<?php 
$test_field = get_field('footer_content', 'option'); 
?>

<footer class="bg-primary text-white section mt-auto">
  <div class="container mx-auto">
    <div class="row">
      <div class="col-lg-6 col-12">
      <img
            src="{{$test_field['logo']}}"
            alt="forklift rentals"
            width="300px"
           class="mb-4"
          />
          <p class="p1 mb-4">
           {{$test_field['footer_about_us'] ?? ''}}
          </p>
      </div>
      <div class="col-lg-6 col-12">
        <div class="row">
          <div class="col-md-6 col-12">
            <h6 class="h6 fw-medium my-md-4 my-2">Customer Rating</h6>
            <Rating  initialRating={9} maxRating="10" />
            <p class="p1 text-white text-opacity-80 mb-4">Based on 5 ratings</p>
          </div>
          <div class="col-md-6 col-12">
                <h6 class="h6 fw-medium my-md-4 my-2">Contact Us</h6>
                <div class="row p1">
                  <div class="col-5">
                    <p class="p2">Email:</p>
                  </div>
                  <div class="col-7">
                    <a
                    href="mailto:{{$test_field['email'] ?? ''}}" class="text-break p2">
                    {{$test_field['email'] ?? ''}}
                    </a>
                  </div>
                </div>
                <div class="row p1">
                  <div class="col-5">
                    <p class="p2">Phone:</p>
                  </div>
                  <div class="col-7">
                    <a  href="tel:{{$test_field['phone_number'] ?? ''}}" class="text-break p2">{{$test_field['phone_number'] ?? ''}}</a>
                  </div>
                </div>
                <div class="row p1">
                  <div class="col-5">
                    <p class="p2">Location:</p>
                  </div>
                  <div class="col-7">
                    <p class="text-break p2">
                      {{$test_field['location'] ?? ''}}
                    </p>
                  </div>
                </div>
              </div>
        </div>
      </div>
    </div>
    <hr class="my-4" />
        <div class="d-flex gap-1 align-items-center justify-content-center">
          <p class="p2 text-white text-opacity-80">Discount Lift Rentals</p>
          <Copyright size={14} class="text-white text-opacity-80" />
          <p class="p2 text-white text-opacity-80">
            2021. All rights reserved.
          </p>
        </div>
  </div>
</footer>


<!-- <footer class="text-white bg-primary"> 
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
                <p class="opacity-80">Based on 5 ratings</p>
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
  -->