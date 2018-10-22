<?php
include 'db.php';
include 'cmnresponse.php';
include 'response.php';
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
    if($arParams->role == "customer"){
            while($row = mysqli_fetch_array(mysqli_query($conn , "SELECT * FROM customer_reg WHERE id= '$arParams->id'"))){
                $response['tmp'] = $row['image'];
        
                array_push($response['data'], $response['tmp']);
                break;
            }
            echo json_encode(cmnresponse(TRUE,$response));
        }
    else if($arParams->role == "resturant"){
            while($row = mysqli_fetch_array(mysqli_query($conn , "SELECT * FROM admin_reg WHERE id = '$arParams->id'"))){
                $response['tmp'] = $row['image'];
                array_push($response['data'], $response['tmp']);
                break;
            }
            echo json_encode(cmnresponse(TRUE,$response));
        }
    }
else{
    echo json_encode(cmnresponse(FALSE,$response));
}
?>