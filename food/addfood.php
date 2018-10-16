<<<<<<< HEAD
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

    ///---------------Uploading Image----------------///
    
    // $image_name = $_FILES['namee']['name'];
    // $image_name1 = $_FILES['namee']['tmp_name'];
    // $image_name2 = $_FILES['namee']['size'];
    // $image_name3 = basename($image_name);
    // $fileinfo = pathinfo($_FILES['namee']['name']);
    // $extension = $fileinfo['extension'];
    // $x=1;
    // while(file_exists('uploadimage/'.$x.".".$extension))
    // {
    //     $x++;
    // }
    // $image_name3=$x.'.'.$extension;
    // $dir="uploadimage/";
    // $target_file=$dir.$image_name3;
    // $imageFileType = pathinfo($target_file,PATHINFO_EXTENSION);
    // move_uploaded_file($image_name1,$target_file);

    ///--------------------------------------------------////

    // $image_name = $arParams->image;
    // $image_name = str_replace('data:image/jpeg;base64,','',$image_name);
    // $image_name = str_replace('data:image/jpg;base64,','',$image_name);
    // $image_name = str_replace(' ','+',$image_name);
    // $image_name = base64_decode($image_name);
    // $image_name3 = basename($image_name);
    // $target_path = './uploadimage/'.time().'.jpg';
    // file_put_contents($target_path,$image_name);
    // $target_path = str_replace('./uploadimage/','',$target_path);
    $qry = mysqli_query($conn , "INSERT INTO products(product_type, admin_id, name, description, price, qty_avail, image) VALUES ('$arParams->product_type','$arParams->admin_id','$arParams->name','$arParams->des','$arParams->price','$arParams->qty_avail','$arParams->image')");
    if($qry){
        echo json_encode(cmnresponse(TRUE,null));
    }
    else{
        echo json_encode(cmnresponse(FALSE,null));
    }
}
else{
    echo json_encode(cmnresponse(FALSE,null));
}
=======
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

    ///---------------Uploading Image----------------///
    
    // $image_name = $_FILES['namee']['name'];
    // $image_name1 = $_FILES['namee']['tmp_name'];
    // $image_name2 = $_FILES['namee']['size'];
    // $image_name3 = basename($image_name);
    // $fileinfo = pathinfo($_FILES['namee']['name']);
    // $extension = $fileinfo['extension'];
    // $x=1;
    // while(file_exists('uploadimage/'.$x.".".$extension))
    // {
    //     $x++;
    // }
    // $image_name3=$x.'.'.$extension;
    // $dir="uploadimage/";
    // $target_file=$dir.$image_name3;
    // $imageFileType = pathinfo($target_file,PATHINFO_EXTENSION);
    // move_uploaded_file($image_name1,$target_file);

    ///--------------------------------------------------////

    // $image_name = $arParams->image;
    // $image_name = str_replace('data:image/jpeg;base64,','',$image_name);
    // $image_name = str_replace('data:image/jpg;base64,','',$image_name);
    // $image_name = str_replace(' ','+',$image_name);
    // $image_name = base64_decode($image_name);
    // $image_name3 = basename($image_name);
    // $target_path = './uploadimage/'.time().'.jpg';
    // file_put_contents($target_path,$image_name);
    // $target_path = str_replace('./uploadimage/','',$target_path);
    $qry = mysqli_query($conn , "INSERT INTO products(product_type, admin_id, name, description, price, qty_avail, image) VALUES ('$arParams->product_type','$arParams->admin_id','$arParams->name','$arParams->des','$arParams->price','$arParams->qty_avail','$arParams->image')");
    if($qry){
        echo json_encode(cmnresponse(TRUE,null));
    }
    else{
        echo json_encode(cmnresponse(FALSE,null));
    }
}
else{
    echo json_encode(cmnresponse(FALSE,null));
}
>>>>>>> 884998a277c8f0552f9028c11b85cdbdee405ed1
?>