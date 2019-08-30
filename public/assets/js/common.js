//退出功能
$("#logout").on("click", function () {
    let isConfirm = confirm("您确定要退出登录？");
    console.log(isConfirm);
    
    if (isConfirm) {
        $.ajax({
            type: "post",
            url: "/logout",
            success() {
                location.href = "/admin/login.html"
            },
            error() {
                alert("退出失败!");
            }
        });
    }
});

//登录用户显示功能
$.ajax({
    url:"/users/"+userId,
    success(data) {
        if(data.avatar) {
            $("#avatarUserInfo").attr("src",data.avatar);
        }
        $(".name").text(data.nickName);
    }
});

//格式化模板时间
function dateFormat(date) {
  return date.substr(0, 4) + "/" + date.substr(5, 2) + "/" + date.substr(8, 2);
}
template.defaults.exports.dateFormat = dateFormat;
