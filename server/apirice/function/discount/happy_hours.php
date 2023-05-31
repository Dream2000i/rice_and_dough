<?
function getHappyHours()
{
    return getSetSetting('happyHours');
}

function setHappyHours()
{
    $value = file_get_contents('php://input');
    $value = json_decode($value, true);
    return getSetSetting('happyHours', $value);
}


