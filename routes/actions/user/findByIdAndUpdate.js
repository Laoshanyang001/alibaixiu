// 验证模块
const Joi = require('joi');
// 用户模块
const { User, validateUser } = require('../../../model/User');
// 工具
const _ = require('lodash');
// 路径处理
const path = require('path');
// 方法改造
const { promisify } = require('util');
// 文件模块
const fs = require('fs');
// 删除文件
const unlink = promisify(fs.unlink);

module.exports = async (req, res) => {
	// 将密码、邮箱字段抛除
	req.fields = _.pick(req.fields, ['nickName', 'role', 'avatar', 'status']);
	req.fields._id = req.params['id'];
	// 定义对象验证规则
	const schema = {
		_id: Joi.string().required().regex(/^[0-9a-fA-F]{24}$/).error(new Error('用户id非法'))
	};
	// 验证yong
	const { error } = Joi.validate(req.fields, schema, {
		// 允许对象包含被忽略的未知键
		allowUnknown: true
	});
	// 数据格式没有通过验证
	if (error) return res.status(400).send({message: error.message});
	const userOld = await User.findById(req.fields._id);
	if (userOld.avatar) {
		// 删除缩略图
		await unlink(path.join(__dirname, '../', '../', '../', 'public', userOld.avatar));
	}
	// 通过验证
	// 更新用户信息
	// new: true 返回修改后的文档 默认值为false 返回原始文档
	// fields: '-password'} 从返回值中抛除密码字段
	let user = await User.findByIdAndUpdate(req.fields._id, {$set: req.fields}, {new: true, fields: '-password'});
	// 响应
	res.send(user);	
};