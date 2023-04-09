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
        $stmt= $db->prepare("select * from users WHERE email=? AND password=?");
        $stmt->execute([$username,$password]);
        $ids =$stmt -> fetchAll();
        if(count($ids)!==1){
            http_response_code(400);
            echo json_encode([
                "err"=>"mauvais identifiants"
            ]);
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
        $username=$_POST['login'];
        $password=$_POST['password'];
        $passwordCheck=$_POST['passwordCheck'];
        if(!isset($username) || !isset($password) || !isset($passwordCheck)){
            http_response_code(400);
            echo json_encode([
                "err"=>"merci de remplir toutes les cases du formulaire"
            ]);
            return;
        }
        if($password !== $passwordCheck){
            http_response_code(400);
            echo json_encode([
                "err"=>"les mots de passe ne correspondent pas"
            ]);
            return;
        }
        global $db;
        $stmt=$db->prepare("select count(*) from users where email=?");
        $stmt->execute([$username]);
        $sameUsername= $stmt->fetchAll();
        if(count($sameUsername)!=0){
            http_response_code(400);
            echo json_encode([
                "err"=>"un compte est déjà associé à cet email"
            ]);
            return;
        }
        $stmt=$db->prepare("intert into users (email,password) values (?,?)");
        $stmt->execute([$username,$password]);
    },

    "/logout"=>function(){
        //TODO
    },

    "/postList"=>function(){
        if(isset($_POST['list']) && isset($_SERVER['HTTP_AUTHORIZATION'])){
            $jwt=$_SERVER['HTTP_AUTHORIZATION'];
            global $secret;
            $token = JWT::decode($jwt, new Key($secret, 'HS256'));
            $now = new DateTimeImmutable();
            if (
                $token->exp < $now->getTimestamp()||
                $token->iat > $now->getTimestamp() )
            {
                header('HTTP/1.1 401 Unauthorized');
                exit;
            }
            $list=$_POST['list'];
            $userId=$token->id;
            $stmt= $db->prepare("insert into lists (userId, listName) values (?,?)");
            $stmt->execute([$userId, $list]);
        }
        else{
            http_response_code(500);
        }
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