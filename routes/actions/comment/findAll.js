const { Comment } = require('../../../model/Comment');
// 工具
const _ = require('lodash');

module.exports = async (req, res) => {
	// 查询用户信息
	const Comments = await Comment.find().populate('author', '-password').populate("post").exec();
	// 响应
	res.send(Comments);
}