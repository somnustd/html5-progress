/**
 * Created by dingliwen on 2017/8/29.
 */
;
(function(){
    var percentCircle = function(domId,option){
        var defaultOption = {
            colorArr:["#14f9dc","#372ada"],  //颜色值必须是两个，可以为相同颜色，也可以是渐变的两个色值
            linewidth:20,   //半圆的宽度
            colorBg:'#ffffff', //半圆背景色 默认#ffffff
            r:100,
            startPoint:Math.PI*0.7, //开始角度，开始角度不同，半圆的大小不同，默认为  Math.PI*0.3;
            targetPersent:0,  //进度
            point:{             //进度条末端的点
                show:false,       //是否显示
                color:'#ffffff'     //颜色
            }
        };
        Utils.extend(defaultOption,option);
        this.options = defaultOption;
        var c = document.getElementById(domId);
        this.ctx = c.getContext('2d');
        this.beginPersent = 0;
        this.targetPersent = this.options.targetPersent;
        this.exec=false;

        //var Cwidth = 370,Cheight=260;
        var Cwidth = this.options.r+this.options.linewidth;
        var Cheight = this.options.r+this.options.linewidth;
        c.width=Cwidth*2;
        c.height=Cheight*2;

        //var that = this;
        c.style.width = Cheight+"px";
        c.style.height = Cheight+"px";

        this.width = c.width;
        this.height = c.height;

        var rAF = window.requestAnimationFrame	||
            window.webkitRequestAnimationFrame	||
            window.mozRequestAnimationFrame		||
            window.oRequestAnimationFrame		||
            window.msRequestAnimationFrame		||
            function (callback) { window.setTimeout(callback, 1000 / 60); };


        var that = this;
        function step(){
            if(that.exec){
                if(that.beginPersent<that.targetPersent){
                    that.beginPersent+=0.02;
                }
            }
            that.draw();
            rAF(step);
        }
        step();
    };
    percentCircle.prototype.draw = function(){
        var that = this;
        this.ctx.clearRect(0,0,this.width,this.height);

        var r = this.options.r;
        //var endPoint = Math.PI-this.options.startPoint;
        this.ctx.lineWidth = this.options.linewidth;

        //灰色底圆
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.lineCap="round";
        this.ctx.strokeStyle = this.options.colorBg;
        this.ctx.arc(this.width/2, r+that.options.linewidth, r, that.options.startPoint ,Math.PI-this.options.startPoint , false);
        this.ctx.stroke();
        this.ctx.restore();

        //计算渐变色的中间色值
        function insert(str){
            return str.slice(0,2)+","+str.slice(2,4)+","+str.slice(4,6);
        }
        function convert(color){
            var color1Arr = color.substring(1,color.length);

            var newColor1 = insert(color1Arr).split(",");
            var newColor1_new = [];

            newColor1.forEach(function(item,index){
                newColor1_new.push(parseInt(item, 16));
            });

            return newColor1_new;
        }
        function pickHex(color1, color2) {
            var newColor1 = convert(color1);
            var newColor2 = convert(color2);

            var newAll = [];
            for(var i=0;i<newColor1.length;i++){
                //console.log(newColor1[i]+newColor2[i]);
                if(newColor1[i]+newColor2[i]){
                    newAll.push(parseInt((newColor1[i]+newColor2[i])/2));
                }else {
                    newAll.push(0);
                    //newAll.push(0);
                }

            }
            var newColorAll = [];
            newAll.forEach(function(item,index){
                if(item<10){
                    item = "0"+item;
                }
                newColorAll.push(item.toString(16));
            });

            return "#"+newColorAll.join("");
        }

        //console.log(that.options.colorArr[1]);
        var minColor = pickHex(that.options.colorArr[0],that.options.colorArr[1]);


        //左半部分
        this.ctx.save();
        var my_gradient = this.ctx.createLinearGradient(0, this.height, 0,this.height/2+30 - r);
        my_gradient.addColorStop(0,that.options.colorArr[0]);
        my_gradient.addColorStop(1,minColor);
        this.ctx.strokeStyle = my_gradient;
        this.ctx.lineCap="round";
        var leftCircle = -0.5;
        if(this.beginPersent<0.5){
            leftCircle = (2-(that.options.startPoint/Math.PI-0.5)*2) *this.beginPersent-(2-that.options.startPoint/Math.PI);
        }

        this.ctx.beginPath();
        this.ctx.arc(this.width/2, r+that.options.linewidth, r, that.options.startPoint ,leftCircle*Math.PI , false);
        this.ctx.stroke();
        this.ctx.restore();

        //右部分
        if (this.beginPersent>0.5){
            //console.log(this.beginPersent);
            var my_gradient2 = this.ctx.createLinearGradient(this.width/2, this.height, this.width/2,this.height/2+30 - r);
            my_gradient2.addColorStop(0,that.options.colorArr[1]);
            my_gradient2.addColorStop(1,minColor);
            this.ctx.save();
            this.ctx.strokeStyle = my_gradient2;
            this.ctx.lineCap="round";
            var leftCircle = (this.beginPersent-0.5)*(2-(that.options.startPoint/Math.PI-0.5)*2) - 0.5;
            this.ctx.beginPath();

            this.ctx.arc(this.width/2, r+that.options.linewidth, r, -0.5*Math.PI ,leftCircle*Math.PI, false);
            this.ctx.stroke();
            this.ctx.restore();
        }


        if(that.options.point.show){
            var endPoint = (2-(that.options.startPoint/Math.PI-0.5)*2) *this.beginPersent - (2-that.options.startPoint/Math.PI);
            var endPointX=this.width/2+(this.width/2-this.options.linewidth)*Math.cos(endPoint*Math.PI);
            var endPointY=this.height/2+(this.width/2-this.options.linewidth)*Math.sin(endPoint*Math.PI);
            this.ctx.save();
            this.ctx.fillStyle = that.options.point.color;
            this.ctx.beginPath();
            this.ctx.arc(endPointX, endPointY, 10, 0, Math.PI * 2, true);
            this.ctx.fill();
            this.ctx.restore();
        }

    };

    percentCircle.prototype.execAnimation = function(){
        this.exec = true;
    };
    window.percentCircle = percentCircle;
})();

//工具类
var Utils = (function(){
    var _utils = {};
    _utils.extend = function (target, obj) {
        for ( var i in obj ) {
            target[i] = obj[i];
        }
        return target;
    };
    _utils.hasTouch= 'ontouchstart' in window;
    _utils.loadImage = function(url,callback){
        var resource;
        var extPosition = url.lastIndexOf(".");
        var extName =url.substr(extPosition+1,url.length-extPosition-1);

        if(["jpg","png","jpeg"].indexOf(extName)>-1){
            resource = new Image();
            resource.src = url;
            resource.onload = function(){
                //image  has been loaded
                if(callback){
                    callback(resource);
                }
            };
        }else if(["mp3"].indexOf(extName)>-1){
            resource = new Audio(url);
            if(callback){
                callback(resource);
            }
        }


        //var img = new Image();

    };

    _utils.loadAllResource = function(resourceList,callback){
        var keys = Object.keys(resourceList);
        var keysCount = keys.length;
        var index = 0;

        this.loadImage(resourceList[keys[index]],loadImageCallback);
        function loadImageCallback(img){
            resourceList[keys[index]] = img;
            index++;
            if(index == keysCount){
                if(callback){
                    callback(resourceList);
                }
            }else{
                _utils.loadImage(resourceList[keys[index]],loadImageCallback);
            }
        }
    }

    return _utils;
})();