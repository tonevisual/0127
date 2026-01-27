//card_frame
var wrapper_card = DOM("#swiper_card .swiper-wrapper")[0];
wrapper_card.innerHTML = "";
Array.prototype.slice.call(DOM(".crad_ctn2 .crad_box")).forEach(function (crad_box) {
  crad_box = crad_box.cloneNode(true);
  var slide = createElement({ className: "swiper-slide" })
  slide.appendChild(crad_box);
  wrapper_card.appendChild(slide);
});