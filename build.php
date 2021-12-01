<?php
$a = file_get_contents('./config/template.js');
$a1 = json_decode($a);
$b = scandir('./img');



$c = array_filter($b, function($s){return !($s == '.' || $s == '..' || $s == 'palette.png');});
//var_dump($a1);
foreach ($c as $i => $c1) {
	
	$folder_content =  scandir('./img/'.$c1);
	//var_dump('./img/'.$c1);
	$resources =  array_values(array_filter($folder_content, function($s){return !($s == '.' || $s == '..'|| $s == 'Thumbs.db' || $s == 'bad');}));
	$a1->layers[] = [
		'name' => $c1,
		'order' => $i,
		'canvas_size' => 48,
		'canvas_offset' => 0,
		'base_folder' => 'img/'. $c1 . '/',
		'resources' => $resources

	];/*$c1;*/
}

file_put_contents('./config/resources_json.js', 'export default '.json_encode($a1));

?>