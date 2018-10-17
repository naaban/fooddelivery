<?php 
include 'db.php';
include 'response.php';
include 'cmnresponse.php';
header('Content-type:application/json');
header('Access-Control-Allow-Origin: *');
if($_SERVER['REQUEST_METHOD']=="POST"){

    $array_params=array(
        'post' => $_POST
    );
    $arParams = json_encode($array_params['post']);
    $arParams = json_decode($arParams);
   
    $qry=mysqli_query($conn,"INSERT INTO wishlist (product_id,customer_id,qty) VALUES('$arParams->product_id','$arParams->customer_id' , '$arParams->qty')");
    if($qry){
        echo json_encode(cmnresponse(TRUE,null));
    }
    else{
        echo json_encode(cmnresponse(FALSE,null));
    }
}
?>