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
        $qry=mysqli_query($conn , "SELECT * FROM customer_reg WHERE email='$arParams->email' AND password='$arParams->password'");

        if(mysqli_num_rows($qry)){
            cmnresponse(TRUE,$response);
            $response['data']['user_email'] = $arParams->email; 
    
            while($row = mysqli_fetch_array(mysqli_query($conn , "SELECT * FROM customer_reg WHERE email= '$arParams->email'"))){
                $response['data']['user_id'] = $row['id'];
                $response['data']['user_name'] = $row['name'];
                $response['data']['user_mobile'] = $row['mobile'];
                $response['data']['user_role'] = "customer";
                break;
            }
            echo json_encode(cmnresponse(TRUE,$response));
        }
        else{
            echo json_encode(cmnresponse(FALSE,$response));
        }
    }
    else if($arParams->role == "resturant"){
        $qry=mysqli_query($conn , "SELECT * FROM admin_reg WHERE email='$arParams->email' AND password='$arParams->password'");
        if(mysqli_num_rows($qry)){
            cmnresponse(TRUE,$response);
            
            while($row = mysqli_fetch_array(mysqli_query($conn , "SELECT * FROM admin_reg WHERE email = '$arParams->email'"))){
                $response['data']['user_id'] = $row['id'];
                $response['data']['user_name'] = $row['name'];
                $response['data']['user_mobile'] = $row['mobile'];
                $response['data']['user_email'] = $arParams->email; 
                $response['data']['user_city'] = $row['city'];
                $response['data']['user_state'] = $row['state'];
                $response['data']['user_image'] =  $row['image'];
                if($row['approved'] == 1)
                {
                    $response['data']['user_status'] = true;
                   
                }
                else if($row['approved'] == 0)
                {
                    $response['data']['user_status'] = false;
                }
                $response['data']['user_role'] = "admin";
                if($row['su_admin']==0)
                {
                    $response['data']['su_admin']=false;
                }
                else if($row['su_admin'] == 1)
                {
                    $response['data']['su_admin']=true;
                }

                break;
            }
            echo json_encode(cmnresponse(TRUE,$response));
        }
        else{
            echo json_encode(cmnresponse(FALSE,$response));
        }
    }
}
else{
    echo json_encode(cmnresponse(FALSE,$response));
}
?>