<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
//use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    //
    public function index()
    {
        return view('login.index');
    }

    public function login(Request $request)
    {
        $this->validate($request, [
            'email' => 'required|email',
            'password' => 'required|min:5|max:10',
            'is_remember' => 'integer'
        ]);
        //--获取数据
        //--$request->input('***', default);
        //--$request->only();

        $user = $request->only('email', 'password');
        $is_remember = boolval($request->input('is_remember'));

        if (\Auth::attempt($user, $is_remember)) {
            return redirect('/posts');
        }

        return \Redirect::back()->withErrors("邮箱密码不匹配");
    }

    public function logout()
    {
        \Auth::logout();
        return redirect('/login');
    }
}
