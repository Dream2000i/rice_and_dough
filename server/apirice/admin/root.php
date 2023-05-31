<?
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");



include_once('admin/function.php');
include_once('function/setting/setting.php');
include_once('function/goods/goods.php');
include_once('function/order/order.php');
include_once('function/synch/function.php');
include_once('function/discount/promo_code.php');
include_once('settings/settings_method.php');



include_once('auth/validate_acess.php');
include_once('auth/token.php');



validateAccessByToken();


switch ($params[1]) {
    case 'synch': {
            switch ($params[2]) {
                case 'full':
                    synchFullGoods();
                    break;

                default:
                    echo 'select function syncing';
                    break;
            }
            break;
        }
    case 'promoCode': {
            switch ($params[2]) {
                case 'getPromoCode':
                    // synchFullGoods();
                    sendResponseOk(getAllPromoCodeToSql());
                    break;
                case 'addPromoCode':
                    newPromoCode();
                    break;
                case 'deletePromoCode':
                    deletePromoCode();
                    break;
                default:
                    echo 'select function promo_code';
                    break;
            }
            break;
        }
    case 'settings': {
            switch ($params[2]) {
                case 'site':
                    // synchFullGoods();
                    break;
                case 'site':
                    // synchFullGoods();
                    break;

                default:
                    echo 'select function syncing';
                    break;
            }
            break;
        }
    case 'discount': {
        switch ($params[2]) {
            case 'gethappyhours':
                sendResponseOk(getHappyHours());
                break;
            case 'sethappyhours':
                sendResponseOk(setHappyHours());
                break;
            case 'deletePromoCode':

                break;
            default:
                echo 'select function discount';
                break;
        }
            break;
    }
    default:
        echo 'select admin function';
        sendResponseOk();

        break;
}
