<?
$server_conf = getConfig('local');

function getConfig($num)
{
    if ($num == 'local') {
        return [
            'url_api' => 'http://apirice/',
            'db' => new PDO('mysql:host=localhost;dbname=rice', 'rice', 'rice', [
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
            ]),
            'settings_file' => 'settings_test.json'
        ];
    } else if ($num == 'deploy') {
        return [
            'url_api' => 'https://api.580600.ru/',
            'db' => new PDO('mysql:host=localhost;dbname=host1842395', 'host1842395', 'k72Abccy6t', [
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
            ]),
            'settings_file' => 'settings.json'
        ];
    } else if ($num == 'test_deploy') {
        return [
            'url_api' => 'https://api.580600.ru/',
            'db' => new PDO('mysql:host=localhost;dbname=host1842395', 'host1842395', 'k72Abccy6t', [
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
            ]),
            'settings_file' => 'settings_test.json'
        ];
    }

    return [];
}
