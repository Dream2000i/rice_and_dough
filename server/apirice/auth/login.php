<?

function authByLogin()
{
    $data = json_decode(file_get_contents('php://input'), true);
    $login = sanString($data['login']);
    $pass = md5(sanString($data['pass']));

    $user = getUser(['login' => $login, 'pass' => $pass]);
    $id = $user['id_user'];

    if (!$user) {
        http_response_code(401);
        sendResponseError('не верный логин или пароль');
        exit();
    }
    $token = gen_token();

    $token_base = getTokensBase();
    $token_base[$id] = [
        "token" => $token,
        "time" => 2412412412,
        "login" => $login
    ];

    $token_base = json_encode($token_base);
    file_put_contents('auth/tokens_base.json', $token_base);

    sendResponseOk(['token' => $token, 'userId' => $id]);
}
