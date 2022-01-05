(function($) {
let pageSlider = new Swiper('.page', {
    // Свои классы
    wrapperClass: "page__wrapper",
    slideClass: "page__screen",

    // Вертикальный слайдер
    direction: 'vertical',

    // Количество слайдов для показа
    //slidesPerView: 'auto',

    //Эффект переключение слайдов
    effect: 'fade',
    fadeEffect: {
      crossFade: true,
    },
    keyboard: {
        onlyInViewport: true,
        pageUpDown: true,
    },
    navigation: {
        nextEl: '.strelca',
    },
    mousewheel: true,
    simulateTouch: false,
    speed: 800,
    //freeMode: freeMode(),
    init: false,
    on: {
        init: function () {
            menuSlider();
            hashGoToSlide();
        },
        slideChange: function () {
            menuSlederRemove ();
            addClassForSocialRound();
            menuSlider();
            reviewHide();
            setTimeout(deleteHash, 100);
            menuLinks[pageSlider.realIndex].classList.add('active');
        },
        resize: function () {

        },
    },
});

//Переход на слайд через hash

function hashGoToSlide() {
  const hash = window.location.hash;
  if (hash === '#portfolio') {
    pageSlider.slideTo(7, 0);
  }

  if(hash === '#services') {
    pageSlider.slideTo(8, 0);
  }

  if(hash === '#review') {
    pageSlider.slideTo(9, 0);
  }

  if(hash === '#contacts') {
    pageSlider.slideTo(10, 0);
  }

  if(hash === '#order') {
    pageSlider.slideTo(6, 0);
  }
}

//Удаляет хэш из url

function deleteHash() {
  const loc = window.location.href,
    index = loc.indexOf('#');

  if (index > 0) {
    history.replaceState(null, null, ' ');
  }
}


//Активные стили для ссылок
let menuLinks = document.querySelectorAll('.menu__link');
function menuSlider() {
  if (pageSlider.realIndex > 0 && pageSlider.realIndex < 4) {
    menuSlederRemove();
    menuLinks[1].classList.add('active');
  } else if (pageSlider.realIndex > 3 && pageSlider.realIndex < 7) {
    menuSlederRemove();
    menuLinks[4].classList.add('active');
  } else {
    menuSlederRemove();
    menuLinks[pageSlider.realIndex].classList.add('active');
  }

  //Стили по клику
  for (let index = 0; index < menuLinks.length; index++) {
    const menuLink = menuLinks[index];
    menuLink.addEventListener("click", function (e) {
      e.preventDefault();
      menuSlederRemove();
      if(!this.classList.contains("dublicat")) {
        pageSlider.slideTo(index, 800);
        menuLink.classList.add('active');
      }
    });
  }

  //To top
  const toTop = document.querySelector('.top');
  if (pageSlider.realIndex === 10) {
    toTop.classList.add('active');
  } else {
    toTop.classList.remove('active');
  }
  toTop.addEventListener("click", function (e){
    e.preventDefault();
    pageSlider.slideTo(0, 0);
    toTop.classList.remove('active');
  });
}

//Удаление активыных стилей для ссылок
function menuSlederRemove() {
    let menuLinkActive = document.querySelector('.menu__link.active');
    if (menuLinkActive) {
        menuLinkActive.classList.remove('active');
    }
}

//Изменение класса для круга соцсетей
function addClassForSocialRound() {
  const socialRound = document.querySelector('.social-round');
  if (pageSlider.realIndex === 1) {
    socialRound.classList.add('go');
  } else {
    socialRound.classList.remove('go');
  }

  if (pageSlider.realIndex > 1) {
    socialRound.classList.add('out');
  } else {
    socialRound.classList.remove('out');
  }
}

//Function free Mode
function freeMode() {
  if(window.innerWidth < 700 || window.innerHeight < 600) {
    return true;
  } else {
    return false;
  }
}

//Function for review

function reviewHide() {
  const reviews = document.querySelector('.review__list');
  if (pageSlider.realIndex !== 9) {
    reviews.classList.remove('open');
  }
}

pageSlider.init();

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
    } else {
      $('.main__nav').addClass('open');
      $('.header__menu').addClass('open');
      $('.header').addClass('open');
      setTimeout(function(){
        $('.header__logo-img').attr('src', 'img/logo-menu.svg');
      }, 400);
      if($('.social-round').hasClass('out')) {
        $('.social-round').addClass('in');
      }
    }
  });

  //Menu links
  $('.main-nav__item').on('click', function (e) {
    $('.main__nav').removeClass('open');
    $('.header__menu').removeClass('open');
    $('.header').removeClass('open');
    setTimeout(function(){
      $('.header__logo-img').attr('src', 'img/logo.svg');
    }, 100);

    if($(this).hasClass('slide-7')) {
      pageSlider.slideTo(7, 0);
    }

    if($(this).hasClass('slide-8')) {
      pageSlider.slideTo(8, 0);
    }

    if($(this).hasClass('slide-9')) {
      pageSlider.slideTo(9, 0);
    }

    if($(this).hasClass('slide-10')) {
      pageSlider.slideTo(10, 0);
    }

    if($(this).hasClass('slide-link')) {
      e.preventDefault();
    }
  });


  //language block
  $('.language-items').on('click', function() {
    if(!$(this).hasClass('active')) {
      $('.language-items').removeClass('active');
      $(this).addClass('active');
    }
  });

  //Callback
  document
        .querySelector('.header__contact')
        .addEventListener('click', function (e) {
          e.preventDefault();
          pageSlider.slideTo(6, 0.3);
        });

  //About video
  const video = document.querySelector('.video');
  $('.about-video').on('click', function(e) {
    e.preventDefault();
    if ($('.about-video').hasClass('open')) {
      video.pause();
      video.currentTime = 0;
      $('.video-popap').fadeOut(500);
      $('.video-overlay').fadeOut(500);
      $('.about-video').removeClass('open');
    } else {
      video.play();
      $('.about-video').addClass('open');
      $('.video-popap').fadeIn(500);
      $('.video-overlay').fadeIn(500);
    }
  });

  $('.video-overlay').on('click', function(e) {
    e.preventDefault();
    video.pause();
    video.currentTime = 0;
    $('.video-popap').fadeOut(500);
    $('.video-overlay').fadeOut(500);
    $('.about-video').removeClass('open');
  });

  /*$('.video-popap').on('click', function(e) {
    e.preventDefault();

  });*/

  //Vacations popap
  $('.about3__form').on('click', function() {
    $('.modal').fadeIn(500);
  });

  $('.modal__overlay').on('click', function() {
    $('.modal').fadeOut(500);
  });

  //Временно
  $('.modal-form__button').on('click', function(e) {
    e.preventDefault();
    $('.modal').fadeOut(500);
  });

  //Services block
  $('.services__item').on('click', function() {
    if ($(this).hasClass('open')) {
      $(this).removeClass('open');
      $(this).children('ul').slideUp(500);
    } else {
      $('.services__item ul').slideUp(500);
      $('.services__item').removeClass('open');
      $(this).children('ul').slideDown(500);
      $(this).addClass('open');
    }
  });

  //Reviews
  $('.review__button').on('click', function(e) {
    e.preventDefault();
    $('.review__list').addClass('open');
  });

  //test animejs
  function fitElementToParent(el, padding) {
  var timeout = null;
  function resize() {
    if (timeout) clearTimeout(timeout);
    anime.set(el, {scale: 1});
    var pad = padding || 0;
    var parentEl = el.parentNode;
    var elOffsetWidth = el.offsetWidth - pad;
    var parentOffsetWidth = parentEl.offsetWidth;
    var ratio = parentOffsetWidth / elOffsetWidth;
    timeout = setTimeout(anime.set(el, {scale: ratio}), 10);
  }
  resize();
  window.addEventListener('resize', resize);
}

var sphereAnimation = (function() {

  var sphereEl = document.querySelector('.sphere-bottom');
  var spherePathEls = sphereEl.querySelectorAll('.sphere path');
  var pathLength = spherePathEls.length;
  var hasStarted = false;
  var aimations = [];

  fitElementToParent(sphereEl);

  var breathAnimation = anime({
    begin: function() {
      for (var i = 0; i < pathLength; i++) {
        aimations.push(anime({
          targets: spherePathEls[i],
          stroke: {value: ['rgba(255,75,75,1)', 'rgba(80,80,80,.35)'], duration: 500},
          translateX: [2, -4],
          translateY: [2, -4],
          easing: 'easeOutQuad',
          autoplay: false
        }));
      }
    },
    update: function(ins) {
      aimations.forEach(function(animation, i) {
        var percent = (1 - Math.sin((i * .35) + (.0022 * ins.currentTime))) / 2;
        animation.seek(animation.duration * percent);
      });
    },
    duration: Infinity,
    autoplay: false
  });

  var introAnimation = anime.timeline({
    autoplay: false
  })
  .add({
    targets: spherePathEls,
    strokeDashoffset: {
      value: [anime.setDashoffset, 0],
      duration: 3900,
      easing: 'easeInOutCirc',
      delay: anime.stagger(190, {direction: 'reverse'})
    },
    duration: 2000,
    delay: anime.stagger(60, {direction: 'reverse'}),
    easing: 'linear'
  }, 0);

  var shadowAnimation = anime({
      targets: '#sphereGradient',
      x1: '25%',
      x2: '25%',
      y1: '0%',
      y2: '75%',
      duration: 30000,
      easing: 'easeOutQuint',
      autoplay: false
    }, 0);

  function init() {
    introAnimation.play();
    breathAnimation.play();
    shadowAnimation.play();
  }

  init();

})();

var sphereAnimation = (function() {

  var sphereEl = document.querySelector('.sphere-top');
  var spherePathEls = sphereEl.querySelectorAll('.sphere path');
  var pathLength = spherePathEls.length;
  var hasStarted = false;
  var aimations = [];

  fitElementToParent(sphereEl);

  var breathAnimation = anime({
    begin: function() {
      for (var i = 0; i < pathLength; i++) {
        aimations.push(anime({
          targets: spherePathEls[i],
          stroke: {value: ['rgba(255,75,75,1)', 'rgba(80,80,80,.35)'], duration: 500},
          translateX: [2, -4],
          translateY: [2, -4],
          easing: 'easeOutQuad',
          autoplay: false
        }));
      }
    },
    update: function(ins) {
      aimations.forEach(function(animation, i) {
        var percent = (1 - Math.sin((i * .35) + (.0022 * ins.currentTime))) / 2;
        animation.seek(animation.duration * percent);
      });
    },
    duration: Infinity,
    autoplay: false
  });

  var introAnimation = anime.timeline({
    autoplay: false
  })
  .add({
    targets: spherePathEls,
    strokeDashoffset: {
      value: [anime.setDashoffset, 0],
      duration: 3900,
      easing: 'easeInOutCirc',
      delay: anime.stagger(190, {direction: 'reverse'})
    },
    duration: 2000,
    delay: anime.stagger(60, {direction: 'reverse'}),
    easing: 'linear'
  }, 0);

  var shadowAnimation = anime({
      targets: '#sphereGradient',
      x1: '25%',
      x2: '25%',
      y1: '0%',
      y2: '75%',
      duration: 30000,
      easing: 'easeOutQuint',
      autoplay: false
    }, 0);

  function init() {
    introAnimation.play();
    breathAnimation.play();
    shadowAnimation.play();
  }

  init();

})();

anime.timeline({
  loop: true,
})
.add({
  targets: '.glitch',
  duration: 100,
  skewX: 70,
  easing: 'easeInOutQuad',
})
.add({
  targets: '.glitch',
  duration: 30,
  skewX: 0,
  easing: 'easeInOutQuad',
})
.add({
  targets: '.glitch',
  duration: 30,
  opacity: 0,
  easing: 'linear',
})
.add({
  targets: '.glitch',
  duration: 30,
  opacity: 1,
  easing: 'linear',
})
.add({
  targets: '.glitch',
  duration: 30,
  translateX: -60,
  easing: 'linear',
})
.add({
  targets: '.glitch',
  duration: 30,
  translateX: 60,
  easing: 'linear',
})
.add({
  targets: '.sphere-top',
  duration: 80,
  translateX: -14,
  easing: 'easeInOutQuad',
})
.add({
  targets: '.sphere-bottom',
  duration: 80,
  translateX: 14,
  easing: 'easeInOutQuad',
}, '-=80')
.add({
  targets: '.sphere-top',
  duration: 80,
  translateX: 0,
  easing: 'easeInOutQuad',
})
.add({
  targets: '.sphere-bottom',
  duration: 80,
  translateX: 0,
  easing: 'easeInOutQuad',
}, '-=80')
.add({
  targets: '.glitch',
  duration: 40,
  scaleY: 1.2,
  easing: 'easeInOutQuad',
}, '+=800')
.add({
  targets: '.glitch',
  duration: 20,
  scaleY: 1,
  easing: 'easeInOutQuad',
})
.add({
  duration: 2000,
})


}(jQuery));



