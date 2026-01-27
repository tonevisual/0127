const stepSpeed = 3

//如何加卡 swiper
$('.stepSwiperBox .naviBtn').on('click', (e) => {
  let index = $('.stepBx.active').index('.stepBx')
  
  if($(e.currentTarget).hasClass('stepTltNext')){
    index++
    if (index > $('.stepBx').length-1) index = $('.stepBx').length-1
  }
  if($(e.currentTarget).hasClass('stepTltPrev')){
    index--
    if (index < 0) index = 0
  }

  handleSlideChangeStep_m(index)
  
})
$('.moveBar_step').css({
  width: $('.stepBx').eq(0).outerWidth(),
  left: '0%',
})
$('.stepTltPrev').hide()
function handleSlideChangeStep(index) {
  $('.stepBx').removeClass('active');
  $('.stepPage').hide();
  $($('.stepBx').eq(index).data('page')).fadeIn(450);

  $('.moveBar_step').css({
    width: $('.stepBx').eq(index).outerWidth(),
    left: (index > 0 ? percentBar_step(index) : 0) + '%',
  });

  setTimeout(() => {
    $('.stepBx').eq(index).addClass('active');
  }, 300);

  $('.stepTltPrev').toggle(index > 0);
  $('.stepTltNext').toggle(index < $('.stepBx').length - 1);
}
let canLeftStep = true
function handleSlideChangeStep_m(index) {
  if(!canLeftStep) return false
  canLeftStep = false
  // console.log(index)
  let x = $('.stepSwiper_inner').scrollLeft()
  let xEnd = wBar(index, '.stepBx')
  // console.log(xEnd)
  const scrollLeft = setInterval(() => {
    if($('.stepSwiper_inner').scrollLeft() > xEnd){
      x-=stepSpeed
      if(x<=xEnd) {
        x = xEnd
        clearInterval(scrollLeft)
        canLeftStep = true
      }

    } else {
      x +=stepSpeed
      if(x>=xEnd) {
        x = xEnd
        clearInterval(scrollLeft)
        canLeftStep = true
      }
    }
    $('.stepSwiper_inner').scrollLeft(x)
    // console.log(x)
    
    
  }, 10);

  setTimeout(() => {
    handleSlideChangeStep(index)
  }, 50);
}
$('.stepBx').on('click', (e) => {
  const index = $(e.currentTarget).index('.stepBx');
  if ($('.stepBx').eq(index).hasClass('active')) return;

  if ($('.space_frame')[0].clientWidth > 768) {
    handleSlideChangeStep(index)
  } else {
    handleSlideChangeStep_m(index)
  }
})
function percentBar_step(val) {
  let w = 0
  for(let i=0; i<val; i++) {
    w += $('.stepBx').eq(i).outerWidth()
  }
  let w_total = $('.stepSwiper_inner').outerWidth()
  return w/w_total*100
}

// ***********************************
//常見問題 swiper
$('.sec_04 .naviBtn').on('click', (e) => {
  let index = $('.titBx.active').index('.titBx')
  
  if($(e.currentTarget).hasClass('titNext')){
    index++
    if (index > $('.titBx').length-1) index = $('.titBx').length-1
  }
  if($(e.currentTarget).hasClass('titPrev')){
    index--
    if (index < 0) index = 0
  }

  handleSlideChange_m(index)
  
})

//常見問題
$('.moveBar').css({
  width: $('.titBx').eq(0).outerWidth(),
  left: '0%',
})
$('.titPrev').hide()
function handleSlideChange(index) {
  $('.titBx').removeClass('active');
  $('.qaPage').hide();
  $($('.titBx').eq(index).data('page')).fadeIn(450);

  $('.moveBar').css({
    width: $('.titBx').eq(index).outerWidth(),
    left: (index > 0 ? percentBar(index) : 0) + '%',
  });

  setTimeout(() => {
    $('.titBx').eq(index).addClass('active');
  }, 300);

  $('.titPrev').toggle(index > 0);
  $('.titNext').toggle(index < $('.titBx').length - 1);
}
let canLeft = true
function handleSlideChange_m(index) {
  if(!canLeft) return false
  canLeft = false

  // console.log(index)

  let x = $('.titleSwiper_inner').scrollLeft()
  let xEnd = wBar(index, '.titBx')
  // console.log(xEnd)
  const scrollLeft = setInterval(() => {
    if($('.titleSwiper_inner').scrollLeft() > xEnd){
      x-=stepSpeed
      if(x<=xEnd) {
        x = xEnd
        clearInterval(scrollLeft)
        canLeft = true
      }

    } else {
      x +=stepSpeed
      if(x>=xEnd) {
        x = xEnd
        clearInterval(scrollLeft)
        canLeft = true
      }
    }
    $('.titleSwiper_inner').scrollLeft(x)
    // console.log(x)
    
    
  }, 10);

  setTimeout(() => {
    handleSlideChange(index)
  }, 50);
}

$('.titBx').on('click', (e) => {
  const index = $(e.currentTarget).index('.titBx');
  if ($('.titBx').eq(index).hasClass('active')) return;

  if ($('.space_frame')[0].clientWidth > 768) {
    handleSlideChange(index)
  } else {
    handleSlideChange_m(index)
  }
})

function percentBar(val) {
  let w = 0
  for(let i=0; i<val; i++) {
    w += $('.titBx').eq(i).outerWidth()
  }
  let w_total = $('.titleSwiper_inner').width()
  return w/w_total*100
}
function wBar(val, dom) {
  let w = 0
  for(let i=0; i<val; i++) {
    w += $(dom).eq(i).outerWidth()
  }
  return w
}

$(window).resize(() => {
  if($('.space_frame')[0].clientWidth <= 768) return
  let index = $('.titBx.active').index('.titBx')
  $('.moveBar').css({
    width: $('.titBx').eq(index).outerWidth(),
    left: (index>0 ? percentBar(index) : 0) + '%',
  })
  let index_step = $('.stepBx.active').index('.stepBx')
  $('.moveBar_step').css({
    width: $('.stepBx').eq(index_step).outerWidth(),
    left: (index_step>0 ? percentBar_step(index_step) : 0) + '%',
  })
})



//問題集
$('.q').on('click', (e)=>{
  if($(e.currentTarget).parent('.question').hasClass('open')){
    $(e.currentTarget).next('.a').slideUp(250)
    $(e.currentTarget).parent('.question').removeClass('open')
  } else {
    $(e.currentTarget).next('.a').slideDown(350)
    $(e.currentTarget).parent('.question').addClass('open')
  }
})