window.onload = function() {
  ak.app.toText();
  ak.app.toImgBox();
}

var ak = {};
ak.tools = {};
ak.tools.addClass = function(obj, className) {
  obj.className = obj.className + " " + className;
};
ak.tools.removeClass = function(obj, className) {
  var classNameArr = obj.className.split(/\s+/);
  for(var i=0;i<classNameArr.length;i++) {
    if(classNameArr[i] == className) {
      classNameArr.splice(i,1);
    }
  }
  obj.className = classNameArr.join(" ");
};
ak.tools.getByClass = function(oParent, className) {
  var allObjs = oParent.getElementsByTagName("*");
  var pattern = new RegExp("\\s+" + className + "\\s+");
  var resultArr = [];
  for(var i=0;i<allObjs.length;i++) {
    if(pattern.test(" " + allObjs[i].className + " ")) {
      resultArr.push(allObjs[i]);
    }
  }
  return resultArr;
};
ak.tools.getStyle = function(obj, attr) {
  if(obj.currentStyle) {
    return obj.currentStyle[attr];
  } else {
    return getComputedStyle(obj,false)[attr];
  }
};

ak.ui = {};
ak.ui.setText = function(oText, textStr) {
  oText.onfocus = function() {
    if(oText.value == textStr) {
      oText.value = "";
    }
  };
  oText.onblur = function() {
    if(oText.value == "") {
      oText.value = textStr;
    }
  };
};
ak.ui.setTextarea = function(oTextarea, textStr) {
  oTextarea.onfocus = function() {
    if(oTextarea.value == textStr) {
      oTextarea.value = "";
    }
  };
  oTextarea.onblur = function() {
    if(oTextarea.value == "") {
      oTextarea.value = textStr;
    }
  };
};
ak.ui.setImgInfo = function(aArr, imgSources, imgIndex) {
  for(var i=0;i<aArr.length;i++) {
    aArr[i].getElementsByTagName("span")[0].innerHTML = imgSources[imgIndex][i].title;
    aArr[i].getElementsByTagName("p")[0].innerHTML = imgSources[imgIndex][i].date;
  }
};

ak.app = {};
//输入框焦点进入置空
ak.app.toText = function() {
  var footer_wrap = document.getElementById("footer_wrap");
  var oTextArr = footer_wrap.getElementsByTagName("input");
  var oTextarea = footer_wrap.getElementsByTagName("textarea")[0];
  var sTextArr = ["Name","Phone","Email"];
  for(var i=0;i<oTextArr.length-1;i++) {
    ak.ui.setText(oTextArr[i], sTextArr[i]);
  }
  ak.ui.setTextarea(oTextarea, "Message");
};
//图片轮播
ak.app.toImgBox = function() {
  var imgSources = [
    [{src:"image/picshow/1-1.jpg",title:"图片1-1",date:"20/09/2010"},{src:"image/picshow/1-2.jpg",title:"图片1-2",date:"20/10/2010"},{src:"image/picshow/1-3.jpg",title:"图片1-3",date:"20/11/2010"},{src:"image/picshow/1-4.jpg",title:"图片1-4",date:"20/12/2010"}],
    [{src:"image/picshow/2-1.jpg",title:"图片2-1",date:"20/09/2011"},{src:"image/picshow/2-2.jpg",title:"图片2-2",date:"20/10/2011"},{src:"image/picshow/2-3.jpg",title:"图片2-3",date:"20/11/2011"},{src:"image/picshow/2-4.jpg",title:"图片2-4",date:"20/12/2011"}],
    [{src:"image/picshow/3-1.jpg",title:"图片3-1",date:"20/09/2012"},{src:"image/picshow/3-2.jpg",title:"图片3-2",date:"20/10/2012"},{src:"image/picshow/3-3.jpg",title:"图片3-3",date:"20/11/2012"},{src:"image/picshow/3-4.jpg",title:"图片3-4",date:"20/12/2012"}],
    [{src:"image/picshow/4-1.jpg",title:"图片4-1",date:"20/09/2013"},{src:"image/picshow/4-2.jpg",title:"图片4-2",date:"20/10/2013"},{src:"image/picshow/4-3.jpg",title:"图片4-3",date:"20/11/2013"},{src:"image/picshow/4-4.jpg",title:"图片4-4",date:"20/12/2013"}]
  ];
  var imgIndex = 0, imgWidth = 592;
  var content = document.getElementById("content");
  var imgBox = document.getElementById("imgBox");
  var pic = document.getElementById("pic");
  var imgs = pic.getElementsByTagName("img");
  var liArr = imgBox.getElementsByTagName("li");
  var aArr = imgBox.getElementsByTagName("a");
  var prev = ak.tools.getByClass(content, "prev")[0];
  var next = ak.tools.getByClass(content, "next")[0];
  for(var i=0;i<aArr.length;i++) {
    aArr[i].index = i;
    aArr[i].onmouseover = function() {
      ak.tools.addClass(this, "active");
      ak.tools.addClass(this.getElementsByTagName("span")[1],"active");
      imgs[imgIndex].src = imgSources[imgIndex][this.index].src;
    };
    aArr[i].onmouseout = function() {
      ak.tools.removeClass(this, "active");
      ak.tools.removeClass(this.getElementsByTagName("span")[1],"active");
    };
  }
  prev.onclick = function() {
    var left;
    if(imgIndex > 0) {
      imgIndex --;
      left = parseInt(ak.tools.getStyle(pic, "left")) + imgWidth;
    } else{
      imgIndex = imgs.length - 1;
      left = -parseInt(ak.tools.getStyle(pic, "width")) + imgWidth;
    }
    pic.style.left = left + "px";
    ak.ui.setImgInfo(aArr, imgSources, imgIndex);
  };
  next.onclick = function() {
    var left;
    if(imgIndex < imgs.length - 1) {
      imgIndex ++;
      left = parseInt(ak.tools.getStyle(pic, "left")) - imgWidth;
    } else{
      imgIndex = 0;
      left = 0;
    }
    pic.style.left = left + "px";
    ak.ui.setImgInfo(aArr, imgSources, imgIndex);
  };
};
