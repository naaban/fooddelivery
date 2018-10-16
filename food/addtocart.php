<<<<<<< HEAD
<?php 
include 'db.php';
include 'cmnresponse.php';

if($_SERVER['REQUEST_METHOD']=="POST"){

    $array_params=array(
        'post' => $_POST
    );
    $arParams = json_encode($array_params['post']);
    $arParams = json_decode($arParams);
   
    $customer_id = $arParams->cust_id;
    $product_id = $arParams->product_id;
    $qry=mysqli_query($conn,"INSERT INTO cart ('$customer_id','$product_id')");

    if($qry){
        echo json_encode(cmnresponse(TRUE,null));
    }
    else{
        echo json_encode(cmnresponse(FALSE,null));
    }
}
=======
<?php 
include 'db.php';
include 'cmnresponse.php';

if($_SERVER['REQUEST_METHOD']=="POST"){

    $array_params=array(
        'post' => $_POST
    );
    $arParams = json_encode($array_params['post']);
    $arParams = json_decode($arParams);
   
    $customer_id = $arParams->cust_id;
    $product_id = $arParams->product_id;
    $qry=mysqli_query($conn,"INSERT INTO cart ('$customer_id','$product_id')");

    if($qry){
        echo json_encode(cmnresponse(TRUE,null));
    }
    else{
        echo json_encode(cmnresponse(FALSE,null));
    }
}
>>>>>>> 884998a277c8f0552f9028c11b85cdbdee405ed1
?>