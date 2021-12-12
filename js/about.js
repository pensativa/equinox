(function($) {
let wrapper = document.querySelector('.page__wrapper');

const pageSlider = new Swiper('.page', {
    // Свои классы
    wrapperClass: "page__wrapper",
    slideClass: "page__screen",

    // Вертикальный слайдер
    direction: 'vertical',

    // Количество слайдов для показа
    slidesPerView: '1',

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
    mousewheel: {
        sensitivity: 1,
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
            setScrollType();
            showContacts();
            bigLogo();
        },
        slideChange: function () {
          showContacts();
          bigLogo();
        },

        resize: function() {
            setScrollType();
        },
        
    },
});

function showContacts() {
  const phone = document.querySelector('.about-page__footer .phone');
  const email = document.querySelector('.about-page__footer .email');
  if (pageSlider.realIndex === 3) {
    phone.style.transform = 'translateY(-50px)';
    email.style.transform = 'translateY(-50px)';
  } else {
    phone.style.transform = 'translateY(100vh)';
    email.style.transform = 'translateY(100vh)';
  }
}

function bigLogo() {
  const logo = document.querySelector('.header__logo-img');
  if (pageSlider.realIndex === 0) {
    logo.style.transform = 'scale(1.5)';
  } else {
    logo.style.transform = 'scale(1)';
  }

}

//?
function setScrollType() {
    if (wrapper.classList.contains('_free')) {
        wrapper.classList.remove('_free');
        pageSlider.params.freeMode = false;
    }
    for (let index = 0; index < pageSlider.slides.length; index++) {
        const pageSlide = pageSlider.slides[index];
        const pageSlideContent = pageSlide.querySelector('.screen__content');
        if (pageSlideContent) {
            const pageSlideContentHeight = pageSlideContent.offsetHeight;
            if (pageSlideContentHeight > window.innerHeight) {
                wrapper.classList.add('_free');
                pageSlider.params.freeMode = true;
                break;
            }
        }
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
      $('.strelca-top').removeAttr('style');
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

  //test canvas

(function global() {
  const canvas = document.getElementById("lines");
  const ctx = canvas.getContext("2d");
  let width;
  let height;
  class Line {
    constructor(origin, size, length, color, style = "pattern") {
      this.size = size;
      this.origin = origin;
      this.length = length;
      this.color = color;
      this.style = style;
      this.origin = `M${origin.x},${origin.y}`;
      this.offSet = 0;
      this.line = null;
      this.offSetSpeed = length / size;
    }
    getColorString() {
      return `hsla(${this.color.h}deg,${this.color.s}%,${this.color.l}%,${this.color.a})`;
    }
    generators() {
      return [
        {
          line: `h${this.size}`,
          mag: this.size
        },
        {
          line: `h-${this.size}`,
          mag: this.size
        },
        {
          line: `v${this.size}`,
          mag: this.size
        },
        {
          line: `v-${this.size}`,
          mag: this.size
        },
        {
          line: `l${this.size},${this.size}`,
          mag: Math.hypot(this.size, this.size)
        },
        {
          line: `l${this.size}-${this.size}`,
          mag: Math.hypot(this.size, this.size)
        },
        {
          line: `l-${this.size},${this.size}`,
          mag: Math.hypot(this.size, this.size)
        },
        {
          line: `l-${this.size}-${this.size}`,
          mag: Math.hypot(this.size, this.size)
        }
      ];
    }
    generate() {
      let segments = this.generators(this.size);
      let path = this.origin;
      let mag = 0;
      let fragment;
      let i;
      for (i = 0; i < this.length; i += 1) {
        fragment = segments[(Math.random() * segments.length) | 0];
        path += ` ${fragment.line}`;
        mag += fragment.mag;
      }
      this.line = {
        path,
        mag
      };
      return this;
    }
    renderStyle(style) {
      if (style === "glitches") {
        ctx.lineDashOffset = this.line.mag + this.offSet;
        ctx.setLineDash([
          this.size ** 1.5,
          (this.line.mag / this.length) * this.size ** 2
        ]);
        this.offSet += 20;
        // this.size / (this.size ** 2);
        ctx.lineWidth = 2;
        return this;
      }
      if (style === "pattern") {
        ctx.lineDashOffset = this.line.mag - this.offSet;
        ctx.setLineDash([this.line.mag, this.line.mag]);
        this.offSet += 10;
        //this.size / (this.size ** 100);
        ctx.lineWidth = 1;
      }
    }
    mutatePath() {
      let lineFragment = this.line.path.split(" ").slice(1);
      let generator = this.generators();
      lineFragment[(Math.random() * lineFragment.length) | 0] =
        generator[(Math.random() * generator.length) | 0].line;
      this.line.path = `${this.line.path.split(" ")[0]} ${lineFragment.join(
        " "
      )}`;
    }
    draw() {
      !this.line && this.generate();

      ctx.strokeStyle = this.getColorString();
      this.renderStyle(this.style);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.stroke(new Path2D(this.line.path));
      return this;
    }
  }
  function clear() {
    ctx.fillStyle = `#000`;
    ctx.fillRect(0, 0, width, height);
  }
  function generateLines(amount) {
    let lines = [];
    let styles = [
      {
        size: 1.25,
        style: "pattern",
        color: { h: 21, s: 84, l: 48, a: 0 }
      },
      { size: 2.5, style: "pattern", color: { h: 0, s: 0, l: 50, a: 0.3 } },
      { size: 5, style: "pattern", color: { h: 0, s: 0, l: 60, a: 0.2 } },
      { size: 10, style: "pattern", color: { h: 0, s: 0, l: 55, a: 0.15 } },
      { size: 20, style: "pattern", color: { h: 0, s: 0, l: 35, a: 0.12 } },
      { size: 20, style: "pattern", color: { h: 0, s: 0, l: 40, a: 0.12 } },
      { size: 40, style: "pattern", color: { h: 0, s: 0, l: 50, a: 0.12 } },
      { size: 80, style: "pattern", color: { h: 0, s: 0, l: 60, a: 0.12 } },
      { size: 40, style: "glitches", color: { h: 21, s: 84, l: 50, a: 0.3 } },
      { size: 20, style: "glitches", color: { h: 19, s: 75, l: 50, a: 0.3 } },
      { size: 60, style: "glitches", color: { h: 20, s: 65, l: 50, a: 0.3 } }
    ];
    for (let i = 0; i < amount; i += 1) {
      let style = styles[(Math.random() ** 2 * styles.length) | 0];
      lines.push(
        new Line(
          { x: width * 0.5, y: height * 0.5 },
          style.size,
          500 + Math.random() * 1000,
          style.color,
          style.style
        )
      );
    }
    return lines;
  }
  let id;
  function resize() {
    id = cancelAnimationFrame(id);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    const lines = generateLines(40);
    function update() {
      if (!(id % 3)) {
        clear();
        lines.forEach((line) => {
          line.draw();
          if (!(id % 5) && Math.random() > 0.95) {
            line.mutatePath();
          }
        });
      }
      id = requestAnimationFrame(update);
    }
    id = requestAnimationFrame(update);
  }
  window.addEventListener("resize", resize, {
    passive: true
  });
  resize();
})();


}(jQuery));



