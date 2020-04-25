jQuery || require('jquery');

// 处理日期时间格式
function formateDate(date) {
      // 将日期时间字符串转换成日期对象
      date = new Date(date);
      return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
};
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

// 渲染随机数据
$.ajax({
      type: 'get',
      url: '/posts/random',
      success: function (response) {

            // console.log(response);

            let randomTpl = `
            {{each data}}
                        <li>
                        <a href="detail.html?id={{$value._id}}">
                              <p class="title">{{$value.title}}</p>
                              <p class="reading">阅读({{$value.meta.views}})</p>
                              <div class="pic">
                                    <img src="{{$value.thumbnail}}" alt="">
                              </div>
                        </a>
                        </li>
            {{/each}}
            `

            let html = template.render(randomTpl, { data: response });

            $('#randomBox').html(html);
      }
});

// 渲染最新评论数据
$.ajax({
      type: 'get',
      url: '/comments/lasted',
      success: function (response) {

            // console.log(response);

            let commentTpl = `
                  {{each data}}
                  <li>
                  <a href="javascript:;">
                        <div class="avatar">
                              <img src="{{$value.author.avatar}}" alt="">
                        </div>
                        <div class="txt">
                              <p>
                                    <span>{{$value.author.nickName}}</span>{{$imports.formateDate($value.createAt)}}说:
                              </p>
                              <p>{{$value.content}}</p>
                        </div>
                  </a>
                  </li>
                  {{/each}}
            `
            let html = template.render(commentTpl, { data: response });
            $('#commentBox').html(html);
      }
});

// 分类列表渲染
$.ajax({
      type: 'get',
      url: '/categories',
      success: function (response) {

            // console.log(response);

            let navTpl = `
                  {{each data}}
                  <li><a href="list.html?id={{$value._id}}"><i class="fa {{$value.className}}"></i>{{$value.title}}</a></li>
                  {{/each}}
            `
            let html = template.render(navTpl, { data: response });
            $('#navBox').html(html);

            $('#topNavBox').html(html);
      }
});


// 获取到搜索表单 并为其添加表单提交事件
$('.search form').on('submit', function () {
      // 获取到用户在表单中输入的搜索关键字
      var keys = $(this).find('.keys').val();
      // 跳转到搜索结果页面 并且将用户输入的搜索关键字传递到搜索结果页面
      location.href = "/search.html?key=" + keys
      // 阻止表单默认提交行为
      return false;
});