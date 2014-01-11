<?php
/**
 * Created by PhpStorm.
 * User: Ivan Li
 * Date: 24/11/13
 * Time: 1:44 PM
 */

if (isset($_POST['image_data']) && !empty($_POST['image_data'])) {
    $image_data = $_POST['image_data'];
    $image_data = str_replace('data:image/png;base64,', '', $image_data);
    $image_data = str_replace(' ', '+', $image_data);
    $image_data = base64_decode($image_data);
    $datetime = date('YmdHis');
    $file_name = $datetime;
	
	/*
		directory location where image going to be stored
	*/
    $file_path = "../uploaded_images/";
	
	/*
		scan directory for files with same name
	*/
	$dir_fnames = scandir($file_path);
	if(in_array($file_name . ".png", $dir_fnames))
	{
		$i = 2;
		while(in_array($file_name."(".$i.").png", $dir_fnames))
		{
			$i++;
		}
		$file_name .= "(".$i.").png";
	}
	else
	{
		$file_name .= ".png";
	}
	
	/*
		write image file
	*/
    file_put_contents($file_path.$file_name, $image_data);
	
    echo json_encode("image upload successful");
} else {
    echo json_encode("image upload failed");
}