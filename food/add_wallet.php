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
    $qry = mysqli_query($conn , "INSERT INTO wallet(amount , customer_id) VALUES ('$arParams->amount' , '$arParams->customer_id')");
    if($qry){
        $response['data']['status'] =  1;
        $response['data']['message'] = "Amount Added";
        echo json_encode(cmnresponse(TRUE,$response));
    }
    else{
        $response['data']['status'] =  0;
        $response['data']['message'] = "Something Went Wrong";
        echo json_encode(cmnresponse(FALSE,$response));
    }
}
else{
    $response['data']['status'] =  0;
    $response['data']['message'] = "Something Went Wrong";
    echo json_encode(cmnresponse(FALSE,$response));
}
?>