<?php
include 'db.php';
include 'cmnresponse.php';

if($_SERVER["REQUEST_METHOD"]=="POST"){

    $array_params=array(
        'post' => $_POST
        
    );
    $arParams = json_encode($array_params['post']);
    $arParams = json_decode($arParams);
    
    $qry = mysqli_query($conn ,  "UPDATE orders SET approval=1 ,status='Out for Delivery' WHERE order_id = '$arParams->order_id'");

    if($qry){
        echo json_encode(cmnresponse(TRUE, null));
    }
    else{
        echo json_encode(cmnresponse(FALSE,null));
    }
}

?>