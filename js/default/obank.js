//外部連結
var wbObj = {
  _url: undefined,
  main: function () {
    window.open(this._url);
  }
}
Object.defineProperty(wbObj, "url", {
  get: function () { return this._url },
  set: function (val) {
    if (this._url === val) { return false }

    this._url = val;

    if (val) {
      $(DOM("html, body")).addClass("no_scroll");
      $(DOM(".pop_frame._wb")).addClass("active");
    }
    else {
      $(DOM("html, body")).removeClass("no_scroll");
      $(DOM(".pop_frame._wb")).removeClass("active");
    }
  }
})
//TikTok Pixel Base Code
$(function () {
  ttq.track("ViewContent");
})