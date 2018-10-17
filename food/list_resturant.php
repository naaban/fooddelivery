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
$qry = mysqli_query($conn , "SELECT id,name,image FROM admin_reg WHERE city='$arParams->city'");
while($row = mysqli_fetch_array($qry)){
    $response['tmp']['id'] = $row['id'];
    $response['tmp']['name'] = $row['name'];
    $response['tmp']['image'] = $row['image'];
    array_push($response['data'] , $response['tmp']);
}
if(mysqli_num_rows($qry) > 0){
 echo json_encode(cmnresponse(TRUE,$response));
}
else{
    echo json_encode(cmnresponse(FALSE , $response));
}
}
?>