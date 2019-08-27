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

$.ajax({
    url:"/users/"+userId,
    success(data) {
        if(data.avatar) {
            $("#avatarUserInfo").attr("src",data.avatar);
        }
        $(".name").text(data.nickName);
    }
});