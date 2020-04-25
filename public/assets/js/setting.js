jQuery || require('jquery');

// 上传图片功能
$('#logo').on('change', function () {

      let formData = new FormData();

      formData.append('logo', this.files[0]);

      $.ajax({
            type: 'post',
            url: '/upload',
            data: formData,
            processData: false,
            contentType: false,
            success: function (response) {
                  console.log(response);

                  $('#hiddenlogo').val(response[0].logo);
                  // 显示图片  预览图片
                  $('#preview').prop('src', response[0].logo);
            }
      })
});

// 给表单添加提交事件
$('#settingsForm').on('submit', function () {

      let formData = $(this).serialize();

      $.ajax({
            type: 'post',
            url: '/settings',
            data: formData,
            success: function (response) {

                  location.reload();
            }
      });

      return false;
});


// 将数据展示到页面上
$.ajax({
      type: 'get',
      url: '/settings',
      success: function (response) {
            // console.log(response);

            if (response) {
                  // 将logo地址存储在隐藏域中
                  $('#hiddenlogo').val(response.logo);

                  // 将logo显示在页面中 
                  $('#preview').prop('src', response.logo);

                  // 将网站标题显示在页面中
                  $('#site_name').val(response.title);

                  // 将网站描述添加到页面上
                  $('#site_description').text(response.description);

                  // 将网站关键字添加到页面上
                  $('#site_keywords').val(response.keywords);

                  // 将是否开启评论功能显示在页面中
                  $('#comment_status').val(response.comment);

                  // 将评论是否经过人工审核显示在页面中
                  $('#comment_reviewed').val(response.review);
            }
      }
})