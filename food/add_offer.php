<?php
include 'db.php';
include 'response.php';
include 'cmnresponse.php';
header('Content-type:application/json');
header('Access-Control-Allow-Origin: *');
$response = array();
if($_SERVER["REQUEST_METHOD"]=="POST"){
    $array_params=array(
        'post' => $_POST
    );
    $arParams = json_encode($array_params['post']);
    $arParams = json_decode($arParams);
    $qry = mysqli_query($conn , "INSERT INTO offers(image,admin_id) VALUES ('$arParams->image','$arParams->admin_id') ");
    if($qry){
        echo json_encode(cmnresponse(TRUE,$response));
    }
    else{
        echo json_encode(cmnresponse(FALSE,$response));
    }
}
else{
    echo json_encode(cmnresponse(FALSE,$response));
}
?>