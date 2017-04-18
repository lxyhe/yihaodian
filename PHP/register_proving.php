<?php
	header('Content-Type:text/plain;charset=UTF-8');
	$uname=$_REQUEST['uname'];
	$conn = mysqli_connect(SAE_MYSQL_HOST_M, SAE_MYSQL_USER, SAE_MYSQL_PASS,  SAE_MYSQL_DB, SAE_MYSQL_PORT);
	$sql="SET NAMES UTF8";
	mysqli_query($conn,$sql);
	$sql="SELECT uname FROM user WHERE uname='$uname'";
	$result=mysqli_query($conn,$sql);
	$row=mysqli_fetch_assoc($result);
	if($row){echo "true";}else{echo "false";}
?>