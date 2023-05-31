<?php




function getSlider()
{
    global $url_slider_img;

    $slider = [];

    $sqlSlider = "SELECT * FROM `slider`";
    $query = dbQuery($sqlSlider);
    $sliders = $query->fetchAll();

    foreach ($sliders as $slide) {
        $slide['img'] = $url_slider_img . $slide['img'];
        $slider[] = $slide;
    }

    return $slider;
}

function getHappyHoursData()
{
    $hhData = getHappyHours();
    extract($hhData);
    if (!$active) return false;
    $hours = date("H");
    if ($hours < $startH || $hours >= $endH) return false;
    $day = date("w");
    if ($day < $startD || $day > $endD) return false;
    return $hhData;
}
