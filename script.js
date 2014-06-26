/*var getRandColor = function() {
  var r = parseInt(Math.random() * 255),
  g = parseInt(Math.random() * 255),
  b = parseInt(Math.random() * 255);
  return 'rgb('+ r +','+ g +','+ b +')';
}

setInterval(function() {
  var color = getRandColor();
  $('div.slider').css('background-color', color);
}, 2000);
*/
(function() { 

resize = function() {
  var width = $(window).width();
  width = Math.min(width, 2700);
  var height = width * 60 / 135;
  $('.slider-page').css({width:width, height: height});
  // $('.slider-container').css({marginLeft: -width});

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


$('.slider-page').each(function() {
  var $this = $(this);
  autofit($this.find('img'), $this.find('.iphone'))
})

function Slider(slider){
  this.slider=slider;
  this.index = 0;
  this.init();
}
Slider.prototype.init = function() {
  this.holder = this.slider.find('slider-container');
  this.pages = this.slider.find('slider-page');
  this.pageWidth = this.pages.first().width();
  this.totalPageWidth=this.pageWidth * this.pages;
  this.holder.css({width: this.totalPageWidth});
  this.clone = this.pages.first().clone();
  this.clone.appendTo(this.holder);
  this.pages.find('.slider-container').css({opacity: 0});
  this.clone.find('.slider-container').css({opacity:0});
  this.pages.find('.slider-container').first().css({opacity: 1});

}
Slider.prototype.next = function() {
  this.index++;
  this.fadeOutContent(this.index - 1, function() {
    this.holder.animate({
      marginLeft: - this.pageWidth * this.index
    }, function() {
      if(this.index === this.pages.length) {
        this.index = 0;
        this.holder.css({marginLeft: 0});
      }
      this.fadeInContent(this.index);
    }.bind(this))
  }.bind(this))
}

Slider.prototype.prev = function() {
  this.index--;
  if(this.index < 0) {
      this.index = this.pages.length - 1;
  
      this.holder.css({
      marginLeft: - this.pageWidth * this.pages.length
    });
  }
  this.fadeOutContent( this.index - 1, function() {
     this.holder.animate({
         marginLeft: - this.pageWidth * this.index
      },function() {
         this.fadeInContent(this.index);
      }.bind(this));
    }.bind(this));
 
}
Slider.prototype.fadeOutContent = function(index, callback) {
  this.pages.find('.slider-container').eq(index).animate({opacity: 0}, callback)
}

Slider.prototype.fadeInContent = function(index, callback) {
  this.pages.find('.slider-container').eq(index).animate({opacity: 1}, callback)
}


var transition= function(slid) {
      $('.slider.arrow-right').on('click', function() {
      slid.next();
    })
    $('.slider.arrow-left').on('click', function() {
      slid.prev();
    })
}

var s = new Slider($('.slider'));

}());