// Inits

$(document).ready(function(){
  HideShow();
  MenuShow();
  SubmenuShow();
  SubmenuCard();

  $(window).resize(function () {
    w_width = $(window).width();
    fnDelay(function() {
      
    }, 250);    
  }).resize(); 

  $(window).scroll(function(){

  });

  $.browserSelector();
  if($("html").hasClass("chrome")) {
      $.smoothScroll();
  }

  $('#scene1').parallax({
    scalarY: 0,
    frictionY: 0,
    originY: 0
  });


});

/**/




// позволяет анимировать фон
(function($) {
 $.extend($.fx.step,{
 backgroundPosition: function(fx) {
 if (fx.pos === 0 && typeof fx.end == 'string') {
 var start = $.css(fx.elem,'backgroundPosition');
 start = toArray(start);
 fx.start = [start[0],start[2]];
 var end = toArray(fx.end);
 fx.end = [end[0],end[2]];
 fx.unit = [end[1],end[3]];
 }
 var nowPosX = [];
 nowPosX[0] = ((fx.end[0] - fx.start[0]) * fx.pos) + fx.start[0] + fx.unit[0];
 nowPosX[1] = ((fx.end[1] - fx.start[1]) * fx.pos) + fx.start[1] + fx.unit[1];
 fx.elem.style.backgroundPosition = nowPosX[0]+' '+nowPosX[1];

function toArray(strg){
 strg = strg.replace(/left|top/g,'0px');
 strg = strg.replace(/right|bottom/g,'100%');
 strg = strg.replace(/([0-9\.]+)(\s|\)|$)/g,"$1px$2");
 var res = strg.match(/(-?[0-9\.]+)(px|\%|em|pt)\s(-?[0-9\.]+)(px|\%|em|pt)/);
 return [parseFloat(res[1],10),res[2],parseFloat(res[3],10),res[4]];
 }
 }
 });
})(jQuery);

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

  $('body').on('click', '.b-show_more:not(.s-show)', function(e) {
    $(this).addClass('s-show');
    $('.b-add_card').slideDown('250','easeOutSine', function() {
      $('.b-card_group_cover.m-n_2').animate({opacity: 1}, 500);
    });
  }); 
  $('body').on('click', '.b-show_more.s-show', function(e) {
    $(this).removeClass('s-show');
    $('.b-card_group_cover.m-n_2').animate({opacity: 0}, 100);
    setTimeout(function() { 
      $('.b-add_card').slideUp(500, 'easeInSine');
    }, 550);    
      
  });

}


function MenuShow() {
  var start_width = $('.s-menu_show.s-active').width();
  var start_pos = $('.s-menu_show.s-active').position().left;
  $('.b-line_slide div').css({
    'width': start_width
  }, 250);

  setTimeout(function() { 
    $('.b-avers_layer').addClass('s-show');
  }, 800);

  setTimeout(function() { 
    $('.s-content_additional_1').addClass('s-active');
  }, 400);

  $('body').on('mouseenter', '.b-menu_item', function(e) {
    var line_width = $(this).width();
    var line_pos = $(this).position().left;
    $('.b-line_slide div').stop();
    $('.b-line_slide div').animate({
      'width': line_width,
      'left': line_pos
    }, 250); 
  });

  $('body').on('mouseleave', '.b-menu', function(e) {
    $('.b-line_slide div').stop();
    $('.b-line_slide div').animate({
      'width': start_width,
      'left': start_pos
    }, 250); 
  });  

}


function SubmenuShow() {
  rotate_lock = 0;

  $('body').on('click', '.b-show_more:not(.s-show)', function(e) {
    setTimeout(function() {
      var bg_move = -500+($('.b-submenu_content_item.s-submenu_section_1').height()/2);
      $('.b-parallax_bg img').animate({
        'top': bg_move + 'px',
      }, 500, 'swing');
    }, 260);
  });

  $('body').on('click', '.b-show_more.s-show', function(e) {
    setTimeout(function() {
      var bg_move = -500+($('.b-submenu_content_item.s-submenu_section_1').height()/2);
      $('.b-parallax_bg img').animate({
        'top': bg_move + 'px',
      }, 500, 'swing');
    }, 1000);
  });  

  $('body').on('click', '.s-submenu_show:not(.s-active)', function(e) {
    if(rotate_lock == 0){
      var choise_2 = "";
      choise_2 = $(this).attr('data-content-add');

      $('.b-submenu_content_additional_item').removeClass('s-active');
      setTimeout(function() { 
        $('body').find('.s-'+choise_2).addClass('s-active');
      }, 500);
      

      rotate_lock = 1;

      var choise = "";
      choise = $(this).attr('id');

      block_start_height = $('.b-submenu_content_item.s-active').height(),
      block_end_height = $('body').find('.s-'+choise).height(),
      bg_move = -500+(block_end_height/2);



      $('.s-submenu_show').removeClass('s-active');
      $(this).addClass('s-active');

      $('.b-submenu_content').append($('.b-submenu_content_item:hidden'));

      $('.b-submenu_content_item:visible').addClass('s-up').animate({
        'margin-top': -block_start_height},
        1000, 'easeOutCubic', function() {
          $('.b-submenu_content_item.s-up').css('margin-top', '0').hide();
          $('.b-submenu_content_item').removeClass('s-up').removeClass('s-down');
          $('.b-submenu_content_item:hidden').removeClass('s-active');
          rotate_lock = 0;
      });
      $('body').find('.s-'+choise).slideDown(1000, 'easeOutCubic');

      $('.b-parallax_bg img').animate({
        'top': bg_move + 'px',
      }, 1000, 'swing');

      setTimeout(function() { 

        $('body').find('.s-'+choise).addClass('s-down').addClass('s-active');
      }, 500);   
    }      
  });  

}


function SubmenuCard() {

  //using TweenLite.set() takes care of all vendor-prefixes
  TweenLite.set('.b-card_item', {perspective:800});
  TweenLite.set('.b-card', {transformStyle:'preserve-3d'});
  TweenLite.set('.b-revers', {rotationY:-180});
  TweenLite.set(['.b-revers', '.b-avers'], {backfaceVisibility:'hidden'}); 


  $('.b-card_item').hover(
    function() {
      TweenLite.to($(this).find('.b-card'), 1.2, {rotationY:180, ease:Back.easeOut});
    },
    function() {
      TweenLite.to($(this).find('.b-card'), 1.2, {rotationY:0, ease:Back.easeOut});  
    }
  );


  setTimeout(function() { 
    $('.b-card_group_cover').addClass('s-show');
  }, 250);

  setTimeout(function() { 
    $('.b-card_group_cover').css({'width':'auto'});
  }, 1500);


  $('body').on('click', '.b-revers_link.s-rotate_card', function(e) {

      var choise = "";
      choise = $(this).attr('id');
      var that = $(this);

      $('.b-card_group_cover.m-n_1').css({
        'perspective': 'none',
      });

 
        that.parent().parent().find('.b-revers_layer.m-n_1').addClass('s-unselected');
        that.parent().parent().find('.b-revers_layer.m-n_2').addClass('s-selected');
        $('body').find('.s-'+choise).show();



  }); 

/**/

  $('body').on('mouseenter', '.b-card_item.m-group', function(e) {
    $(this).find('.b-avers_layer').removeClass('s-show');
    setTimeout(function() { 
      $('.b-revers_layer').addClass('s-show');
    }, 800);

  }); 

  $('body').on('mouseleave', '.b-card_item.m-group', function(e) {

    setTimeout(function() { 
      $('.b-card_content').hide();
      $('.b-revers_layer').removeClass('s-show').removeClass('s-unselected').removeClass('s-selected');
    }, 250);

    setTimeout(function() { 
      $('.b-avers_layer').addClass('s-show');
    }, 800);    

  });


}

