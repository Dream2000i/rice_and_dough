<?

function sendResponseOk($data = [])
{
    $res = [
        "result" => true,
        "data" => $data
    ];

    $json = json_encode($res);
    echo $json;
}

function sendResponseError($error = '')
{
    $res = [
        "result" => false,
        "error" => $error

    ];

    $json = json_encode($res);
    echo $json;
}


// function sendResponse($result = true, $data = [], $error = '')
// {
//     $res = [
//         "result" => $result,
//         "data" => $data,
//         "error" => $error
//     ];

//     $json = json_encode($res);
//     echo $json;
// }