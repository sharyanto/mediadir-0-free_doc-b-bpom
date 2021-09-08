/* Delete Unnecessary Script! */
var showtime = true;
var unload = 0;
var theurl;
var klik = false;
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

$(document).ready(function(){
	//shownotif();
	$("#star_").click(function(){
		unload = 12;
		$("#inotif_").slideUp(500);
	});
	$(".menunya").mouseover(function(){
		$(this).addClass('mousedown');
		$(this).children('.submenunya').stop().show().animate({height:$(this).attr('t')+'px'});
	});
	$(".menunya").mouseout(function(){
		$(this).removeClass('mousedown');
		$(this).children('.submenunya').stop().animate({height:'0px'});
	});
	$('a.minibutton, input, textarea').bind({mousedown: function(){
		$(this).addClass('mousedown');
	},focus: function(){
		$(this).addClass('mousedown');
	},click: function(){
		$(this).addClass('mousedown');
	},blur: function(){
		$(this).removeClass('mousedown');
	},mouseup: function(){
		$(this).removeClass('mousedown');
	}});
	$("input, textarea, select").focus(function(){
		if($(this).attr('wajib')=="yes"){
			$(".msgtitle_").fadeOut('slow');
			$(this).removeClass('wajib');
		}
	});
	$(".tampil").click(function(){
		theurl = $(this).parent().children().val();
		window.open(theurl, '_blank');
		return false;
	});
	$(".tampilnew").click(function(){
		theurl = $(this).parent().children().val();
		theurl = theurl.replace("http://e-reg.pom.go.id","");
		theurl = site +'/download/datatrader'+theurl;
		window.open(theurl, '_blank');
		return false;
	});
	$(".hapus").click(function(){
		if(confirm('Hapus File Terpilih sekarang?')){
			theurl = $(this).parent().children().val();
			theurl = theurl.split('/');
			theurl = theurl[theurl.length-1];
			$("#freg_").attr("action", $("#freg_").attr("action") + '/delete/' + theurl);
			$("#freg_").submit();
		}
		return false;
	});
	$(".hapusnew").click(function(){
		if(confirm('Hapus File Terpilih sekarang?')){
			theurl = $(this).parent().children().val();
			theurl = theurl.split('/');
			theurl = theurl[theurl.length-1];
			var id = $(this).parent().children().attr("id");			
			//alert(theurl);return false;
			$("#freg_").attr("action", $("#freg_").attr("action") + '/deletenew/' + theurl+'~'+id);
			$("#freg_").submit();
		}
		return false;
	});
	$("#filenya").change(function(){
		if(confirm('Upload File Pendukung Anda Sekarang?')){
			$("#freg_").attr("action", $("#freg_").attr("action") + '/upload');
			$("#freg_").submit();
		}
		return false;
	});

	$("#filep5").change(function(){
		if(confirm('Upload File P5 Pabrik?')){
			$("#fregnew_").attr("action", $("#fregnew_").attr("action") + '/uploadp5');
			$("#fregnew_").submit();
		}
		return false;
	});

	$("#filenyap5").change(function(){
		if(confirm('Upload File P5 Perusahaan?')){
			$("#fregnew_").attr("action", $("#fregnew_").attr("action") + '/uploadp5perusahaan');
			$("#fregnew_").submit();
		}
		return false;
	});

	$(".filenya1").change(function(){	
		var id = this.id;		
		if(confirm('Upload File Pendukung?')){
			$("#freg_").attr("action", $("#freg_").attr("action") + '/uploadnew/'+id);
			//alert($("#freg_").attr("action") + '/uploadnew/'+id);
			$("#freg_").submit();
		}
		return false;
	});

	$("#manual").change(function(){
		if(confirm('Upload File Petunjuk Penggunaan sekarang?')){
			$("#fmanual_").attr("action", $("#fmanual_").attr("action") + '/upload');
			$("#fmanual_").submit();
		}
		return false;
	});
	$("#satuan").autocomplete($("#satuan").attr('url'), {width: 226, selectFirst: false});
	$("#satuan").result(function(event, data, formatted){
		if(data){
			$(this).val(data[1]);
			$("#detailsatuan").html(data[2]);
		}
	});
	$("#kelompok").autocomplete($("#kelompok").attr('url'), {width: 226, selectFirst: false});
	$("#kelompok").result(function(event, data, formatted){
	});
	$("#negara").autocomplete($("#negara").attr('url'), {width: 226, selectFirst: false});
	$("#negara").result(function(event, data, formatted){
		if(data){
			$(this).val(data[1]);
			$("#detailnegara").html(data[2]);
		}
	});
	$("#jenis_pangan").autocomplete(($("#jenis_pangan").attr('url') + $("#jnspgn").val()), {width: 226, selectFirst: false});
	$("#jenis_pangan").result(function(event, data, formatted){
		if(data){
			$(this).val(data[1]);
			$("#nama_jenis").val(data[2]);
		}
	});
	$("#kode_bahan").autocomplete($("#kode_bahan").attr('url'), {width: 226, selectFirst: false});
	$("#kode_bahan").result(function(event, data, formatted){
		if(data){
			//alert(data[3]);
			if(fctrim(data[1])=="Air (Water)" || fctrim(data[1])=="Garam (Salt)"){
				$("#organik, #optevent").attr("disabled", "disabled");	
			}
			$(this).val(data[2]);
			$("#nama_bahan").val(data[3]);
			$("#jenis").val(data[4]);
			$("#btp").val(data[9]);
			$("#jumlah").focus();
			$("#event1, #optevent").hide();
			$("#event2").hide();
			$("#event3").hide();
			$("#organik").attr("event", "");
			if(data[8]!=0){
				$("#optevent").show();
				$(".optgmo").attr("event", data[8]);
			}
			if(fctrim(data[5])=="1"){
				$("#tdasal").html('Asal Bahan *');
				$("#asalbahan").attr("wajib", "yes");
			}else{
				$("#tdasal").html('Asal Bahan');
				$("#asalbahan").attr("wajib", "no");
			}
			if(fctrim(data[6])=="1"){
				$("#tdnegara").html('Negara Asal (Dalam Bahasa Inggris)*');
				$("#negara").attr("wajib", "yes");
			}else{
				$("#tdnegara").html('Negara Asal (Dalam Bahasa Inggris)');
				$("#negara").attr("wajib", "no");
			}
		}
	});
	$("#nama").autocomplete($("#nama").attr('url'), {width: 226, selectFirst: false});
	$("#nama").result(function(event, data, formatted){
		if(data){
			$(this).val(data[2]);
			$("#user_id").val(data[1]);
			$("#jumlah").focus();
		}
	});
	/*$("#mdinduk").autocomplete($("#mdinduk").attr('url'), {width: 226, selectFirst: false});
	$("#mdinduk").result(function(event, data, formatted){
		if(data){
			$(this).val(data[1]);
			$("#pabrik").val(data[2]);
			$("#nama_jenis").val(data[5]);
			$("#merk").val(data[6]);
			$("#kemasan").val(data[7]);
			$("#uraian").val(data[8]);
			$("#keterangan").val(data[9]);
			var net = data[10].split('#');
			$.get($("#pabrik").attr('oriurl') + '31/' + data[2], function(hasil){ 
				hasil = hasil.replace(' ', ''); 
				if(hasil!=""){ 
					$('#jnspgn').html(hasil); 
					$("#jnspgn").val(data[3]);
				}
			});
			$.get($("#jnspgn").attr('url')  + data[3], function(hasil){ 
				hasil = hasil.replace(' ', ''); 
				if(hasil!=""){ 
					$('#katpgn').html(hasil); 
					$("#katpgn").val(data[4]);
				}
			});
		}
	});*/
	$("#lap_trader").autocomplete($("#lap_trader").attr('url'), {width: 226, selectFirst: false});
	$("#lap_trader").result(function(event, data, formatted){
		if(data){
			$(this).val(data[1]);
		}
	});
	$("#lap_pabrik").autocomplete($("#lap_pabrik").attr('url'), {width: 226, selectFirst: false});
	$("#lap_pabrik").result(function(event, data, formatted){
		if(data){
			$(this).val(data[1]);
		}
	});
	
	$("#produkid_reff").autocomplete($("#produkid_reff").attr('url'), {width: 226, selectFirst: false});
	$("#produkid_reff").result(function(event, data, formatted){
		if(data){
			/*$(this).val(data[1]);*/
			$(this).val(data[1]);
			$("#pabrik").val(data[2]);
			$("#nama_jenis").val(data[5]);
			$("#merk").val(data[6]);
			$("#kemasan").val(data[7]);
			$("#uraian").val(data[8]);
			$("#keterangan").val(data[9]);
			var net = data[10].split('#');
			var	arrnet0 = net[0].split(' ');	
						
			$.get($("#pabrik").attr('oriurl') + '31/' + data[4] +'/'+ data[2], function(hasil){ 
				hasil = hasil.replace(' ', ''); 
				if(hasil!=""){ 
					$('#jnspgn').html(hasil); 
					$("#jnspgn").val(data[3]);
				}
			});
			
			$.get($("#jnspgn").attr('url')  + data[3], function(hasil){ 
				hasil = hasil.replace(' ', ''); 
				if(hasil!=""){ 
					$('#katpgn').html(hasil); 
					$("#katpgn").val(data[4]);
				}
			});
		}
	});
});

function ShowDP(obj_date){
	$('#'+obj_date).DatePicker({
		date: $('#'+obj_date).val(),
		current: $('#'+obj_date).val(),
		starts: 1,
		position: 'bottom',
		onBeforeShow: function(){
			var n = $('#'+obj_date).val();
			var now = new Date();
			if(n==""){
				$('#'+obj_date).DatePickerSetDate(now, true);	
			}else{
				$('#'+obj_date).DatePickerSetDate($('#'+obj_date).val(), true);
			}
		},
		onChange: function(formated, dates){
			$('#'+obj_date).val(formated);
		}
	});
}

function save_post(formid){
	$(".msgtitle_").hide();
	$(".msgtitle_").css('color', 'blue');
	$(".msgtitle_").html('Verifikasi Data..');
	$(".msgtitle_").fadeIn('slow');
	var notvalid = 0;
	if(klik) return false;
	$.each($("input:visible, select:visible, textarea:visible"), function(){
		if($(this).attr('wajib')){
			if($(this).attr('wajib')=="yes" && ($(this).val()=="" || $(this).val()==null)){
				$(this).addClass('wajib');
				notvalid++;
			}
		}
	});
	if(notvalid==0 && (formid=='#fpassword_' || formid=='#fnewuser_' || formid=='#fnewpendaftar_')){
		if($('#konfirmasi').val()!=$('#pwd').val()){
			$('#konfirmasi').addClass('wajib');
			notvalid = -1;
		}
	}
	if(notvalid==-1){
		$(".msgtitle_").css('color', 'red');
		$(".msgtitle_").html('Konfirmasi Password Harus Sama');
		$(".msgtitle_").fadeIn('slow');
		return false;
	}else if(notvalid>0){
		$(".msgtitle_").css('color', 'red');
		$(".msgtitle_").html('Ada ' + notvalid + ' Kolom Yang Harus Diisi');
		$(".msgtitle_").fadeIn('slow');
		return false;
	}
	klik = true;
	$.ajax({
		type: 'POST',
		url: $(formid).attr('action') + '/ajax',
		data: $(formid).serialize(),
		success: function(data){
			//alert(data);return false;
			if(data.search("MSG")>=0){
				arrdata = data.split('#');
				if(arrdata[1]=="OK"){
					$(".msgtitle_").css('color', 'green');
					$(".msgtitle_").html(arrdata[2]);
				}else{
					$(".msgtitle_").css('color', 'red');
					$(".msgtitle_").html(arrdata[2]);
				}
				if(arrdata.length>3){
					if(data.search("ALERT")>=0){
						alert(arrdata[5]);
					}
					setTimeout(function(){location.href = arrdata[3];}, 2000);
					return false;
				}
			}else{
				$(".msgtitle_").css('color', 'red');
				$(".msgtitle_").html('Proses Gagal.');
			}
			klik = false;
		}
	});
	return false;
}

function show_detail(id, url){
	$(id).html('&nbsp;Loading..');
	if(id=='#tampillog'){

		$(id).load(url);
		$("#jumsla").show();
	}else{
	$(id).load(url);
	}
	return false;
}

function show_input(status, allowed, url){
	$("#load").html('&nbsp;Loading..');
	var boleh = allowed.search(status);
	$(".newtrproses").remove();
	if(boleh>=0 && status!=""){
		$.get(url + status, function(hasil){
			if(hasil!=''){
				$("#trproses").after(hasil);
				$("#actproses").val(status);
				$("#load").html('');
				if($("#jml").val()>0 || $("#induk").val()=="NO"){
					if($("#jml").val()>0){
						alert("Data yang Diupload Belum Lengkap");
					}else{
						alert("Pengajuan Induk Belum Terbit");
					}
					$("#trcatatan").hide();
					$("#pros").hide();
				}else{
					$("#trcatatan").show();
					$("#pros").show();
				}
			}
		});
	}else{
		if(boleh=="0"){
			$(".btp0").hide();
			$(".judulbtp").hide();
			$("#trcatatan").hide();
			$("#pros").hide();
			$("#load").html('');
		}else{
			$("#load").html('');
			$("#actproses").val("");
			$(".newtrproses").remove();
			if($("#jml").val()>0 || $("#induk").val()=="NO"){
				if($("#jml").val()>0){
						alert("Data yang Diupload Belum Lengkap");
					}else{
						alert("Pengajuan Induk Belum Terbit");
					}
				$("#trcatatan").hide();
				$("#pros").hide();
			}else{
				$("#trcatatan").show();
				$("#pros").show();
			}
		}
	}
	return false;
}

function seldeputi(deputi){
	$('#hasilcb').load($('#deputiaju').attr('url') + deputi);
	return false;
}

function selstat(stat){
	$("#31").hide();
	$("#32").hide();
	$("#33").hide();
	$("#34").hide();
	$("#menu").hide();
	$("#" + stat).show();
	$("#menu").show();
}

function selstatus(id){
	var status = $("#" + id).val();
	$(".trprodusenpabrik").hide();
	$(".trmdanak").hide();
	$(".trnotif").hide();
	$("#tdprodusen").html('Produsen *');
	$("#tdnmprodusen").html('Nama Produsen *');
	$("#tdalmprodusen").html('Alamat Produsen *');
	if(status=='301' || status=='306' || status=='307' || status =='309'){
		if(status=='307'){
			$(".trmdanak").show();
		}
		if(status=='309'){
			$(".trnotif").show();
		}
		$("#tdprodusen").html('Pabrik *');
		$("#stusaha").val('31');
		setnextcb($("#stusaha"), 'usaha');
		$(".trprodusen").show();
		$("#trkontrak").hide();
		$(".trpabrik").hide();
		$("#usaha").val('31');
	}else if(status=='302'){
	
		$("#stusaha").val('33');
		$("#usaha").val('33');
		setnextcb($("#stusaha"), 'usaha');
		$(".trprodusen").show();
		$("#trkontrak").show();
		if($("#kontrak").attr('checked')){
			$(".trprodusenpabrik").show();
			$("#tdprodusen").html('Pemberi Kontrak *');
		}
		$('.trpabrik').hide();
	}else if(status=='303'){
		$("#stusaha").val('31');
		$("#usaha").val('31');
		$(".trprodusen").show();
		$("#trkontrak").hide();
		setnextcb($("#stusaha"), 'usaha');
		$("#tdnmprodusen").html('Nama Pemberi Lisensi *');
		$("#tdalmprodusen").html('Alamat Pemberi Lisensi *');
		$(".trpabrik input, textarea").val('');
		$(".trpabrik").show();
	}else if(status=='304' || status=='308'){
		if(status=='308'){
			$(".trnotif").show();
		}
		$("#stusaha").val('31');
		$("#usaha").val('31');
		setnextcb($("#stusaha"), 'usaha');
		$("#tdprodusen").html('Pemberi Kontrak *');
		$(".trprodusen").show();
		$("#trkontrak").hide();
		$(".trpabrik").hide();
		$(".trprodusenpabrik").show();
	}else if(status=='305'){
		$("#stusaha").val('31');
		$("#usaha").val('31');
		$("#tdprodusen").html('Pengemas Kembali *');
		setnextcb($("#stusaha"), 'usaha');
		$(".trprodusen").show();
		$("#trkontrak").hide();
		$(".trpabrik input, textarea").val('');
		$(".trpabrik").show();
	}
}

function set_post(obj, frm, url){
	$.ajax({
		type: 'POST',
		url: url,
		data: frm.serialize(),
		success: function(data){
			if(data!="") obj.val($.trim(data));
		}
	});
	return false;
}

function batal(){
	location.href = self.location;
	return false;
};

function kembali(url){
	location.href = url;
}

function setnextcb(obj, attr){
	var next = obj.parent().parent().next().children().children().last();
	if(obj.attr('id')=='pabrik'){
		var next = $('#jnspgn');
		$("#produsen").html(obj.html());
		$("#produsen").attr("usaha", $("#pabrik").attr("usaha"));
	}else if(obj.attr('id')=='produsen'){
		var next = $('#jnspgn');
	}else{
		var next = obj.parent().parent().next().children().children().last();
	}
	if(attr!=null) next.attr(attr, obj.val());
	$.get(obj.attr('url') + obj.val(), function(hasil){
		next.html(hasil);
	});
}

function showfile(obj){
	var theurl = obj.parent().children().val();
	var arrurl = theurl.split('/');
	if(arrurl[8]=='1') url = site + '/download/data/' + arrurl[5] + '/' + arrurl[7] + '/' + arrurl[8];
	else url = site + '/download/data/' + arrurl[8] + '/' + arrurl[10];
	window.open(url, '_blank');
	return false;
};

function setpabrik(obj){
	$(obj).autocomplete(obj.attr('url'), {width: 226, selectFirst: false});
	$(obj).result(function(event, data, formatted){
		if(data){
			$(this).val(data[1]);
			var alamat = obj.parent().parent().next().children().children().last();
			alamat.text(data[2]);
			var prop = alamat.parent().parent().next().children().children().last();
			prop.val(data[3]);
			if(prop.attr('name').search('PROVINSI')>=0){
				var kota = prop.parent().parent().next().children().children().last();
				$.get(prop.attr('url') + prop.val(), function(hasil){
					kota.html(hasil);
					kota.val(data[4]);
				});
			}
		}
	});
}

function setbtp(obj){
	$(obj).autocomplete(obj.attr('url'), {width: 226, selectFirst: false});
	$(obj).result(function(event, data, formatted){
		if(data){
			$(this).val(data[1]);
			var golongan = obj.parent().parent().next().children().children();
			golongan.val(data[2]+'-'+data[3]);
		}
	});
}


function shownotif(){
	if(unload==0){
		unload = 12;
		$.get($('#inotif_').attr('url'), function(hasil){
			var jum = hasil.length;
			if(jum>3){
				$('#inotif_ div.msg').html(hasil);
				$("#inotif_").slideDown(1500);
				$('#inotif_ div.msg span').css({opacity: 0.0});
				$('#inotif_ div.msg span:first').addClass('show');
				$('#inotif_ div.msg span:first').css({opacity: 1.0});
				if(showtime){
					setInterval('gallery()', 5000);
					showtime = false;
				}
			}else{
				$("#inotif_").slideUp(500);
			}
		});
	}
	unload--;
	setTimeout('shownotif()', 5000);
}

function gallery(){
	var current = ($('#inotif_ div.msg span.show')?  $('#inotif_ div.msg span.show') : $('#inotif_ div.msg span:first'));
	var next = ((current.next().length)?current.next():$('#inotif_ div.msg span:first'));	
	next.css({opacity: 0.0}).addClass('show').animate({opacity: 1.0}, 1500);
	current.animate({opacity: 0.0}, 700).removeClass('show');
}

function freport(objform){
	$.ajax({
	   type: "POST",
	   url: $(objform).attr('action'),
	   data: $(objform).serialize(),
	   success: function(){
		   $(objform).submit();
	   }
	});
}