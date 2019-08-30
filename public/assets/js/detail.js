//获取文章id
let id = getUrlParams("id");
//渲染文章页面
id && $.ajax({
    url: "/posts/" + id,
    success(data) {
        let html = template("articleTpl", {
            article: data
        });
        $("#articleBox").html(html);
    }
});

//评论关闭开启状态
$.ajax({
    url: "/settings",
    success(data) {
        if (data.comment) {
            $("#articleComments").show();
        } else {
            $("#articleComments").hide();
        }
    }
});

//添加评论功能
$(".content").on("submit", "#commentsForm", function () {
    let content = $("#commentsContent").val();
    $.ajax({
        type: "post",
        url: "/comments",
        data: {
            author: userId,
            content,
            post: id
        },
        success(data) {
            $("#commentsContent").val("");
            comments();
        }
    });
    return false;
});

//评论列表分页功能


//渲染评论页面
comments();

function comments() {
    $.ajax({
        url: "/comments/all",
        success(data) {
            let comments =data.reverse();
            comments = comments.filter(item => item.post._id == id);
            let html = template("commentsTpl", {
                comments
            });
            $(".discuz").html(html);
        }
    });
}