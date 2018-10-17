<?php
include 'db.php';
include 'cmnresponse.php';
header('Content-type:application/json');
header('Access-Control-Allow-Origin: *');
$response['data'] = array();
if($_SERVER['REQUEST_METHOD'] ==  "POST"){
    $array_params=array(
        'post' => $_POST
        
    );
    $arParams = json_encode($array_params['post']);
    $arParams = json_decode($arParams);

    $order_id = NULL;
    for($i=100000 ; $i>0 ; $i++){
    $order_id = "FOOD".$i;
    $qry=mysqli_query($conn , "SELECT order_id FROM orders WHERE order_id='$order_id'");
    if(!mysqli_num_rows($qry)){
        $order_id = "FOOD".$i;
        break;
    }
    else{
        $order_id=NULL;
    }
}
if($order_id!=NULL){
    $qry = mysqli_query($conn , "INSERT INTO orders (customer_id , order_id,qty,street,area,city,state,pincode,product_id,approval) VALUES('$arParams->customer_id','$order_id','$arParams->qty','$arParams->street','$arParams->area','$arParams->city','$arParams->state','$arParams->pincode','$arParams->product_id','0')");
    if($qry){
        $response['data']['order_id'] = "Your order id is ".$order_id;
        $qty = $arParams->qty;
        $qry = mysqli_query($conn , "UPDATE products SET qty_avail = qty_avail-$qty WHERE id='$arParams->product_id'");
        if($qry){
            $qry = mysqli_query($conn , "SELECT id FROM wishlist WHERE customer_id = '$arParams->customer_id' AND product_id='$arParams->product_id'");
            if(mysqli_num_rows($qry) > 0){
                while($row = mysqli_fetch_array($qry)){
                    $wish_id = $row['id'];
                    break;
                }
                $qry = mysqli_query($conn , "DELETE FROM wishlist WHERE id = '$wish_id'");
                if($qry){
                    echo json_encode(cmnresponse(TRUE,$response));
                }
            }
        }
    }
    else{
        echo json_encode(cmnresponse(FALSE,null));
    }
}
}
?>