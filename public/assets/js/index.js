// 轮播图渲染显示
$.ajax({
    url: "/slides",
    success(data) {
        let html = template("slidesTpl", {
            data
        });
        $(".swipe-wrapper").html(html);
        var swiper = Swipe(document.querySelector('.swipe'), {
            auto: 3000,
            transitionEnd: function (index) {
                $('.cursor span').eq(index).addClass('active').siblings('.active').removeClass('active');
            }
        });

        // 上/下一张
        $('.swipe .arrow').on('click', function () {
            var _this = $(this);
            if (_this.is('.prev')) {
                swiper.prev();
            } else if (_this.is('.next')) {
                swiper.next();
            }
        })
    }
});

//最新发布渲染
newPublish();
function newPublish() {
    $.ajax({
        url:"/posts/lasted",
        success(data) {
            let html=template("newTpl",{
                data
            });
            $(".new").html(html);
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
            newPublish();
        }
    })
})

