<<<<<<< HEAD
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
    $qry = mysqli_query($conn , "SELECT * FROM products WHERE product_type='$arParams->product_type'");

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
=======
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
    $qry = mysqli_query($conn , "SELECT * FROM products WHERE product_type='$arParams->product_type'");

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
>>>>>>> 884998a277c8f0552f9028c11b85cdbdee405ed1
?>