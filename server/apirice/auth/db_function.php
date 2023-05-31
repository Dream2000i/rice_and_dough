<?

function getUser($params)
{
    $sql = "SELECT * FROM `users` WHERE login = :login AND pass = :pass";
    $query = dbQuery($sql,$params);
    $user = $query->fetchAll();
    return $user[0];
}


function addNewProduct($params) {
    $sql = "INSERT INTO 
	`products`(`id_product`,`id_cat`,`id_subcategory`,`name`, `price`, `structure`, `weight`,`img`) 
	VALUES (:id,:id_cat,:id_subcategory,:name,:price,:structure,:weight,:img )";
    dbQuery($sql,$params);
    return true;
}
