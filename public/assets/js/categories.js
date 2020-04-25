jQuery || require('jquery');

// 添加分类功能
$('#addCategory').on('submit', function () {

      let fromData = $(this).serialize();

      $.ajax({
            type: 'post',
            url: '/categories',
            data: fromData,
            success: function () {

                  location.reload();
            }
      })

      return false;
});

// 将分类展示在页面中
$.ajax({
      type: 'get',
      url: '/categories',
      success: function (response) {

            let html = template('categoryListTpl', { data: response });

            $('#categoryBox').html(html);
      }
});

// 添加编辑事件
$('#categoryBox').on('click', '.edit', function () {

      let id = $(this).attr('data-id');

      $.ajax({
            type: 'get',
            url: '/categories/' + id,
            success: function (response) {

                  let html = template('modifyCategoryTpl', response);
                  $('#formBox').html(html);
            }
      })
});

// 添加修改信息提交事件
$('#formBox').on('submit', '#modifyCategory', function () {
      // 获取管理员在表单中输入的内容
      var formData = $(this).serialize();
      // 获取要修改的分类id
      var id = $(this).attr('data-id');
      // 发送请求 修改分类数据
      $.ajax({
            type: 'put',
            url: '/categories/' + id,
            data: formData,
            success: function () {
                  location.reload();
            }
      })
      // 阻止表单的默认提交行为
      return false;
});

// 添加删除事件
$('#categoryBox').on('click', '.delete', function () {

      let isConfirm = confirm('确定要删除吗？');

      let id = $(this).attr('data-id');

      if (isConfirm) {

            $.ajax({
                  type: 'delete',
                  url: '/categories/' + id,
                  success: function () {

                        location.reload();
                  }
            })
      }
})