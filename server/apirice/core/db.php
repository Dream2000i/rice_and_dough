<?php

function dbConnect()
{
    global $server_conf;
    static $db; 
    if ($db === null) {
        // $db = new PDO('mysql:host=sql301.hostronavt.ru;dbname=onavt_28489823_cafe', 'onavt_28489823', 'Pavlov1990!', [
        //     PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
        // ]);
        // $db = new PDO('mysql:host=apirice;dbname=cafe', 'root', '', [
        //     PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
        // ]);
        $db = $server_conf['db'];
        
        // $db = new PDO('mysql:host=localhost;dbname=host1842395', 'host1842395', 'k72Abccy6t', [
        //     PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
        // ]);
        $db->exec('SET NAMES UTF8');
    }
    
    return $db;
}


function dbQuery(string $sql, array $params = [])
{
    $db = dbConnect();
    $query = $db->prepare($sql);
    $query->execute($params);
    dbCheckError($query);
    return $query;
}

function dbQueryId(string $sql, array $params = [])
{
    $db = dbConnect();
    $query = $db->prepare($sql);
    $query->execute($params);
    dbCheckError($query);
    $lastId = $db->lastInsertId();
    return $lastId;
}

function dbCheckError($query)
{
    $errInfo = $query->errorInfo();
    if ($errInfo[0] !== PDO::ERR_NONE) {
        sendResponseError($errInfo[2]);
        exit();
    }
    return true;
}
// 