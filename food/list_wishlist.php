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
    $qry = mysqli_query($conn , "SELECT prd.id ,prd.name,prd.description,prd.price,prd.qty_avail,prd.image,prd.image,wis.product_id,wis.qty,wis.customer_id,prd.admin_id FROM products AS prd JOIN wishlist AS wis ON wis.product_id=prd.id WHERE customer_id='$arParams->cust_id'");
    echo mysqli_error($conn);

        while($row = mysqli_fetch_array($qry)){
            $response['tmp']['id'] = $row['id'];    
            $response['tmp']['name'] = $row['name'];
            $response['tmp']['description'] = $row['description'];
            $response['tmp']['price'] = $row['price'];
            $response['tmp']['qty_wish'] = $row['qty']; 
            $response['tmp']['customer_id'] = $row['customer_id'];
            $response['tmp']['product_id']= $row['product_id'];
            $response['tmp']['image'] = $row['image'];
            $response['tmp']['qty'] = range(1,$row['qty_avail'],1);
            array_push($response['data'] , $response['tmp']);
        }
        echo json_encode(cmnresponse(TRUE , $response));
}
?>