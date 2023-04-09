<?php

require __DIR__ . '/vendor/autoload.php';



use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$secret = 'gzyeflgsm674*&';

$routes=[

    "/login"=>function(){
        $username=$_POST['login'];

        $password=$_POST['password'];
        global $db;
        $stmt= $db->prepare("select * from users WHERE email = ? AND password=?");
        $stmt->execute([$username,$password]);
        $ids =$stmt -> fetchAll();
        if(count($ids)!==1){
            http_response_code(400);
            return;
        }
        
        $userId = $ids[0];
        $expiration = time() + 3600;
        $issuedAt= time();

        $data=[
            'id'=>$userId,
            'exp'=>$expiration,
            'iat'=>$issuedAt
        ];
        
        global $secret;
        $token = JWT::encode(
            $data,
            $secret,
            'HS512'
        );

        return $token;
    },

    "/signUp"=>function(){
        //TODO
    },

    "/logout"=>function(){
        //TODO
    },

    "/postList"=>function(){
        //TODO
    },

    "/getLists"=>function(){
        //TODO
    },

    "/getList/([0-9]+)"=>function($id){
        //TODO
    },

    "/updateList/([0-9]+)"=>function($id){
        //TODO
    },

    "/deleteList/([0-9]+)"=>function($id){
        //TODO
    },

    "/([0-9]+)/postTask"=>function($id){
        //TODO
    },

    "/([0-9]+)/getTasks"=>function($id){
        //TODO
    },

    "/([0-9]+)/updateTask/([0-9]+)"=>function($id){
        //TODO
    },

    "/([0-9]+)/deleteTask/([0-9]+)"=>function($id){
        //TODO
    },

    "/([0-9]+)/([0-9]+)/postStep"=>function($id){
        //TODO
    },

    "/([0-9]+)/([0-9]+)/getSteps"=>function($id){
        //TODO
    },

    "/([0-9]+)/([0-9]+)/updateStep/([0-9]+)"=>function($id){
        //TODO
    },

    "/([0-9]+)/([0-9]+)/deleteStep/([0-9]+)"=>function($id){
        //TODO
    },

    "/updatePassword"=>function(){
        //TODO
    }

];

foreach ($routes as $route => $endpoint){
    if(preg_match_all("#^$route$#",$_SERVER['PATH_INFO'],$matches)){
        
        echo json_encode(call_user_func_array($endpoint, $matches));

        exit;
    }
};

http_response_code(404);
echo json_encode([
    "err"=>"endpoint_does_not_exist"
]);