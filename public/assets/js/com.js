jQuery || require('jquery');

// 处理日期时间格式
function formateDate(date) {
      // 将日期时间字符串转换成日期对象
      date = new Date(date);
      return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
};