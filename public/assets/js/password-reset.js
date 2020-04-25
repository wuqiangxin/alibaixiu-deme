jQuery || require('jquery');

// 修改密码功能
$('#modifyForm').on('submit', function () {

      let formData = $(this).serialize();

      $.ajax({
            type: 'put',
            url: '/users/password',
            data: formData,
            success: function () {

                  location.href('/admin/login.html');
            }
      });

      return false;
})