//fn
function maxW() {
  return 1920;
}
function DOM(e) {
  return document.querySelectorAll(e);
}
// function random(max, min) {
//   return Math.floor(Math.random() * (max - min + 1) + min);
// }
// function hash(length) {
//   length = length || 5;
//   return Math.random().toString(36).substr(length * -1);
// }
function createElement(options) {
  options = options || {};
  var dom = document.createElement(options.el || "div");
  Object.keys(options).forEach(function (key) {
    dom[{
      "class": "className"
    }[key] || key] = options[key];
  })
  return dom;
}
//qs
var QS = {
  query: function (search) {
    var result = {};
    search = search || location.search.replace("?", "");
    if (search) {
      search.split("&").forEach(function (s) {
        var query = s.split("=");
        if (query.length === 2) {
          var key = query[0];
          var value = query[1];
          result[key] = value;
        }
      })
    }
    return result;
  },
  add: function (url, params) {
    Object.keys(params).forEach(function (key) {
      var value = params[key];
      if ([undefined, null, ""].indexOf(value) > -1) { return false }

      url += url.indexOf("?") > -1 ? "&" : "?";
      url += (key + "=" + value);
    })
    return url;
  }
};
var qs = QS.query();
//IE環境
var ENV_IE = navigator.userAgent.toLowerCase().indexOf("trident") > -1;
//依比例縮放
var IBILI = {
  isInit: false,
  list: [],
  push: function (selector, rules, options) {
    options = options || {};
    var item = {
      selector: selector,
      rules: rules, //[{ from, to, W, H, padding, fix, min }]
    }
    if (options.callback) { item.callback = options.callback }
    //
    this.list.push(item);
    if (options.watch) {
      this.watch.push(selector);
    }
    //
    if (this.isInit) { return false }
    this.isInit = true;
    this.init();
  },
  main: function () {
    this.list.forEach(function (obj) {
      $(DOM(obj.selector)).addClass("IBILI");
      //包含scroll(for css media)
      var wW = window.innerWidth;
      //不包含scroll
      var bW = document.body.clientWidth;
      bW = bW > maxW() ? maxW() : bW;

      var scalcRate = 1;
      var targetIndex = -1;
      obj.rules.forEach(function (rule, index) {
        if (wW <= rule.from && wW >= rule.to) {
          targetIndex = index;
        }
      })
      if (targetIndex > -1) {
        Array.prototype.slice.call(DOM(obj.selector)).forEach(function (dom) {
          var _W = obj.rules[targetIndex].W || obj.rules[targetIndex].from;
          var _P = obj.rules[targetIndex].padding || 0;
          scalcRate = (bW - (_P * 2)) / (_W - (_P * 2));
          //fix
          var fix = obj.rules[targetIndex].fix || 0;
          if (fix) { scalcRate = fix }
          //min
          var min = obj.rules[targetIndex].min || 0;
          if (scalcRate < min) { scalcRate = min }
          //active
          $(dom).addClass("active");
          //DOM > div
          $(dom.children[0]).css({
            "-ms-transform": "translateX(-50%) scale(" + scalcRate + ")",
            transform: "translateX(-50%) scale(" + scalcRate + ")",
            width: _W + "px"
          });
          //DOM
          var _H = obj.rules[targetIndex].H || dom.children[0].clientHeight;
          dom.style.height = Math.floor(_H * scalcRate) + "px";
        });
      } else {
        Array.prototype.slice.call(DOM(obj.selector)).forEach(function (dom) {
          //active
          $(dom).removeClass("active");
          //DOM
          $(dom).removeAttr("style");
          //DOM > div
          $(dom.children[0]).removeAttr("style");
        });
      }
      //callback
      if (obj.callback) {
        obj.callback();
      }
    })
  },
  resize: function () {
    var _this = this;
    _this.main();
    setTimeout(function () { _this.main() }, 100);
  },
  init: function () {
    var _this = this;
    $(function () { _this.resize() });
    window.addEventListener("resize", function () { _this.resize() }, false);
    new img_onload(".space_frame", function () { _this.resize() });
  },
  watch: {
    isInit: false,
    list: [],
    push: function (selector) {
      var _this = this;
      Array.prototype.slice.call(DOM(selector)).forEach(function (dom) {
        _this.list.push({
          dom: dom.children[0],
          H: dom.children[0].clientHeight
        })
      });
      if (this.isInit) { return false }
      this.isInit = true;
      this.init();
    },
    init: function () {
      var _this = this;
      setInterval(function () {
        _this.list.forEach(function (item) {
          if (item.H !== item.dom.clientHeight) {
            item.H = item.dom.clientHeight;
            IBILI.resize();
          }
        })
      }, 100)
    }
  }
}
function set_attr(e, attr, val, query) {
  Array.prototype.slice.call(DOM(e)).forEach(function (dom) {
    var params = "";
    if (dom.tagName.toLowerCase() === "a" && attr === "href") {
      //自動串接qs
      if (query) {
        Object.keys(query).forEach(function (key) {
          var value = qs[key] || query[key];//預設值
          if (value) { params += "&" + key + "=" + value }
        })
        if (val.indexOf("?") === -1) { params = params.replace(/^&/, "?") }
      }
    }
    dom.setAttribute(attr, val + params);
  });
  BLANK();
}
var Sto = function (options) {
  var _this = this;
  options = options || {};
  var once = options.hasOwnProperty("once") ? options.once : true;
  var rate = options.hasOwnProperty("rate") ? options.rate : 0;
  var selector = options.container || "body";//img_onload容器範圍

  this.onactive = [];
  this.onblur = [];
  this.active = function (dom) {
    if ($(dom).hasClass("active")) { return false }
    $(dom).addClass("active");
    $(dom.querySelectorAll("[sto-sub]")).addClass("active");
    //
    this.onactive.forEach(function (fn) {
      if (typeof fn === "function") { fn(dom) }
    })
  }
  this.main = function () {
    var wW = window.innerWidth;
    var wH = window.innerHeight;
    var wT = window.pageYOffset;
    var wB = wT + wH;
    Array.prototype.slice.call(DOM("[sto]")).forEach(function (dom) {
      var dH = dom.clientHeight;
      var dT = Math.floor($(dom).offset().top);
      var dB = dT + dH;
      //畫面外
      if ((dT <= wT && dB <= wT) || (dT >= wB && dB >= wB)) {
        var loop = dom.hasAttribute("sto-loop") || false;
        if (once && !loop) { return false }
        if (!$(dom).hasClass("active")) { return false }

        $(dom).removeClass("active");
        $(dom.querySelectorAll("[sto-sub]")).removeClass("active");
        //
        _this.onblur.forEach(function (fn) {
          if (typeof fn === "function") { fn(dom) }
        })
      }
      //畫面裡
      else {
        var targetRate = Number(dom.getAttribute("sto")) || rate || (wW > 1024 ? 15 : 10);
        var topRate = Math.floor((wB - dT) / wH * 100);
        var bottomRate = Math.floor((dB - wT) / wH * 100);
        if (Math.min(topRate, bottomRate) >= targetRate) {
          _this.active(dom);
        }
      }
    });
  }
  this.init = function () {
    new img_onload(selector, function () {
      _this.main();
      window.addEventListener("scroll", function () { _this.main() }, false);
      window.addEventListener("resize", function () { _this.main() }, false);
    })
  }
}
//滾動視差
var Spx = function (options) {
  //位移spx下一層, transform會影響scrollTop
  var _this = this;
  options = options || {};

  this.el = options.el || "body";
  this.speed = options.speed || 0.4;//位移量比例
  this.main = function () {
    $(DOM(_this.el)).addClass("spx_frame");
    //
    var wT = window.pageYOffset;
    var wH = window.innerHeight;
    Array.prototype.slice.call(DOM("[spx]")).forEach(function (dom) {
      var dom_offsetTop = Math.floor($(dom).offset().top);
      var dom_clientHeight = dom.clientHeight;
      var spx_speed = Number(dom.getAttribute("spx")) || _this.speed;//位移量比例
      var spx_offsetTop = (dom_offsetTop + dom_clientHeight / 2) - wH / 2;//初始值 => dom的中心點在畫面中心
      var spx_transform = (spx_offsetTop - wT) * spx_speed;//位移量
      if (dom_offsetTop + dom_clientHeight + spx_transform > DOM(_this.el)[0].offsetHeight) {
        return false;
      }
      $(dom).children().css({
        "-webkit-transform": "translateY(" + spx_transform + "px)",
        transform: "translateY(" + spx_transform + "px)",
      })
    });
  }
  this.init = function () {
    var _this = this;
    this.main();
    window.addEventListener("scroll", function () { _this.main() }, false);
    window.addEventListener("resize", function () { _this.main() }, false);
  }
}
var sync_height = function (options) {
  var container = options.container;
  var selector = options.selector;
  var from = options.from;
  var to = options.to;
  this.main = function () {
    Array.prototype.slice.call(DOM(container)).forEach(function (ctn) {
      $(ctn.querySelectorAll(selector)).removeAttr("style");
      if (options.hasOwnProperty("from") && options.hasOwnProperty("to")) {
        if (!(window.innerWidth <= from && window.innerWidth >= to)) { return false }
      }

      var heightList = [];
      Array.prototype.slice.call(ctn.querySelectorAll(selector)).forEach(function (dom) {
        heightList.push(dom.clientHeight);
      })
      $(ctn.querySelectorAll(selector)).css({
        height: Math.max.apply(undefined, heightList) + "px"
      })
    })
  }
  this.main_update = function (count) {
    var _this = this;
    this.main();
    for (var i = 0; i < count; i++) {
      setTimeout(function () { _this.main() }, 500 * (i + 1));
    }
  }
  this.init = function () {
    var _this = this;
    this.main_update(5);
    window.addEventListener("resize", function () {
      _this.main_update(5);
    }, false);
  }
}
//另開分頁
function BLANK() {
  Array.prototype.slice.call(DOM("a[href^=http]:not([default])")).forEach(function (dom) {
    dom.target = "_blank";
    dom.rel = "noreferrer noopener";
  });
}
BLANK();
var Collapse = function (options) {
  var _this = this;
  options = options || {};
  var container = options.container; //目標容器
  //容器內
  var button = options.button; //觸發按鈕
  var active = options.active; //切換active狀態
  var collapse = options.collapse; //收合目標
  var bind = options.bind || false; //與相同容器連動
  var defaultOpen = options.default; //預設開啟
  var clickable = options.clickable === undefined ? true : options.clickable; //啟用/禁用click
  this.bind = bind;
  this.button = [];
  this.open = function (selector, open) {
    var targetButton;

    if (typeof selector === "number") {
      targetButton = this.button[selector]; //index
    }
    else if (typeof selector === "string") {
      targetButton = DOM(selector)[0]; //selector 
    }
    else if (selector instanceof Element) {
      targetButton = selector; //dom
    }
    if (targetButton.active === open) { return false }
    if (open === undefined) {
      open = !targetButton.active;
    }
    if (open) {
      $(targetButton.container.querySelectorAll(active)).addClass("active");
      $(targetButton.container.querySelectorAll(collapse)).slideDown();
    }
    else {
      $(targetButton.container.querySelectorAll(active)).removeClass("active");
      $(targetButton.container.querySelectorAll(collapse)).slideUp();
    }
    targetButton.active = open;
  }
  this.init = function () {
    Array.prototype.slice.call(DOM(container)).forEach(function (_container, index) {
      var targetButton = _container.querySelector(button);
      targetButton.index = index;
      targetButton.container = _container;
      targetButton.active = false;
      targetButton.clickable = clickable;
      targetButton.addEventListener("click", function () {
        if (!targetButton.clickable) {
          return false;
        }
        if (_this.bind) {
          Array.prototype.slice.call(DOM(container + " " + button)).forEach(function (btn) {
            if (btn === targetButton) {
              return false;
            }
            _this.open(btn, false);
          })
        }
        _this.open(targetButton, !targetButton.active);
      }, false);
      _this.button.push(targetButton);
      //預設開啟
      if (defaultOpen === index) {
        _this.open(targetButton, true);
      }
    });
  }
}
//img onload
var img_onload = function (selector, callback) {
  var _this = this;
  this.isInit = false;
  var targetImg = [];//[DOM]
  Array.prototype.slice.call(DOM(selector)).forEach(function (dom) {
    Array.prototype.slice.call(dom.querySelectorAll("img")).forEach(function (img) {
      if (img.getAttribute("src")) { targetImg.push(img) }
    })
  })
  this.imgLoad = {
    count: 0,
    length: targetImg.length
  };
  if (this.imgLoad.count === 0 && this.imgLoad.length === 0) {
    callback();
    return false;
  }
  this.callback = function () {
    this.imgLoad.count++;
    if (this.imgLoad.count === this.imgLoad.length) {
      if (this.isInit) { return false }
      this.isInit = true;
      callback();
    }
  };
  Array.prototype.slice.call(targetImg).forEach(function (img) {
    if (img.complete) {
      _this.callback();
    }
    else {
      img.addEventListener("load", function () { _this.callback() }, false);
      img.addEventListener("error", function () { _this.callback() }, false);
    }
  });
}
var imgPath_onload = function (imgPath, callback) {
  var _this = this;
  this.isInit = false;
  this.imgLoad = {
    count: 0,
    length: imgPath.length
  };
  if (this.imgLoad.count === 0 && this.imgLoad.length === 0) {
    callback();
    return false;
  }
  this.callback = function () {
    this.imgLoad.count++;
    if (this.imgLoad.count === this.imgLoad.length) {
      if (this.isInit) { return false }
      this.isInit = true;
      callback();
    }
  };
  imgPath.forEach(function (path) {
    var img = new Image();
    img.src = path;
    if (img.complete) {
      _this.callback();
    }
    else {
      img.addEventListener("load", function () { _this.callback() }, false);
      img.addEventListener("error", function () { _this.callback() }, false);
    }
  })
}