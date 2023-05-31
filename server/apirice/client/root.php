<?

include_once('client/function.php');
include_once('client/validation.php');


include_once('function/setting/setting.php');
include_once('function/goods/goods.php');
include_once('function/order/order.php');
include_once('settings/settings_method.php');
include_once('function/discount/promo_code.php');



if (!getSiteOn()) exit(sendResponseError('В данный момент сайт закрыт на текхнические работы!'));


switch ($params[1]) {
    case 'goods':
        getGoodsToClient();
        break;
    case 'setting':
        getSettingToClient();
        break;
    case 'validation':
        phoneValidation();
        break;
    case 'addOrder':
        addOrder();
        break;
    case 'promocode':
        checkPromoCode();

        // sendResponseOk(['discount' => '50%']);

        // sendResponseError('Промокод введен не верно!');

        break;
    case 'test':
        // var_dump(date("H"));
        // print_r(getHappyHoursData()) ;
        // sendResponseOk();
        sendResponseOk(getDiscountPage());
        // sendResponseError('Промокод введен не верно!');
        break;

   
    default:
        echo 'select client function';
        break;
}
