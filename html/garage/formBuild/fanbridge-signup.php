<?php

//  ______          ____       _     _            
// |  ____|        |  _ \     (_)   | |           
// | |__ __ _ _ __ | |_) |_ __ _  __| | __ _  ___ 
// |  __/ _` | '_ \|  _ <| '__| |/ _` |/ _` |/ _ \
// | | | (_| | | | | |_) | |  | | (_| | (_| |  __/
// |_|  \__,_|_| |_|____/|_|  |_|\__,_|\__, |\___|
//                                      __/ |     
//                                     |___/      

/**
 * set the parameters of our plugin to the system
 * 
 * @return void
 */
class FanBridge_SignUp_Widget extends WP_Widget {

	function FanBridge_SignUp_Widget() {
		$widget_ops = array( 
			'description' => 'Adds a FanBridge signup form to your blog'
		);
		$this->WP_Widget('FanBridge_SignUp_Widget', 'FanBridge signup Widget', $widget_ops);
	}

	function widget( $args, $instance) {
		if (!is_array($instance)) {
			$instance = array();
		}
		
		fbridge_sw_form(array_merge($args, $instance));
		
	}
}


/**
 * displays the form based on the parameters sent to
 * FanBridge_SignUp_Widget
 *
 * @return string
 */
function fbridge_sw_form($args) {

	if (!(get_option(FBSG_FORM_PREFIX . FBSG_SN_USER_ID) > 0)) {
		// if we dont have the user id there isn't much to show
		return '';
	}
?>

	<form method="post" id="FbridgeSGWidget" action="<?= get_schema() . FBSG_SUBSCRIBE_ENDPOINT ?>">
		<h2><?= get_option(FBSG_FORM_PREFIX . FBSG_SN_FORM_TITLE) ?></h2>
		<fieldset>
			<label>Email Address:</label>
			<input type="text" class="textInput" id="<?= FBSG_FORM_PREFIX .  FBSG_SN_EMAIL ?>" name="<?= FBSG_FORM_PREFIX .  FBSG_SN_EMAIL ?>" value=""/>

			<?php if (get_option(FBSG_FORM_PREFIX . FBSG_SN_FIRST_NAME . '_show') == 'on') :?>
			<label>First Name:</label>
			<input type="text" class="textInput" id="<?= FBSG_FORM_PREFIX .  FBSG_SN_FIRST_NAME ?>" name="<?= FBSG_FORM_PREFIX .  FBSG_SN_FIRST_NAME ?>" value=""/>
			<?php endif; ?>

			<?php if (get_option(FBSG_FORM_PREFIX . FBSG_SN_LAST_NAME . '_show') == 'on') :?>
			<label>Last Name:</label>
			<input type="text" class="textInput" id="<?= FBSG_FORM_PREFIX .  FBSG_SN_LAST_NAME ?>" name="<?= FBSG_FORM_PREFIX .  FBSG_SN_LAST_NAME ?>" value=""/>
			<?php endif; ?>

			<?php if (get_option(FBSG_FORM_PREFIX . FBSG_SN_ZIP_CODE . '_show') == 'on') :?>
			<label>Zip/Postal Code:</label>
			<input type="text" class="textInput" id="<?= FBSG_FORM_PREFIX .  FBSG_SN_ZIP_CODE ?>" name="<?= FBSG_FORM_PREFIX .  FBSG_SN_ZIP_CODE ?>" value=""/>
			<?php endif; ?>

		</fieldset>
		<div id="errorField">
		</div>
		<input type="submit" id="_submit-input" name="_submit" class="button" value="Join Mailing List" />
		<div id="attribution">
			<a href="http://<?= FBSG_SITE_URL ?>/?src=fb_wordpress_signup_form&utm_source=wordpress&utm_medium=signup_form&utm_campaign=plugin&src=fb_wordpress_signup_form" target="_blank">Powered by FanBridge</a>
		</div>
		<input type="hidden" id="<?= FBSG_FORM_PREFIX . FBSG_SN_USER_ID ?>" name="<?= FBSG_FORM_PREFIX . FBSG_SN_USER_ID ?>" value="<?= get_option(FBSG_FORM_PREFIX . FBSG_SN_USER_ID) ?>"/>
	</form>


<?php
	fbridge_sw_js();
}


/**
 * displays the required js to make the widget working
 *
 * @return string
 */
function fbridge_sw_js() {
?>
<!-- fanbridge widget required js -->
<script type="text/javascript">
/* <![CDATA[ */
	(function($){
		// some defaults
		var _fbridge_sw_prefix = '<?= FBSG_FORM_PREFIX ?>';
		var $fbridge_sw_form = $('#FbridgeSGWidget');
		var $fbridge_sw_result = $('#errorField');


		$fbridge_sw_form.validate({
			onfocusout: false,
			onkeyup: false,
			errorClass: 'invalid',
			showErrors: function(errorMap, errorList) {
           		console.log(errorList);
           		$.each(errorList, function(key, val) {
					$(val.element).addClass('invalid');
				});
           		$fbridge_sw_result.html('Invalid entries. Please correct the highlighted fields.');
	        },
			unhighlight: function(element, errorClass) {
				$(element).removeClass('invalid');
     			$fbridge_sw_result.html('');
     		},
			rules: {
				<?= FBSG_FORM_PREFIX .  FBSG_SN_EMAIL ?>: {
       				required: true,
       				email: true
     			}
       			<?php if (get_option(FBSG_FORM_PREFIX . FBSG_SN_FIRST_NAME . '_required') == 'on') :?>
				,<?= FBSG_FORM_PREFIX .  FBSG_SN_FIRST_NAME ?>: {
       				required: true
     			}
       			<?php endif; ?>     			
       			<?php if (get_option(FBSG_FORM_PREFIX . FBSG_SN_LAST_NAME . '_required') == 'on') :?>
				,<?= FBSG_FORM_PREFIX .  FBSG_SN_LAST_NAME ?>: {
       				required: true
     			}
       			<?php endif; ?>     
       			<?php if (get_option(FBSG_FORM_PREFIX . FBSG_SN_ZIP_CODE . '_required') == 'on') :?>
				,<?= FBSG_FORM_PREFIX .  FBSG_SN_ZIP_CODE ?>: {
       				required: true
     			}
       			<?php endif; ?>     
			},
			submitHandler: function() {

				$("#FbridgeSGWidget .textInput").removeClass('invalid');
				$fbridge_sw_result.html('');

				// remove the namespace
				var _data = {};
				$.each($fbridge_sw_form.serializeArray(), function(n, each) {
	  			 	_data[each.name.replace('<?= FBSG_FORM_PREFIX ?>', '')] = each.value;
				});

				$.ajax({
					url: '<?= get_schema() . FBSG_SUBSCRIBE_ENDPOINT ?>?response=json&userid=<?= get_option(FBSG_FORM_PREFIX . FBSG_SN_USER_ID) ?>',
					data: _data,
					dataType:"jsonp" ,
					beforeSubmit: function() {
						$fbridge_sw_result.html('');
						$('#_submit-input').attr('disabled', true);
					},
					success: function(res, status, xobj) {
						if(res.status == 'error') {
							$('#_submit-input').attr('disabled', false);
							$.each(res.data.fields, function(key, val) {
								$fbridge_sw_result.html('');
								$('#' + _fbridge_sw_prefix + key).addClass('invalid');
								$fbridge_sw_result.html($fbridge_sw_result.html() + ' ' + val);
							});
						}
						else if(res.status == 'ok') {
							// just being nice
							$('#_submit-input').val('Subscribed!');
							setTimeout(function() {
								$('#_submit-input').val('Join Mailing List');
								$fbridge_sw_form.each (function() { this.reset(); });
							}, 3000);
						}
					},
					error: function() {
							$fbridge_sw_result.html('Oops! An unexpected error ocurred. Please try again.');
					}
				});
			}
		});

		<?php if (get_option(FBSG_FORM_PREFIX . FBSG_GEOIP) == 'on' && get_option(FBSG_FORM_PREFIX . FBSG_SN_ZIP_CODE . '_show') == 'on') :?>
		$.ajax({
			url: '//geo-ip.herokuapp.com/location.json',
			dataType:"jsonp" ,
			success: function(data) {
					$('#<?= FBSG_FORM_PREFIX .  FBSG_SN_ZIP_CODE ?>').val(data.postal_code);
			}
		});
		<?php endif; ?>     

	})(jQuery);
/* ]]> */
</script>
<!-- // fanbridge widget required js -->
<?php

}


/**
 * prints the css which makes the form grab inherit styles from the blog theme
 *
 * @return string
 */
function fbridge_sw_inherit_css() {
?>

/* inherit */
/* IE Fixes */

.ie .textInput {
	line-height: 35px;
}


/* Resets */

#FbridgeSGWidget fieldset,
#FbridgeSGWidget h2,
#FbridgeSGWidget,
#FbridgeSGWidget .textInput,
#FbridgeSGWidget .button {
	width: 100% !important;
}

#FbridgeSGWidget * {
	text-transform: none !important;
	background-image: none !important;
	text-indent: 0 !important;
	word-wrap: normal !important;
}

#FbridgeSGWidget fieldset {
	box-sizing: border-box;
	-moz-box-sizing: border-box; // for Mozilla
	-webkit-box-sizing: border-box; // for WebKit
	-ms-box-sizing: border-box; // for IE8
	background-color: inherit;
	width: 100% !important;
	border: 0px !important;
	padding: 0px !important;
	margin: 0px !important;
	font-size: inherit !important;
	-webkit-margin-start: 0;
	-webkit-padding-start: 0;
	-webkit-margin-end: 0;
	-webkit-padding-end: 0;
	-webkit-padding-before: 0;
	-webkit-padding-after: 0;
	-webkit-margin: 0px;
	-webkit-padding: 0px;
}

#FbridgeSGWidget .textInput:focus,
#FbridgeSGWidget .emailInput:focus,
#FbridgeSGWidget input[type=submit]:focus {
	outline: none !important;
}

#FbridgeSGWidget input[type=submit],
#FbridgeSGWidget input[type=text] {
	-webkit-appearance: none !important;
}

#FbridgeSGWidget input::-moz-focus-inner /*Remove button padding in FF*/
{ 
    border: 0 !important;
    padding: 0 !important;
}

/* Styling */


#FbridgeSGWidget {
	box-sizing: border-box;
	-moz-box-sizing: border-box; // for Mozilla
	-webkit-box-sizing: border-box; // for WebKit
	-ms-box-sizing: border-box; // for IE8
	font-size: 1em !important;
	background-color: inherit !important;
	color: inherit !important;
	width: 100% !important;
	-moz-border-radius: 3px !important;
	-webkit-border-radius: 3px !important;
	border-radius: 5px !important;
	margin: 0px 0px 15px 0px !important;
}

#FbridgeSGWidget .textInput,
#FbridgeSGWidget .button {
	-moz-border-radius: 3px !important;
	-webkit-border-radius: 3px !important;
	border-radius: 3px !important;
}

#FbridgeSGWidget .textInput {
	border: 1px solid inherit !important;
}

#FbridgeSGWidget label {
	border: 0px !important;
	padding: 0px !important;
	margin-bottom: 5px !important;
}

#FbridgeSGWidget h2 {
	font-size: 1.8em !important;
	border: 0px !important;
	margin: 0px 0px 13px 0px !important;
	padding: 0px !important;
	line-height: 1.2em !important;
	text-align: left !important;
}

#FbridgeSGWidget #errorField,
#FbridgeSGWidget #attribution {
	font-size: .9em !important;
}

#FbridgeSGWidget #errorField {
	color: #d42932 !important;
	margin-bottom: 12px !important;
}

#FbridgeSGWidget #errorField p {
	margin: 0px !important;
	padding: 0px !important;
	border: 0px !important;
}

#FbridgeSGWidget .invalid {
	border: 1% solid #d42932 !important;
	box-shadow: inset 0px 0px 0px 2px #d42932 !important;
}


#FbridgeSGWidget #attribution {
	margin-bottom: -15px !important;
}


#FbridgeSGWidget label,
#FbridgeSGWidget input{
	display: block !important;
}

#FbridgeSGWidget a {
	display: block !important;
	margin: 10px 0px 10px 0px !important;
}

#FbridgeSGWidget a:hover {
	display: block !important;
	text-decoration: underline !important;
}


#FbridgeSGWidget input[type=text] {
	box-sizing: border-box;
	-moz-box-sizing: border-box; // for Mozilla
	-webkit-box-sizing: border-box; // for WebKit
	-ms-box-sizing: border-box; // for IE8
	font-size: inherit;
	padding: 0px 8px 0px 8px !important;
	margin-bottom: 13px !important;
	width: 100% !important;
	height: 35px !important;
	vertical-align: bottom !important;
	font-family: inherit !important;
	font-size: inherit !important;
	color: inherit !important;
}

#FbridgeSGWidget .button{
	vertical-align: baseline !important;
	color: white !important;
	width: 100% !important;
	font-family: inherit;
	font-weight: bold !important;
	background-color: #000 !important;
	background-image: none !important;
	height: auto !important;
	border: none !important;
	padding: 12px 0px 14px 0px !important;
	cursor: pointer !important;
	filter: alpha(opacity=30);
	-moz-opacity:0.30;
	opacity: .30;	
	transition: opacity .2s;
	-moz-transition: opacity .2s; /* Firefox 4 */
	-webkit-transition: opacity .2s; /* Safari and Chrome */
	-o-transition: opacity .2s; /* Opera */

}

#FbridgeSGWidget .button:focus,
#FbridgeSGWidget .button:hover {
	filter: alpha(opacity=40);
	-moz-opacity:0.40;
	opacity: .40;	
}

<?php
}


/**
 * prints the css which makes the form to use the color schema chosen by the
 * user
 *
 * @param $highlight_color string; the custom color chosen by the user
 * @return string
 */
function fbridge_sw_custom_css($highlight_color) {
	?>
/*  custom */
/* IE Fixes */

.ie .textInput {
	line-height: 35px;
}


/* Resets */

#FbridgeSGWidget * {
	text-transform: none !important;
	background-image: none !important;
	text-indent: 0 !important;
	word-wrap: normal !important;
	letter-spacing: normal !important;
	word-break: normal !important;
	box-shadow: none !important;
	text-align: left !important;
}



#FbridgeSGWidget fieldset {
	box-sizing: border-box;
	-moz-box-sizing: border-box; // for Mozilla
	-webkit-box-sizing: border-box; // for WebKit
	-ms-box-sizing: border-box; // for IE8
	padding: 0px;
	margin: 0px;
	-webkit-margin-start: 0;
	-webkit-padding-start: 0;
	-webkit-margin-end: 0;
	-webkit-padding-end: 0;
	-webkit-padding-before: 0;
	-webkit-padding-after: 0;
	-webkit-margin: 0px;
	-webkit-padding: 0px;
	border: 0px !important;
	background-color: #fff !important;
}

#FbridgeSGWidget .textInput:focus,
#FbridgeSGWidget .emailInput:focus,
#FbridgeSGWidget input[type=submit]:focus {
	outline: none;
}

#FbridgeSGWidget input[type=submit],
#FbridgeSGWidget input[type=text] {
	-webkit-appearance: none;
}

#FbridgeSGWidget input::-moz-focus-inner /*Remove button padding in FF*/
{ 
    border: 0;
    padding: 0;
}

/* Styling */

#FbridgeSGWidget {
	box-sizing: border-box;
	-moz-box-sizing: border-box; // for Mozilla
	-webkit-box-sizing: border-box; // for WebKit
	-ms-box-sizing: border-box; // for IE8
	font-size: 14px !important;
	line-height: 15px !important;
	background-color: white !important;
	color: #333333 !important;
	padding: 15px !important;
	-moz-border-radius: 3px !important;
	-webkit-border-radius: 3px !important;
	border-radius: 5px !important;
	margin: 0px 0px 15px 0px !important;
}

#FbridgeSGWidget .textInput,
#FbridgeSGWidget .button {
	-moz-border-radius: 3px !important;
	-webkit-border-radius: 3px !important;
	border-radius: 3px !important;
}

#FbridgeSGWidget .textInput,
#FbridgeSGWidget  {
	border: 1px solid #C5C5C5 !important;
}

#FbridgeSGWidget label {
	color: #333333 !important;
	margin-bottom: 5px !important;
}

#FbridgeSGWidget h2 {
	font-family: 'georgia', 'cambria', 'sans serif' !important;
	background-color: #fff !important;
	color: <?= $highlight_color ?> !important;
	height: auto !important;
	font-weight: normal !important;
    	border: 0 !important;
	line-height: 25px !important;
	font-size: 24px !important;
	text-align: left !important;
	padding: 0px !important;
}

#FbridgeSGWidget h2,
#FbridgeSGWidget .textInput,
#FbridgeSGWidget .button {
	margin: 0px 0px 13px 0px !important;
}


#FbridgeSGWidget #errorField,
#FbridgeSGWidget #attribution {
	font-weight: bold !important;
	font-size: 12px !important;
}

#FbridgeSGWidget #errorField {
	color: #d42932 !important;
	margin-bottom: 12px !important;
}

#FbridgeSGWidget #errorField p {
	margin: 0px !important;
}

#FbridgeSGWidget .invalid {
	border: 1% solid #d42932 !important;
	box-shadow: inset 0px 0px 0px 2px #d42932 !important;
}


#FbridgeSGWidget #attribution {
	margin-bottom: -15px !important;
	color: #9E9E9E !important;
}

#FbridgeSGWidget a {
	background-color: none !important;
	padding: 0 !important;
	color: #9E9E9E !important;
	display: block !important;
	text-decoration: none !important;
	margin: 10px 0px 10px 0px !important;
	border: 0px !important;
	text-align: center !important;
}

#FbridgeSGWidget a:hover {
	background-color: none !important;
	color: #333333 !important;
}

#FbridgeSGWidget label,
#FbridgeSGWidget input{
	display: block;
}

#FbridgeSGWidget .textInput {
	box-sizing: border-box;
	-moz-box-sizing: border-box; // for Mozilla
	-webkit-box-sizing: border-box; // for WebKit
	-ms-box-sizing: border-box; // for IE8
	font-weight: normal !important;
	color: #333333 !important;
	background-color: #fff !important;
	background: none !important;
	padding: 0px 8px 0px 8px !important;
	height: 35px !important;
	vertical-align: bottom !important;
	font-family: 'Helvetica', 'Arial', 'Sans-serif' !important;

}

#FbridgeSGWidget .textInput,
#FbridgeSGWidget .button,
#FbridgeSGWidget label,
#FbridgeSGWidget a,
#FbridgeSGWidget #attribution,
#FbridgeSGWidget #errorField,
#FbridgeSGWidget .textInput,
#FbridgeSGWidget {
	font-family: 'Helvetica', 'Arial', 'Sans-serif' !important;
}

#FbridgeSGWidget fieldset,
#FbridgeSGWidget h2,
#FbridgeSGWidget,
#FbridgeSGWidget .textInput,
#FbridgeSGWidget .button {
	width: 100% !important;
}

#FbridgeSGWidget .button,
#FbridgeSGWidget label,
#FbridgeSGWidget .textInput,
#FbridgeSGWidget {
	font-size: 14px !important;
}

#FbridgeSGWidget .button,
#FbridgeSGWidget #attribution {
	text-align: center !important;
}

#FbridgeSGWidget a,
#FbridgeSGWidget #attribution,
#FbridgeSGWidget #errorField {
	background-color: none !important;
	font-size: 12px !important;

}

#FbridgeSGWidget .button{
	background-image: none !important;
	height: auto !important;
	vertical-align: baseline !important;
	color: white !important;
	font-size: 14px !important;
	font-weight: bold !important;
	background-color: <?= $highlight_color ?> !important;
	border: none !important;
	padding: 10px 0px 10px 0px !important;
	cursor: pointer !important;
	transition: opacity .2s !important;
	-moz-transition: opacity .2s; /* Firefox 4 */
	-webkit-transition: opacity .2s; /* Safari and Chrome */
	-o-transition: opacity .2s; /* Opera */

}

#FbridgeSGWidget .button:focus,
#FbridgeSGWidget .button:hover {
	filter: alpha(opacity=85);
	-moz-opacity:0.85;
	opacity: .85;	
}


<?php	
}