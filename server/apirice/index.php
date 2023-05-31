<?

include_once('core/core.php');

$url = $_GET['querysystemurl'] ?? '';


$url = sanString($url);
// обезвреживание $url;

$params = explode('/', $url);

$cnt = count($params);
if ($params[$cnt - 1] === '') {
    unset($params[$cnt - 1]);
}




switch ($params[0]) {
    case 'client':
        include_once('client/root.php');
        break;
    case 'admin':
        include_once('admin/root.php');
        break;
    case 'auth':
        include_once('auth/root.php');
        break;

    default:
        exit();
        break;
}



// echo '<pre>';
// print_r($params);
// echo '</pre>';