<?php
include 'db.php';
include 'response.php';
include 'cmnresponse.php';
header('Content-type:application/json');
header('Access-Control-Allow-Origin: *');
$response = array();
$response['data'] = array();
if($_SERVER["REQUEST_METHOD"]=="POST"){
    $array_params=array(
        'post' => $_POST
    );
    $arParams = json_encode($array_params['post']);
    $arParams = json_decode($arParams);
    $qry = mysqli_query($conn , "SELECT * FROM offers WHERE admin_id='$arParams->admin_id'");
    if(mysqli_num_rows($qry) > 0){
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