
//获取分类id
let id=getUrlParams("id");

articleList();  
function articleList() {
    id&&$.ajax({
        url:"/posts/category/"+id,
        success(data) {
            let articles=data.filter(item=>item.state==1);
            let html=template("articleListTpl",{
                articles
            });
            $("#articleListBox").html(html);
        }
    });
}

// 点赞
$(".content").on("click",".like",function() {
    let id=$(this).attr("data-id");
    $.ajax({
        type:"post",
        url:"/posts/fabulous/"+id,
        success(data) {
            articleList();
        }
    })
})