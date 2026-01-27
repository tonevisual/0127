//param
var header_H = function () {
  return DOM(".header")[0].offsetHeight;
};
var navObj = {
  _active: false,
  _transform: false
}
//選單
Object.defineProperty(navObj, "active", {
  get: function () { return this._active },
  set: function (val) {
    var _this = this;
    if (this._transform || this._active === val) {
      return false;
    }
    this._transform = true;
    this._active = val;
    if (val) {
      $(DOM(".nav_frame, .nav_ctn, .nav_btn")).addClass("active");
      $(DOM("html, body")).addClass("nav_active");
    }
    else {
      $(DOM(".nav_frame, .nav_ctn, .nav_btn")).removeClass("active");
      $(DOM("html, body")).removeClass("nav_active");
    }
    setTimeout(function () {
      _this._transform = false;
    }, 500);
  }
})
//fn
function moveTo(e, close) {
  if (close) {
    navObj.active = false;
  }
  $(DOM("html,body")).stop().animate({
    scrollTop: $(e).offset().top - header_H()
  }, 500);
}
//浮動按鈕在指定範圍隱藏
function float_hideOn(targetArray, getBottom) {
  if (!DOM(".float_frame")[0]) { return false }

  $(DOM(".float_frame")).addClass("hideOn");
  $(function () {
    $(DOM(".hideOn")).addClass("ready");
  })
  function main() {
    var window_H = window.innerHeight;
    var hideScope = -window.pageYOffset;
    targetArray.forEach(function (item) {
      if (!DOM(item.selector)[0]) { return false }

      var targetRate = item.rate ? item.rate() : 1
      hideScope += DOM(item.selector)[0].offsetHeight * targetRate;
    })
    if (DOM("body>.header_fill")[0]) {
      hideScope += header_H();
    }
    var float_H = DOM(".float_frame")[0].offsetHeight + getBottom();
    if (window_H - hideScope > float_H) {
      $(DOM(".float_frame")).addClass("active");
    }
    else {
      $(DOM(".float_frame")).removeClass("active");
    }
  }
  window.addEventListener("scroll", main, false);
  window.addEventListener("resize", main, false);
  $(function () {
    main();
  })
}
function float2_hideOn(targetArray, getBottom) {
  if (!DOM(".float_frame_2")[0]) { return false }

  $(DOM(".float_frame_2")).addClass("hideOn");
  $(function () {
    $(DOM(".hideOn")).addClass("ready");
  })
  function main() {
    var window_H = window.innerHeight;
    var hideScope = -window.pageYOffset;
    targetArray.forEach(function (item) {
      if (!DOM(item.selector)[0]) { return false }

      var targetRate = item.rate ? item.rate() : 1
      hideScope += DOM(item.selector)[0].offsetHeight * targetRate;
    })
    if (DOM("body>.header_fill")[0]) {
      hideScope += header_H();
    }
    var float_H = DOM(".float_frame_2")[0].offsetHeight + getBottom();
    if (window_H - hideScope > float_H) {
      $(DOM(".float_frame_2")).addClass("active");
    }
    else {
      $(DOM(".float_frame_2")).removeClass("active");
    }
  }
  window.addEventListener("scroll", main, false);
  window.addEventListener("resize", main, false);
  $(function () {
    main();
  })
}
if (DOM(".header")[0].hasAttribute("scroll")) {
  function header_scroll() {
    var wT = window.pageYOffset;
    if (wT > 0) {
      $(DOM(".header")).addClass("_scroll");
    }
    else {
      $(DOM(".header")).removeClass("_scroll");
    }
  }
  header_scroll();
  window.addEventListener("scroll", header_scroll, false);
}
//gotop
function gotop(targetArray) {
  function main() {
    var wT = window.pageYOffset;
    var range = 0;
    if (targetArray) {
      targetArray.forEach(function (item) {
        if (!DOM(item.selector)[0]) { return false }
        range += DOM(item.selector)[0].offsetHeight;
      })
    }
    if (wT > (range || 200)) {
      $(DOM("#gotop")).addClass("active");
    }
    else {
      $(DOM("#gotop")).removeClass("active");
    }
  }
  window.addEventListener("scroll", main, false);
  window.addEventListener("resize", main, false);
  $(function () {
    main();
  })
}
//ul
Array.prototype.slice.call(DOM("ul.cus._num")).forEach(function (ul) {
  var _gh = ul.className.indexOf("_gh") > -1;
  Array.prototype.slice.call(ul.children).forEach(function (li, index) {
    var _str = index + 1;
    if (!_gh) {
      _str = _str + ".";
    }
    li.setAttribute("str", _str);
  })
});
//midline
Array.prototype.slice.call(DOM(".midline")).forEach(function (midline) {
  var div = createElement();
  div.appendChild(createElement({ innerHTML: midline.innerHTML }));
  midline.removeChild(midline.firstChild);
  midline.appendChild(div);
});
//pop
if (ENV_IE) {
  $(DOM(".pop_ctn")).addClass("_ie");
}