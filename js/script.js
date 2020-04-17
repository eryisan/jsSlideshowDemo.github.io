
var index = 0;    //当前显示图片的索引,默认值为0

// 封装getElementById()
function byId(id){
    return typeof(id)==="string"?document.getElementById(id):id;
}

var prev = byId("prev"),    //上一张
    next = byId("next");    //下一张

/*  浏览器兼容 封装通用事件绑定方法
    element绑定事件的DOM元素
    事件名
    事件处理程序
*/
function addHandler(element,type,handler){
    // 非IE浏览器
    if(element.addEventListener){
        element.addEventListener(type,handler,true);
        // IE浏览器
    }else if(element.attachEvent){
        element.attachEvent("on" + type,handler);
    }else{
        element["on"+type] = handler;
    }
}

    // 下一张按钮   圆点按钮
var pics = byId("banner").getElementsByTagName("div"),
    size = pics.length,
    dots = byId("dots").getElementsByTagName("span");

// 优化性能,封装切换图片
function changeImg(){
    // 遍历所有图片,将图片隐藏,将圆点上的类清除
    for(var i=0;i<size;i++){
        pics[i].style.display = "none";
        dots[i].className = "";
    }
    // 显示当前图片
    pics[index].style.display = "block";
    // 当前圆点高亮显示
    dots[index].className = "active";
}

// 下一张绑定事件
addHandler(next,"click",function(){
    index++;
    if(index >= size){
        index = 0;
    }
    changeImg();
})

// 上一张绑定事件
addHandler(prev,"click",function(){
    index--;
    if(index < 0){
        index = size-1;
    }
    changeImg();
})

// 点击圆点切换图片
for(var d=0;d<size;d++){
    dots[d].setAttribute("data-id",d);
    addHandler(dots[d],"click",function(){
        index = this.getAttribute("data-id");
        changeImg();
    })
}


var timer = null,
    main = byId("main");
// 自动轮播
function startAutoPlay(){
    timer = setInterval(function(){
        index++;
        if(index >= size){
            index = 0;
        }
        changeImg();
    },3000)
}

startAutoPlay();

// 清除定时器,停止自动轮播
function stopAutoPlay(){
    if(timer){
        clearInterval(timer);
    }
}

// 鼠标滑入main 停止轮播
addHandler(main,"mouseover",stopAutoPlay);
// 鼠标离开main 继续轮播
addHandler(main,"mouseout",startAutoPlay);

// 左侧菜单
var menuContent = byId("menu-content"),
    menuItems = menuContent.getElementsByClassName("menu-item"),
    subMenu = byId("sub-menu"),
    innerBox = subMenu.getElementsByClassName("inner-box");

for(var m=0,idx,mlen = menuItems.length;m<mlen;m++){
    // 给所有子菜单定义属性,表明它的索引
    menuItems[m].setAttribute("data-index",m);
    addHandler(menuItems[m],"mouseover",function(){
        // 显示子菜单所在的背景
        subMenu.className = "sub-menu";
        // 获取当前主菜单的索引
        idx = this.getAttribute("data-index");
        // 遍历所有的子菜单innerBox,将它们隐藏
        for(var j=0,jlen=innerBox.length;j<jlen;j++){
            // 隐藏所有的子菜单
            innerBox[j].style.display = "none";
            // 所有主菜单取消背景
            menuItems[j].style.background = "none";
        }
        // 找到当前子菜单,让其显示出来
        innerBox[idx].style.display = "block";
        menuItems[idx].style.background = "rgba(0,0,0,0.1)";
    })
}

var banner = byId("banner");

// 鼠标离开banner,隐藏子菜单
addHandler(banner,"mouseout",function(){
    subMenu.className = "sub-menu hide";
})

// 鼠标离开主菜单menuContent,隐藏子菜单
addHandler(menuContent,"mouseout",function(){
    subMenu.className = "sub-menu hide";
})

// 鼠标划入子菜单时,子菜单显示
addHandler(subMenu,"mouseover",function(){
    this.className = "sub-menu";
})

// 鼠标离开子菜单时,子菜单隐藏
addHandler(subMenu,"mouseout",function(){
    this.className = "sub-menu hide";
})
