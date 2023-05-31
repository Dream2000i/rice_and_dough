<?
function sanString($string)
{
    $string = htmlspecialchars($string);
    return $string;
}
function sanArray($array)
{
    foreach ($array as $key => $value) {
        $array[$key] = htmlspecialchars($value);
    }
    return $array;
}
