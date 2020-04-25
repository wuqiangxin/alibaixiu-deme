jQuery || require('jquery');

// 上传图片功能
$('#file').on('change', function () {

      let formData = new FormData();
      // 因为是上传二进制文件，所以不要解析文件类型，并且使用 this.files[0]

      formData.append('image', this.files[0]);

      $.ajax({
            type: 'post',
            url: '/upload',
            data: formData,
            // 不要解析上传文件的格式
            processData: false,
            // 不要设置上传文件的类型
            contentType: false,
            success: function (response) {

                  console.log(response);
                  $('#image').val(response[0].image);

            }
      })
});

// 添加表单提交功能
$('#slidesForm').on('submit', function () {

      let formData = $(this).serialize();

      $.ajax({
            type: 'post',
            url: '/slides',
            data: formData,
            success: function (response) {

                  location.reload();

            }
      })
});

// 信息展示在页面上
$.ajax({
      type: 'get',
      url: '/slides',
      success: function (response) {

            console.log(response);
            let html = template('slidesTpl', { data: response });

            $('#slidesBox').html(html);
      }
});

// 添加删除功能 事件委托
$('#slidesBox').on('click', '.delete', function () {

      if (confirm('确定要删除吗？')) {

            let id = $(this).attr('data-id');

            $.ajax({
                  type: 'delete',
                  url: '/slides/' + id,
                  success: function () {

                        location.reload();
                  }
            })
      }
})
