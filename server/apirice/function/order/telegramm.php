<?

function genTelegrammMessage($order = [], $items = []) {
    $order = sanArray($order);


    $goods = '';

    foreach ($items as $key => $value) {
        $value = sanArray($value);
        $num = $key + 1;
        $goods .=   "\n\n$num - (aрт. $value[id]) $value[name], $value[options] - $value[count] шт.";
    };

    $message = "
    Новый заказ № $order[id]
    Имя: $order[name]
    Тел. $order[phone]
    Адрес: $order[adress]
    Оплата: $order[pay]
    Сумма заказа: $order[sum] руб. $order[promo_code]
    Количество приборов: $order[tableware]
    Комментарий: $order[comment]
    Cостав Заказа:
    $goods
    ";

    return urlencode($message);
}


function sendMessageTelegramm($message = '', $contacts = []) {
    foreach ($contacts as $contact) {
        file_get_contents("https://api.telegram.org/bot5051904837:AAEKbscXXaVk8KGv4bjU4vF_ydcYRySmOwE/sendMessage?chat_id=$contact&text=$message");
    }
}
