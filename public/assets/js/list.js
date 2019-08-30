
//获取分类id
let id=getUrlParams("id");
id&&$.ajax({
    url:"/posts/category/"+id,
    success(data) {
        let html=template("articleListTpl",{
            articles:data
        });
        $("#articleListBox").html(html);

    }
});