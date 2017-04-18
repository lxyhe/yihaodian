<?php
	header('Content-Type: application/json');
	$uname=$_REQUEST['uname'];
	$page=$_REQUEST['page'];
	$output=[
		'rowcount'=>0,//总记录
		'rowpage'=>5,//每页显示记录行数
		'pagecount'=>0,//总页数
		'page'=>intval($page),//选择要显示的
		'data'=>[]//要显示的数据
	];
	$conn = mysqli_connect(SAE_MYSQL_HOST_M, SAE_MYSQL_USER, SAE_MYSQL_PASS,  SAE_MYSQL_DB, SAE_MYSQL_PORT);
	$sql='SET NAMES UTF8';
	mysqli_query($conn,$sql);
	$sql="SELECT COUNT(*) FROM one_orders WHERE user_name='$uname'";
	$result=mysqli_query($conn,$sql);
	$row=mysqli_fetch_assoc($result);
	$output['rowcount']=intval($row['COUNT(*)']);
	$output['pagecount']=ceil($output['rowcount']/$output['rowpage']);
	$start=($output['page']-1)*$output['rowpage'];
	$count=$output['rowpage'];
	$sql="SELECT * FROM one_orders WHERE user_name='$uname' LIMIT $start,$count";
	$result=mysqli_query($conn,$sql);
	$orderList=[];
	while(($order=mysqli_fetch_assoc($result))!==null){
		$order['productList']=[];
		$oid=$order['order_id'];
		$sql="SELECT * FROM one_products WHERE product_id IN (SELECT product_id FROM one_order_product_detail WHERE order_id=$oid)";
		$pResult=mysqli_query($conn,$sql);
		while(($p=mysqli_fetch_assoc($pResult))!==null){
			$order['productList'][]=$p;
		}
		$orderList[]=$order;
	}
	$output['data']=$orderList;
	echo json_encode($output);
?>