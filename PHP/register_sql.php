<?php
	header("Content-Type:text/html;charset=UTF-8");
	$uname=$_REQUEST['uname'];
	$pwd=$_REQUEST['pwd'];
	$email=$_REQUEST['email'];
	$phonum=$_REQUEST['phonum'];
	$conn = mysqli_connect(SAE_MYSQL_HOST_M, SAE_MYSQL_USER, SAE_MYSQL_PASS,  SAE_MYSQL_DB, SAE_MYSQL_PORT);
	$sql='SET NAMES UTF8';
	mysqli_query($conn,$sql);
	$sql="INSERT INTO user VALUES(NULL,'$uname','$pwd','$email','$phonum')";
	$result=mysqli_query($conn,$sql);
	if($result){echo "true";}else{echo "false";}
?>