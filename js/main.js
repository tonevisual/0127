//如何加卡 P1 swiper
let swiper_bonus = new Swiper(".swSwiper", {
  slidesPerView: 1,
  loop: true,
  speed: 800,
  navigation: {
    nextEl: ".swNext",
    prevEl: ".swPrev",
  },
  breakpoints: {
    768: {
      slidesPerView: 3,
    }
  },
  pagination: {
    el: ".sw_pagination",
  },
})


//****************************************** */

//
// var ntc = new Collapse({
//   container: ".ntc_frame",
//   button: ".ntc_btn",
//   active: ".plus_btn",
//   collapse: ".ntc_box"
// })
// ntc.init();
// ntc.button.forEach(function (button) {
//   button.addEventListener("click", function () {
//     if (button.active) { moveTo(button.container) }
//   }, false)
// })
//float_frame
// float_hideOn([{ selector: ".kv_ctn" }], function () {
//   var wW = window.innerWidth;
//   return wW > 1024 ? window.innerHeight * 0.3 : 0;
// });
// float2_hideOn([{ selector: ".kv_ctn" }], function () {
//   var wW = window.innerWidth;
//   return wW > 1024 ? window.innerHeight * 0.12 : 0;
// });
function scrollToBottom() {
  var distance = 10;
  var wT = window.pageYOffset;
  var wH = window.innerHeight;
  var bH = document.body.clientHeight;
  if (bH - (wT + wH) < distance) {
    $(".float_frame").addClass("_bottom");
  }
  else {
    $(".float_frame").removeClass("_bottom");
  }
}
window.addEventListener("scroll", scrollToBottom);
scrollToBottom();
//pop_frame
var popInitObj = {
  _open: false
}

Object.defineProperty(popInitObj, "open", {
  get: function () { return this._open },
  set: function (val) {
    if (this._open === val) { return false }
    this._open = val;
    if (val) {
      $("html, body").addClass("no_scroll");
      $(".pop_frame._init").addClass("active");
    }
    else {
      $("html, body").removeClass("no_scroll");
      $(".pop_frame._init").removeClass("active");
    }
  }
})
// popInitObj.open = true;
var popObj = {
  _sd: undefined
}
let nowSD
Object.defineProperty(popObj, "sd", {
  get: function () { return this._sd },
  set: function (val) {
    if (this._sd === val) { return false }
    this._sd = val;
    if (val) {
      $("html, body").addClass("no_scroll");
      $(".pop_frame._pop").addClass("active");
      $(".pop_frame._pop .template._" + val).addClass("active");
    }
    else {
      // console.log(nowSD)
      $(".pop_frame._pop .p_ctn").scrollTop(0)
      $("html, body").removeClass("no_scroll");
      $(".pop_frame._pop").removeClass("active");
      $(".pop_frame._pop .template").removeClass("active");
      // switch(nowSD){
      //   case 'kv-1':
      //   case 'sec01-1':
      //   case 'sec02-1':
      //   case 'sec02-2':
      //   case 'sec04-1':
      //     setTimeout(()=>{
      //       moveTo('#sec_02', true)
      //     },150)
      //     break;
      //   default:
      //     console.log('no val')
      // }
    }
    nowSD = val
  }
})
// //init
// new Sto({ selector: ".space_frame" }).init();
// new img_onload(".kv_frame", function () {
//   $("[kv]").addClass("active");
// })