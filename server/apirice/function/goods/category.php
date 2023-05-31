<? 

function getCategoryIdForName($name) {
    $sqlCat = "SELECT * FROM `category` WHERE label =  '$name'";
    $query = dbQuery($sqlCat);
    $cats = $query->fetchAll();
    return $cats[0]['id_cat'];
}

function getCategoryLinkForId($id) {
    $sqlCat = "SELECT * FROM `category` WHERE id_cat =  '$id'";
    $query = dbQuery($sqlCat);
    $cats = $query->fetchAll();
    return $cats[0]['name'];
}

function getSubCategoryIdForName($name) {
    $sqlCat = "SELECT * FROM `subcategory` WHERE name =  '$name'";
    $query = dbQuery($sqlCat);
    $cats = $query->fetchAll();
    return $cats[0]['id_subcategory'];
}