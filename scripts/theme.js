jQuery(document).ready(function($) {
"use strict";

  // FlexSlider Main Slider
  $('.slider .container').flexslider({
    animation: 'fade',
    controlNav: true,
    directionNav: false,
    slideshowSpeed: 3600,
    animationSpeed: 2000
  });

  // FlexSlider Testimonials
  $('.testimonials .container').flexslider({
    animation: 'slide',
    controlNav: false,
    directionNav: true,
    slideshowSpeed: 6000,
    animationSpeed: 1800,
    easing: 'easeOutBack'
  });

  // Calendar script
  var nowTemp = new Date();
  var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);

  var checkin = $('#dpd1').datepicker({
    onRender: function(date) {
      return date.valueOf() < now.valueOf() ? 'disabled' : '';
    }
  }).on('changeDate', function(ev) {
    if (ev.date.valueOf() > checkout.date.valueOf()) {
      var newDate = new Date(ev.date);
      newDate.setDate(newDate.getDate() + 1);
      checkout.setValue(newDate);
    }
    checkin.hide();
    $('#dpd2')[0].focus();
  }).data('datepicker');
  var checkout = $('#dpd2').datepicker({
    onRender: function(date) {
      return date.valueOf() <= checkin.date.valueOf() ? 'disabled' : '';
    }
  }).on('changeDate', function(ev) {
    checkout.hide();
  }).data('datepicker');

  // Menu Scroll
  $('.header nav a').click(function(event) {
    $('.header nav a').removeClass('active');
    $(this).addClass('active');
    $('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top }, 2000);
    event.preventDefault();
  });

  // Scroll to top link
  $('.back-to-top').click(function(event) {
    $('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top }, 1000);
    event.preventDefault();
  });

  // View more
  $('.seemore').click(function(event) {
    var $this = $(this);
    $this.toggleClass('seemore');
    $this.parent( "div" ).toggleClass("more");
    if($this.hasClass('seemore')){
        $this.text('view more');
    } else {
        $this.text('view less');
    }
    event.preventDefault();
  });

  // Featured Box
  $('.featured .block h4').click(function() {
    $('.featured .block div').removeClass('active');
    $(this).parent().find('div').addClass('active');
  });
  // Featured Box close
  $('.close').click(function(event) {
    $('.featured .block div').removeClass('active');
    event.preventDefault();
  });

  // Init Isotope
  var $container = $('.isotope').isotope({
    itemSelector: '.element-item',
    masonry: {
      columnWidth: '.grid-sizer'
    }
  });

  // Change size of item by toggling .gigante
  $container.on( 'click', '.element-item', function() {
    $(this).toggleClass('active');
    $(".popup-overlay").toggle();
    $container.isotope('layout');
  });

  // Close popup
  $('.popup-overlay').on( 'click', function() {
    $('.element-item').removeClass('active');
    $(".popup-overlay").toggle();
    $container.isotope('layout');
  });

  // filter functions
  var filterFns = {
  };

  // Bind filter button click
  $('#filters').on( 'click', 'button', function() {
    var filterValue = $(this).attr('data-filter');
    // use filterFn if matches value
    filterValue = filterFns[ filterValue ] || filterValue;
    $container.isotope({ filter: filterValue });
  });

  // Change is-checked class on buttons
  $('.button-group').each( function( i, buttonGroup ) {
    var $buttonGroup = $( buttonGroup );

    $buttonGroup.on( 'click', 'button', function() {
      $buttonGroup.find('.is-checked').removeClass('is-checked');
      $(this).addClass('is-checked');
    });

  });

});

// When the window has finished loading create our google map below

function initialize() {
  var myLatlng = new google.maps.LatLng(40.8760846, -73.9039239);
  var map_options = {
    zoom: 16,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    center: myLatlng,
    scrollwheel: false,
    disableDefaultUI: true
  };

  var map = new google.maps.Map(document.getElementById('map'), map_options);
  var myIcon = new google.maps.MarkerImage('images/icon-marker-2x.png', null, null, null, new google.maps.Size(34,45));

  var marker = new google.maps.Marker({
    position: myLatlng,
    map: map,
    icon: myIcon
  });

  /* Remove if you dont want B/W Google Map */
  var styles = [
    {
      featureType: "all",
      stylers: [
        { saturation: -100 }
      ]
    }
  ];

  map.setOptions({styles: styles});
  /* Ends here! */
}

google.maps.event.addDomListener(window, 'load', initialize);