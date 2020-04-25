jQuery || require('jquery');

// 获取列表的数据
$.ajax({
      type: 'get',
      url: '/posts',
      success: function (response) {

            // console.log(response);

            let html = template('postTpl', { data: response });

            $('#postBox').html(html);

            let page = template('pageTpl', { data: response });
            $('#pageBox').html(page);
      }
});

// 处理日期时间格式
function formateDate(date) {
      // 将日期时间字符串转换成日期对象
      date = new Date(date);
      return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
};

function changePage(page) {
      // 获取列表的数据
      $.ajax({
            type: 'get',
            url: '/posts',
            data: {
                  page: page,
            },
            success: function (response) {

                  // console.log(response);

                  let html = template('postTpl', { data: response });

                  $('#postBox').html(html);

                  let page = template('pageTpl', { data: response });
                  $('#pageBox').html(page);
            }
      });
};

// 分类渲染
$.ajax({
      type: 'get',
      url: '/categories',
      success: function (response) {

            // console.log(response);

            let html = template('categoryTpl', { data: response });
            $('#categoryBox').html(html);
      }
});

// 筛选分类数据
$('#filterForm').on('submit', function () {

      let formData = $(this).serialize();

      $.ajax({
            type: 'get',
            url: '/posts',
            data: formData,
            success: function (response) {

                  // console.log(response);

                  let html = template('postTpl', { data: response });

                  $('#postBox').html(html);

                  let page = template('pageTpl', { data: response });
                  $('#pageBox').html(page);
            }
      });
      return false;
});

// 实现文章删除功能
$('#postBox').on('click', '.delete', function () {

      let id = $(this).attr('data-id');

      if (confirm('确定要删除吗？')) {

            $.ajax({
                  type: 'delete',
                  url: '/posts/' + id,
                  success: function () {

                        location.reload();
                  }
            })
      }
})