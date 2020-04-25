jQuery || require('jquery');

// 当表单发生提交行为的时候
$('#userForm').on('submit', function () {
      // 获取到用户在表单中输入的内容并将内容格式化成参数字符串
      var formData = $(this).serialize();
      // 向服务器端发送添加用户的请求
      $.ajax({
            type: 'post',
            url: '/users',
            data: formData,
            success: function () {
                  // 刷新页面
                  location.reload();
            },
            error: function () {
                  alert('用户添加失败')
            }
      })
      // 阻止表单的默认提交行为
      return false;
});

// 上传头像图片

$('#modifyBox').on('change', '#avatar', function () {
      let formData = new FormData();
      formData.append('avatar', this.files[0]);

      $.ajax({
            type: 'post',
            url: '/upload',
            data: formData,
            processData: false,
            contentType: false,
            success: function (response) {
                  console.log(response);
                  $('#preview').attr('src', response[0].avatar);
                  $('#hiddenAvatar').val(response[0].avatar);
            },
            error: function (response) {
                  alert('上传图片出现错误');
            }
      })
})

// 用户列表展示
$.ajax({
      type: 'get',
      url: '/users',
      success: function (response) {
            console.log(response);
            let html = template('userTpl', {
                  data: response,
            });
            // console.log(html);
            $('#userBox').html(html);
      }
});

// 给编辑按钮添加点击事件  事件委托
$('#userBox').on('click', '.edit', function () {

      let id = $(this).attr('data-id');
      // alert(id);
      $.ajax({
            type: 'get',
            url: '/users/' + id,
            success: function (response) {
                  console.log(response);
                  let html = template('modifyTpl', response);
                  // console.log(html);
                  $('#modifyBox').html(html);

            }
      })
})
// 给修改内容添加提交事件
$('#modifyBox').on('submit', '#modifyForm', function () {

      let formData = $(this).serialize();
      // console.log(formData);
      let id = $(this).attr('data-id');
      $.ajax({
            type: 'put',
            url: '/users/' + id,
            data: formData,
            success: function (response) {
                  location.reload();
            }
      })

      return false;
});

// 添加删除事件
$('#userBox').on('click', '.delete', function () {

      let isConfirm = confirm('确定要删除吗？');
      if (isConfirm) {
            let id = $(this).attr('data-id');

            $.ajax({
                  type: 'delete',
                  url: '/users/' + id,
                  success: function (response) {

                        location.reload();
                  }
            })
      }
});

// 获取批量删除按钮
let deleteMany = $('#deleteMany');
// 全选按钮添加点击事件
$('#selectAll').on('change', function () {

      let status = $(this).prop('checked');
      // alert(status)
      $('#userBox').find('input').prop('checked', status);

      // 显示批量删除按钮
      if (status) {

            deleteMany.show();
      } else {
            deleteMany.hide();
      }
});
// 单选按钮添加事件
$('#userBox').on('change', '#userStatus', function () {

      let inputs = $('#userBox').find('input');

      if (inputs.length == inputs.filter(':checked').length) {

            $('#selectAll').prop('checked', true);
      } else {
            $('#selectAll').prop('checked', false);
      };

      // 显示批量删除按钮
      if (inputs.filter(':checked').length > 0) {
            deleteMany.show();
      } else {
            deleteMany.hide();
      }
});

// 实现批量删除功能
$('#deleteMany').on('click', function () {

      let ids = [];
      let checkedUsers = $('#userBox').find('input').filter(':checked');

      checkedUsers.each(function (index, element) {

            ids.push($(element).attr('data-id'));
      });

      if (confirm('确定要删除吗?')) {
            $.ajax({
                  type: 'delete',
                  url: '/users/' + ids.join('-'),
                  success: function () {
                        location.reload();
                  }
            })
      }
});