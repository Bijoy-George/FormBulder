/* 
 * Common js function and global variables
 */
$.ajaxSetup({ 
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});
var page_refresh = function () {
    window.location.reload(true);
};
var page_redirect = function ($page) {
    window.location = $page;
};
var parse_JSON = function (data) {
    try {
        var obj = JSON && JSON.parse(data) || $.parseJSON(data);
        return obj;
    } catch (e) {
        // not json
        console.log(data);
        alert("Oops, it looks like there is an issue, we are looking to fix it");
        return false;
    }

};

   
        

var hideAlertFormCommon = function ($form) {
   // $.magnificPopup.close();
};
var hideProgressModal = function () {
   // $.magnificPopup.close();
};
var alertFormCommon = function ($str, $form) {
    hideProgressModal();
    $("#alert-modal .message").html($str);
    /*$.magnificPopup.open({
        items: {
            src: '#alert-modal'
        },
        type: 'inline',
        preloader: false,
        modal: true
    });*/
};

var form_basic_reload = function (response, form, submit_btn) {

    if (response.status === "error") {
        alertFormCommon(response.message, form);
    } else if (response.status === "success") {
        alertFormCommon(response.message, form);
        $(form)[0].reset();
        window.location.reload();
    }
    submit_btn.removeAttr("disabled");
};

var form_basic_no_reload = function (response, form, submit_btn) {

    if (response.status === "error") {
        alertFormCommon(response.message, form);
    } else if (response.status === "success") {
        alertFormCommon(response.message, form);
        $(form)[0].reset();
    }
    submit_btn.removeAttr("disabled");
};

var form_basic_redirect = function (response, form, submit_btn) {

    if (response.status === "error") {
        alertFormCommon(response.message, form);
    } else if (response.status === "success") {
        alertFormCommon(response.message, form);
        $(form)[0].reset();
        var redirect_url = '';
        if (typeof response.redirect_url !== 'undefined' )
        {
            redirect_url = response.redirect_url;
        }
        else
        {
            redirect_url = $(form).find("input.callback-path").val();
        }
		
		if (typeof response.company_id !== 'undefined' )
		{
			redirect_url =	redirect_url+'/'+response.months+'/'+response.plan+'/'+response.amount+'/'+response.company_id+'/'+response.percent_off+'/'+response.off_amt+'/'+response.coup_amt+'/'+response.coupon;
		}
		
        window.location = redirect_url;
    }
    submit_btn.removeAttr("disabled");
};


    $(document).on('submit', '.form-common', function (e) {
        e.preventDefault();
		showLoader();
        var form = this;

		if($(form).hasClass('tinymce')){
			tinyMCE.triggerSave();
		}
		
		
		if($(form).hasClass('frmcoutycode')){
			var mobile=$('#mobile').val();
			if(mobile !="" && typeof mobile !== 'undefined'){
				 var countryData   = $("#mobile").intlTelInput("getSelectedCountryData");
				 var intlNumber    = $("#mobile").intlTelInput("getNumber");
				 var country_code = countryData.dialCode;
				 if(country_code == null || country_code == undefined || country_code == '')
				 {
				   country_code = '';
				 }else if(country_code != '')
				 {
				 $('#country_code').val('+'+country_code);
				 }else{
					$('#country_code').val(country_code);
				 }
			}
		}
		
        var form_id = $(form).attr('id');
        var method = $(form).attr('method');
        var action = $(form).attr('action');var action2 = action;
        var name = $(form).attr('name');
        var callback = $(form).find("input.callback");
        var error_callback = $(form).find("input.error_callback");
        console.log(error_callback);
        var arg     = $(form).find("input.arg").val();
        var datastring = $(form).serialize();
        var submit_btn = $(form).find('button[type=submit]');
        var reset_btn = $(form).find('button[type=reset]');
        var pageReset = $(form).attr('page-reset');
		var url = $("#base_url").val();
console.log('formname'+name);
        if (callback.length > 0) {
            callback = callback.val();
        } else {
            callback = false;
        }
		var page = $("#pageno").val();
		var from_create = $("#from_create").val(); 
		console.log(action);
		if (typeof page !== 'undefined' )
		{
            if (typeof pageReset !== typeof undefined && pageReset !== 'false')
            {
                page = 1;
                $("#pageno").val(page);
            }
			if(from_create == 1){
				action = url+'/'+action+'?page='+page;$("#deleteRecord #from_create").val('');
			}else{
			action = action+'?page='+page;
			}

		} 
		
		//alert("out"+action);
		
		
		
	/* 	   var page2 = $("#pageno2").val();
		if (typeof page2 !== 'undefined' )
		{
            if (typeof pageReset !== typeof undefined && pageReset !== 'false')
            {
                page2 = 1;
                $("#pageno2").val(page2);
            }
			action2 = action2+'?page2='+page2;
		 	action = action2;
		} */  
        hideAlertFormCommon(form);
        submit_btn.attr('disabled', 'disabled');
        reset_btn.attr('disabled', 'disabled');
        submit_btn.html('Please wait..');
		$( form ).find(".form-control").removeClass("red_border");
		$( form ).find(".form-control").removeClass("text-danger");
        $( form ).find("span.error").empty();


        add_to_faq =  $( form ).find("#add_to_faq").val();
        if(add_to_faq == '1'){
             var url = $("#base_url").val();
            var action = url+"/add_faq";
        }


        $.ajax({
            type: method,
            url: action,
            data: datastring,			
			dataType: "json",
            success: function (data) {
				var response = data;
				if(response.success==true)
				{
					 
					if (typeof response.html !== 'undefined' )
					{
						$('#list').html(response.html);
                        					totalcount = $("#list_count").val();
                        if (totalcount == null){ totalcount = 0; }
						$("#totalcount").html('('+totalcount+')');
					}
					if (typeof response.html2 !== 'undefined' )
					{	
						$('#list2').html(response.html2);
						load_selected_template();
						
					}
					if (typeof response.html3 !== 'undefined' )
					{	
						$('#list3').html(response.html3);
						load_selected_sms_template();
						
					}
					if (typeof response.html4 !== 'undefined' )
					{	
						$('#list4').html(response.html4);
						load_selected_push_template();
						
					}

					if (typeof response.message !== 'undefined' )
					{ 
                        $("#msg").fadeIn('fast');
                        $("#msg").addClass('alert-success').removeClass('alert-danger');
                        $("#msg").html(response.message);
                        $('#msg').delay(1000).fadeOut(2500);
                        $('#deleteRecord').modal('hide');
                        $('#activateRecord').modal('hide');

						/*$( form ).find(".message").addClass("alert");
						$( form ).find(".message").addClass("alert-success");
						$( form ).find('.message').html(response.message);

                        setTimeout(function() {
                            $( form ).find(".message").empty();
                            $( form ).find(".message").removeClass("alert-success");
                            $( form ).find(".message").removeClass("alert");
                            $('#deleteRecord').modal('hide');
                            $('#activateRecord').modal('hide');
                        }, 3000);*/
                        if (response.reset == true)
                        {
                            form.reset();
                        }if (response.reload == true)
                        {   //alert();
                            window.location.reload();
                        }if ($(form).hasClass('reload'))
                        {   //alert();
                            window.location.reload();
                        }

                        
					}
					
					if (typeof response.plan_id !== 'undefined' )
					{
						$('.plan_id').val(response.plan_id)
					}
				
                    if (response.refresh == true)
                    {
                        $('.listing').submit();
                    }
					
					
				}
				else if(response.success==false)
				{ 
					

					if (typeof response.message !== 'undefined' )
					{

                        $("#msg").fadeIn('fast');
                        $("#msg").addClass('alert-danger').removeClass('alert-success');
                        $("#msg").html(response.message);
                        $('#msg').delay(1000).fadeOut(2500); 

                        /*$( form ).find(".message").addClass("alert");
						$( form ).find(".message").addClass("alert-danger");
						$( form ).find('.message').html(response.message);
                        $( form ).find('.message').html(response.message);
                        setTimeout(function() {
                            $( form ).find(".message").empty();
                            $( form ).find(".message").removeClass("alert-danger");
                            $( form ).find(".message").removeClass("alert");
                        }, 3000);*/
					}else{
                        $("#msg").fadeIn('fast');
                        $("#msg").addClass('alert-danger').removeClass('alert-success');
                        $("#msg").html('Something went wrong.');
                        $('#msg').delay(1000).fadeOut(2500); 
                    }
                     if (response.reset != false)
                        {
                            form.reset();
                        }
                    if (response.refresh == true)
                    {
                        $('.listing').submit();
                    }
					
				}
				else
				{
					//alertFormCommon("Result Error");
				}
                submit_btn.removeAttr("disabled");
                reset_btn.removeAttr("disabled");
                submit_btn.html('Submit');
                $(form).removeAttr('page-reset');
                /* Hide pop-up after submiting form */
                if($( form ).hasClass('hide_modal')){ 
                    var modal_name = $('.modal_name').val();
                    $("#"+modal_name).modal('hide'); 
                }
				if (callback) { //show_helpdesk_listing(response, form, submit_btn);
                    if(arg == 0){
                        window[callback]();
                    }else{
                        window[callback](response, form, submit_btn);
                    }
                }
				hideLoader();		
            },
            error: function (data) {  

                $("#msg").fadeIn('fast');
                $("#msg").addClass('alert-danger').removeClass('alert-success');
                $("#msg").html('Validation Error.');
                $('#msg').delay(1000).fadeOut(2500);

                /*$( form ).find(".message").addClass("alert");
                        $( form ).find(".message").addClass("alert-danger");
                        $( form ).find('.message').html("Validation error");

                        setTimeout(function() {
                            $( form ).find(".message").empty();
                            $( form ).find(".message").removeClass("alert-danger");
                            $( form ).find(".message").removeClass("alert");
                        }, 3000);*/

				$.each(data.responseJSON.errors, function (i) {

                    $.each(data.responseJSON.errors, function (key, val) {
                       /*$("#"+form_id+" #"+key).addClass("red_border");
                       $("#"+form_id+" #"+key).addClass("text-danger");
                       $("#"+form_id+" #"+key+'_err').html(val);*/


                        $( form ).find("#"+key).addClass("red_border");
                        $( form ).find("#"+key).addClass("text-danger");
                        $( form ).find("#"+key+'_err').html(val);
                       
                    });
                });
                submit_btn.removeAttr("disabled");
                reset_btn.removeAttr("disabled");
                submit_btn.html('Submit');
                $(form).removeAttr('page-reset');

                if (error_callback) { //show_helpdesk_listing(response, form, submit_btn);
                    if(arg == 0){
                        window[error_callback]();
                    }else{
                        window[error_callback](data, form, submit_btn);
                    }
                }
				hideLoader();
            }
        });

        return false;
    });
 