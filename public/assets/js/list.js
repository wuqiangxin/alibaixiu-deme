jQuery || require('jquery');

let categoryId = getUrlParem('id');

// 获取文章列表
$.ajax({
      type: 'get',
      url: '/posts/category/' + categoryId,
      success: function (response) {
            // console.log(response);
            let html = template('listTpl', { data: response });
            $('#listBox').html(html);

      }
});

// 显示对应名称的文章信息
$.ajax({
      type: 'get',
      url: '/categories/' + categoryId,
      success: function (response) {
            // console.log(response);

            $('#categoryTitle').html(response.title)
      }
})