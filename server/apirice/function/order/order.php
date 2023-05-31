<?

function saveOrder($data)
{
    $sqlOrder = "INSERT orders (name,phone,delivery,adress,sum,pay,comment,promo_code,tableware) VALUES (:name,:phone,:delivery,:adress,:sum,:pay,:comment,:promo_code,:tableware)";
    $idOrder = dbQueryId($sqlOrder, $data);
    return $idOrder;
}


function saveGoodsToOrder($data)
{
    $sqlOrder = "INSERT goods_order (id_orders,id_product,count,options) VALUES (:id_orders,:id,:count,:options)";
    $id = dbQueryId($sqlOrder, $data);
}
