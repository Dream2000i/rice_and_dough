<?
function stringIncludes($string1,$string2) {
    
    if (mb_stripos($string1, $string2) !== false) {
        return true;
    }
    return false;
}

