jQuery || require('jquery');

// 分类模板渲染
$.ajax({
      type: 'get',
      url: '/categories',
      success: function (response) {
            // console.log(response);

            let html = template('categoryTpl', { data: response });

            $('#category').html(html);
      }
});

// 图片上传功能实现
$('#parentBox').on('change', '#feature', function () {

      let formData = new FormData();
      formData.append('cover', this.files[0]);

      $.ajax({
            type: 'post',
            url: '/upload',
            data: formData,
            processData: false,
            contentType: false,
            success: function (response) {

                  console.log(response);

                  $('#thumbnail').val(response[0].cover);
            }
      })
});

// 添加文章功能
$('#addForm').on('submit', function () {

      let formData = $(this).serialize();

      $.ajax({
            type: 'post',
            url: '/posts',
            data: formData,
            success: function (response) {

                  // console.log(response);

                  location.href = '/admin/posts.html';
            }
      });

      return false;
});

// console.log(getUrlParem('id'));
//获取用户要修改的 id 值
let id = getUrlParem('id');

// 表示用户是进行 修改操作
if (id != -1) {

      $.ajax({
            type: 'get',
            url: '/posts/' + id,
            success: function (response) {

                  // console.log(response);
                  // 将获取过来的 数据与模板进行拼接
                  $.ajax({
                        type: 'get',
                        url: '/categories',
                        success: function (categories) {

                              response.categories = categories;
                              // console.log(response);
                              let html = template('modifyTpl', response);

                              $('#parentBox').html(html);


                        }
                  });

            }
      })
}


// 获取传递过来的id属性
function getUrlParem(name) {

      // console.log(location.search);
      let params = location.search.substr(1).split('&');
      // ["id=5e9ecd1ddc2e332d041df89f", "age=18"]

      // console.log(params);
      for (let i = 0; i < params.length; i++) {

            let tem = params[i].split('=');

            // console.log(params[i]);
            if (tem[0] == name) {

                  return tem[1]
            }
      }
      return -1;
};

// 添加文章修改 提交功能
$('#parentBox').on('submit', '#modifyForm', function () {

      let formData = $(this).serialize();

      let id = $(this).attr('data-id');

      $.ajax({
            type: 'put',
            url: '/posts/' + id,
            data: formData,
            success: function () {

                  location.href = '/admin/posts.html'
            }
      })

      return false;
})