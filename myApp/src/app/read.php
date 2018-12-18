<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
include_once './database.php';
include_once './notes.php';

$database = new Database();
$db = $database->getConnection();

$note = new Note($db);

    $stmt = $note->read();
    $num = $stmt->rowCount();
    if($num>0){
        $note_arr = array();
        $note_arr["records"]=array();

        while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
            extract($row);

            $note_item = array(
                "id" => $id;
                "title" => $title;
                "date" => $date;
                "context" => $context;
                "image" => $image;
            );
            array_push($note_arr["records"], $note_item);
        }
        http_response_code(200);

        echo json_encode($note_arr);
    }else{
 
        // set response code - 404 Not found
        http_response_code(404);
     
        // tell the user no products found
        echo json_encode(
            array("message" => "No products found.")
        );
    }
}