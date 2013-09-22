<?php



class FanBridge_SignUp_Widget extends WP_Widget {

	function FanBridge_SignUp_Widget() {
		$widget_ops = array( 
			'description' => 'The FanBridge SignUp Widget'
		);
		$this->WP_Widget('FanBridge_SignUp_Widget', 'FanBridge SignUp Widget', $widget_ops);
	}

	function widget( $args, $instance ) {
		if (!is_array($instance)) {
			$instance = array();
		}
		
		fbridge_sw_form(array_merge($args, $instance));
		
	}
}




function fbridge_sw_form($args) {

?>
<h1><?= get_option(FBSG_FORM_PREFIX . FBSG_SN_FORM_TITLE) ?></h1>
	<form method="post" id="<?= FBSG_FORM_PREFIX . FBSG_PLUGIN_NAME ?>-form" action="<?= get_schema() . FBSG_SUBSCRIBE_ENDPOINT ?>">

		Email:<input type="text" id="<?= FBSG_FORM_PREFIX .  FBSG_SN_EMAIL ?>" name="<?= FBSG_FORM_PREFIX .  FBSG_SN_EMAIL ?>" value=""/>
		<br />

		<?php if (get_option(FBSG_FORM_PREFIX . FBSG_SN_FIRST_NAME . '_show') == 'on') :?>
		First Name:<input type="text" id="<?= FBSG_FORM_PREFIX .  FBSG_SN_FIRST_NAME ?>" name="<?= FBSG_FORM_PREFIX .  FBSG_SN_FIRST_NAME ?>" value=""/>
		<br />
		<?php endif; ?>

		<?php if (get_option(FBSG_FORM_PREFIX . FBSG_SN_LAST_NAME . '_show') == 'on') :?>
		Last Name:<input type="text" id="<?= FBSG_FORM_PREFIX .  FBSG_SN_LAST_NAME ?>" name="<?= FBSG_FORM_PREFIX .  FBSG_SN_LAST_NAME ?>" value=""/>
		<br />
		<?php endif; ?>

		<?php if (get_option(FBSG_FORM_PREFIX . FBSG_SN_ZIP_CODE . '_show') == 'on') :?>
		Zip Code:<input type="text" id="<?= FBSG_FORM_PREFIX .  FBSG_SN_ZIP_CODE ?>" name="<?= FBSG_FORM_PREFIX .  FBSG_SN_ZIP_CODE ?>" value=""/>
		<br />
		<?php endif; ?>


		<input type="submit" id="_submit-input" name="_submit" value="Submit"/>
		<input type="hidden" id="<?= FBSG_FORM_PREFIX . FBSG_SN_USER_ID ?>" name="<?= FBSG_FORM_PREFIX . FBSG_SN_USER_ID ?>" value="<?= get_option(FBSG_SN_USER_ID) ?>"/>
	</form>
	<div id="<?= FBSG_FORM_PREFIX . FBSG_PLUGIN_NAME ?>-result"></div>

<?
	fbridge_sw_js();
}


function fbridge_sw_js() {
?>
<!-- fanbridge widget required js -->
<script type="text/javascript">
/* <![CDATA[ */
	(function($){
		// some defaults
		var _fbridge_sw_prefix = '<?= FBSG_FORM_PREFIX ?>';
		var $fbridge_sw_form = $('#<?= FBSG_FORM_PREFIX .  FBSG_PLUGIN_NAME ?>-form');
		var $fbridge_sw_result = $('#<?= FBSG_FORM_PREFIX . FBSG_PLUGIN_NAME ?>-result');


		$fbridge_sw_form.validate({
			debug: true,
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
				var _data = {};
				$.each($fbridge_sw_form.serializeArray(), function(n, each) {
	  			 	_data[each.name.replace('<?= FBSG_FORM_PREFIX ?>', '')] = each.value;
				});

				$.ajax({
					url: '<?= get_schema() . FBSG_SUBSCRIBE_ENDPOINT ?>?response=json&userid=<?= get_option(FBSG_SN_USER_ID) ?>',
					data: _data,
					dataType:"jsonp" ,
					beforeSubmit: function() {
						$fbridge_sw_result.html('');
						$('#_submit-input').attr('disabled', true);
					},
					success: function(res, status, xobj) {
						$('#_submit-input').attr('disabled', false);
						if(res.status == 'error') {
							$.each(res.data.fields, function(key, val) {
								console.log(key + ":" + val);
								$fbridge_sw_result.html(val);
							});
						}
						else if(res.status == 'ok') {
							$fbridge_sw_result.html('Excellent! you has been subscribed to the list!');

							// just being nice
							setTimeout(function() {
								$fbridge_sw_result.html('');
								$fbridge_sw_form.each (function() { this.reset(); });
							}, 3000);
						}
					},
					error: function() {

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
<?
}

function fbridge_sw_get_countries() {

}