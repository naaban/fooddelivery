<?php
include 'db.php';
include 'cmnresponse.php';
include 'response.php';
header('Content-type:application/json');
header('Access-Control-Allow-Origin: *');
$response = array();
$response['data'] =  array();
if($_SERVER["REQUEST_METHOD"]=="GET"){
    $qry=mysqli_query($conn , "SELECT * FROM product_type");
    if(mysqli_num_rows($qry)){
        while($row = mysqli_fetch_array($qry)){
            $response['tmp']['product_id'] = $row['id'];
            $response['tmp']['product_type'] = $row['product_type'];
            array_push($response['data'] , $response['tmp']);
        }
        echo json_encode(cmnresponse(TRUE,$response));
    }
    else{
        echo json_encode(cmnresponse(FALSE,$response));
    }
}
?>