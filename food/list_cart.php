<<<<<<< HEAD
<?php
include 'db.php';
include 'cmnresponse.php';

header('Content-type:application/json');
header('Access-Control-Allow-Origin: *');
$response = array();
$response['data'] =  array();
if($_SERVER["REQUEST_METHOD"]=="GET"){
    $array_params=array(
        'post' => $_POST
    );
    $arParams = json_encode($array_params['post']);
    $arParams = json_decode($arParams);
$qry = mysqli_query($conn , "SELECT car.product_id,car.customer_id,pro.name,pro.description,pro.image,pro.price,pro.qty_avail FROM cart AS car JOIN products AS pro ON pro.id = car.product_id WHERE car.customer_id  = '$arParams->cust_id'");

if(mysqli_num_rows($qry)){
while($row = mysqli_fetch_array($qry)){
    $response['tmp']['product_name'] = $row['name'];
    $response['tmp']['qty'] = $row['qty_avail'];
    $response['tmp']['image'] = $row['image'];
    array_push($response['data'] , $response['tmp']);
}
echo json_encode(cmnresponse(TRUE,$response));
}
else{
    echo json_encode(cmnresponse(FALSE,$response));
    
}
}
else  echo json_encode(cmnresponse(FALSE,$response));

=======
<?php
include 'db.php';
include 'cmnresponse.php';

header('Content-type:application/json');
header('Access-Control-Allow-Origin: *');
$response = array();
$response['data'] =  array();
if($_SERVER["REQUEST_METHOD"]=="GET"){
    $array_params=array(
        'post' => $_POST
    );
    $arParams = json_encode($array_params['post']);
    $arParams = json_decode($arParams);
$qry = mysqli_query($conn , "SELECT car.product_id,car.customer_id,pro.name,pro.description,pro.image,pro.price,pro.qty_avail FROM cart AS car JOIN products AS pro ON pro.id = car.product_id WHERE car.customer_id  = '$arParams->cust_id'");

if(mysqli_num_rows($qry)){
while($row = mysqli_fetch_array($qry)){
    $response['tmp']['product_name'] = $row['name'];
    $response['tmp']['qty'] = $row['qty_avail'];
    $response['tmp']['image'] = $row['image'];
    array_push($response['data'] , $response['tmp']);
}
echo json_encode(cmnresponse(TRUE,$response));
}
else{
    echo json_encode(cmnresponse(FALSE,$response));
    
}
}
else  echo json_encode(cmnresponse(FALSE,$response));

>>>>>>> 884998a277c8f0552f9028c11b85cdbdee405ed1
?>