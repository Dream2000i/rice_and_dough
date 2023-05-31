<?
include_once('function/order/telegramm.php');

function getGoodsToClient()
{
    $goodsToSite = [];
    $allCategory = getCategory();
    $allGoods = getAllGoods();

    foreach ($allCategory as $cat) {
        $goodsToSite[$cat['name']] = [];
        $goodsToSite[$cat['name']]['optionsCategory'] = [];
        $goodsToSite[$cat['name']]['subCategoryVisible'] = [];
    }

    foreach ($allGoods as $good) {
        $goodsToSite[$good['c_name']]['subCategoryVisible'][] = $good['subcategory'];
        $goodsToSite[$good['c_name']]['items'][] = $good;
    }

    sendResponseOk($goodsToSite);
}

function getSettingToClient()
{
    global $url_other_img;

    $settings = [];

    $cats = getCategory();
    $subCats = getSubCategory();
    $slider = getSetSetting('slider/on') ? getSlider() : [];
    $hhours = getHappyHoursData();
    $work = getSetSetting('work');
    $metrika = getMetrika();

    $categoryNames = [];

    foreach ($cats as $cat) {
        $categoryNames[$cat['name']] = $cat['label'];
    }


    $subCategoryNames = [];

    foreach ($subCats as $subCat) {

        $subCategoryNames[$subCat['id_subcategory']] = $subCat['name'];
    }

    $settings['slider'] = $slider;
    $settings['work'] = $work;
    $settings['metrika'] = $metrika;
    $settings['categoryNames'] = $categoryNames;
    $settings['subCategoryNames'] = $subCategoryNames;
    $settings['hhours'] = $hhours;
    $settings['tableWare'] = ["img" => $url_other_img . 'tableware.jpg'];

    sendResponseOk($settings);
}

function phoneValidation()
{
    $phone = sanString(file_get_contents('php://input'));

    $phone = phoneToValidType($phone);
    if (!$phone) {
        sendResponseError('номер телефона в неверном формате!');
        exit();
    }
    $code =  mt_rand(1000, 9999);
    $id =  mt_rand(1000, 9999);

    $sendCode = sendCodeToPhone($code, $phone);
    if (!$sendCode) {
        sendResponseError('ошибка отправки кода на номер, попробуйте заново, либо используйте другой номер телефона');
        exit();
    }
    saveDataValidation($id, $code, $phone);
    sendResponseOk(['auth_id' => $id]);

    return true;
}


function checkPromoCode()
{
    $code = sanString(json_decode(file_get_contents('php://input'), true)['code']);
    $checkCode = checkPromoCodeToSql($code);
    if (!$checkCode) {
        sendResponseError('Промокод не существует, либо истек его срок действия!');
    } else {
        sendResponseOk(['discount' => $checkCode['discount'] . $checkCode['value']]);
    }
}

function addOrder()
{

    $warn = '';

    $order = file_get_contents('php://input');
    $order = json_decode($order, true);
    // $orderData = (array) $order->data;
    // $orderGoods = (array) $order->goods;   
    $orderData = $order['data'];
    $orderGoods =  $order['goods'];

    // ВАЛИДАЦИ ПО ТЕЛЕФОНУ ОТКЛЮЧЕНА
    // $orderData['phone'] = getValidPhone($order->authId, $order->authCode);
    // if (!$orderData['phone']) {
    //     sendResponseError('вы ввели неверный код авторизации');
    //     exit();
    // };

    // applyOrderPromoCode($orderData);

    $promoCodeApply = usePromoCodeToOrder($orderData);

    if ($promoCodeApply && $promoCodeApply[0]) {
        $orderData['sum'] = $promoCodeApply[1];
    } else if ($promoCodeApply && !$promoCodeApply[0]) {
        $warn = $promoCodeApply[1];
        $orderData['promo_code'] = $promoCodeApply[2];
    }



    // $promoCode = sanString($orderData['promo_code']);

    // if ($promoCode) {
    //     $discountPromoCode = checkPromoCodeToSql($promoCode);
    //     if (!$discountPromoCode) {
    //         $warn = 'Введенный ранее промокод в данный момент не действует. Заказ будет собран без учета скидки, для уточнения информации,либо отмены заказа пожалуйста свяжитесь с нами по телефону 580-600!';
    //         $orderData['promo_code'] = " $orderData[promo_code] (НЕ ДЕЙСТВИТЕЛЕН!, пересчитать заказ, сообщить клиенту!)";
    //     } else {
    //         $orderData['sum'] = setPriceDiscount(
    //             $orderData['sum'],
    //             $discountPromoCode['discount'],
    //             $discountPromoCode['value']
    //         );

    //         decremPromoCodeSql([$promoCode]);
    //     }
    // }


    $id = clientOrderToBase($orderData, $orderGoods);

    sendOrderTelegramm($orderData, $id, $orderGoods);


    sendResponseOk(['id' => $id, 'warn' => $warn]);
}


function clientOrderToBase($data, $goods)
{
    $data = sanArray($data);
    if (!$data['delivery']) !$data['delivery'] = 0;
    $id = saveOrder($data);
    foreach ($goods as $product) {
        $position =  $product;
        $position = sanArray($position);
        $position['id_orders'] = $id;
        unset($position['name']);
        saveGoodsToOrder($position);
        incrementRatingProducts([$position['id']]);
    }

    return $id;
}



function sendOrderTelegramm($data, $id, $goods)
{

    if (getSetSetting('ordersToTelegramm/on')) {

        $orderToMessage = $data;
        $orderToMessage['id'] = $id;
        $orderToMessage['adress'] = $orderToMessage['adress'] ? $orderToMessage['adress'] : 'Самовывоз';
        $orderToMessage['pay'] = $orderToMessage['pay'] ? 'Карта' : 'Наличные';

        if ($data['promo_code']) $orderToMessage['promo_code'] = "c учетом скидки по промокоду $data[promo_code]";


        $message =  genTelegrammMessage($orderToMessage, $goods);

        sendMessageTelegramm($message, getSetSetting('ordersToTelegramm/contaktList'));
    }
}
