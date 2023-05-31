<?

function getAuthHeaderData()
{
    $userId = sanString(getallheaders()['userId']);
    $token = sanString(getallheaders()['Authorization']);
    return ['userId' => $userId, 'token' => $token];
}



function validate_access($data)
{

    if (!validateToken($data)) {
    }
}


function validateToken($data): bool
{
    $id = $data['userId'];
    $token = $data['token'];
    $tokens_base =  getTokensBase();

    if (!array_key_exists($id, $tokens_base) || $tokens_base[$id]['token'] !== $token) {
        http_response_code(401);
        sendResponseError('Срок жизни токена истек! Вам необходимо зайти в систему заново!');
        exit();
    }
    return true;
}


function getTokensBase()
{
    return json_decode(file_get_contents('auth/tokens_base.json'), true);
}


function getUserDetails($id)
{
    $tokens_base =  getTokensBase();
    return $tokens_base[$id];
}


function validateAccessByToken()
{
    $valid_data = getAuthHeaderData();
    validateToken($valid_data);
}

function authByToken()
{
    $valid_data = getAuthHeaderData();
    validateToken($valid_data);
    $login = getUserDetails($valid_data['userId'])['login'];

    sendResponseOk(['login'=>$login]);
}
