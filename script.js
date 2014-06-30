(function() { 
var randColor = function(slider) {
  var r = parseInt(Math.random() * 255),
  g = parseInt(Math.random() * 255),
  b = parseInt(Math.random() * 255),
  color = 'rgb('+ r +','+ g +','+ b +')';
  this.slider.css({
    'background-color':color,
    'border-color': color
  });
};
resize = function() {
  var width = $(window).width();
  width = Math.min(width, 2700);
  var height = width * 60 / 135;
  $('.slider-page').css({width:width, height: height});
}
resize();
$(window).on('resize', resize);
fit = function(img, container) {
  var cw = container.width(),
      ch = container.height()
  imagesLoaded(img, function() {
    var iw = img.width(),
        ih = img.height();
    var ow = img.data('original-width'),
        oh = img.data('original-height');
    
    if(!ow){ img.data('original-width', iw); ow = iw; }
    if(!oh){ img.data('original-height', ih); oh = ih; }

    var cRatio = cw / ch,
        iRatio = iw / ih;

    var newImageWidth = Math.min(ow, cw);
    var newImageHeight = 'auto';

    if(cRatio > iRatio) {
      newImageWidth = 'auto';
      newImageHeight = Math.min(oh, ch);
    }

    img.css({
      width: newImageWidth,
      height: newImageHeight
    })

    img.css({
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginLeft: -img.width() / 2,
      marginTop: -img.height() / 2
    })
  }) 
}

autofit = function(img, container) {  
  fit(img, container) 
  $(window).on('resize', function() { 
    fit(img, container);
  })
}
}());
function Slider(cont,speedFadeIn,speedFadeOut,speedSlider){
  this.cont = cont;
  this.rail = this.cont.find('.slider-container');
  this.clone = this.cont.find('.slider-page').first()
    .clone().appendTo(this.rail);
  this.imageWidth = $(window).width();
  this.page=$('.slider-page');
  this.imageLen = this.page.length;
  this.totalImgsWidth = this.imageWidth * this.imageLen+5;
  this.speedFadeIn = speedFadeIn;
  this.speedFadeOut = speedFadeOut;
  this.speedSlider = speedSlider;
  $(window).on('resize', this.resize.bind(this));
  this.page.css('width', this.imageWidth);
  this.rail.css({
    'width': this.totalImgsWidth,
  });
  this.current = 0;
};
Slider.prototype.resize = function() {
  this.imageWidth = $(window).width()
  this.totalImgsWidth = this.imageWidth * this.imageLen+5;    
  this.rail.css({
    width: this.totalImgsWidth,
    marginLeft: -this.imageWidth * this.current
  })
}
Slider.prototype.slide = function(direction) { 
  this.fadeOut();
  this.direction = direction;
};
Slider.prototype.fadeOut = function() {
  var fadeVar = this.page.eq(this.current);
  fadeVar
    .animate({
      opacity: 0
      }, this.speedFadeOut, function() {
        this.slideTo();
      }.bind(this))
};
Slider.prototype.increment = function() {
  this.current = (1 + this.current) % this.imageLen;
};
Slider.prototype.decrement = function() {
  this.current = (this.current - 1);
  if(this.current < 0) {
    this.current = this.imageLen - 1;
  }
};    
Slider.prototype.slideTo = function() {
   var r = parseInt(Math.random() * 255),
  g = parseInt(Math.random() * 255),
  b = parseInt(Math.random() * 255)
  this.color = 'rgb('+ r +','+ g +','+ b +')';
  var sl = this.rail;
  if(this.direction === 'next'){
    if(this.current === this.imageLen - 1){
      sl.css({
        marginLeft: 0,
      })
      this.current = 0;
    }
    this.increment();
    console.log(this.current);
  }
  else {
    if(this.current === 0){
      sl.css({
        marginLeft: -(this.imageLen - 1) * this.imageWidth
      })
      this.current = this.imageLen - 1;
    }
    this.decrement();
  }
  sl.animate({
      marginLeft: -this.imageWidth * this.current
    }, this.speedSlider, function() {
      this.fadeIn();
    }.bind(this))
  this.cont.css({
    'background-color': this.color,
    'border-color': this.color
  });
  console.log(this.color);
};
Slider.prototype.fadeIn = function() {
  var fadeVar = this.page.eq(this.current);
  fadeVar
    .animate({
      opacity: 1
    }, this.speedFadeIn)
};

 /* $('.header-button').on('click', function(){
        $('.header-list').css('display','block')
        $('.header-button').css('display','none')
        $('.header-button2').css('display','block')
    })
      $('.header-button2').on('click', function(){
        $('.header-list').css('display','none')
        $('.header-button2').css('display','none')
        $('.header-button').css('display','block')
    })*/
var flag = false;
var afisare = function () {
  $('.header-list').css({
    'display':'block',
    width: 100
});
  $('.header-list span').css('display','none');
}
var ascundere = function() {
  $('.header-list').css('display','none');
}
var clicked =function() {
  
  if(flag === false)
  {
    afisare();
    flag = true;
  }
  else {
    ascundere();
    flag = false;
  }
}
$('.header-button').on('click', function() {

  clicked();
});