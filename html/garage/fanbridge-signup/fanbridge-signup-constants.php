<?php


// plugin name
define('FBSG_PLUGIN_NAME', untrailingslashit(basename(dirname(__FILE__))));

// plugin version
define('FBSG_PLUGIN_VERSION', '0.1');


// plugin url
define('FBSG_PLUGIN_URL', trailingslashit(WP_PLUGIN_URL) . trailingslashit(FBSG_PLUGIN_NAME));

// plugin abs path
define('FBSG_PLUGIN_PATH', trailingslashit(WP_PLUGIN_DIR) . trailingslashit(FBSG_PLUGIN_NAME));

// users grants
define('FBSG_PLUGIN_GRANTS', 'manage_options');

define('FBSG_SITE_URL', 'www.fanbridge.com');

define('FBSG_SUBSCRIBE_ENDPOINT', '//' . FBSG_SITE_URL . '/signup/fansignup_form.php');




// settings names
define('FBSG_FORM_PREFIX', 'fbridge_');
define('FBSG_SN_EMAIL', 'email');
define('FBSG_SN_USER_ID', 'userid');
define('FBSG_SN_FORM_TITLE', 'form_title');

define('FBSG_SN_FIRST_NAME', 'firstname');
define('FBSG_SN_LAST_NAME', 'lastname');
define('FBSG_SN_ZIP_CODE', 'zip');



define('FBSG_GEOIP', 'geoip');