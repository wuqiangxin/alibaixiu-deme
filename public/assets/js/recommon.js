jQuery || require('jquery');

// 添加热门 数据索要 功能
$.ajax({
      type: 'get',
      url: '/posts/recommend',
      success: function (response) {

            // console.log(response);

            let recommendTpl =
                  `
             {{each data}}      
                  <li>
                        <a href="detail.html?id={{$value._id}}">
                              <img src="{{$value.thumbnail}}" alt="">
                              <span>{{$value.content}}</span>
                        </a>
                  </li>
             {{/each}}
            `;

            let html = template.render(recommendTpl, { data: response });

            $('#recommonBox').html(html);
      }
})