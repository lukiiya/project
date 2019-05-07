<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;

use Illuminate\Validation\Rule;

class UsersController extends ApiController
{
    public function register(Request $request) {
        $this->validate($request, [
            'name'       => 'required',
            'password'   => 'required|between:8,20|alpha_num',
            'email'      => 'required|email'
            //'email'      => 'required|exists:users,email'     //必須在數據庫中存在email
            /*'email' => [
                'required',
                Rule::exists('users')->where('status', 'access'),
                ]*/
        ]);

        $user = new User();
        $user->name = $request->name;
        $user->password = bcrypt($request->password);
        $user->email = $request->email;
        $user->save();

        //注冊之後實現登入
    }


    //
    public function index() {
        $user = auth('api')->user();    //通过guard门户获取登入者用户信息


        return $this->response->array(['data' => $user]);
    }

}
