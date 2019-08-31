//显示分类
$.ajax({
    url:"/categories",
    success(data) {
        let html=template("categoryTpl",{categories:data});
        $(".topnav ul").html(html);
        $(".header .nav").html(html);
    }
 });

 //获取url中属性值
 function getUrlParams(name) {
    let paramsArr=location.search.substr(1).split("&");
    for(var i=0;i<paramsArr.length;i++) {
        let param=paramsArr[i].split("=");
        if(param[0]==name) {
            return param[1];
        }
    }
    return null;
}

//随机推荐渲染
$.ajax({
    url:"/posts/random",
    success(data) {
        let html=template("randomRecommendTpl",{
            data
        });
        $("#randomRecommend").html(html);
    }
});

//最新评论渲染
$.ajax({
    url:"/comments/lasted",
    success(data) {
        let html=template("newCommentsTpl",{
            data
        });
        $("#newComments").html(html);
    }
});

// 热门推荐渲染
$.ajax({
    url:"/posts/recommend",
    success(data) {
        let html=template("hotRecommendTpl",{
            data
        });
        $(".hots").html(html);
    }
});
