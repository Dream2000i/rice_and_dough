<?

include_once('auth/validate_acess.php');
include_once('auth/login.php');
include_once('auth/token.php');
include_once('auth/db_function.php');

switch ($params[1]) {
    case 'token':
        authByToken();
        break;
    case 'login':
        authByLogin();
        break;
    default:
        # code...
        break;
}

// echo md5('ristesto');
