<?php
include 'db.php';
include 'response.php';
include 'cmnresponse.php';
header('Content-type:application/json');
header('Access-Control-Allow-Origin: *');
$response = array();
$response['data'] =  array();
if($_SERVER["REQUEST_METHOD"]=="POST"){
    $array_params=array(
        'post' => $_POST
    );
    $arParams = json_encode($array_params['post']);
    $arParams = json_decode($arParams);

$qry = mysqli_query($conn , "SELECT ord.order_id,ord.discount,ord.status,ord.approval,ord.total_amt,pro.id,ord.qty,creg.id,ord.customer_id,pro.name AS product_name,pro.description,pro.price,pro.image,creg.name AS cust_name,pro.price,creg.mobile,creg.email,ord.street,ord.doorno,ord.city,ord.state,ord.pincode,ord.area FROM customer_reg AS creg JOIN orders AS ord ON ord.customer_id = creg.id  JOIN products AS pro ON pro.id = ord.product_id WHERE creg.id = '$arParams->cust_id' ORDER BY ord.id DESC");

echo mysqli_error($conn);

if(mysqli_num_rows($qry)> 0){
while($row = mysqli_fetch_array($qry)){
    $response['tmp']['order_id'] = $row['order_id'];
    $response['tmp']['product_name'] = $row['product_name'];
    $response['tmp']['description']=$row['description'];
    $response['tmp']['total_amt'] = $row['total_amt'];
    $response['tmp']['discount']=$row['discount'];
    $response['tmp']['price'] = $row['price'];
    $response['tmp']['qty'] = $row['qty'];
    $response['tmp']['image']=$row['image'];
    $response['tmp']['cust_name']=$row['cust_name'];
    $response['tmp']['mobile']=$row['mobile'];
    $response['tmp']['street']=$row['street'];
    $response['tmp']['door_no']=$row['doorno'];
    $response['tmp']['area'] =$row['area'];
    $response['tmp']['city']= $row['city'];
    $response['tmp']['state'] = $row['state'];
    $response['tmp']['pincode']=$row['pincode'];
    $response['tmp']['approval'] = $row['approval'];
    $response['tmp']['status'] = $row['status'];
    array_push($response['data'] , $response['tmp']);
}
}
echo json_encode(cmnresponse(TRUE , $response));
}
?>