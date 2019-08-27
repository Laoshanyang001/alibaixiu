module.exports = async (req, res) => {
	if (req.session && req.session.userInfo) {
		let data="var isLogin = true,userId="+"'"+req.session.userInfo._id+"'";
		res.send(data);
	}else {
		res.send('var isLogin = false')
	}
};
