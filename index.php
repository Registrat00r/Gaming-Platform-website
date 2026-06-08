<?php
    if ($_SERVER['REQUEST_METHOD'] === 'POST'){
        $response = ['success' => false];

        $login = trim($_POST['login'] ?? '');
        $pass = $_POST['pass'];
        $passRepeat = $_POST['pass_repeat']; 
        $email = trim($_POST['email'] ?? '');
        
        $formType = $_POST('form_type') ?? '';

        if (empty($login) || empty($pass) || ($formType === 'signup' && empty($email))) {
            $response['message'] = 'Заполните все поля!';
            echo json_encode($response);
            exit;
        }

        $file = 'users.txt';

        $users = file_exists($file) ? json_decode(file_get_contents($file), true) : [];

        if (!is_array($users)) $users = [];

        if ($formType === 'signup'){

            if ($pass !== $passRepeat){
                $response['message'] = 'Пароли не совпадают!';
                echo json_encode($response);
                exit;
            }

            foreach ($users as $existing){
                if ($existing['username'] === $login){
                    $response['message'] = 'Пользователь с таким именем уже существует';
                    echo $json_encode($response);
                    exit;
                }

                if ($existing['email'] === $email){
                    $response['message'] = 'Пользователь с такой почтой уже существует';
                    echo $json_encode($response);
                    exit;
                }
            }
            $newUser = [
                'username' => $login,
                'password' => $pass, 
                'email' => $email,
                'timestamp' => date('Y-m-d H:i:s'),
            ];
            $users[] = $newUser;
        
            file_put_contents($file, json_encode($users, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

            $response['success'] = true;
            $response['user'] = $newUser;
            echo json_encode($response);
            exit;

        }

            if ($formType === 'login') {
            foreach ($users as $existing) {
                if ($existing['username'] === $login && $existing['password'] === $pass) {
                    $response['success'] = true;
                    $response['user'] = $existing;
                    echo json_encode($response);
                    exit;
                }
        }
        $response['message'] = 'Неверный логин или пароль.';
        echo json_encode($response);
        exit;
    }

    $response['message'] = 'Неверный тип формы.';
    echo json_encode($response);
    exit;
}
?>