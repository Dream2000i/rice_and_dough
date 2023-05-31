<?
// var_dump(getSetSetting('slider/timeUpdate', 12));

$SFile = 'settings/' . $server_conf['settings_file'];

function getSettingsBase()
{
    global $SFile;
    return json_decode(file_get_contents($SFile), true);
}
function setSettingsBase($base)
{
    global $SFile;

    $base = json_encode($base);
    $result = file_put_contents($SFile, $base);
    if ($result === false) return false;
    return true;
}




function getSetSetting($path, $newValue = 'noNewValue')
{

    $base = getSettingsBase();


    $currentBase = $base;
    $currentLevel = &$currentBase;
    $path = explode('/', $path);

    foreach ($path as $value) {
        $currentLevel = &$currentLevel[$value];
    }

    if ($currentLevel === NULL) return false;

    if ($newValue === 'noNewValue') return $currentLevel;

    if ((gettype($currentLevel) == 'boolean') && ($newValue == 'toggle')) {
        $newValue = !$currentLevel;
    };

    if (gettype($currentLevel) != gettype($newValue)) return false;

    if (gettype($newValue) === 'array') {
        if (count($newValue, 1) !== count($currentLevel, 1)) return false;
        foreach ($currentLevel as $key => $value) {
            if (gettype($newValue[$key]) != gettype($value)) return false;
        }
    };

    $currentLevel = $newValue;


    return setSettingsBase($currentBase);
}



function sliderOnOff($value = 'toggle')
{
    return getSetSetting('slider/on', $value);
}

function setSiteOnOff($value = 'toggle')
{
    return getSetSetting('site/on', $value);
}


function getSiteOn()
{
    return getSetSetting('site/on');
}

function getBaseUrl()
{
    return getSetSetting('url_base');
}

function getMetrika()
{
    return getSetSetting('ya_metrika');

}
