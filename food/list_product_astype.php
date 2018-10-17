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
    $qry = mysqli_query($conn , "SELECT pro.id,adm.id,pro.image,pro.description,pro.name,pro.admin_id,pro.product_type,pro.price,pro.qty_avail FROM products as pro JOIN admin_reg AS adm ON adm.id=pro.admin_id WHERE product_type='$arParams->product_type' AND city='$arParams->city'");

    if(mysqli_num_rows($qry)>0){
        while($row = mysqli_fetch_array($qry)){
            $response['tmp']['id'] = $row['id'];
            $response['tmp']['name'] = $row['name'];
            $response['tmp']['description'] = $row['description'];
            $response['tmp']['price'] = $row['price'];
            $response['tmp']['qty_avail'] = $row['qty_avail']; 
            $response['tmp']['image'] = $row['image'];
            array_push($response['data'] , $response['tmp']);
        }
        echo json_encode(cmnresponse(TRUE , $response));
    }
}
?>