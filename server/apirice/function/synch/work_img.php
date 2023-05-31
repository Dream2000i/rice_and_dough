<?
function getImageProduct($img_link, $link)
{
    global $dir_goods_img;
    $path = $dir_goods_img . $link;
    if (!file_exists($path)) {
        mkdir($path, 0777, true);
    }
    $file = basename($img_link);
    echo $img_link;

    if (!copy($img_link, "$path/$file")) {
    return 'default.jpg';
    };

    return $file;
}

// function copyImgToServer($goods = [],$)
// { 

// }
// 