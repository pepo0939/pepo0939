jQuery( document ).ready(function () {
  var sliderCount=$('#slider ul li').length;
  var sliderWidth=$('#slider ul li').width();
  var sliderHeight=$('#slider ul li').height();
  var sliderShowWidth=sliderWidth*sliderCount;

  $('#slider').css({width:sliderWidth,height:sliderHeight});

  $('#slider ul').css({width:sliderShowWidth,marginLeft:-sliderWidth});

  $('#slider ul li:last-child').prependTo('#slider ul');

  // setInterval(function () {
  //    slideRight();
  // }, 3000);

  $('#left').click(function(){
    slideLeft();
  });

  $('#right').click(function(){
    slideRight();
  });

  function slideLeft() {
      $('#slider ul').animate({
          left: + sliderWidth
      }, 200, function () {
          $('#slider ul li:last-child').prependTo('#slider ul');
          $('#slider ul').css('left', '');
      });
  };

  function slideRight(){
    $('#slider ul').animate({
      left:-sliderWidth
    }, 200, function(){
      $('#slider ul li:first-child').appendTo('#slider ul');
      $('#slider ul').css('left','');
    });
  };
});
