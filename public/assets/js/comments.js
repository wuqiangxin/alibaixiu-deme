jQuery || require('jquery');

// 创建 评论集合信息

// for (let i = 1; i < 6; i++) {

//       $.ajax({
//             type: 'post',
//             url: '/comments',
//             data: {
//                   author: '5e9abbb6166a9923a823a8a8',
//                   content: `第${i}个评论`,
//                   post: '5e9ecd1ddc2e332d041df89f',

//             },
//             success: function (response) {

//                   console.log(response);

//             }
//       })
// }

// 将评论数据 渲染到页面上
$.ajax({
      type: 'get',
      url: '/comments',
      success: function (response) {

            console.log(response);
            let html = template('commentTpl', response);

            $('#parentBox').html(html);


            let pagehtml = template('pageTpl', response);

            $('#pageBox').html(pagehtml);
      }
});

// 添加分页事件
function changePage(page) {

      $.ajax({
            type: 'get',
            url: '/comments',
            data: {
                  page: page
            },
            success: function (response) {

                  console.log(response);
                  let html = template('commentTpl', response);

                  $('#parentBox').html(html);


                  let pagehtml = template('pageTpl', response);

                  $('#pageBox').html(pagehtml);
            }
      });
};

// 处理日期时间格式
function formateDate(date) {
      // 将日期时间字符串转换成日期对象
      date = new Date(date);
      return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
};


// 实现评论审核功能
$('#parentBox').on('click', '.status', function () {

      let status = $(this).attr('data-status');

      let id = $(this).attr('data-id');

      $.ajax({
            type: 'put',
            url: '/comments/' + id,
            data: {
                  state: status == 0 ? 1 : 0,
            },
            success: function (responmse) {

                  location.reload();
            }
      })
});

// 实现删除评论功能
$('#parentBox').on('click', '.delete', function () {

      if (confirm('确定要删除吗？')) {
            let id = $(this).attr('data-id');

            $.ajax({
                  type: 'delete',
                  url: '/comments/' + id,
                  success: function () {

                        location.reload();
                  }
            })
      }
})
