<?php
include 'db.php';
include 'response.php';
include 'cmnresponse.php';
header('Content-type:application/json');
header('Access-Control-Allow-Origin: *');
$response = array();
if($_SERVER["REQUEST_METHOD"]=="POST"){
    $array_params=array(
        'post' => $_POST
    );
    $arParams = json_encode($array_params['post']);
    $arParams = json_decode($arParams);
    $qry = mysqli_query($conn , "DELETE FROM offer WHERE id='$arParams->id' AND admin_id='$arParams->admin_id'" );
    if($qry){
      
        echo json_encode(cmnresponse(TRUE,null));
    }
    else{
        echo json_encode(cmnresponse(FALSE,null));
    }
}
else{
 
    echo json_encode(cmnresponse(FALSE,$response));
}
?>