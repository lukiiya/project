<?php

namespace App;

use App\Model;

class Post extends Model
{
    //-- 不可以注入的字段,写在基类里
    //protected $guarded = [];

    //可以注入的字段
    //protected $fillable;

    //指定模型绑定字段
   /*public function getRouteKeyName()
    {
        return 'user_id';
    }*/

   //--Post模型的外键user_id是User主键-->定义反向关联

    public function user()
    {
        return $this->belongsTo('App\User', 'user_id', 'id');
    }


}
