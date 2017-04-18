<?php
	$loginname = $_REQUEST['loginname'];
	$loginpwd = $_REQUEST['loginpwd'];
	$conn = mysqli_connect(SAE_MYSQL_HOST_M, SAE_MYSQL_USER, SAE_MYSQL_PASS,  SAE_MYSQL_DB, SAE_MYSQL_PORT);
	$sql = "SET NAMES UTF8";
	mysqli_query($conn,$sql);
	$sql = "SELECT * FROM user WHERE uname='$loginname' AND pwd='$loginpwd'";
	$result = mysqli_query($conn,$sql);
	$row = mysqli_fetch_assoc($result);
	if($row===NULL){
		$row["code"] = 0;//登录失败
	}else{
		$row["code"] = 1;//登录成功
	}
	echo json_encode($row);
?>