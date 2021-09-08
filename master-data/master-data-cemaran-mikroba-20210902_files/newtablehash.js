var hashno;

$(document).ready(function(){
	hashno = window.location.hash;
	readhash();
	$(window).bind('hashchange', function(){
		readhash();
	});
});

function readhash(){
	var urlgo = window.location.hash.replace('#', '').split('/');
	if(hashno!='' && window.location.hash==''){
		location.href = "";
		return false;
	}else if(hashno=='' || hashno!=window.location.hash){
		hashno = window.location.hash;
		return false;
	}
	if(urlgo.length>1){
		if(urlgo[0]=='ajax' && urlgo.length>7){
			$("#tb_view").val(parseInt(urlgo[2]));
			$("#orderby").val(parseInt(urlgo[6]));
			$("#sortby").val(urlgo[7]);
			if(urlgo.length==11){
				$(".tb_keycariadv").remove();
				var arrkey = urlgo[9].split('|');
				var txtkey = urlgo[10].split('|');
				for(x=0;x<arrkey.length;x++){
					$("#tb_keycari").after('<input type="hidden" class="tb_keycariadv" id="tb_keycari' + arrkey[x] + '-' + x + '" value="' + txtkey[x] + '">');
				}
			}
			
			redirect_url(parseInt(urlgo[4]));
		}
	}
}

function fctrim(str){
	str = str.replace(/^\s+/, '');
	for(var i = str.length - 1; i >= 0; i--){
		if(/\S/.test(str.charAt(i))){
			str = str.substring(0, i + 1);
			break;
		}
	}
	return str;
}