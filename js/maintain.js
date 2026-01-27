// watch scroll
let ticking = false;
let winTop = 0
let winH = document.documentElement.clientHeight

function handleScroll(){
  if (!ticking) {
    ticking = true;
    requestAnimationFrame(() => {
      winTop = window.scrollY
      winH = document.documentElement.clientHeight
      // console.log(winTop);
      // console.log(winH);
      //e.getBoundingClientRect().top < (winH*0.85) && e.classList.contains('unShow') && e.getBoundingClientRect().top > (e.clientHeight*0.8*-1)
      document.querySelectorAll('.unShow').forEach((e) => {
        if(e.getBoundingClientRect().top < (winH*0.85) && e.classList.contains('unShow')) {
          e.classList.remove('unShow')

          // if(e.classList.contains('sCase01')) {
          //   setTimeout(() => {
          //     document.querySelector('.suitcaseBox').classList.add('hasLight')
          //   }, 1000*3)
          // }
          setTimeout(()=>{
            e.classList.add('afterShow')
          }, 1000*2.3)
        }
      })

      //選單
      document.querySelectorAll('.sectionDiv').forEach((e) =>{
        if(e.offsetTop<(winTop+header_H()+1) && (e.offsetTop+e.offsetHeight) > (winTop)) {
          // e.id
          $('.nav_box').removeClass('active')
          $(`.nav_box[data-anchor=${e.id}]`).addClass('active')
        } else {
          $(`.nav_box[data-anchor=${e.id}]`).removeClass('active')
        }
        //to Bottom
        if((winH+winTop)>document.querySelector('.space_frame').clientHeight-20) {

          $('.nav_box').removeClass('active')
          if(e.id == 'sec_rules') {
            $(`.nav_box[data-anchor=${e.id}]`).addClass('active')
          }
        }
      })

      //浮動按鈕
      // console.log(winTop)
      // console.log(winH*0.6)
      // console.log(winTop>winH*0.6)
      if(winTop>winH*0.6) {
        $(".float_frame").addClass("active");
        $(".goTop").addClass("active");
      } else {
        $(".float_frame").removeClass("active");
        $(".goTop").removeClass("active");
      }



      ticking = false;
    })
  }
}
window.addEventListener('scroll', handleScroll);
document.addEventListener('DOMContentLoaded', handleScroll)


// go top
function goTop(){
  window.scrollTo({ top: 0, behavior: "smooth" });
}