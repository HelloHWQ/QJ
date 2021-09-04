var playFlag = 0;
var musicisok = 0;
function initFromInvp(){
	try{
		if(musicisok==0){
			var musicPlayer = $("#pagemusic")[0];
			var musicPlay = $("#musicPlay");
			var audio = $("#show_audio");
			if(musicPlay.length>0){
				var music = audio[0];
				music.play();
				music.pause();
			}
			var psrc = $("#pagemusic").attr("src");
			if(psrc&&psrc!=''){
				musicPlayer.play();
			}
			if(fpage_play_music=='1'){
				playFlag = 1;
				playOrParse();
			}else{
				playFlag = 0;
				playOrParse();
			}
			setTimeout(function(){
				if(musicPlay.length>0){
					if(audio[0].paused&&musicPlayer.paused){}else{
						musicisok = 1;
					}
				}else{
					if(musicPlayer.paused){}else{
						musicisok = 1;
					}
				}
			},200);
		}
		if(thevivi.length>0){
  	  	  	thevivi[0].play();
  	  		thevivi[0].pause();
  	  	}
	}catch(e){
		console.log(e);
	}
	$("#frominvpdiv").remove();
}
function initMusic(){
	var musicPlay = $("#musicPlay");
	var audio = $("#show_audio");
	if(musicPlay.length>0){
		try{
			var music_url;
			var show_audio = audio;
			var mu_o_url = show_audio.attr("mu_o_url");
			if(mu_o_url.indexOf('--zcl--')>-1){
				var muArr = mu_o_url.split('--zcl--');
				music_url = muArr[1];
				//TODO:检测外链是否可用
				$.ajax({
			        type: 'get',
			        url: music_url,
			        async:false,		//这个是是否异步加载true为异步加载，false则是同步加载
			        complete: function (res,status) {
			            if(status!='success'){
							music_url = OSS_MUSIC_URL_HEAD + muArr[0];
			            }
			        }
			    });
			}else{
				if(mu_o_url&&mu_o_url.indexOf("http")!=-1){
					music_url = mu_o_url;
				}else if(mu_o_url&&mu_o_url.indexOf("qq--")!=-1){
					music_url = qqguid;
				}else{
					music_url = OSS_MUSIC_URL_HEAD + mu_o_url;
				}
			}
			show_audio.attr("src",music_url);
		}catch(e){
			console.log(e);
		}
		musicPlay.bind("click",function(){playOrParse();});
		if(s_direction=='0'){
			domPositionUtil('body',"#musicPlay",35,35,12,16,3);
		}else{
			domPositionUtil('body',"#musicPlay",30,30,12,16,7);
			$("#musicPlay").css("-webkit-transform","rotate(90deg)");
		}
	}
	if(frominvp==1){
		$("body").append("<div id='frominvpdiv' style='width:100%;height:100%;z-index:2147483646;position:fixed;background-color:"+stylecolor_back+";' align='center'><div style='height:40%;'></div>"+
				"	<div style='width:70px;height:40px;line-height:40px;font-weight:bold;color:"+colorstyle+";font-size:11px;' align='center' ontouchend='initFromInvp()'>"+
				"		<div style='width:30px;height:30px;background-color:"+colorstyle+";border-radius:50px;'><div style='width:30px;height:30px;background-color:"+colorstyle+";border-radius:50px;-webkit-animation:outtonone 1s infinite;'></div></div>"+
				"			点击预览"+
				"	</div>"+
				"</div>");
	}else{
		var isWeixin = theAgent.toLowerCase().indexOf('micromessenger') != -1;
		if(!isWeixin){
			$("#loadingkeykey").show();
			initMusicByWXJSB();
		}else{
			if(theAgent.indexOf("ndroid")>-1){
				initMusicByWXJSB();
			}else{
				document.addEventListener("WeixinJSBridgeReady",function onBridgeReady(){
					initMusicByWXJSB();
				});
			}
		}
	}
}

function initMusicByWXJSB(){
	var musicPlayer = $("#pagemusic")[0];
	if(musicisok==0){
		if(musicPlay.length>0){
			var music = audio[0];
			music.play();
			music.pause();
		}
		//if($("#pagemusic").attr("src")!=''){
			musicPlayer.play();
		//}
		if(fpage_play_music=='1'){
			playFlag = 1;
			playOrParse();
		}else{
			playFlag = 0;
			playOrParse();
		}
		setTimeout(function(){
			if(musicPlay.length>0){
				if(audio[0].paused&&musicPlayer.paused){}else{
					musicisok = 1;
				}
			}else{
				if(musicPlayer.paused){}else{
					musicisok = 1;
				}
			}
			if(musicisok==0){
				$("#loadingkeykey").show();
			}else{
				$("#loadDiv").animate({
			        opacity:0
			    },1000,null,function(){
			        $(this).remove();
			    });
			}

		},200);
	}
}

function playOrParse(){
	if(playFlag==0){
		$("#show_audio")[0].play();
		$("#musicPlay").attr("src","http://s.xiaomaomv.com/static/z_yinyuekai.png");
		$("#musicPlay").css("-webkit-animation","menurotate 3s infinite linear");
		playFlag = 1;
	}else{
		$("#show_audio")[0].pause();
		$("#musicPlay").attr("src","http://s.xiaomaomv.com/static/z_yinyueguan.png");
		$("#musicPlay").css("-webkit-animation","none");
		playFlag = 0;
	}
}
var andInStatePlayOrNot = 0;
function playSound(url,smaterial_id){
    var musicSm = document.getElementById("sound"+smaterial_id);
    if(musicSm){
    	musicSm.volume = 1;
    	musicSm.currentTime = 0;
    	musicSm.play();
    	var is_playFinish = setInterval(function(){
            if(musicSm.ended){
                if(andInStatePlayOrNot == 1){
                    playFlag = 0;
                    playOrParse();
                }
                window.clearInterval(is_playFinish);
            }
        },30);
        if(playFlag == 1){
            andInStatePlayOrNot = 1;
            playOrParse();
        }else{
            andInStatePlayOrNot = 0;
        }
    }
}

var trbuttonsFlag = 0;
function openTrbuttons(){
	if(trbuttonsFlag==0){
		$(".trbutton").hide();
		trbuttonsFlag = 1;
	}else{
		$(".trbutton").show();
		trbuttonsFlag = 0;
	}
}

function initButtons(){
	domPositionUtil('body',"#getsms",29,29,19,23,5);
	domPositionUtil('body',"#giftbutton",38,38,16,69,5);
	$("#giftbutton").css("-webkit-animation","tanlianxia 6s infinite");
}

var all_trbuttons = null;
function initMenus(data, datav, funs,wbw,color) {
    var hastouch = "ontouchend" in window ? true : false;
    var length = data.length;
    var html = '';
    if(length>4){
    	length =4;
    }
    //if(data[0]!='invitation'){
    //	length -=1;
    //}
    for (var i = 0; i < length; i++) {
        var click = hastouch ? "ontouchend=\"" + funs[i] + ";event.preventDefault();\"" : "onclick=\"" + funs[i] + "\"";
        //<img class="trbutton" style="z-index:1314520;-webkit-animation:menurotate 3s infinite linear;position:absolute;" id="' + data[i] + '" src="http://s.xiaomaomv.com/static/round01.png">
        html = html + 
        '<div class="trbutton" style="z-index:1314521;font-size:14px;text-align:center;color:#444;position:absolute;" id="' + data[i] + 'f" ' + click + '>'+
        '<table style="width:100%;height:100%;"><tr><td class="myrightmenu" style="color:#444" align="center">' + datav[i] + '</td></tr></table></div>'
    }
    $("body").prepend(html);
	var topjishu = 17;
	var leftjishu = 15;
	var k = 0;
    for(var i = 0; i < length; i++) {
    	if(data[i]=='invitation'){
	    	domPositionUtil('body', "#" + data[i] + 'f', 50, 50, (4 * 72) + topjishu+20, 17, 5);
    	}else{
	    	domPositionUtil('body', "#" + data[i] + 'f', 50, 50, ((4-k-1) * 70) + topjishu, leftjishu, 5);
	    	k+=1;
    	}
    }
	if(wbw=='1'){
		var html = "<div onclick='showleavehope()' id='btmhope' style='z-index:1314521;background:"+color+";padding-left:15px;line-height:40px;height:40px;color:white;border-radius:30px;opacity:0.8;'>留下您的祝福...</div>";
		$("body").prepend(html);
		var wishdanmu = "<div id='wishdanmu' style='display:flex;overflow:hidden;z-index:1314521;height:70px;opacity:0.8;'>"+
		"</div>";
		$("body").prepend(wishdanmu);
		domPositionUtil('body', '#btmhope', 250, 40, 16, leftjishu, 7);
		domPositionUtil('body', '#wishdanmu', 265, 90, 55, leftjishu, 7);
	}
    all_trbuttons = $(".trbutton");
}

function initwbw(wbw,color){
	if(wbw=='1'){
		var topjishu = 17;
		var leftjishu = 15;
		var html = "<div onclick='showleavehope()' class='trbutton' id='btmhope' style='z-index:1314521;background:"+color+";padding-left:15px;line-height:40px;height:40px;color:white;border-radius:30px;opacity:0.8;'>留下您的祝福...</div>";
		$("body").prepend(html);
		var wishdanmu = "<div class='trbutton' id='wishdanmu' style='display:flex;overflow:hidden;z-index:1314521;height:70px;opacity:0.8;'>"+
		"</div>";
		$("body").prepend(wishdanmu);
		domPositionUtil('body', '#btmhope', 250, 40, 16, leftjishu, 7);
		domPositionUtil('body', '#wishdanmu', 265, 90, 55, leftjishu, 7);
	}
}


function closeTheInvitation(flag){
	allbuhide(1);
	$(".pageac").attr("class","pageac blur_c");
	$("#invCon").show();
}

var theRightNowLn=0;
var theRightNowLa=0;
function openMap(ln,la,hotel,place){
	AMap.convertFrom([ln,la],'baidu',
		function(status,result){
			var theTlalns = result.locations.toString().split(",");
			wx.openLocation({
			    latitude:parseFloat(theTlalns[1]),
			    longitude:parseFloat(theTlalns[0]),
			    name:hotel,
			    address: place, // 地址详情说明
                scale: 15, // 地图缩放级别,整形值,范围从1~28。默认为最大
			    infoUrl:'http://www.xiaomaomv.com'
			});
		}
	);
//	theRightNowLn = ln;
//	theRightNowLa = la;
//	if(noweeding){
//		$("#isweedingdetai1").hide();
//		$("#isweedingdetai2").hide();
//	}else{
//		$("#isweedingdetai1").show();
//		$("#isweedingdetai2").show();
//	}
//	$("#mapCon").show();
//	var map = new BMap.Map("allmap");
//	var point = new BMap.Point(ln,la);
//    map.centerAndZoom(point,19);
//    var mk = new BMap.Marker(point);
//    map.addOverlay(mk);
//    $(".BMap_Marker").css("background-image","url('http://s.xiaomaomv.com/static/buttefly.gif')");
}
function openDaohang(){
	AMap.convertFrom([theRightNowLn,theRightNowLa],'baidu',
		function(status,result){
			var theTlalns = result.locations.toString().split(",");
			wx.openLocation({
			    latitude:parseFloat(theTlalns[1]),
			    longitude:parseFloat(theTlalns[0]),
			    name:'',
			    infoUrl:'http://www.xiaomaomv.com'
			});
		}
	);
}
function openWishes(){
	allbuhide(1);
	$("#wishesCon").show();
	if(wishSprite_hide){
		wishSprite_hide.play();
	}
	$(".pageac").attr("class","pageac blur_c");
}

function stopRealVideo(){
	if(isnotusvideo){
		$('#videoCon').html('');
	}else{
		$("#ourmp4")[0].pause();
	}
	playOrParse();
}
var isnotusvideo = true;
function openVideo(needUrl){
	$("#videosCon").show();
	if(playFlag==1){
		playOrParse();
	}
	var url = movie_url;
	if(needUrl){
		url = needUrl;
	}
	if(url!=''){
		if(url.indexOf("s.xiaomaomv.com")!=-1||url.indexOf("2420380645")!=-1||url.indexOf("hunliji.com")!=-1||url.indexOf("2210508254720")!=-1){
			if(isnotusvideo){
				isnotusvideo = false;
				$("#videoCon").html("<video id=\"ourmp4\" controls=\"true\" autoplay=\"true\" webkit-playsinline=\"true\" x5-playsinline='x5-playsinline' playsinline=\"true\" poster=\"\" style=\"width:100%;height:400px;display:block;position:relative;\" src=\""+url+"\"></video>");
			}else{
				$("#ourmp4")[0].play();
			}
		}else if(url.indexOf("youku")==-1){
			$("#videoCon").html("<iframe style='width:100%;height:100%;border:none;' src='"+url+"' frameborder=0 allowfullscreen></iframe>");
		}else{
			if(s_direction=='0'){
				$("#videoCon").html("<div id='youkuplayerC' style='width:100%;height:45%;z-index:0;'></div>");
			}else{
				$("#videoCon").html("<div id='youkuplayerC' style='width:100%;height:80%;z-index:0;'></div>");
			}
			var vvid = '';
	    	if(url.indexOf('embed/')!=-1){
	    		vvid = url.split('embed/')[1].split('==')[0];
	    	}else{
	    		vvid = url.split('id_')[1].split('==')[0];
	    	}
	    	player = new YKU.Player('youkuplayerC',{
	            styleid:'0',
	            client_id:'b299ff842aa44893',
	            vid:vvid,
	            autoplay:1
	        });
		}
	}
}

function playbilibili(){
	$("[tag='bilibili_mv']").remove();
	if(playFlag==1){
		$("#show_audio")[0].pause();
		$("#musicPlay").attr("src","http://s.xiaomaomv.com/static/z_yinyueguan.png");
		$("#musicPlay").css("-webkit-animation","none");
		playFlag = 0;
	}
}

function getGiftToDomain(theSS){
	
	return "h5.hunlihu.com/payhlh";
	
	//if(theSS==288||theSS==1999){
	//	return "h5.hunlihu.com/payhlh";
	//}else {
	//	return "h5.xiaomaomv.com/pay";
	//}
	//return theSS==288?"h5.hunlihu.com/payhlh":"h5.xiaomaomv.com/pay";
}
