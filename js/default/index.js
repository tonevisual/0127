//驗證是否為正確URL
function isURL(str) {
  var reg = /(http|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/;
  if (reg.test(str)) {
    return true;
  }
  return false;
}

function RedirectUrl(isIBMB, url, urlParams, dataLayer1, dataLayer2) {
  //取網址上的參數
  var AllVars = encodeURIComponent(location.search.substring(1));
  if (AllVars.trim().length > 0) {
    //去&符號(ex: campaigncode=1&sourcecode=2 )
    var Vars = AllVars.split("%26");
    for (i = 0; i < Vars.length; i++) {
      var value = Vars[i].toString();
      var str = Vars[i].split("%3D");//去符號=
      //只有campaigncode&sourcecode往後帶
      if (str[0].toLowerCase() == "campaigncode" || str[0].toLowerCase() == "sourcecode") {
        //判斷是否為IBMB,參數campaigncode轉campaign
        if (str[0].toLowerCase() == "campaigncode" && isIBMB == true) {
          value = "campaign%3D" + str[1].toString();
        }
        if (str[0].toLowerCase() == 'sourcecode' && isIBMB == true) {
          value = 'official%3D' + str[1].toString();
        }
        //往後帶的參數超過一個以上
        if (urlParams.length > 0) {
          urlParams += "%26" + value;
        } else {
          urlParams += value;
        }
      }
    }
  }
  //網址+參數
  if (urlParams.length > 0) {
    url += "%3F" + urlParams;
  }
  dataLayer.push({ event: dataLayer2 });
  window.location.href = decodeURIComponent(url);
  return;
}
