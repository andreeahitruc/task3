var getRandColor = function() {
  var r = parseInt(Math.random() * 255),
  g = parseInt(Math.random() * 255),
  b = parseInt(Math.random() * 255);
  return 'rgb('+ r +','+ g +','+ b +')';
}

setInterval(function() {
  var color = getRandColor();
  $('div.slider').css('background-color', color);
}, 2000);

(function() { 

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
    fit(img, container)
  })
}


}());

function Slider(cont,imageWidth,speedFadeIn,speedFadeOut,speedSlider){
  this.rail = cont.find('.slider-container');
  cont.find('.slider-page').first()
    .clone().appendTo(this.rail);
  this.cont = cont;
  this.imageWidth = imageWidth;
  this.page=$('.slider-page');
  this.imageLen = this.page.length;
  this.totalImgsWidth = this.imageWidth * this.imageLen+5;
  this.speedFadeIn = speedFadeIn;
  this.speedFadeOut = speedFadeOut;
  this.speedSlider = speedSlider;
 
 
  this.page.css('width', this.imageWidth);
  this.rail.css('width', this.totalImgsWidth);
  this.current = 0;
   console.log(this.imageWidth);
   console.log(this.imageLen);
   console.log(this.totalImgsWidth);

};
Slider.prototype.slide = function(direction) { 
  this.fadeOut();
  this.direction = direction;
};
Slider.prototype.fadeOut = function() {
  var fadeVar = this.page.children().eq(this.current).children();
  fadeVar
    .animate({
      opacity: 0
      }, this.speedFadeOut, this.slideTo.bind(this))
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
    }, this.speedSlider, this.fadeIn.bind(this))
};
Slider.prototype.fadeIn = function() {
  var fadeVar = this.page.eq(this.current);
  fadeVar
    .animate({
      opacity: 1
    }, this.speedFadeIn)
};
