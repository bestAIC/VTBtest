// Inits

$(document).ready(function(){
  SliderShow();
  ScrollWidth();
  MenuShow();
  TransitionShow();
  FloatNav();
  ParallaxBg();
  ParallaxTile();
  ScrollFade();
  HideShow();

  $(window).resize(function () {
    w_width = $(window).width();
    fnDelay(function() {
      
    }, 250);    
  }).resize(); 

  $(window).scroll(function(){
    FloatNav();
    ParallaxBg();
    ScrollFade();
  });

  $.browserSelector();
  if($("html").hasClass("chrome")) {
      $.smoothScroll();
  }


});

lock_video = 0;

/**/

// уменьшаем кол-во вызовов функции при ресайзе или скролле
fnDelay = (function(){
    var timer = 0;
    return function(callback, ms){
        clearTimeout(timer);
        timer = setTimeout(callback, ms);
    };
})();

function ScrollWidth() { // убираем скролл у боди при прокрутке псевдоврейма
  var inner = document.createElement('div');
  inner.style.width = '100%';

  var outer = document.createElement('div');
  outer.style.position = 'absolute';
  outer.style.top = '0';
  outer.style.left = '0';
  outer.style.visibility = 'hidden';
  outer.style.width = '20px';
  outer.style.overflow = 'hidden';
  outer.appendChild (inner);

  document.body.appendChild (outer);
  var w1 = inner.offsetWidth;
  outer.style.overflow = 'scroll';
  var w2 = inner.offsetWidth;
  if (w1 == w2)
      w2 = outer.clientWidth;
  document.body.removeChild (outer);

  barwidth = (w1 - w2);
};

/**/

function HideShow() {


}


function ScrollFade() {

  var heightBlock = $(window).height(),
      startBlock_fade = $('.s-content_n_0 .b-pay_tile').offset().top,
      startBlock_fade2 = $('.s-content_n_0 .b-footer_img').offset().top,
      startBlock_fade3 = $('.s-content_n_5 .b-content_img_left').offset().top,
      startBlock_fade4 = $('.s-content_n_5 .b-footer_img').offset().top;

  if($('.s-content_n_0:visible').length){
    if ($(window).scrollTop()+heightBlock-50 > startBlock_fade ) {
      $('.s-content_n_0 .b-pay_tile').addClass('s-show'); 
    } 
    if (($(window).scrollTop()+heightBlock-100) > startBlock_fade2) {
      $('.s-content_n_0 .b-footer_img').addClass('s-show');  
    }
  }
  if($('.s-content_n_5:visible').length){
    if (($(window).scrollTop()+heightBlock-50) > startBlock_fade3) {
      $('.s-content_n_5 .b-content_img_left').addClass('s-show');  
    }    
    if (($(window).scrollTop()+heightBlock-100) > startBlock_fade4) {
      $('.s-content_n_5 .b-footer_img').addClass('s-show');  
    }

    if ($(window).scrollTop() > startBlock_fade3 && $(window).scrollTop() < 2025) {
      $('.s-content_n_5 .b-content_img_right').css({
        'position': 'fixed',
      });  
    } else {
      $('.s-content_n_5 .b-content_img_right').css({
        'position': 'absolute',
      }); 
    }

    if ($(window).scrollTop() > 2025) {
      $('.s-content_n_5 .b-content_img_right').css({
        'position': 'absolute',
        'top': '600px',
      });  
    } else {
      $('.s-content_n_5 .b-content_img_right').css({
        'top': '120px',
      }); 
    }  

  }

}


function ParallaxTile() {

  $('.b-poster').on('mousemove', function(e) {
    var $layer = $(this).find('div[class*="layer-"]'),
      w = $(this).width(),
      h = $(this).height(),
      offsetX = 0.5 -(e.offsetX==undefined?e.layerX:e.offsetX)/ w,
      offsetY = 0.5 -(e.offsetY==undefined?e.layerY:e.offsetY)/ h,
      angle = 180 / Math.PI, //convert rad in degrees
      offsetPoster = $(this).data('offset'),
      transformPoster = 'translateY(' + offsetX * offsetPoster + 'px) rotateX(' + (offsetY * offsetPoster) + 'deg) rotateY(' + (offsetX * (offsetPoster * 2)) + 'deg)'; //poster transform

    $layer.each(function() {
      var $this = $(this),
        offsetLayer = $this.data('offset') || 0,
        transformLayer = 'translateX(' + offsetX * offsetLayer + 'px) translateY(' + offsetY * offsetLayer + 'px)';

      $this.css('transform', transformLayer);
    });

  });

  $('.b-poster').on('mouseleave', function(e) {
    var $layer = $(this).find('div[class*="layer-"]');
    $layer.css({
      'transform': 'translateY(0px) rotateX(0deg) rotateY(0deg)',
    });

  });

}


function ParallaxBg() {

  var displacement = $(window).scrollTop()/2;

  $('.b-header_bg_fade').css({
    'top': displacement,
    //'transform': 'perspective(300px) scale('+ (1-displacement/1000) +') rotateX(-'+ displacement/50 +'deg)',
  });

  //$('.b-scroll_fade').css({
  //  'opacity': displacement/150, 
  //});

  $('.b-scroll_fade_2').css({
    'opacity': displacement/300, 
  });

  if($(window).scrollTop()>20){
    $('.b-scroll_fade_2').css({
      'z-index': 10, 
    })
  } else {
    $('.b-scroll_fade_2').css({
      'z-index': 0, 
    }) 
  }

/**/

  var startParallax_1 = $('.s-content_n_0 .b-parallax_block').offset().top;
  var startParallax_5 = $('.s-content_n_5 .b-parallax_block').offset().top;
  var parallaxRange_f_1 = ($(window).scrollTop()-startParallax_1)/5;
  var parallaxRange_s_1 = 45+((startParallax_1-$(window).scrollTop())/30);
  var parallaxRange_f_5 = ($(window).scrollTop()-startParallax_5)/5;
  var parallaxRange_s_5 = ((startParallax_5-$(window).scrollTop())/2);  
  var heightBlock = $(window).height();

  if(($(window).scrollTop()+heightBlock) > startParallax_1 && $(window).scrollTop() < startParallax_1 ){
    $('.s-content_n_0 .b-parallax_layer_1_1').css({'top': -parallaxRange_f_1+10});
    $('.s-content_n_0 .b-parallax_layer_0 i').css({'background-position': parallaxRange_s_1 +'% '+ parallaxRange_s_1 +'%'});
  }   

  if(($(window).scrollTop()+heightBlock) > startParallax_5 && $(window).scrollTop() < startParallax_5 ){
    $('.s-content_n_5 .b-parallax_layer_1_1').css({'top': -parallaxRange_f_5+10});
    $('.s-content_n_5 .b-parallax_layer_0 i').css({'top': -parallaxRange_s_5+200});
  } 
      
}


function FloatNav() {

  var startBlock_nav = $('.b-top_nav').position().top;
  var startBlock_logo = $('.b-temp_content_cover').offset().top;
  var heightBlock = $(window).height();

  if(!$('.b-menu_detailed:visible').length){
    if ($(window).scrollTop() > startBlock_nav+599 ) {
      $('.b-top_nav, .b-menu_cover').addClass('s-active');
      $('.b-menu_cover').css({
        'box-shadow': '0px 6px 26px 0px rgba(50, 50, 50, 0.2)',
        'border-bottom': 'none',
        'top':'55px',
      });       
    } else {
      $('.b-top_nav, .b-menu_cover').removeClass('s-active');
      $('.b-menu_cover').css({
        'box-shadow': 'none',
        'border-bottom': 'none',
        'top':'0px',
      });       
    }


    if ($(window).scrollTop() > startBlock_logo-1 ) {
      $('.b-logo').addClass('s-active');
      $('.b-logo_cover').css({
        'z-index': '28'
      });
    } else {
      $('.b-logo').removeClass('s-active');
      $('.b-logo_cover').css({
        'z-index': '11'
      });
    } 

  } else {

      $('.b-menu_cover').css({
        'top':'55px',
      }); 

    $('.b-top_nav, .b-menu_cover').addClass('s-active');

    $('.b-logo').addClass('s-active');
    $('.b-logo_cover').css({
      'z-index': '28'
    });
  }

}


function SliderShow() {

  $('body').on('click', '.b-pseudo_click_item span', function(){
    $('.b-pseudo_click_item').removeClass('s-on');
    $('.loader').removeClass('s-start');

    var choise = "";
    choise = $(this).attr('class');

    var choise_2 = "";
    choise_2 = $(this).attr('data-txt');      

    if(!$('body').find('#'+choise).parent().hasClass('s-foreground')){

      var video = document.getElementById(choise);
      video.currentTime = 0;
      video.play();

      setTimeout(function() { 
        $('.loader').addClass('s-start');

        $('.s-backdrop').removeClass('s-backdrop');
        $('.s-foreground').addClass('s-backdrop').removeClass('s-foreground');
        $('body').find('#'+choise).parent().addClass('s-foreground');

        $('.b-bnr_txt.s-post_active').removeClass('s-post_active');
        $('.b-bnr_txt.s-active').removeClass('s-active').addClass('s-post_active');
        $('body').find('.'+choise_2).addClass('s-active');
      }, 100); 
    }  
  });

  var videoHolder = $('.b-pseudo_click_item'),
    videoHolderLength = videoHolder.length,
    i = 1;

  var initSlider = function() {   
    if(i == videoHolderLength) i = 0;     
    videoHolder.eq(i).hide(function(){
      i++;
      $(this).find('span').click();
      $(this).addClass('s-on');
    });
  }

  var timerId = setInterval(function() {
    if(lock_video == 0){
      initSlider();
    }
  }, 8000); 


  $('.b-arrow_prev').on('click', function(){
    clearInterval(timerId);
    timerId = setInterval(function() {
      if(lock_video == 0){
        initSlider();
      }
    }, 8000);      
    var count = $('.s-on').index();
    if(count == 0){
      videoHolder.eq(4).find('span').click().parent().addClass('s-on');
    } else {
      videoHolder.eq(count-1).find('span').click().parent().addClass('s-on');
    } 
  });

  $('.b-arrow_next').on('click', function(){
    clearInterval(timerId);
    timerId = setInterval(function() {
      if(lock_video == 0){
        initSlider();
      }
    }, 8000);
    var count = $('.s-on').index();
    if(count == 4){
      videoHolder.eq(0).find('span').click().parent().addClass('s-on');
    } else {
      videoHolder.eq(count+1).find('span').click().parent().addClass('s-on');
    } 
  });  

}

function TransitionShow() {

  $('body').on('click', '.b-logo', function(e) {
    location.reload();
  });


  $('body').on('click', '.b-bnr_txt .b-btn', function(e) {

    var choise = $(this).attr('id');
    var $message = $('body').find('.s-' + choise);
    var video_choise = $(this).attr('data-video');
    var video = document.getElementById(video_choise);
    //video.currentTime = 4;
    //video.pause();
    lock_video = 1;

    $('.b-switch_arrow').fadeOut();


    $('.b-temp_content .b-temp_content_item').fadeOut(600);
    setTimeout(function() {
      $message.fadeIn();
      $.scrollTo('.b-temp_content', 600);
    }, 600);

    $('.b-loader_line').addClass('s-load');
    setTimeout(function() {
      $('.b-loader_line').removeClass('s-load');
    }, 1000); 

  });


  $('body').on('click', '.b-menu_detailed_item .b-btn', function() {

    var choise = $(this).attr('data-menu');
    var choise_content = $(this).attr('id');
    var $message = $('body').find('#' + choise);
    var $message_content = $('body').find('.' + choise_content);

    $('.b-temp_content .b-temp_content_item').fadeOut(600);
    setTimeout(function() {
      $message_content.fadeIn();
    }, 600);

    $('.s-menu_show').removeClass('s-select');
    $message.addClass('s-select');

    $('.b-video_cover').removeClass('s-foreground');
    $('.b-start_image').removeClass('s-go');
    $('.b-bnr_txt').removeClass('s-active');
    $('.b-bnr_txt:not(.m-distribution_cover)').removeClass('s-post_active');
    lock_video = 1;

    setTimeout(function() {
      $.scrollTo('.b-header', 0);
    },300);

    setTimeout(function() {

      $('.b-top_nav, .b-menu_cover').removeClass('s-active');
      $('.b-menu_cover').css({
        'top':'0px',
      }); 
      $('.b-logo').removeClass('s-active');
      $('.b-logo_cover').css({
        'z-index': '11'
      });

    },900);  


    $('.b-switch_arrow, .b-bnr_txt').hide();
    $('.b-bnr_txt').removeClass('s-active');
    $('.b-bnr_txt.m-n_1_1').show().addClass('s-active');

    $('.b-loader_line').addClass('s-load');
    setTimeout(function() {
      $('.b-loader_line').removeClass('s-load');
    }, 1000); 


    setTimeout(function() {
      $('.b-menu_detailed').fadeOut();
      $('.b-menu_detailed_item').hide();
      $(document).unbind('click.event');
      $('.s-menu_show').removeClass('s-active');
      $('#popup-fade, .b-menu_bottom_line').fadeOut('400', function() {
        $('.m-layer').css({
          'z-index': 9
        });               
      });
     

      $('.b-header').css({
        'margin': 0
      }); 
      $('.b-start_image IMG, .b-video_cover VIDEO').css({
        'margin-left': -990,
      });
      $('.b-line_slide div').css({
        'width': 0
      }); 
    }, 1000);

   
  });


  $('body').on('click', '.b-col_cover.m-distribution div', function(){
    $('.b-pseudo_click_item').removeClass('s-on');
    $('.loader').removeClass('s-start');
    $('.b-bnr_txt').show();
    $('.b-start_image').addClass('s-go');

    var choise_content = $(this).attr('data-content');
    var $message_content = $('body').find('.' + choise_content);

    $('.b-temp_content .b-temp_content_item').fadeOut(600);
    setTimeout(function() {
      $message_content.fadeIn();
    }, 600);

    $('.b-loader_line').addClass('s-load');
    setTimeout(function() {
      $('.b-loader_line').removeClass('s-load');
    }, 1000); 

    var choise = "";
    choise = $(this).attr('class');

    var choise_2 = "";
    choise_2 = $(this).attr('data-txt');      

    if(!$('body').find('#'+choise).parent().hasClass('s-foreground')){

      var video = document.getElementById(choise);
      video.currentTime = 0;
      video.play();

      setTimeout(function() { 
        $('.loader').addClass('s-start');

        $('.s-backdrop').removeClass('s-backdrop');
        $('.s-foreground').addClass('s-backdrop').removeClass('s-foreground');
        $('body').find('#'+choise).parent().addClass('s-foreground');

        $('.b-bnr_txt.s-post_active').removeClass('s-post_active');
        $('.b-bnr_txt.s-active').removeClass('s-active').addClass('s-post_active');
        $('body').find('.'+choise_2).addClass('s-active');
      }, 100); 
    }  
  });


  $('body').on('click', '.b-link div', function(){
    $('.b-pseudo_click_item').removeClass('s-on');
    $('.loader').removeClass('s-start');
    $('.b-bnr_txt').show();
    $('.b-start_image').addClass('s-go');

    var choise_content = $(this).attr('data-content');
    var $message_content = $('body').find('.' + choise_content);

    $('.b-temp_content .b-temp_content_item').fadeOut(600);
    setTimeout(function() {
      $message_content.fadeIn();
    }, 600);

    $('.b-loader_line').addClass('s-load');
    setTimeout(function() {
      $('.b-loader_line').removeClass('s-load');
    }, 1000); 

    var choise = "";
    choise = $(this).attr('class');

    var choise_2 = "";
    choise_2 = $(this).attr('data-txt');      

    if(!$('body').find('#'+choise).parent().hasClass('s-foreground')){

      var video = document.getElementById(choise);
      video.currentTime = 0;
      video.play();

      setTimeout(function() { 
        $('.loader').addClass('s-start');

        $('.s-backdrop').removeClass('s-backdrop');
        $('.s-foreground').addClass('s-backdrop').removeClass('s-foreground');
        $('body').find('#'+choise).parent().addClass('s-foreground');

        $('.b-bnr_txt.s-post_active').removeClass('s-post_active');
        $('.b-bnr_txt.s-active').removeClass('s-active').addClass('s-post_active');
        $('body').find('.'+choise_2).addClass('s-active');
      }, 100); 
    }  

    setTimeout(function() {
      $.scrollTo('.b-header', 0);
    },300);

    setTimeout(function() {

      $('.b-top_nav, .b-menu_cover').removeClass('s-active');
      $('.b-menu_cover').css({
        'top':'0px',
      }); 
      $('.b-logo').removeClass('s-active');
      $('.b-logo_cover').css({
        'z-index': '11'
      });

          $('.b-switch_arrow, .b-bnr_txt').hide();
    $('.b-bnr_txt').removeClass('s-active');
    $('.b-bnr_txt.m-n_5').show().addClass('s-active');

    },900);  




    $('.b-loader_line').addClass('s-load');
    setTimeout(function() {
      $('.b-loader_line').removeClass('s-load');
    }, 1000); 


    setTimeout(function() {
      $('.b-menu_detailed').fadeOut();
      $('.b-menu_detailed_item').hide();
      $(document).unbind('click.event');
      $('.s-menu_show').removeClass('s-active');
      $('#popup-fade, .b-menu_bottom_line').fadeOut('400', function() {
        $('.m-layer').css({
          'z-index': 9
        });               
      });
     

      $('.b-header').css({
        'margin': 0
      }); 
      $('.b-start_image IMG, .b-video_cover VIDEO').css({
        'margin-left': -990,
      });
      $('.b-line_slide div').css({
        'width': 0
      }); 
    }, 1000);


  });


  

}   

function MenuShow() {

  $('body').on('mouseenter', '.s-menu_show', function(e) {
    var choise = $(this).attr('id');
    var $message_cover = $('.b-menu_detailed');
    var $message = $('body').find('.s-' + choise);

    if($('#popup-fade:visible').length){
      if(!$(this).hasClass('s-active')){
        $('.s-menu_show').removeClass('s-active');
      }
      $(this).addClass('s-active');

      var line_width = $(this).width();
      var line_pos = $(this).parent().position().left;

      $('.b-line_slide div').stop();

      $('.b-line_slide div').animate({
        'width': line_width,
        'left': line_pos
      }, 250); 

      fnDelay(function() {
        if(('b-menu_detailed_item s-' + choise) != $('.b-menu_detailed_item:visible').attr('class')){
          // Для работы скрипта важно написание и порядок класса в этих тэгах
          $('.b-menu_detailed_item').fadeOut();
        }
        $message.fadeIn();
      }, 250); 
    }  
  });

  $('body').on('click', '.s-menu_show', function(e) {
    var choise = $(this).attr('id');
    var $message_cover = $('.b-menu_detailed');
    var $message = $('body').find('.s-' + choise);

    lock_video = 1;


  var startBlock_nav = $('.b-top_nav').position().top;
  var startBlock_logo = $('.b-temp_content_cover').offset().top;
  var heightBlock = $(window).height();
  
  if ($(window).scrollTop() > startBlock_nav+600 ) {
    $('.b-top_nav, .b-menu_cover').addClass('s-active');    
  } else {
    $('.b-top_nav, .b-menu_cover').removeClass('s-active');   
  }

  $('.b-menu_cover').css({
    'box-shadow': 'none',
    'border-bottom': '1px solid rgba(200,200,200,0.5)',
  }); 

  if ($(window).scrollTop() > startBlock_logo-100 ) {
    $('.b-logo').addClass('s-active');
    $('.b-logo_cover').css({
      'z-index': '28'
    });
  } else {
    $('.b-logo').removeClass('s-active');
    $('.b-logo_cover').css({
      'z-index': '11'
    });
  }



    if(!$('#popup-fade:visible').length){

      $('.b-menu_bottom_line').fadeIn();

/*
      $('.b-header').css({
        'margin-left': -barwidth,
        'margin-right': -barwidth
      });

      var vidmove = -990-barwidth/2

      $('.b-start_image IMG, .b-video_cover VIDEO').css({
        'margin-left': vidmove,
      });
*/
      $('.m-layer').css({
        'z-index': 1
      });   

      $('#popup-fade').fadeIn();

      if ($message_cover.css('display') != 'block') {

        $message_cover.fadeIn();
        $message.fadeIn();

        var firstClick = true;
        $(document).bind('click.event', function(e) {
          if (!firstClick && $(e.target).closest('.b-menu_detailed, .b-popup_cover, .s-menu_show, .b-pseudo_click_item span').length == 0) {
            $message_cover.fadeOut();
            lock_video = 0;
            $('.b-menu_detailed_item').hide();
            $(document).unbind('click.event');
            $('.s-menu_show').removeClass('s-active');
            $('#popup-fade, .b-menu_bottom_line').fadeOut('400', function() {
              $('.m-layer').css({
                'z-index': 9
              });               
            });


    var startBlock_nav = $('.b-top_nav').position().top;
    var startBlock_logo = $('.b-temp_content_cover').offset().top;
    var heightBlock = $(window).height();
    
    if ($(window).scrollTop() > startBlock_nav+600 ) {
      $('.b-top_nav, .b-menu_cover').addClass('s-active');
      $('.b-menu_cover').css({
        'box-shadow': '0px 6px 26px 0px rgba(50, 50, 50, 0.2)',
        'border-bottom': 'none',
        'top':'55px',
      }); 
    } else {
      $('.b-top_nav, .b-menu_cover').removeClass('s-active');
      $('.b-menu_cover').css({
        'box-shadow': 'none',
        'border-bottom': 'none',
        'top':'0px',
      }); 
    }

    if ($(window).scrollTop() > startBlock_logo-100 ) {
      $('.b-logo').addClass('s-active');
      $('.b-logo_cover').css({
        'z-index': '28'
      });
    } else {
      $('.b-logo').removeClass('s-active');
      $('.b-logo_cover').css({
        'z-index': '11'
      });
    }


            $('.b-header').css({
              'margin': 0
            });
            $('.b-start_image IMG, .b-video_cover VIDEO').css({
              'margin-left': -990,
            });
            $('.b-line_slide div').css({
              'width': 0
            });                                           
          }

          $(document).keyup(function(d) {
            if (d.keyCode == 27) {
              $message_cover.fadeOut();
              lock_video = 0;
              $('.b-menu_detailed_item').hide();
              $(document).unbind('click.event');
              $('.s-menu_show').removeClass('s-active');
              $('#popup-fade, .b-menu_bottom_line').fadeOut('400', function() {
                $('.m-layer').css({
                  'z-index': 9
                });               
              });


    var startBlock_nav = $('.b-top_nav').position().top;
    var startBlock_logo = $('.b-temp_content_cover').offset().top;
    var heightBlock = $(window).height();
    
    if ($(window).scrollTop() > startBlock_nav+600 ) {
      $('.b-top_nav, .b-menu_cover').addClass('s-active');
      $('.b-menu_cover').css({
        'box-shadow': '0px 6px 26px 0px rgba(50, 50, 50, 0.2)',
        'border-bottom': 'none',
        'top':'55px',
      }); 
    } else {
      $('.b-top_nav, .b-menu_cover').removeClass('s-active');
      $('.b-menu_cover').css({
        'box-shadow': 'none',
        'border-bottom': 'none',
        'top':'0px',
      }); 
    }

    if ($(window).scrollTop() > startBlock_logo-100 ) {
      $('.b-logo').addClass('s-active');
      $('.b-logo_cover').css({
        'z-index': '28'
      });
    } else {
      $('.b-logo').removeClass('s-active');
      $('.b-logo_cover').css({
        'z-index': '11'
      });
    }


              $('.b-header').css({
                'margin': 0
              });
              $('.b-start_image IMG, .b-video_cover VIDEO').css({
                'margin-left': -990,
              }); 
              $('.b-line_slide div').css({
                'width': 0
              });                                     
            }
          });

          $('.b-close_popup, #save_template, .b-slide_up').on('click',function(){
            $message_cover.fadeOut();
            lock_video = 0;
            $('.b-menu_detailed_item').hide();
            $(document).unbind('click.event');
            $('.s-menu_show').removeClass('s-active');
            $('#popup-fade, .b-menu_bottom_line').fadeOut('400', function() {
              $('.m-layer').css({
                'z-index': 9
              });               
            });


    var startBlock_nav = $('.b-top_nav').position().top;
    var startBlock_logo = $('.b-temp_content_cover').offset().top;
    var heightBlock = $(window).height();
    
    if ($(window).scrollTop() > startBlock_nav+600 ) {
      $('.b-top_nav, .b-menu_cover').addClass('s-active');
      $('.b-menu_cover').css({
        'box-shadow': '0px 6px 26px 0px rgba(50, 50, 50, 0.2)',
        'border-bottom': 'none',
        'top':'55px',
      }); 
    } else {
      $('.b-top_nav, .b-menu_cover').removeClass('s-active');
      $('.b-menu_cover').css({
        'box-shadow': 'none',
        'border-bottom': 'none',
        'top':'0px',
      }); 
    }

    if ($(window).scrollTop() > startBlock_logo-100 ) {
      $('.b-logo').addClass('s-active');
      $('.b-logo_cover').css({
        'z-index': '28'
      });
    } else {
      $('.b-logo').removeClass('s-active');
      $('.b-logo_cover').css({
        'z-index': '11'
      });
    }
           

            $('.b-header').css({
              'margin': 0
            }); 
            $('.b-start_image IMG, .b-video_cover VIDEO').css({
              'margin-left': -990,
            }); 
            $('.b-line_slide div').css({
              'width': 0
            });                                                                                  
          });

          firstClick = false;
        });
      }

    }

    e.preventDefault();
  });
}


