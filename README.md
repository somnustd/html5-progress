## html5-progress

draw animated circular progress bar

### html5 canvas 实现渐变进度条 ###

![image](http://g.recordit.co/wtOvR1GzKI.gif)


### 参数 ###

<table>
  <tr>
    <th width=10%, bgcolor=yellow >参数名</th>
 	<th width=40%, bgcolor=yellow>参数说明</th>
    <th width="50%", bgcolor=yellow>举例</th>
  </tr>
  <tr>
    <td > colorArr </td>
    <td> 颜色值必须是两个，可以为相同颜色，也可以是渐变的两个色值  </td>
    <td> ["#ffe000","#ff4f00"] </td>
  </tr>
  <tr>
    <td >colorBg </td>
    <td> 半圆背景色 默认#ffffff </td>
    <td> 'transparent' </td>
  <tr>
    <td >linewidth </td>
    <td> 最外容器的宽度 </td>
    <td>  30 </td>
  </tr>
  <tr>
    <td >r </td>
    <td> 进度条的半径 </td>
    <td>  120 </td>
  </tr>
  <tr>
    <td >startPoint </td>
    <td> 开始角度，开始角度不同，半圆的大小不同，默认为  Math.PI*0.7 </td>
    <td>  Math.PI*0.8 </td>
  </tr>
  <tr>
    <td >targetPersent </td>
    <td> 进度（0-1） </td>
    <td>  0.9 </td>
  </tr>
  <tr>
    <td >point </td>
    <td> 进度条末端的点 </td>
    <td>  
			
	 </td>
  </tr>
</table>

### 提供的方法 ###
######动画开始
#####execAnimation()  

### 代码实例 ###


    var instance = new percentCircle("myCanvas",{
        colorArr:["#ffe000","#ff4f00"],  //颜色值必须是两个，可以为相同颜色，也可以是渐变的两个色值
        colorBg:'transparent', //半圆背景色 默认#ffffff
        linewidth:30,   //半圆的宽度
        r:120,
        startPoint:Math.PI*0.8, //开始角度，开始角度不同，半圆的大小不同，默认为  Math.PI*0.7;
        targetPersent:1,  //进度（0-1）
        point:{             //进度条末端的点
            show:true,       //是否显示
            color:'#ffffff'     //颜色
        }
    });
    instance.execAnimation();  //动画开始

作者：somnustd

链接：https://github.com/somnustd

著作权归作者所有
