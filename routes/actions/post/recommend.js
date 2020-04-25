// 用户模块
const { Post } = require('../../../model/Post');

module.exports = async (req, res) => {
      // select('-content') 把内容移出掉
      const posts = await Post.find({ state: 1 }).select().limit(4).sort('-meta.comments')
      // 响应
      res.send(posts);
}