<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

class RegisterController extends Controller
{
    //
    public function index() {

        return view('register.index');
    }

    //注册行为
    public function register() {

        $this->validate(\request(), [
           'name' => 'required|min:3|unique:users,name',
            'email' => 'required|unique:users,email|email',
            'password' => 'required|min:5|max:10|confirmed',
        ]);

        /*$param = array();
        $param['name'] = request('name');
        $param['email'] = request('email');
        $param['password'] = bcrypt(request('password'));
        User::create($param);*/

        $name = \request('name');
        $email = \request('email');
        $password = bcrypt(\request('password'));

        User::create(compact('name', 'email', 'password'));
        return redirect('/login');
    }
}
