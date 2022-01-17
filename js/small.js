(function($) {

  //Menu
  $('.header__menu').on('click', function(e) {
    e.preventDefault();
    if ($('.main__nav').hasClass('open')) {
      $('.main__nav').removeClass('open');
      $('.header__menu').removeClass('open');
      $('.header').removeClass('open');
      setTimeout(function(){
        $('.header__logo-img--black').attr('src', 'img/logo.svg');
      }, 100);
      if($('.social-round').hasClass('in')) {
        $('.social-round').removeClass('in');
      }
      $('.strelca-top').removeAttr('style');
    } else {
      $('.main__nav').addClass('open');
      $('.header__menu').addClass('open');
      $('.header').addClass('open');
      setTimeout(function(){
        $('.header__logo-img--black').attr('src', 'img/logo-menu.svg');
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

  //language block
  $('.language-items').on('click', function() {
    if(!$(this).hasClass('active')) {
      $('.language-items').removeClass('active');
      $(this).addClass('active');
    }
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
    $('.strelca-top').css('z-index', '1');
    setTimeout(function(){
      $('.header__logo-img--black').attr('src', 'img/logo-menu.svg');
    }, 400);
  });

  $('.back.close').on('click', function(e) {
    e.preventDefault();
    $('.header__contact').removeClass('open');
    $('.about-popap').removeClass('open');
    $('.header').removeClass('open');
    $('.strelca-top').removeAttr('style');
    setTimeout(function(){
        $('.header__logo-img--black').attr('src', 'img/logo.svg');
      }, 100);
  });

}(jQuery));



