var _RIGHT='RIGHT';
var _LEFT='LEFT';
var _PIXELSPERFRAME=1;//Number of pixels that the image moves on the transitions per frame

var CanvasSlider=function(){
  var canvas=$('#canvas')[0];
  var ctx=canvas.getContext("2d");

  var slideImages=$('#slider ul li img');
  var currentImgIndex=0;

  var currentPixel=0;//Current position of the first pixel of the current image
  var currentImage=slideImages[currentImgIndex];
  var nextImage=null;

  var animation;
  var _direction=_LEFT;

  ctx.drawImage(currentImage,0,0);

  this.getInstance=function(){
    return this;
  }

  this.getCanvasContext=function(){
    return ctx;
  };

  this.getSliders=function(){
    return slider;
  };

  this.getNextImgIndex=function(direction){
    if (direction==_LEFT) {
      return currentImgIndex+1>=slideImages.length? 0: currentImgIndex+1;
    }
    else {
      return currentImgIndex-1<0? slideImages.length-1: currentImgIndex-1;
    }
  }

  this.getNextImage=function(direction){
    currentImgIndex= this.getNextImgIndex(direction);
    return slideImages[currentImgIndex];
  };

  this.slide=function(){
    if (nextImage) {
      ctx.clearRect(0,0,canvas.width,canvas.height);
      if (Math.abs(currentPixel-_PIXELSPERFRAME)<currentImage.width) {
        if (_direction==_LEFT) {
          currentPixel=currentPixel-_PIXELSPERFRAME;
          ctx.drawImage(currentImage,currentPixel,0);
          ctx.drawImage(nextImage,currentImage.width+currentPixel+1,0);
        }else {
          currentPixel=currentPixel+_PIXELSPERFRAME;
          ctx.drawImage(currentImage,currentPixel,0);
          ctx.drawImage(nextImage,-(nextImage.width-currentPixel-1),0);
        }
      }else {
        currentImage=this.getNextImage(_direction);
        ctx.drawImage(currentImage,0,0);
        nextImage=null;
        currentPixel=0;
        window.cancelAnimationFrame(animation);
        return;
      }
    }else {
      nextImage=slideImages[this.getNextImgIndex(_direction)];
    }
    animation=window.requestAnimationFrame(this.slide);
  };

  this.slideLeft=function(){
    _direction=_LEFT;
    animation=window.requestAnimationFrame(this.slide);
  }

  this.slideRight=function(){
    _direction=_RIGHT;
    animation=window.requestAnimationFrame(this.slide);
  }

  return this;
}
