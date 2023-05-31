<?php

include_once('function/goods/category.php');



function getCategory()
{
    $sqlCat = "SELECT * FROM `category`";
    $query = dbQuery($sqlCat);
    $cats = $query->fetchAll();
    return $cats;
}

function getSubCategory()
{
    $sqlSubCat = "SELECT * FROM `subcategory` WHERE id_subcategory != 0";
    $query = dbQuery($sqlSubCat);
    $subCats = $query->fetchAll();
    return $subCats;
}


function getAllGoods()
{
    $sqlGoods = "SELECT id_product as id ,`id_cat`,`id_subcategory` as subcategory,products.name,`price`,`structure`,`rating`,`img` as imageUrl ,`weight`,`availability`,`label`,category.name as c_name FROM `products` JOIN `category` USING(`id_cat`)";
    $query = dbQuery($sqlGoods);
    $goods = $query->fetchAll();


    foreach ($goods as &$good) {
        $good['price'] = applyAllDiscountPrice($good);
        $good['rating'] = (int) $good['rating'];
        $good['subcategory'] = (int) $good['subcategory'];
        $good['imageUrl'] = goodsImgLink($good['imageUrl'], $good['c_name']);
    }
    return $goods;
}


function applyAllDiscountPrice($good)
{
    $price = $good['price'];
    $discount = 0;
    $value = '%';
    // заменить на getAllDiscount
    if ($good['id_cat'] == '1') return setPriceDiscount($price);
    $hhdata = getHappyHoursData();
    if ($hhdata) {
        $discount = $hhdata['discount'];
        $value = $hhdata['value'];
    }

    return setPriceDiscount($price, $discount, $value);
}


function setPriceDiscount($price, $discount = 0, $value = '%')
{
    if (!$discount) return round($price, 0);
    switch ($value) {
        case '%':
            $price = $price - ($price / 100 * $discount);
            break;
        case 'руб.':
            $price = $price - $discount;
            break;
        case '₽':
            $price = $price - $discount;
            break;
        default:
            break;
    }
    return round($price, 0);
}


function goodsImgLink($file, $category)
{
    global $url_goods_img_default, $url_goods_img;
    $link = '';
    if ($file == 'default.jpg') {
        $link = $url_goods_img_default;
    } else {
        $link = $url_goods_img . $category . "/" . $file;
    }
    return $link;
}


function addNewProduct($params)
{
    $sql = "INSERT INTO 
	`products`(`id_product`,`id_cat`,`id_subcategory`,`name`, `price`, `structure`, `weight`,`img`) 
	VALUES (:id,:id_cat,:id_subcategory,:name,:price,:structure,:weight,:img )";
    dbQuery($sql, $params);
    return true;
}



function deleteAllGoods()
{
    $sql = "TRUNCATE TABLE `products`";
    dbQuery($sql);
    return true;
}


function incrementRatingProducts($params)
{
    $sql = "UPDATE `products` SET `rating` = `rating` + 1 WHERE id_product = ?";
    dbQuery($sql, $params);
    return true;
}
