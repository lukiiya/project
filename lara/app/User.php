<?php

namespace App;

use App\Model;

//--使用laravel的auth门面类必须继承这个类
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{

    //--不生成时间字段数据
    //public $timestamps = false;

    protected $fillable = ['name', 'email', 'password'];

}
