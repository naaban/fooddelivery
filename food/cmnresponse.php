<<<<<<< HEAD
<?php 

$res = array();
function cmnResponse($data,$response){
    if($data==TRUE){
        $res['status'] = 1;
        $res['message'] = "Success";
        $res['data'] = $response['data'];
        return $res;
    }
    else{
        $res['status'] = 0;
        $res['message'] = "Failed";
        return $res;
    }
}
=======
<?php 

$res = array();
function cmnResponse($data,$response){
    if($data==TRUE){
        $res['status'] = 1;
        $res['message'] = "Success";
        $res['data'] = $response['data'];
        return $res;
    }
    else{
        $res['status'] = 0;
        $res['message'] = "Failed";
        return $res;
    }
}
>>>>>>> 884998a277c8f0552f9028c11b85cdbdee405ed1
?>