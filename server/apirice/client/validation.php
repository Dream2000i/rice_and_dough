<?
function getValidPhone($id, $code)
{
    $id = sanString($id);
    $code = sanString($code);
    // echo $id, $code;
    // из базы
    $phone = '666';
    return $phone;
}

function phoneToValidType($phone)
{
    //  пытаемся привести к валидному типу если нет возвращаем  FALSE
    return $phone;
}

function sendCodeToPhone($code, $phone)
{
    return true;
}

function saveDataValidation($id, $code, $phone)
{
    return true;
}
