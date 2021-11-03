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

 function selected_check_box_pagination(response, form, submit_btn)
	{
		/*if(global_select_all_id == 1)
		{ 
		  $('.selectall1').prop('checked', true);
		  $('.selectall1').prop('checked', true);
		  $('.case').each(function() { 
						this.checked = true;  });

		  $.each(global_exclude_arr,function(i,d){
				  $('#customer_id'+d).prop('checked', false); 
				});
		}else{ 
		  $('.case').each(function() { 
						this.checked = false; 
		   });
		}*/
		
		 if(global_select_all_id == 1)
            { 
              $('.selectall1').prop('checked', true);
              $('.selectall1').prop('checked', true);
              $('.case').each(function() { 
                            this.checked = true;  });


              var arr = global_exclude_arr;
             // console.log(global_exclude_arr)
              jQuery.each(arr, function() {
                  var value = this;
                  $('input:checkbox[value="' + value + '"]').prop('checked', false);
              });

            }else{ 
              $('.case').each(function() { 
                            this.checked = false; 
               });

              console.log(global_include_arr)
              var arr1 = global_include_arr;
              
              jQuery.each(arr1, function() {
                  var value = this;
                  $('input:checkbox[value="' + value + '"]').prop('checked', true);
              });

            }	
		
	}
					/** function for loader show and hide starts **/
					
	function showLoader()
    {
		// $('.loader-container').show();
  //       $('.loader-container').preloader({
  //           zIndex: 1000,
  //           setRelative: false
  //       });
  //       $('.loader-back').show();
    }
                   
				   
	function hideLoader()
    {
		// $('.loader-container').preloader('remove');
  //       $('.loader-container').hide();
  //       $('.loader-back').hide();
    }

						/** loader function ends **/	
$(document).ready(function () {
	var cmpny = $('#cmpny_id').val();
	if($.isNumeric(cmpny)==true)
	{
		listNotifications();
		updateUnreadCount();

		setInterval(function(){ updateUnreadCount(); }, 10000);
		setInterval(function(){ listNotifications(); }, 10000);
	}




    /*
     * Just add the .form-common class on the form you want to submit
     * define the method and action
     * optionally you can define a custom callback function 
     * for response handling
     */
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
			// if(from_create == 1){
			// 	action = url+'/'+action+'?page='+page;$("#deleteRecord #from_create").val('');
			// }else{
			// action = action+'?page='+page;
			// }

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
	
	
	$(document).on('submit', '.form-upload', function (e) {
        e.preventDefault();
        var form = this;
        
        if($(form).hasClass('tinymce')){
            tinyMCE.triggerSave();
        }

        var form = this;
        var form_id = $(form).attr('id');
        var method = $(form).attr('method');
        var action = $(form).attr('action');
        var name = $(form).attr('name');
        var callback = $(form).find("input.callback");
        var arg     = $(form).find("input.arg").val();
        var datastring = new FormData(this);
        var submit_btn = $(form).find('button[type=submit]');
        var submit_btn = $(form).find('button[type=submit]');
        var enquiry_save_btn = $(form).find('button[type=button]#save_profile_enquiry');
        var reset_btn = $(form).find('button[type=reset]');
        var page_reset = $(form).attr('page-reset');
        console.log('formname'+name);

        if (callback.length > 0) {
            callback = callback.val();
        } else {
            callback = false;
        }

        var page = $("#pageno").val();
        if (typeof page !== 'undefined' )
        {
            if (typeof pageReset !== typeof undefined && pageReset !== 'false')
            {
                page = 1;
                $("#pageno").val(page);
            }
            action = action+'?page='+page;
        } 

        hideAlertFormCommon(form);
        submit_btn.attr('disabled', 'disabled');
        reset_btn.attr('disabled', 'disabled');
        submit_btn.html('Please wait..');
        if (enquiry_save_btn.length)
        {
            enquiry_save_btn.attr('disabled', 'disabled');
            enquiry_save_btn.html('Please wait..');
        }

        $( form ).find(".form-control").removeClass("red_border");
        $( form ).find(".form-control").removeClass("text-danger");
        $( form ).find("span.error").empty();

       
        $.ajax({
            type: method,
            url: action,
            data: datastring,
            cache: false,
            contentType: false,
            processData: false,
            success: function (data) {
                console.log('Success form upload');
                //var response = parse_JSON(data);
				var response = data;
                console.log(response);
                if(response.success==true)
                {
                    console.log('Success response');
                    console.log(response);
                     
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
                        console.log('Message shown');
                        $("#msg").fadeIn('fast');
                        $("#msg").addClass('alert-success').removeClass('alert-danger');
                        $("#msg").html('Saved Successfully.');
                        if (form_id == "enquiry_form")
                        {
                            $("#msg").append('<button type="button" class="close" onclick="$(\'.alert\').hide();" aria-label="Close"><span aria-hidden="true">&times;</span></button>');
                        }
                        else
                        {
                            $('#msg').delay(1000).fadeOut(2500);
                        }


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
                        $("#msg").html('Something went wrong.');
                        if (form_id == "enquiry_form")
                        {
                            $("#msg").append('<button type="button" class="close" onclick="$(\'.alert\').hide();" aria-label="Close"><span aria-hidden="true">&times;</span></button>');
                        }
                        else
                        {
                            $('#msg').delay(1000).fadeOut(2500);
                        } 

                        /*$( form ).find(".message").addClass("alert");
                        $( form ).find(".message").addClass("alert-danger");
                        $( form ).find('.message').html(response.message);
                        $( form ).find('.message').html(response.message);
                        setTimeout(function() {
                            $( form ).find(".message").empty();
                            $( form ).find(".message").removeClass("alert-danger");
                            $( form ).find(".message").removeClass("alert");
                        }, 3000);*/
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
                if (enquiry_save_btn.length)
                {
                    enquiry_save_btn.removeAttr("disabled");
                    enquiry_save_btn.html('Save');
                }
                $(form).removeAttr('page-reset');
                 if (callback) { //show_helpdesk_listing(response, form, submit_btn);
                    if(arg == 0){
                        window[callback]();
                    }else{
                        window[callback](response, form, submit_btn);
                    }
                } 
            },
            error: function (data) {  

                $("#msg").fadeIn('fast');
                $("#msg").addClass('alert-danger').removeClass('alert-success');
                $("#msg").html('Validation Error.');
                if (form_id == "enquiry_form")
                {
                    $("#msg").append('<button type="button" class="close" onclick="$(\'.alert\').hide();" aria-label="Close"><span aria-hidden="true">&times;</span></button>');
                }
                else
                {
                    $('#msg').delay(1000).fadeOut(2500);
                }

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
                if (enquiry_save_btn.length)
                {
                    enquiry_save_btn.removeAttr("disabled");
                    enquiry_save_btn.html('Save');
                }
                $(form).removeAttr('page-reset');
            }
        });

        return false;
    });
	
	$(document).on('click', '.popup-modal-dismiss', function (e) {
        //$.magnificPopup.close();
    });

    $(document).on('click', '.showImageBtn', function (e) {
        var imageUrl = $(this).data('src');
        $('#imageModal #image-container').attr('src', imageUrl);
    });

    $(document).on('click', 'button[type="reset"]', function (e) {
        var form = $(this).closest("form");
        $( form ).find(".form-control").removeClass("red_border");
        $( form ).find(".form-control").removeClass("text-danger");
        $( form ).find("span.error").empty();
    });
	
  $('body').on('click', '.first a', function(e) {
                e.preventDefault();


                var pagination = $(this).attr('href');
				var fields = pagination.split('?page=');

				var url = fields[0];
				var page = fields[1];
				$("#pageno").val(page);
				$('.listing').submit();
            });
	
	 		
	$('body').on('click', '.second .pagination a', function(e) {
                e.preventDefault();

				  var pagination = $(this).attr('href');
				var fields = pagination.split('?page=');

				var url = fields[0];
				var page = fields[1];
				$("#pageno").val(page); 
				$('.listing2').submit();
            }); 
  
	$('.listing').submit();
    //If you need to reset pageno of a listing page on an element click (for eg. find button), add a class "reset-pageno" to the element
    $('.reset-pageno').on('click', function() {
        $('.listing').attr('page-reset', 'true');
    });
	
	

	
});

	/* $(".date_time_picker").live("click", function(){
		$(this).datepicker({ 
			format: 'dd/mm/yy',
			inline: true
		});
	}); */


/* 	jQuery(window).on(function(){
		applyDatePicker();   
	});

	function applyDatePicker(){
		jQuery(".date_time_picker").datepicker({
			inline: true,
			dateFormat: 'dd-mm-YY'
		});   

	}; */

   
function ressetListForm()
{
    document.forms["form-common"].reset();
    $('.date_picker').datepicker('option', 'minDate', null);
    $('.date_picker').datepicker('option', 'maxDate', null);
}
function ressetListForm_withCountBox()
{
    document.forms["form-common"].reset();
	$('.query_status').empty();
	$('.query_status').append("<option value='0'>Select Status</option>");
}

//common function for showing popup for deletion
function deletePop(actionUrl, id = null, callback_url =false, from_create = null, delete_msg = false)
{	console.log(delete_msg);
    $("#deleteRecord form").attr('action', actionUrl);
	$("#deleteRecord #id").val(id);
    if(delete_msg){
       $("#deleteRecord #delete_msg").html(delete_msg);
    }
	if(callback_url){
        $("#deleteRecord #callback-path").val(callback_url);
    }
	if(from_create == '1')
	{
		$('#deleteRecord #from_create').val(1);
		$('#deleteRecord #pageno').val(1);
	}
	$('#deleteRecord').modal({backdrop: false, keyboard: false});
}
function activatePop(actionUrl, id = null, callback_url =false, from_create = null, delete_msg = false)
{   console.log(delete_msg);
    $("#activateRecord form").attr('action', actionUrl);
    $("#activateRecord #id").val(id);
    if(delete_msg){
       $("#activateRecord #activate_msg").html(delete_msg);
    }
    if(callback_url){
        $("#activateRecord #callback-path").val(callback_url);
    }
    if(from_create == '1')
    {
        $('#activateRecord #from_create').val(1);
        $('#activateRecord #pageno').val(1);
    }
    $('#activateRecord').modal({backdrop: false, keyboard: false});
}


function refresh()
{
    $('.listing').submit();
}

$(document).on('change', '#field_type', function() {
    var value = $(this ).val();
    if(value == 3)
    {
        $('#options').show();
    }
    else
    {
        $('#options').hide();

    }
});

function get_all_options()
  {
    var field_id = $('#field_id').val();
    var url = $("#base_url").val();
        $.ajax({
          type: "post",
          url: url+'/get_all_options',
       
          data: {
              "field_id": field_id,
              },
            
          })
          .done(function(data)
          { 
            $('#opt_div').html(data);
          })
          .fail(function(jqXHR, ajaxOptions, thrownError)
          {            
            console.log("error");
          });
        
  }


