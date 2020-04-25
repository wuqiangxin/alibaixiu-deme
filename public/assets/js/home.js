jQuery || require('jquery');

// 索要轮播图资源功能
$.ajax({
      type: 'get',
      url: '/slides',
      success: function (response) {

            // console.log(response);
            let html = template('slidesTpl', { data: response });

            $('#slidesBox').html(html);

            // 必须将 swiper 的算法写在 li 标签的后面才能实现功能
            var swiper = Swipe(document.querySelector('.swipe'), {
                  auto: 3000,
                  transitionEnd: function (index) {
                        // index++;

                        $('.cursor span').eq(index).addClass('active').siblings('.active')
                              .removeClass('active');
                  }
            });

            // 上/下一张
            $('.swipe .arrow').on('click', function () {
                  var _this = $(this);

                  if (_this.is('.prev')) {
                        swiper.prev();
                  } else if (_this.is('.next')) {
                        swiper.next();
                  }
            })

      }
});

// 渲染最新发布数据
$.ajax({
      type: 'get',
      url: '/posts/lasted',
      success: function (response) {

            // console.log(response);
            let html = template('lastedTpl', { data: response });
            $('#lastedBox').html(html);
      }
})