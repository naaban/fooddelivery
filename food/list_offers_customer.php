<?php
include 'db.php';
include 'response.php';
include 'cmnresponse.php';
header('Content-type:application/json');
header('Access-Control-Allow-Origin: *');
$response = array();
$response['data'] = array();
if($_SERVER["REQUEST_METHOD"]=="GET"){
    $array_params=array(
        'post' => $_GET
    );
    $arParams = json_encode($array_params['post']);
    $arParams = json_decode($arParams);
    $qry = mysqli_query($conn , "SELECT offs.image , offs.id FROM offers as offs JOIN admin_reg as adm ON adm.id=offs.admin_id WHERE city = '$arParams->city'");
    if(mysqli_num_rows($qry)){
        while($row = mysqli_fetch_array($qry)){
            $response['tmp']['id'] = $row['id'];
            $response['tmp']['image'] = $row['image'];
            array_push($response['data'] , $response['tmp']);
        }
        echo json_encode(cmnresponse(TRUE,$response));
    }
    else{

        echo json_encode(cmnresponse(FALSE,null));
    }
}
else{

    echo json_encode(cmnresponse(FALSE,null));
}
?>