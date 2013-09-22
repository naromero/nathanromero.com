<?php
/*
Plugin Name: FanBridge Signup Plugin
Plugin URI: http://www.fanbridge.com/
Description: A brief description of the Plugin.
Version: 0.1
Author: FanBridge Inc.
Author URI: http://www.fanbridge.com/
License: A "Slug" license name e.g. GPL2
*/

// constants
require_once dirname(__FILE__) . "/fanbridge-signup-constants.php";

// here goes all widget functions
require_once dirname(__FILE__) . "/fanbridge-signup-widget.php";


function fbridge_plugin_init () {
	fbridge_plugin_load_assets();
}
add_action('init', 'fbridge_plugin_init');


function fbridge_register_options_menu(){
	add_options_page('FanBridge SignUp', 'FanBridge Signup Form Setup', FBSG_PLUGIN_GRANTS, 'fbridge_plugin_settings', 'fbridge_plugin_admin_settings');  
}
add_action('admin_menu', 'fbridge_register_options_menu');



function fbridge_plugin_load_assets() {
	//	wp_enqueue_script('fanbridge-signup', FBSG_PLUGIN_URL . 'js/fanbridge-signup.js', array('jquery'), FBSG_PLUGIN_VERSION);
		wp_enqueue_script('jquery.validate', FBSG_PLUGIN_URL . 'js/jquery.validate.min.js', array('jquery'), FBSG_PLUGIN_VERSION);

}
function fbridge_plugin_action_links($links) {
	$settings_page = add_query_arg(array('page' => 'fbridge_plugin_settings'), admin_url('options-general.php'));
	$settings_link = '<a href="'.esc_url($settings_page).'">Settings</a>';
	array_unshift($links, $settings_link);
	return $links;
}
add_filter('plugin_action_links_' . plugin_basename(__FILE__), 'fbridge_plugin_action_links', 10, 1);

// plugin
function fbridge_register_widget() {
	register_widget('FanBridge_SignUp_Widget');
}
add_action('widgets_init', 'fbridge_register_widget');




function fbridge_plugin_request_handler() {

	switch ($_POST['_action']) {

		case 'save-settings':
			$errors = array();
			$user_id = filter_var($_POST[FBSG_SN_USER_ID], FILTER_SANITIZE_NUMBER_INT);

			if (!$user_id) {
				$errors[] = 'Invalid User id';
			}


			if (!count($errors)) {
				update_option(FBSG_FORM_PREFIX . FBSG_SN_USER_ID, $_POST[FBSG_SN_USER_ID]);
				update_option(FBSG_FORM_PREFIX . FBSG_SN_FIRST_NAME . '_show', $_POST[FBSG_SN_FIRST_NAME . '_show'] == 'on' ? 'on' : 'off');
				update_option(FBSG_FORM_PREFIX . FBSG_SN_FIRST_NAME . '_required', $_POST[FBSG_SN_FIRST_NAME . '_required'] == 'on' ? 'on' : 'off');
				update_option(FBSG_FORM_PREFIX . FBSG_SN_LAST_NAME . '_show', $_POST[FBSG_SN_LAST_NAME . '_show'] == 'on' ? 'on' : 'off');
				update_option(FBSG_FORM_PREFIX . FBSG_SN_LAST_NAME . '_required', $_POST[FBSG_SN_LAST_NAME . '_required'] == 'on' ? 'on' : 'off');
				update_option(FBSG_FORM_PREFIX . FBSG_SN_ZIP_CODE . '_show', $_POST[FBSG_SN_ZIP_CODE . '_show'] == 'on' ? 'on' : 'off');
				update_option(FBSG_FORM_PREFIX . FBSG_SN_ZIP_CODE . '_required', $_POST[FBSG_SN_ZIP_CODE . '_required'] == 'on' ? 'on' : 'off');


				update_option(FBSG_FORM_PREFIX . FBSG_SN_FORM_TITLE, stripslashes($_POST[FBSG_SN_FORM_TITLE]));
				update_option(FBSG_FORM_PREFIX . FBSG_GEOIP, $_POST[FBSG_GEOIP] == 'on' ? 'on' : 'off');

			}

		break;
	}

}
add_action('init', 'fbridge_plugin_request_handler');



function update_settings ($settings) {

}

function get_schema() {
	if (!isset($_SERVER['HTTPS']) || (strtolower($_SERVER['HTTPS']) != 'on'))
	{
		return 'http:';
	}
	return 'https:';
}


function fbridge_plugin_admin_settings() {
	?>
	<h1>FanBridge SignUp Form</h1>

	<form method="post" action="options-general.php?page=fbridge_plugin_settings">
		<h2>Your FanBridge User id</h2>
		<table>
			<tr>
				<td>
					User id
				</td>
				<td>
					<input name="<?= FBSG_SN_USER_ID ?>" type="text" value="<?= get_option(FBSG_SN_USER_ID); ?>"/>
				</td>
			</tr>
			<tr>
				<td>
					Form Title
				</td>
				<td>
					<input name="<?= FBSG_SN_FORM_TITLE ?>" type="text" value="<?= get_option(FBSG_FORM_PREFIX . FBSG_SN_FORM_TITLE, 'Subscribe to my list'); ?>"/>
				</td>
			</tr>
		</table>
		<p>Don't know your FanBridge user id? Don't worry, go to your <a target="_blank" href="https://<?= FBSG_SITE_URL ?>/account">FanBridge Account</a> to find out.</p>

		<h2>Choose what additional data you want to collect</h2>
		<table>
			<tr>
				<td>
					Field
				</td>
				<td>
					Display
				</td>
				<td>
					Required
				</td>
			</tr>
			<tr>
				<td>
					First Name
				</td>
				<td>
					<input onchange="javascript:if(jQuery(this).is(':checked')) { jQuery('#<?= FBSG_SN_FIRST_NAME ?>-required').attr('disabled', false); } else{ jQuery('#<?= FBSG_SN_FIRST_NAME ?>-required').attr('disabled', true); jQuery('#<?= FBSG_SN_FIRST_NAME ?>-required').attr('checked', false); }" id="<?= FBSG_SN_FIRST_NAME ?>-show" name="<?= FBSG_SN_FIRST_NAME ?>_show" type="checkbox" <?php checked(get_option(FBSG_FORM_PREFIX . FBSG_SN_FIRST_NAME . '_show'), 'on'); ?>/>
				</td>
				<td>
					<input id="<?= FBSG_SN_FIRST_NAME ?>-required" name="<?= FBSG_SN_FIRST_NAME ?>_required" type="checkbox" <?php checked(get_option(FBSG_FORM_PREFIX . FBSG_SN_FIRST_NAME . '_required'), 'on'); ?>/>
				</td>
			</tr>
			<tr>
				<td>
					Last Name
				</td>
				<td>
					<input onchange="javascript:if(jQuery(this).is(':checked')) { jQuery('#<?= FBSG_SN_LAST_NAME ?>-required').attr('disabled', false); } else{ jQuery('#<?= FBSG_SN_LAST_NAME ?>-required').attr('disabled', true); jQuery('#<?= FBSG_SN_LAST_NAME ?>-required').attr('checked', false); }"  id="<?= FBSG_SN_LAST_NAME ?>-show" name="<?= FBSG_SN_LAST_NAME ?>_show" type="checkbox" <?php checked(get_option(FBSG_FORM_PREFIX . FBSG_SN_LAST_NAME . '_show'), 'on'); ?>/>
				</td>
				<td>
					<input id="<?= FBSG_SN_LAST_NAME ?>-required" name="<?= FBSG_SN_LAST_NAME ?>_required" type="checkbox" <?php checked(get_option(FBSG_FORM_PREFIX . FBSG_SN_LAST_NAME . '_required'), 'on'); ?>/>
				</td>				
			</tr>
			<tr>
				<td>
					Zip Code
				</td>
				<td>
					<input onchange="javascript:if(jQuery(this).is(':checked')) { jQuery('#<?= FBSG_SN_ZIP_CODE ?>-required').attr('disabled', false); } else{ jQuery('#<?= FBSG_SN_ZIP_CODE ?>-required').attr('disabled', true); jQuery('#<?= FBSG_SN_ZIP_CODE ?>-required').attr('checked', false); }"  id="<?= FBSG_SN_ZIP_CODE ?>-show" name="<?= FBSG_SN_ZIP_CODE ?>_show" type="checkbox" <?php checked(get_option(FBSG_FORM_PREFIX . FBSG_SN_ZIP_CODE . '_show'), 'on'); ?>/>
				</td>
				<td>
					<input id="<?= FBSG_SN_ZIP_CODE ?>-required" name="<?= FBSG_SN_ZIP_CODE ?>_required" type="checkbox" <?php checked(get_option(FBSG_FORM_PREFIX . FBSG_SN_ZIP_CODE . '_required'), 'on'); ?>/>
				</td>				
			</tr>
		</table>
		<h2>Additional options</h2>
		<table>
			<tr>
				<td>
					Try to guess zipcode
				</td>
				<td>
					<input name="<?= FBSG_GEOIP ?>" type="checkbox" <?php checked(get_option(FBSG_FORM_PREFIX . FBSG_GEOIP), 'on'); ?>/>
				</td>
			</tr>
		</table>
		<input name="_submit" value="Save settings" type="submit"/>
		<input name="_action" value="save-settings" type="hidden"/>

	</form>
<?
}
