<?php
include 'db.php';
include 'cmnresponse.php';
header('Content-type:application/json');
header('Access-Control-Allow-Origin: *');
$response['data'] = array();
if ($_SERVER['REQUEST_METHOD'] == "POST") {
    $array_params = array(
        'post' => $_POST
        
    );
    $price        = null;
    $amt          = null;
    $total_amt    = null;
    $arParams     = json_encode($array_params['post']);
    $arParams     = json_decode($arParams);
    $order_id     = NULL;
    for ($i = 100000; $i > 0; $i++) {
        $order_id = "FOOD" . $i;
        $qry      = mysqli_query($conn, "SELECT order_id FROM orders WHERE order_id='$order_id'");
        if (!mysqli_num_rows($qry)) {
            $order_id = "FOOD" . $i;
            break;
        } else {
            $order_id = NULL;
        }
    }
    if ($order_id != NULL) {
        $qry = mysqli_query($conn, "SELECT price FROM products WHERE id = '$arParams->product_id'");
        if (mysqli_num_rows($qry)) {
            while ($row = mysqli_fetch_array($qry)) {
                $total_amt = $row['price'] * $arParams->qty;
                break;
            }
        }
        $qry = mysqli_query($conn, "INSERT INTO orders (customer_id ,total_amt, order_id,doorno,qty,street,area,city,state,pincode,product_id,approval) VALUES('$arParams->customer_id',$total_amt,'$order_id','$arParams->doorno','$arParams->qty','$arParams->street','$arParams->area','$arParams->city','$arParams->state','$arParams->pincode','$arParams->product_id','0')");
        if ($qry) {
            $response['data']['order_id'] = "Your order id is " . $order_id;
            $qty                          = $arParams->qty;
            $qry                          = mysqli_query($conn, "UPDATE products SET qty_avail = qty_avail-$qty WHERE id='$arParams->product_id'");
            if ($qry) {
                $qry = mysqli_query($conn, "SELECT id FROM wishlist WHERE customer_id = '$arParams->customer_id' AND product_id='$arParams->product_id'");
                if (mysqli_num_rows($qry) > 0) {
                    while ($row = mysqli_fetch_array($qry)) {
                        $wish_id = $row['id'];
                        break;
                    }
                    $qry = mysqli_query($conn, "DELETE FROM wishlist WHERE id = '$wish_id'");
                    $qry = mysqli_query($conn, "SELECT * FROM orders WHERE customer_id='$arParams->customer_id'");
                        if ($total_amt != null && mysqli_num_rows($qry)>1) {
                            $qry = mysqli_query($conn, "SELECT amount FROM wallet WHERE customer_id='$arParams->customer_id'");
                            if (mysqli_num_rows($qry) > 0) {
                                while ($row = mysqli_fetch_array($qry)) {
                                    $amt = $row['amount'];
                                    break;
                                }
                                if ($amt > 0) {
                                    $discount       = $amt * (10 / 100);
                                    $total_amt = $total_amt - $discount;
                                    $qry       = mysqli_query($conn, "UPDATE orders SET total_amt='$total_amt',discount='$discount' WHERE customer_id='$arParams->customer_id' AND order_id='$order_id'");
                                    if ($qry) {
                                        $amt = $amt - $discount;
                                        $qry = mysqli_query($conn, "UPDATE wallet SET amount='$amt' WHERE customer_id='$arParams->customer_id'");
                                        if ($qry) {
                                            echo json_encode(cmnresponse(TRUE, $response));
                                        }
                                    }
                                } else {
                                    echo json_encode(cmnresponse(TRUE, $response));
                                }
                                
                            }
                        }
                        else{
                            $amt = $total_amt * (50 / 100);
                            if ($amt <= 500) {
                                $amt = $amt;
                            } else {
                                $amt = 500;
                            }
                            $qry = mysqli_query($conn, "UPDATE wallet SET amount='$amt' WHERE customer_id='$arParams->customer_id'");
                            echo json_encode(cmnresponse(TRUE, $response));
                        } 
                }
            }
        } else {
            echo json_encode(cmnresponse(FALSE, null));
        }
    }
}
/*$qry = mysqli_query($conn, "SELECT * FROM orders WHERE customer_id='$customer_id'");
if(mysqli_num_rows($qry) > 0){

}
else{
$qry=mysqli_query($conn , "INSERT INTO orders")
}*/
?>

