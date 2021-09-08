$(document).ready(function(){
	var checked = false;
	var listmenu = $("#tb_process").html();
	$('#blank').css('width', $('#divtabelajax').css('width'));
	$('#blank').css('height', $('#divtabelajax').css('height'));
	/*$('#labelload, #loading-box, .loading-spinner, #blank').ajaxStart(function(){
	//$('#labelload, #loading-box, .loading-spinner').ajaxStart(function(){
		$('#blank').css('width', $('#divtabelajax').css('width'));
		$('#blank').css('height', $('#divtabelajax').css('height'));
		$(this).fadeIn(500);
	}).ajaxStop(function(){
		$(this).fadeOut(500);
	}).ajaxComplete(function(){
		$(this).fadeOut(500);
	}).ajaxError(function(){
		$(this).fadeOut(500);
	});*/
	$("#tb_menu").change(function(){
		lang = $("#tblang").val();
		isi = $(this).val();
		chk = $(".tb_chk:checked").length;
		$("#tb_menu option:selected").each(function(){
			url = $(this).attr('url');
			jml = $(this).attr('jml');
			met = $(this).attr('met');
		});
		if(url=="") return false;
		if(chk==0 && jml!='0'){
			if(lang=="EN")
				alert('Please Select At Least 1 Record First');
			else
				alert('Mohon Pilih Data Terlebih Dahulu');
			$(this).val(0);
			return false;
		}
		if(jml=='1' && chk > 1){
			if(lang=="EN")
				alert('Please Select 1 Record Only');
			else
				alert('Untuk Proses Ini, Mohon Pilih 1 Data Saja');
			$(this).val(0);
			return false;
		}
		
		if(jml=='2' && chk < 2){
			if(lang=="EN")
				alert('Please Select At Least 2 Records');
			else
				alert('Untuk Proses Ini, Mohon Pilih Minimal 2 Data');
			$(this).val(0);
			return false;
		}
		
		if(jml!='0'){
			if(lang=="EN"){
				msgres = confirm('Process Selected Record(s)?');
			}else{
				if(met=="GENERATENIE"){
					msgres = prompt("Please enter your Passphrase", "");
				}else{
					msgres = confirm('Proses Data Sekarang..?');
				}
				//msgres = confirm('Proses Data Sekarang?');
			}
			
			if(!msgres){
				$(this).val(0);
				return false;
			}
		}
		if(met=="GET"){
			if(jml=='0')
				location.href = url;
			else
				location.href = url + '/' + $(".tb_chk:checked").val();
		}else if(met=="GETNEW"){
			if(jml=='0'){
				window.open(url, '_blank')
			}else{
				var arr = new Array();
				$.each($(".tb_chk:checked"), function(){
					arr.push($(this).val());
				});
				window.open(url + '/' + arr.join(), '_blank');
			}
		}else if(met=="GENERATENIE"){
			$.ajax({
				type: 'POST',
				url: url,
				data: $("#tb_form").serialize() + '|' + msgres,
				success: function(data){
					//alert(data); return false;
					if(data.search("MSG")>=0){
						arrdata = data.split('MSG#');
						arrdata = arrdata[1].split('#');
						alert(arrdata[0]);
						if(arrdata.length>1){
							if($('#useajax').val()=="TRUE" && arrdata[1]=="refresh"){
								newhal = parseInt($("#tb_hal").val());
								redirect_url(newhal, true);
							}else{
								location.href = arrdata[1];
							}
						}
					}else{
						if(lang=="EN")
							alert('Process Failed.');
						else
							alert('Proses Gagal.');
					}
				}
			});
		}else if(met=="POST"){
			$.ajax({
				type: 'POST',
				url: url,
				data: $("#tb_form").serialize(),
				success: function(data){
					//alert(data); return false;
					if(data.search("MSG")>=0){
						arrdata = data.split('MSG#');
						arrdata = arrdata[1].split('#');
						alert(arrdata[0]);
						if(arrdata.length>1){
							if($('#useajax').val()=="TRUE" && arrdata[1]=="refresh"){
								newhal = parseInt($("#tb_hal").val());
								redirect_url(newhal, true);
							}else{
								location.href = arrdata[1];
							}
						}
					}else{
						if(lang=="EN")
							alert('Process Failed.');
						else
							alert('Proses Gagal.');
					}
				}
			});
		}
		$(this).val(0);
		return false;
	});
	$("#tb_keycari").change(function(){
		lang = $("#tblang").val();
		var isi = $(this).val();
		var obj = '';
		$("#tb_keycari option:selected").each(function(){
			tipe = $(this).attr('cb');
			urtipe = $(this).attr('urcb');
		});
		if(tipe){
			arrtipe = tipe.split(';');
			obj = '<select id="tb_cari" onchange="bind_tb_cari(\'seltbcari\');">';
			obj += '<option></option>';
			if(urtipe){
				arrurtipe = urtipe.split(';');
				for(a=0;a<arrtipe.length;a++){
					obj += '<option value="' + arrtipe[a] + '">';
					obj += arrurtipe[a];
					obj += '</option>';
				}
			}else{
				for(a=0;a<arrtipe.length;a++){
					obj += '<option value="' + arrtipe[a] + '">';
					obj += arrtipe[a];
					obj += '</option>';
				}
			}
			obj += '</select>';
		}
		if(obj!=""){
			$("#tb_cari").replaceWith(obj);
		}else{
			if(lang=="EN")
				$("#tb_cari").replaceWith('<input type="text" class="tb_text" id="tb_cari" title="Type &amp; Press Enter To Search" value="" placeholder="..." onkeypress="return bind_tb_cari(event);" />');
			else
				$("#tb_cari").replaceWith('<input type="text" class="tb_text" id="tb_cari" title="Ketik Kata Kunci &amp; Tekan Enter Untuk Mencari" value="" placeholder="..." onkeypress="return bind_tb_cari(event);" />');
		}
	});
	$(".tabelajax tbody tr").mouseover(function(){
		$(this).addClass("hilite");
		if($(this).next().hasClass('tdmenu')){
			$(this).next().addClass("hilite");
		}else if($(this).hasClass('tdmenu')){
			$(this).prev().addClass("hilite");
		}
   	});
	$(".tabelajax tbody tr").mouseout(function(){
		$(this).removeClass("hilite");
		if($(this).next().hasClass('tdmenu')){
			$(this).next().removeClass("hilite");
		}else if($(this).hasClass('tdmenu')){
			$(this).prev().removeClass("hilite");
		}
	});
	$(".btnsubmenu").click(function(){
		location.href = $(this).attr('act');
		return false;
	});
	$(".tb_chk").click(function(){
		checked = true;
		curtr = $(this).parent().parent();
		if(!this.checked){
			curtr.removeClass("selected");
			if(curtr.next().hasClass('tdmenu')){
				curtr.next().removeClass("selected");
				curtr.next().children().children().last().html('');
			}else if(curtr.hasClass('tdmenu')){
				curtr.prev().removeClass("selected");
				curtr.children().children().last().html('');
			}
			if($(".tabelajax input:checkbox.tb_chk:checked").length==1) $(".tabelajax input:checkbox.tb_chk:checked").parent().parent().next().children().children().last().html(listmenu);
			$("#tb_chkall").attr('checked', this.checked);
		}else{
			curtr.addClass("selected");
			if(curtr.next().hasClass('tdmenu')){
				curtr.next().addClass("selected");
				if($(".tabelajax input:checkbox.tb_chk:checked").length==1) 
					curtr.next().children().children().last().html(listmenu);
				else
					$(".tabelajax tr td span.tb_process").html('');
			}else if(curtr.hasClass('tdmenu')){
				curtr.prev().addClass("selected");
				if($(".tabelajax input:checkbox.tb_chk:checked").length==1)
					curtr.children().children().last().html(listmenu);
				else
					$(".tabelajax tr td span.tb_process").html('');
			}
			if($(".tabelajax input:checkbox.tb_chk:checked").length == $(".tabelajax input:checkbox:not(#tb_chkall)").length) $("#tb_chkall").attr('checked', this.checked);
		}
	});
	$(".tabelajax tbody td").click(function(btn){
		var urldtl = '';
		if($("#tb_chkall").attr('id')){
			if(checked){
				checked = false;
				return true;
			}
			if(!btn.ctrlKey){
				$(".tabelajax tr").removeClass("selected");
				$(".tabelajax input:checkbox").attr('checked', false);
				$(".tabelajax tr td span.tb_process").html('');
			}
			$(this).parent().addClass("selected");
			if($(this).parent().next().hasClass('tdmenu')){
				$(this).parent().children().children().attr('checked', true);
				$(this).parent().next().addClass("selected");
				if($(".tabelajax input:checkbox.tb_chk:checked").length==1)
					$(this).parent().next().children().children().last().html(listmenu);
				else
					$(".tabelajax tr td span.tb_process").html('');
			}else if($(this).parent().hasClass('tdmenu')){
				$(this).parent().prev().children().children().attr('checked', true);
				$(this).parent().prev().addClass("selected");
				if($(".tabelajax input:checkbox.tb_chk:checked").length==1)
					$(this).parent().children().children().last().html(listmenu);
				else
					$(".tabelajax tr td span.tb_process").html('');
			}
			if($(".tabelajax input:checkbox.tb_chk:checked").length == $(".tabelajax input:checkbox:not(#tb_chkall)").length) $("#tb_chkall").attr('checked', true);
		}else{
			if(checked){
				checked = false;
				return true;
			}
			$(".tabelajax tr").removeClass("selected");
			$(".tabelajax input:checkbox").attr('checked', false);
			$(this).parent().addClass("selected");
			if($(this).parent().next().hasClass('tdmenu')){
				$(this).parent().next().addClass("selected");
			}else if($(this).parent().hasClass('tdmenu')){
				$(this).parent().prev().addClass("selected");
			}
			$(this).parent().children().children().attr('checked', true);
			if($(".tabelajax input:checkbox.tb_chk:checked").length == $(".tabelajax input:checkbox:not(#tb_chkall)").length) $("#tb_chkall").attr('checked', true);
		}
		return true;
	});
	$(".tabelajax tr.tdmenu td a.sub-menu").click(function(){
		var urldtl = '';
		var trnow = $(this).parent().parent();
		if($("#tb_chkall").attr('id')){
			if(checked){
				checked = false;
				return true;
			}
			if(trnow.prev().attr('urldetil')) urldtl = trnow.prev().attr('urldetil');
			var jmltd = $('td', trnow.prev()).length;
			var cls = trnow.attr('class');
			if(urldtl!=''){
				cls = cls.replace('hilite', '');
				cls = cls.replace('tdmenu', '');
				$('#newtr').remove();
				trnow.after('<tr id="newtr" class="' + cls + '"><td id="filltd" colspan="' + jmltd + '"></td></tr>');
				$('#filltd').html('Loading..');
				urldtl = $('#urldtl').val() + urldtl;
				$.get(urldtl, function(data){
					$('#filltd').html(data);
					$('#newtr').removeClass("selected");
				});
			}
		}else{
			if(trnow.prev().attr('urldetil')) urldtl = trnow.prev().attr('urldetil');
			var jmltd = $('td', trnow.prev()).length;
			var cls = trnow.attr('class');
			if(urldtl!=''){
				cls = cls.replace('hilite', '');
				cls = cls.replace('tdmenu', '');
				$('#newtr').remove();
				trnow.after('<tr id="newtr" class="' + cls + '"><td id="filltd" colspan="' + jmltd + '"></td></tr>');
				$('#filltd').html('Loading..');
				urldtl = $('#urldtl').val() + urldtl;
				$.get(urldtl, function(data){
					$('#filltd').html(data);
					$('#newtr').removeClass("selected");
				});
			}
		}
		return false;
	});
	$("#tb_chkall").click(function(){
		$(".tabelajax").find(':checkbox').attr('checked', this.checked);
		$('#newtr').remove();
		$(".tabelajax tr td span.tb_process").html('');
		if(!this.checked){
			$(".tabelajax input:checkbox:not(#tb_chkall)").parent().parent().removeClass("selected");
			$(".tabelajax input:checkbox:not(#tb_chkall)").parent().parent().next().removeClass("selected");
		}else{
			$(".tabelajax input:checkbox:not(#tb_chkall)").parent().parent().addClass("selected");
			$(".tabelajax input:checkbox:not(#tb_chkall)").parent().parent().next().addClass("selected");
		}
	});
	$("a.page", "span.nav").click(function(){
		newhal = parseInt($(this).html());
		redirect_url(newhal);
		return false;
	});
	$("a.per", "span.nav").click(function(){
		$("#tb_view").val(parseInt($(this).html()));
		newhal = parseInt($("#tb_hal").val());
		redirect_url(newhal);
		return false;
	});
	$(".order").click(function(){ 
		if($(this).attr("orderby")){
			$("#orderby").val($(this).attr("orderby"));
			$("#sortby").val($(this).attr("sortby"));
			redirect_url($("#tb_hal").val());
			return false;
		}
	});
	$("#tb_cari").bind('keypress', function(kode){
		return bind_tb_cari(kode);
	});
});

function do_post(obj){
	var url = obj.attr('act');
	var met = obj.attr('met');
	var jml = obj.attr('jml');
	lang = $("#tblang").val();
	if(lang=="EN"){
		if(!confirm('Process Selected Record?')) return false;
	}else{
		if(!confirm('Proses Data Sekarang?')) return false;
	}
	if(met=="GET"){
		if(jml=='0')
			location.href = url;
		else
			location.href = url + '/' + $(".tb_chk:checked").val();
	}else if(met=="GETNEW"){
		if(jml=='0'){
			window.open(url, '_blank')
		}else{
			var arr = new Array();
			$.each($(".tb_chk:checked"), function(){
				arr.push($(this).val());
			});
			window.open(url + '/' + arr.join(), '_blank');
		}
	}else if(met=="GENERATENIE"){
		$.ajax({
			type: 'POST',
			url: url,
			data: $("#tb_form").serialize() + '|' + msgres,
			success: function(data){
				//alert(data); return false;
				if(data.search("msg")>=0){
					arrdata = data.split('msg#');
					arrdata = arrdata[1].split('#');
					alert(arrdata[0]);
					if(arrdata.length>1){
						if($('#useajax').val()=="TRUE" && arrdata[1]=="refresh"){
							newhal = parseInt($("#tb_hal").val());
							redirect_url(newhal, true);
						}else{
							location.href = arrdata[1];
						}
					}
				}else{
					if(lang=="EN")
						alert('Process Failed.');
					else
						alert('Proses Gagal.');
				}
			}
		});
	}else if(met=="POST"){
		$.ajax({
			type: 'POST',
			url: url,
			data: $("#tb_form").serialize(),
			success: function(data){
				//alert(data); return false;
				if(data.search("msg")>=0){
					arrdata = data.split('msg#');
					arrdata = arrdata[1].split('#');
					alert(arrdata[0]);
					if(arrdata.length>1){
						if($('#useajax').val()=="TRUE" && arrdata[1]=="refresh"){
							newhal = parseInt($("#tb_hal").val());
							redirect_url(newhal, true);
						}else{
							location.href = arrdata[1];
						}
					}
				}else{
					if(lang=="EN")
						alert('Process Failed.');
					else
						alert('Proses Gagal.');
				}
			}
		});
	}
	return false;
}

function bind_tb_cari(eve){
	if(eve.type=='keypress' || eve=="seltbcari"){
		if(eve.keyCode==13 || eve=="seltbcari"){
			if($("#tb_cari").is('select')){
				$("#tb_keycari").after('<input type="hidden" class="tb_keycariadv" id="tb_keycari' + $("#tb_keycari").val() + '-' + $(".tb_keycariadv").length + '" value="' + $("#tb_cari option:selected").val().replace('/', '') + '">');
			}else{
				$("#tb_keycari").after('<input type="hidden" class="tb_keycariadv" id="tb_keycari' + $("#tb_keycari").val() + '-' + $(".tb_keycariadv").length + '" value="' + $("#tb_cari").val().replace('/', '') + '">');
			}
			newhal = parseInt($("#tb_hal").val());
			redirect_url(newhal);
			return false;
		}
	}
}

function remove_filter(obj){
	obj.remove();
	newhal = parseInt($("#tb_hal").val());
	redirect_url(newhal);
	return false;
}

function redirect_url(newhal, rload){
	rload = typeof rload !== 'undefined' ? rload : false;
	newlocation = 'row/' + $("#tb_view").val() + '/page/' + newhal + '/order/' + $("#orderby").val() + '/' + $("#sortby").val();
	if($(".tb_keycariadv").length>0){
		var keysrc = '';
		var txtsrc = '';
		var arrkey = new Array();
		var arrsrc = new Array();
		var tmpspr = '';
		var carr = 0;
		$(".tb_keycariadv").each(function(){
			//alert($(this).val());
			arrkey[carr] = $(this).attr('id').replace('tb_keycari', '');
			arrsrc[$(this).attr('id').replace('tb_keycari', '')] = $(this).val();
			carr++;
		});
		arrkey.sort();
		for(skey=0;skey<arrkey.length;skey++){
			var ckey = arrkey[skey];
			var ckeytemp = ckey.split('-');
			var ckeys = parseInt(ckeytemp[0]);
			if(ckeys>=0){
				txtsrc += tmpspr + arrsrc[ckey];
				keysrc += tmpspr + ckeys;
				if(tmpspr=='') tmpspr = '|';
			}
		}
		newlocation +=  '/search/' + keysrc + '/' + txtsrc;
	}
	if($('#useajax').val()=="TRUE"){
		$("#tb_hal").val(newhal);
		newlocation = fctrim('ajax/' + newlocation);
		if(rload==true)
			window.location.hash = newlocation;
		else if(window.location.hash!=newlocation)
			window.location.hash = newlocation;
		newlocation = $("#tb_form").attr('action') + '/' + newlocation;
		$.get(newlocation, function(data){
			$('#divtabelajax').html(data);
		});
		return false;
	}else{
		newlocation = fctrim($("#tb_form").attr('action') + '/' + newlocation);
		location.href = newlocation;
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