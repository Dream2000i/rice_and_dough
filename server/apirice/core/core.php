<?

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}
include_once('server_configuration.php');
include_once('core/url.php');
include_once('core/db.php');
include_once('core/response.php');
include_once('core/function.php');
include_once('core/protection.php');


include_once('function/discount/happy_hours.php');
include_once('function/discount/discounts_page.php');
