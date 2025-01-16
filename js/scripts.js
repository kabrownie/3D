
/*
   
   Table Of Content
   
   1. Preloader
   2. Smooth Scroll
   3. Scroll Naviagation Background Change with Sticky Navigation
   4. Mobile Navigation Hide or Collapse on Click
   5. Scroll To Top
   6. Typed.js
   7. Parallax Background
   8. Portfolio Filtering
   9. Magnific Popup
  10. Testimonial Carousel/Slider
  11. Statistics Counter
  12. Google Map
 

*/ // Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Form submission handler
const form = document.getElementById('commissionForm');
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      preferredContact: document.getElementById('preferredContact').value,
      socialHandle: document.getElementById('socialHandle').value,
      animationLength: document.getElementById('animationLength').value,
      characterOption: document.getElementById('characterOption').value,
      animationDescription: document.getElementById('animationDescription').value,
      references: document.getElementById('references').value,
      deadline: document.getElementById('deadline').value || "Not specified",
      intendedUse: document.getElementById('intendedUse').value,
      budget: document.getElementById('budget').value || "Not specified",
  };

  // Save data to Firebase Realtime Database
  const newCommissionRef = database.ref('commissions').push();
  newCommissionRef.set(formData)
      .then(() => {
          alert('Your commission request has been submitted successfully!');
          form.reset();
      })
      .catch((error) => {
          alert('Error submitting your request. Please try again.');
          console.error(error);
      });
});

// modal
$('#spanYear').html(new Date().getFullYear());
  document.addEventListener('contextmenu', function (event) {
    if (event.target.tagName === 'IMG') {
      event.preventDefault(); // Disable right-click for images
    }
  });


// modalend
$(document).ready(function(){
    $("img").click(function(){
    var t = $(this).attr("src");
    $(".modal-body").html("<img src='"+t+"' class='modal-img'>");
    $("#myModal").modal();
  });
  
  $("video").click(function(){
    var v = $("video > source");
    var t = v.attr("src");
    $(".modal-body").html("<video class='model-vid' controls><source src='"+t+"' type='video/mp4'></source></video>");
    $("#myModal").modal();  
  });
  });//EOF Document.ready

(function ($) {
    'use strict';

    jQuery(document).ready(function () {

        
       /* Preloader */
		
        $(window).on('load', function() {
          $('body').addClass('loaded');
        });
		
		
		
       /* Smooth Scroll */

        $('a.smoth-scroll').on("click", function (e) {
            var anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $(anchor.attr('href')).offset().top - 50
            }, 1000);
            e.preventDefault();
        });
		


       
       /* Scroll Naviagation Background Change with Sticky Navigation */
		 
        $(window).on('scroll', function () {
            if ($(window).scrollTop() > 100) {
                $('.header-top-area').addClass('navigation-background');
            } else {
                $('.header-top-area').removeClass('navigation-background');
            }
        });
		
		
		
		
       /* Mobile Navigation Hide or Collapse on Click */
		
        $(document).on('click', '.navbar-collapse.in', function (e) {
            if ($(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle') {
                $(this).collapse('hide');
            }
        });
        $('body').scrollspy({
            target: '.navbar-collapse',
            offset: 195
        
		 });
		 
		
		
		
        /* Scroll To Top */
		
        $(window).scroll(function(){
        if ($(this).scrollTop() >= 500) {
            $('.scroll-to-top').fadeIn();
         } else {
            $('.scroll-to-top').fadeOut();
         }
	   });
	
	
	    $('.scroll-to-top').click(function(){
		  $('html, body').animate({scrollTop : 0},800);
		  return false;
	    });
		
		
		
		
        /* Typed.js */
	 	
        $(window).load(function(){

        $(".typing").typed({
        
            strings: ["Hello there", "Welcome","Check out cool 3ds below"],    
            typeSpeed: 100
          });
         });
        
		 
        /* Parallax Background */

        $(window).stellar({
            responsive: true,
            horizontalScrolling: false,
            hideDistantElements: false,
            horizontalOffset: 0,
            verticalOffset: 0,
        });

        
   

		
		
        /* Portfolio Filtering */

        $('.portfolio-inner').mixItUp();


       
        /* Magnific Popup */

	   
		 
        /* Testimonial Carousel/Slider */

      
		
		
		
        /* Statistics Counter */
		
		   
		  
         
         /* Google Map */
		 
        
              
		   
            });

   })(jQuery);

  