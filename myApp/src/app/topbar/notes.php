<?php
class Note{
 
    // database connection and table name
    private $conn;
    private $table_name = "note";
 
    // object properties
    public $id;
    public $title;
    public $date;
    public $context;
    public $image;
 
    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }
}