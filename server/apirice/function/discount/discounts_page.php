<?
function getDiscountPage()
{
    $discounts = [];
    $sqlSlider = "SELECT * FROM `discount_page`";
    $query = dbQuery($sqlSlider);
    $discounts = $query->fetchAll();
    return $discounts;
}

function setDiscount()
{

}
