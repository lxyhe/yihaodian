<?php
	header('Content-Type:text/html;charset=UTF-8');
	$key=$_REQUEST['key'];
	$db=['ada','basic','c++','c#','delphi','efficient-c','go','jave','js','javascript','jsp',
	'lamda','mongodb','mysql','nodejs','objective-c','pascal','perl','python','php','ruby','script','cs.net','tive-c','visiual-basic'];
	foreach($db as $v){
		if(strpos($v,$key)!==FALSE){
			echo "<li>$v</li>";
		}
	}
?>