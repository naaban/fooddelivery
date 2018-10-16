<<<<<<< HEAD
<?php 
include 'db.php';
include 'response.php';
include 'cmnresponse.php';
header('Content-type:application/json');
header('Access-Control-Allow-Origin: *');
$response = array();
$response['data'] = array();
$qry = mysqli_query($conn , "SELECT id,name,image FROM admin_reg");
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
=======
<?php 
include 'db.php';
include 'response.php';
include 'cmnresponse.php';
header('Content-type:application/json');
header('Access-Control-Allow-Origin: *');
$response = array();
$response['data'] = array();
$qry = mysqli_query($conn , "SELECT id,name,image FROM admin_reg");
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
>>>>>>> 884998a277c8f0552f9028c11b85cdbdee405ed1
?>