<?php
include 'db.php';
include 'cmnresponse.php';

header('Content-type:application/json');
header('Access-Control-Allow-Origin: *');
if($_SERVER["REQUEST_METHOD"]=="GET"){

    $array_params=array(
        'get' => $_GET
        
    );
    $response = array();
    $response['data'] = array();
    $approved['approved'] = array();
    $unapproved['unapproved'] = array();
    $response['temp'] = array();
    $arParams = json_encode($array_params['get']);
    $arParams = json_decode($arParams);
    
    $qry = mysqli_query($conn ,  "SELECT * FROM admin_reg ");

    if(mysqli_num_rows($qry) > 0){
        while($row = mysqli_fetch_array($qry)){
            if($row['approved'] == 1){
                $response['tmp']['id'] = $row['id'];
            $response['tmp']['image'] = $row['image'];
            $response['tmp']['approved'] = true;
            $response['tmp']['name'] = $row['name'];
            $response['tmp']['mobile'] = $row['mobile'];
            $response['tmp']['state'] = $row['state'];
            $response['tmp']['city'] = $row['city'];
            array_push($approved['approved'] , $response['tmp']);
        }
        else if($row['approved'] == 0){
            $response['tmp']['id'] = $row['id'];
            $response['tmp']['image'] = $row['image'];
            $response['tmp']['approved'] = false;
            $response['tmp']['name'] = $row['name'];
            $response['tmp']['mobile'] = $row['mobile'];
            $response['tmp']['state'] = $row['state'];
            $response['tmp']['city'] = $row['city'];
            array_push($unapproved['unapproved'] , $response['tmp']);
        }
        }
        array_push($response['data'] , $approved);
        array_push($response['data'] , $unapproved);
        echo json_encode(cmnresponse(TRUE, $response));
    }
    else{
        echo json_encode(cmnresponse(FALSE,null));
    }
}

?>