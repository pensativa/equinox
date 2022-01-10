(function($) {
let wrapper = document.querySelector('.page__wrapper');

const aboutSlider = new Swiper('.page', {
    // Свои классы
    wrapperClass: "page__wrapper",
    slideClass: "page__screen",

    // Вертикальный слайдер
    direction: 'vertical',

    // Количество слайдов для показа
    slidesPerView: 1,

    //Эффект плавного переключение между слайдами
    effect: 'fade',
    edeEffect: {
      crossFade: true
    },
    keyboard: {
        onlyInViewport: true,
        pageUpDown: true,
    },
    navigation: {
        nextEl: '.strelca',
        prevEl: '.strelca-top',
    },
    mousewheel: true,
    watchOverflow: true,
    speed: 800,
    observer: true,
    observeParents: true,
    observeSlideChildren: true,
    breakpoints: {
      845: {
        resizeObserver: false,
        updateOnWindowResize: false,
      },
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      renderBullet: function (index, className) {
        return '<span class="' + className + '">' + (index + 1) + "</span>";
      },
    },
    init: false,
    on: {
        init: function () {
            showContacts();
            bigLogo();
        },
        slideChange: function () {
          showContacts();
          bigLogo();
        },
    },
});

function showContacts() {
  const phone = document.querySelector('.about-page__footer .phone');
  const email = document.querySelector('.about-page__footer .email');
  if (pageSlider.realIndex === 3) {
    if(window.innerWidth < 700 || window.innerHeight < 600) {
      phone.style.transform = 'translateY(0)';
      email.style.transform = 'translateY(0)';
    } else {
      phone.style.transform = 'translateY(-50px)';
      email.style.transform = 'translateY(-50px)';
    }

  } else {
    phone.style.transform = 'translateY(100vh)';
    email.style.transform = 'translateY(100vh)';
  }
}

function bigLogo() {
  const logo = document.querySelector('.header__logo-img');
  if (pageSlider.realIndex === 0) {
    logo.style.transform = 'scale(1.3)';
  } else {
    logo.style.transform = 'scale(1)';
  }

}

aboutSlider.init();

  //Menu
  $('.header__menu').on('click', function(e) {
    e.preventDefault();
    if ($('.main__nav').hasClass('open')) {
      $('.main__nav').removeClass('open');
      $('.header__menu').removeClass('open');
      $('.header').removeClass('open');
      setTimeout(function(){
        $('.header__logo-img').attr('src', 'img/logo.svg');
      }, 100);
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
      setTimeout(function(){
        $('.header__logo-img').attr('src', 'img/logo-menu.svg');
      }, 400);
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
    $('.header__contact').addClass('open');
    if ($('.main__nav').hasClass('open')) {
      $('.main__nav').removeClass('open');
      $('.header__menu').removeClass('open');
    }
    $('.header').addClass('open');
    $('.about-popap').addClass('open');
    setTimeout(function(){
      $('.header__logo-img').attr('src', 'img/logo-menu.svg');
    }, 400);
    $('.strelca-top').css('z-index', '1');
  });

  $('.back.close').on('click', function(e) {
    e.preventDefault();
    $('.header__contact').removeClass('open');
    $('.about-popap').removeClass('open');
    $('.header').removeClass('open');
    setTimeout(function(){
      $('.header__logo-img').attr('src', 'img/logo.svg');
    }, 100);
    $('.strelca-top').removeAttr('style');
  });

  //language block
  $('.language-items').on('click', function() {
    if(!$(this).hasClass('active')) {
      $('.language-items').removeClass('active');
      $(this).addClass('active');
    }
  });

  //Mobile version
  if(window.innerWidth < 650) {
    $('.append').appendTo('.content-column--ap');
  }


}(jQuery));


document.addEventListener("DOMContentLoaded", function() {

  //Video for IOS
  const video = document.querySelector('#video-bg video');
  if (video.paused) {
    video.play();
  }

});

