<<<<<<< HEAD
<?php
include 'db.php';
include 'response.php';
include 'cmnresponse.php';
header('Content-type:application/json');
// header('Access-Control-Allow-Origin: *');
$response = array();
if($_SERVER["REQUEST_METHOD"]=="POST"){
    $array_params=array(
        'post' => $_POST
    );
    $arParams = json_encode($array_params['post']);
    $arParams = json_decode($arParams);
   
    if($arParams->role == "customer"){
        if(mysqli_num_rows(mysqli_query($conn , "SELECT * FROM customer_reg WHERE email= '$arParams->email'"))){
            $response['status'] = 2;
            $response['message'] = "Account Already Exists.. Please Login.. If you forgot your password please Reset Password";
            echo json_encode($response);
        }
        else{
    $qry = mysqli_query($conn , "INSERT INTO customer_reg( name, mobile, email, password) VALUES ('$arParams->name','$arParams->mobile','$arParams->email','$arParams->password')");
    if($qry){
        echo json_encode(cmnresponse(TRUE,null));
    }else{
        echo json_encode(cmnresponse(FALSE,null));
    }
}
}
    else if($arParams->role == "resturant"){
        if(mysqli_num_rows(mysqli_query($conn , "SELECT * FROM admin_reg WHERE email= '$arParams->email'"))){
            $response['status'] = 2;
            $response['message'] = "Account Already Exists.. Please Login.. If you forgot your password please Reset Password";
            echo json_encode($response);
        }
        else{
    $qry = mysqli_query($conn , "INSERT INTO admin_reg( name, mobile, email, password,city,state) VALUES ('$arParams->name','$arParams->mobile','$arParams->email','$arParams->password','$arParams->city','$arParams->state')");
    if($qry){
        echo json_encode(cmnresponse(TRUE,null));
    }else{
        echo json_encode(cmnresponse(FALSE,null));
    }
    }
}
}
else{
    echo json_encode(cmnresponse(FALSE,$response));
}
=======
<?php
include 'db.php';
include 'response.php';
include 'cmnresponse.php';
header('Content-type:application/json');
// header('Access-Control-Allow-Origin: *');
$response = array();
if($_SERVER["REQUEST_METHOD"]=="POST"){
    $array_params=array(
        'post' => $_POST
    );
    $arParams = json_encode($array_params['post']);
    $arParams = json_decode($arParams);
   
    if($arParams->role == "customer"){
        if(mysqli_num_rows(mysqli_query($conn , "SELECT * FROM customer_reg WHERE email= '$arParams->email'"))){
            $response['status'] = 2;
            $response['message'] = "Account Already Exists.. Please Login.. If you forgot your password please Reset Password";
            echo json_encode($response);
        }
        else{
    $qry = mysqli_query($conn , "INSERT INTO customer_reg( name, mobile, email, password) VALUES ('$arParams->name','$arParams->mobile','$arParams->email','$arParams->password')");
    if($qry){
        echo json_encode(cmnresponse(TRUE,null));
    }else{
        echo json_encode(cmnresponse(FALSE,null));
    }
}
}
    else if($arParams->role == "resturant"){
        if(mysqli_num_rows(mysqli_query($conn , "SELECT * FROM admin_reg WHERE email= '$arParams->email'"))){
            $response['status'] = 2;
            $response['message'] = "Account Already Exists.. Please Login.. If you forgot your password please Reset Password";
            echo json_encode($response);
        }
        else{
    $qry = mysqli_query($conn , "INSERT INTO admin_reg( name, mobile, email, password) VALUES ('$arParams->name','$arParams->mobile','$arParams->email','$arParams->password')");
    if($qry){
        echo json_encode(cmnresponse(TRUE,null));
    }else{
        echo json_encode(cmnresponse(FALSE,null));
    }
    }
}
}
else{
    echo json_encode(cmnresponse(FALSE,$response));
}
>>>>>>> 884998a277c8f0552f9028c11b85cdbdee405ed1
?>