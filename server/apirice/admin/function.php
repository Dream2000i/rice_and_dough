<?
function getAllPromoCode()
{
}


function newPromoCode()
{
    $warn = '';
    $newCode = file_get_contents('php://input');
    $newCode = json_decode($newCode, true);

    $newCodeid = addPromoCodeToSql($newCode);
    if ($newCodeid) {
        sendResponseOk(['key' => $newCodeid]);
    } else {
        sendResponseError('Ошибка при добавлении промокода');
    }
}


function deletePromoCode()
{
    $id = file_get_contents('php://input');
    $id = json_decode($id, true);
    if (deletePromoCodeToSql([$id['id_code']])) {
        sendResponseOk();
    } else {
        sendResponseError('Ошибка при удалении!');
    }
}
