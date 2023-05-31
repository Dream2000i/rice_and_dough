<?

function checkPromoCodeToSql($code)
{
    $sql = "SELECT * FROM `promo_code` WHERE `action`> 0 AND `code`= '$code'";
    $query = dbQuery($sql);
    $result = $query->fetchAll()[0];
    if (!$result) return false;
    return $result;
}

function getAllPromoCodeToSql()
{
    $sql = "SELECT *, `id_code` as `key`, `date_end` as `date` FROM `promo_code`";
    $query = dbQuery($sql);
    $result = $query->fetchAll();
    return $result;
}

function deletePromoCodeToSql($id)
{
     $sql = "DELETE FROM `promo_code` WHERE `promo_code`.`id_code` = ?";
    dbQuery($sql, $id);
    return true;
}
   


function addPromoCodeToSql($data)
{
      $sql = "INSERT promo_code (code,discount,value,action,date_end) VALUES (:code,:discount,:value,:action,:date)";
    $id = dbQueryId($sql, $data);
    return $id;
}

function decremPromoCodeSql($code)
{
    $sql = "UPDATE `promo_code` SET `action` = `action` - 1 WHERE code = ?";
    dbQuery($sql, $code);
    return true;
}


function usePromoCodeToOrder($order)
{
    $result = [];
    $code = sanString($order['promo_code']);
    if (!$code) return false;
    $discount = checkPromoCodeToSql($code);
    if (!$discount) {
        $result = [
            false, 'Введенный ранее промокод в данный момент не действует. Заказ будет собран без учета скидки, для уточнения информации,либо отмены заказа пожалуйста свяжитесь с нами по телефону 580-600!',
            $order['promo_code'] = " $order[promo_code] (НЕ ДЕЙСТВИТЕЛЕН!, пересчитать заказ, сообщить клиенту!)"
        ];
    } else {
        $result = [true, setPriceDiscount(
            $order['sum'],
            $discount['discount'],
            $discount['value']
        )];

        decremPromoCodeSql([$code]);
    }

    return $result;
}
