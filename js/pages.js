(function($) {
  //Sliders
const projectSlider = new Swiper('.project__slider', {

  effect: effect(),
  grabCursor: true,
  init: false,
  on: {
    init: function () {
      replaseActiveSlide();
    },
    slideChange: function () {
      replaseActiveSlide();
    },
  },
});

function effect() {
  if(window.innerWidth < 820) {
    return 'slide';
  } else {
    return 'cards';
  }
}

function replaseActiveSlide() {
  const srcSlide = $('.swiper-slide-active img').attr('src');
  $('.project__slide-active').attr('src', srcSlide);
}

projectSlider.init();

const pageSlider = new Swiper('.project__page-slider', {

  slidesPerView: 1,
  spaceBetween: 0,
  breakpoints: {
    640: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
  },
  grabCursor: true,

  scrollbar: {
    el: ".swiper-scrollbar",
    hide: false,
  },
});


  //Menu
  $('.header__menu').on('click', function(e) {
    e.preventDefault();
    if ($('.main__nav').hasClass('open')) {
      $('.main__nav').removeClass('open');
      $('.header__menu').removeClass('open');
      $('.header').removeClass('open');
      if($('.social-round').hasClass('in')) {
        $('.social-round').removeClass('in');
      }
      $('.strelca-top').removeAttr('style');
    } else {
      if ($('.about-popap').hasClass('open')) {
        $('.about-popap').removeClass('open');
      }
      $('.main__nav').addClass('open');
      $('.header__menu').addClass('open');
      $('.header').addClass('open');
      if($('.social-round').hasClass('out')) {
        $('.social-round').addClass('in');
      }
      $('.strelca-top').css('z-index', '1');
    }
  });

  //Menu links
  $('.main-nav__item').on('click', function () {
    $('.main__nav').removeClass('open');
    $('.header__menu').removeClass('open');
    $('.header').removeClass('open');
    setTimeout(function(){
      $('.header__logo-img').attr('src', 'img/logo.svg');
    }, 100);
  });

  //Callback
  $('.header__contact').on('click', function(e) {
    e.preventDefault();
    if ($('.main__nav').hasClass('open')) {
      $('.main__nav').removeClass('open');
      $('.header__menu').removeClass('open');
    }
    $('.header').addClass('open');
    $('.about-popap').addClass('open');
    $('.strelca-top').css('z-index', '1');
  });

  $('.back.close').on('click', function(e) {
    e.preventDefault();
    $('.about-popap').removeClass('open');
    $('.header').removeClass('open');
    $('.strelca-top').removeAttr('style');
  });

  //language block
  $('.language-items').on('click', function() {
    if(!$(this).hasClass('active')) {
      $('.language-items').removeClass('active');
      $(this).addClass('active');
    }
  });

  function deleteHash() {
  const loc = window.location.href,
    index = loc.indexOf('#');

  if (index > 0) {
    history.replaceState(null, null, ' ');
  }
}

  //Ancor

  $('a[href^="#"').on('click', function() {

    let href = $(this).attr('href');

    $('html, body').animate({
        scrollTop: $(href).offset().top
    });
    return false;

    setTimeout(deleteHash, 100)
  });




}(jQuery));



