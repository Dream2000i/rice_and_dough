<?
include_once('goods/goods.php');
include_once('goods/category.php');
include_once('synch/work_img.php');


function synchFullGoods()
{
    // 1 ПОЛУЧИТЬ ТОВАРЫ
    // 2 ПОЛУЧИТЬ НОМЕР КАТЕГОРИИ
    // 3 ПОЛУЧИТЬ НОМЕР СУБКАТЕГОРИИ
    // 4 ПРИВЕСТИ ТОВАР К ВИДУ
    // 5 ЕСЛИ ЕСТЬ ТОВАРЫ УДАЛИТЬ ИЗ ТАБЛИЦЫ
    // 6 ДОБАВИТЬ ТОВАРЫ
    $data = getGoodsIiko();
    
    deleteAllGoods();

    $goods = goodsFormatBase($data);



    echo '<pre>';
    print_r($goods);
    echo '</pre>';

    addGoodsToBase($goods);

}





function getGodsParams($goods, $cat, $cat_link, $subcat)
{
    $data = [];
    foreach ($goods as $product) {

        ini_set('max_execution_time', 900);
        // КОСТЫЛИ
        if ($cat == 2) {
            $product['name'] = str_replace('(сред)', '', $product['name']);
            $product['itemSizes'][0]['portionWeightGrams'] = '';
        }
        $product['description'] = str_replace('Состав: ', '', $product['description']);
        // КОСТЫЛИ


        $img_name = getImageProduct($product['buttonImageMain'], $cat_link);

        $params = [
            'id' => $product['sku'],
            'id_cat' => $cat,
            'id_subcategory' => $subcat,
            'name' => $product['name'],
            'price' => $product['itemSizes'][0]['price'],
            'structure' => $product['description'],
            'weight' => $product['itemSizes'][0]['portionWeightGrams'],
            'img' =>  $img_name
        ];


        $data[] = $params;

        // addNewProduct($params);


        // echo '<pre>';
        // print_r($params);
        // echo '</pre>';
    }

    return $data;
}



function getGoodsIiko($link = '')
{
    $response = file_get_contents("https://ris-i-testo.myresto.online/settings/getMenu");
    $data = json_decode($response, true);
    if (!$data) {
        exit();
    }
    return $data['itemCategories'];
}


function addGoodsToBase($goods)
{
    foreach ($goods as $product) {
        addNewProduct($product);
    }
}


function goodsFormatBase($goods)
{
    $data = [];

    foreach ($goods as $category) {

        $id_subcat = 0;
        $categoryName = $category['name'];

        //ОСОБЫЕ ПРАВИЛА ОПРЕДЕЛЕНИЯ КАТЕГОРИЙ (КОСТЫЛЬ)
        if (stringIncludes($category['name'], 'роллы')) {
            $categoryName = 'Роллы';
            $subcategory  = $category['name'];
            if ($subcategory == 'Роллы') $subcategory = 'Классические роллы';

            $id_subcat = getSubCategoryIdForName($subcategory) ?? 0;
        } else if (stringIncludes($category['name'], 'Пицца средняя')) {
            $categoryName = 'Пицца';
        } else if (stringIncludes($category['name'], 'Пицца большая')) {
            continue;
        }
        //ОСОБЫЕ ПРАВИЛА ОПРЕДЕЛЕНИЯ КАТЕГОРИЙ (КОСТЫЛЬ)
        
        $id_cat = getCategoryIdForName($categoryName);

        if (!$id_cat) {
            echo 'нет категории';
            continue;
        }

        $cat_link = getCategoryLinkForId($id_cat);

        $cats_goods = getGodsParams($category['items'], $id_cat, $cat_link, $id_subcat);

        $data = array_merge($cats_goods, $data);

    }
    return $data;

}
