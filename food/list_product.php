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
    $qry = mysqli_query($conn , "SELECT prd.id ,prd.name,prd.description,prd.price,prd.qty_avail,prd.image,prd.image,adm.city,adm.state,prd.admin_id FROM products AS prd JOIN admin_reg AS adm ON adm.id=prd.admin_id WHERE admin_id='$arParams->admin_id' AND city='$arParams->city'");

    if(mysqli_num_rows($qry)>0){
        while($row = mysqli_fetch_array($qry)){
            $response['tmp']['id'] = $row['id'];    
            $response['tmp']['city'] = $row['city'];
            $response['tmp']['name'] = $row['name'];
            $response['tmp']['description'] = $row['description'];
            $response['tmp']['price'] = $row['price'];
            $response['tmp']['qty_avail'] = $row['qty_avail']; 
            $response['tmp']['image'] = $row['image'];
            $response['tmp']['qty'] = range(1,$row['qty_avail'],1);

            array_push($response['data'] , $response['tmp']);
        }
        echo json_encode(cmnresponse(TRUE , $response));
    }
}
?>