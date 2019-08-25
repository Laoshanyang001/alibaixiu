$("#logout").on("click", function () {
    let isConfirm = confirm("您确定要退出登录？");
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