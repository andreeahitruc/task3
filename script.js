resize = function() {
  var width = $(window).width();
  width = Math.min(width, 960);
  var height = width * 60 / 96;
  var w = width / 4;
  var h = 483 * height / 590;
  //var x = 7 * height / 5;
  $('div.slider-site-width').css({width:width, height: height});
  $('div.vertical-iphone img').css({width:w, height: h});
  //$('div.arrow').css({top: x});
}

$(window).on('resize', resize);

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