
customKey = location.search.split('key=')[1];
if(!customKey){
	customKey = "";
}

function loadPage(page, url){
	if(page == 1 && url != ""){
		frame1.src = url;
		setLocalStorage('frame1'+customKey, url);
	}
	else if(page == 2 && url != ""){
		frame2.src = url;
		setLocalStorage('frame2'+customKey, url);
	}
	else if(page == 3 && url != ""){
		frame3.src = url;
		setLocalStorage('frame3'+customKey, url);
	}
	else if(page == 4 && url != ""){
		frame4.src = url;
		setLocalStorage('frame4'+customKey, url);
	}
}

function gridLoader(){
	var frame1cookie = getLocalStorage('frame1'+customKey);
	var frame2cookie = getLocalStorage('frame2'+customKey);
	var frame3cookie = getLocalStorage('frame3'+customKey);
	var frame4cookie = getLocalStorage('frame4'+customKey);
	var defaultpage = "./notconfigured.html";

	if(frame1cookie){
		frame1.src = frame1cookie;
		url1.value = frame1cookie;
	}else{ frame1.src = defaultpage; }

	if(frame2cookie){
		frame2.src = frame2cookie;
		url2.value = frame2cookie;
	}else{ frame2.src = defaultpage; }

	if(frame3cookie){
		frame3.src = frame3cookie;
		url3.value = frame3cookie;
	}else{ frame3.src = defaultpage; }

	if(frame4cookie){
		frame4.src = frame4cookie;
		url4.value = frame4cookie;
	}else{ frame4.src = defaultpage; }
}

/* Local Storage Functions - https://gist.github.com/SmugZombie/df4213faab7c33bae26b  */
function getLocalStorage(name){ 
    now = parseInt(new Date() / 1000);
    expires = localStorage.getItem(name+"_expire");
    if(!expires){ return localStorage.getItem(name); }  
    else if(now >= expires){ localStorage.removeItem(name+"_expire"); localStorage.removeItem(name); return ""; }
    else{ return localStorage.getItem(name); }   
}

function setLocalStorage(name, value, minutes){ 
    if(minutes == null){ localStorage.setItem(name, value); localStorage.removeItem(name+"_expire"); return true} // No set expiration
    else if(minutes == 0){ localStorage.removeItem(name); localStorage.removeItem(name+"_expire"); return true} // Setting to 0 kills the localStorage Item any any expiration
    else{ 
        epochExpire = parseInt(new Date() / 1000 + (minutes * 60));
        localStorage.setItem(name, value); localStorage.setItem(name+"_expire", epochExpire); 
        return true
    }
    return false
}

$('.minmax').click(function(){
	if ($(this).parent().parent().hasClass('max')) {
		$('.resizeable').removeClass('max min min0 min1 min2');
	} else {
		$('.resizeable').removeClass('max min min0 min1 min2');
		$('.resizeable').addClass('min');
		$(this).parent().parent().removeClass('min').addClass('max');
	}
	$('.min').each(function(i){
		$(this).addClass('min'+i);
	});
});

window.setInterval(function(){
	$('.resizeable iframe').each(function(){
	  $(this).prependTo($(this).parent());
	});
}, 240000);

// Make user click ok to leave page
// window.onbeforeunload = function() { return false; }
gridLoader();
