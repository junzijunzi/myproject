window.onload = function() {
  ecom.app.toTip();
  ecom.app.toBanner();
  ecom.app.toSort();
  ecom.app.toRun();
}﻿

var ecom = {};
ecom.tools = {};
ecom.tools.getByClass = function(oParent,className) {
  var allObj = oParent.getElementsByTagName("*");
  var arr = [];
  for(var i=0;i<allObj.length;i++) {
    if(allObj[i].className === className) {
      arr.push(allObj[i]);
    }
  }
  return arr;
};
ecom.tools.getStyle = function(obj, attr) {
  if(obj.currentStyle) {
    return obj.currentStyle[attr];
  } else{
		return getComputedStyle(obj,false)[attr];
	}
}
ecom.ui = {};
ecom.ui.textChange = function(obj, str) {
  obj.onfocus = function() {
    if(obj.value === str) {
      obj.value = "";
    }
  };
  obj.onblur = function() {
    if(obj.value === "") {
      obj.value = str;
    }
  }
};
ecom.ui.fadeIn = function(obj) {
  if(ecom.tools.getStyle(obj, "opacity") == 1) {
    return false;
  }
  var value = 0, speed = 10;
  clearInterval(obj.timer);
  obj.timer = setInterval(function() {
    value += speed;
    if(value <= 100) {
      obj.style.opacity = value / 100;
      obj.style.filter = "alpha(opacity=" + value + ")";
    } else {
      clearInterval(obj.timer);
    }
  },50);
};
ecom.ui.fadeOut = function(obj) {
  if(ecom.tools.getStyle(obj, "opacity") == 0) {
    return false;
  }
  var value = 100, speed = -10;
  clearInterval(obj.timer);
  obj.timer = setInterval(function() {
    value += speed;
    if(value >= 0) {
      obj.style.opacity = value / 100;
      obj.style.filter = "alpha(opacity=" + value + ")";
    } else {
      clearInterval(obj.timer);
    }
  },30);
};
ecom.ui.run = function(obj, speed, maxLeft, flag) {
  var left = parseInt(ecom.tools.getStyle(obj, "left"));
  if(flag && left < maxLeft || !flag && left > maxLeft) {
    left += speed;
    obj.style.left = left + "px";
  } else {
    clearInterval(obj.timer);
  }
}
ecom.app = {};
//search_bar提示内容设置
ecom.app.toTip = function() {
  var searchText1 = document.getElementById("searchText1");
  var searchText2 = document.getElementById("searchText2");
  ecom.ui.textChange(searchText1,"Search website");
  ecom.ui.textChange(searchText2,"Search website");
}
//幻灯片播放
ecom.app.toBanner = function() {
  var ad = document.getElementById("ad");
  var lis = ad.getElementsByTagName("li");
  var timer = setInterval(autoNext,3000);
  var liNum = 0;
  function autoNext() {
    liNum ++;
    if(liNum > lis.length - 1) {
      liNum = 0;
    }
    for(var i=0;i<lis.length;i++) {
      ecom.ui.fadeOut(lis[i]);
    }
    ecom.ui.fadeIn(lis[liNum]);
  }
  function autoPrev() {
    liNum --;
    if(liNum < 0) {
      liNum = lis.length - 1;
    }
    for(var i=0;i<lis.length;i++) {
      ecom.ui.fadeOut(lis[i]);
    }
    ecom.ui.fadeIn(lis[liNum]);
  }
  ad.onmouseover = function() {
    clearInterval(timer);
  };
  ad.onmouseout = function() {
    timer = setInterval(autoNext,3000);
  };
  var left = ecom.tools.getByClass(ad, "left")[0];
  var right = ecom.tools.getByClass(ad, "right")[0];
  var prev = ecom.tools.getByClass(ad, "prev")[0];
  var next = ecom.tools.getByClass(ad, "next")[0];
  left.onmouseover = prev.onmouseover = function() {
    prev.style.display = "block";
  };
  left.onmouseout = prev.onmouseout = function() {
    prev.style.display = "none";
  };
  right.onmouseover = next.onmouseover = function() {
    next.style.display = "block";
  };
  right.onmouseout = next.onmouseout = function() {
    next.style.display = "none";
  };
  prev.onclick = autoPrev;
  next.onclick = autoNext;
};
//sort菜单选择按钮监听
ecom.app.toSort = function() {
  var wrap = document.getElementById("wrap");
  var sort = ecom.tools.getByClass(wrap, "sort")[0];
  var allA = sort.getElementsByTagName("a");
  var allUl = sort.getElementsByTagName("ul");
  var allH2 = sort.getElementsByTagName("h2");
  for(var i=0;i<allA.length;i++) {
    allA[i].index = i;
    allA[i].onclick = function(ev) {
      ev = ev || window.event;
      var aIndex = this.index;
      for(var i=0;i<allA.length;i++) {
        allUl[i].style.display = "none";
      }
      allUl[aIndex].style.display = "block";
      var lis = allUl[aIndex].getElementsByTagName("li");
      for(var i=0;i<lis.length;i++) {
        lis[i].onclick = function() {
          allH2[aIndex].innerHTML = this.innerHTML;
          allUl[aIndex].style.display = "none";
        };
        lis[i].onmouseover = function() {
          this.className = "active";
        };
        lis[i].onmouseout = function() {
          this.className = "";
        };
      }
      document.onclick = function() {
        allUl[aIndex].style.display = "none";
      }
      ev.cancelBubble = true;
    };
  }
};
//FEATURED PRODUCTS图片滚动
ecom.app.toRun = function() {
  var wrap = document.getElementById("wrap");
  var scroll_list = ecom.tools.getByClass(wrap, "scroll_list")[0];
  var run = document.getElementById("run");
  var ul = run.getElementsByTagName("ul")[0];
  var prev = ecom.tools.getByClass(scroll_list, "prev")[0];
  var next = ecom.tools.getByClass(scroll_list, "next")[0];
  var everyLeft = 205;
  var ulLength = ul.getElementsByTagName("li").length / 2 * everyLeft;
  prev.onclick = function() {
    var left = parseInt(ecom.tools.getStyle(ul, "left"));
    if(left == -ulLength) {
      left = 0;
      ul.style.left = left + "px";
    }
    var maxLeft = Math.floor(left / 205) * 205 - 205;
    clearInterval(ul.timer);
    ul.timer = setInterval(function() {
      ecom.ui.run(ul, -5, maxLeft, false);
    },10);
  };
  next.onclick = function() {
    var left = parseInt(ecom.tools.getStyle(ul, "left"));
    if(left == 0) {
      left = -ulLength;
      ul.style.left = left + "px";
    }
    var maxLeft = Math.ceil(left / 205) * 205 + 205;
    clearInterval(ul.timer);
    ul.timer = setInterval(function() {
      ecom.ui.run(ul, 5, maxLeft, true);
    },10);
  };
};
