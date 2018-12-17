<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

//列表页
Route::get('/posts', 'PostController@index');

//详情页
Route::get('/posts/{post}', 'PostController@show');

//创建文章
Route::get('/posts/create', 'PostController@create');

Route::post('/posts/store', 'PostController@store');

Route::post('/posts/{post}/edit', 'PostController@edit');

Route::put('/posts/{post}', 'PostController@update');

//删除文章
Route::get('/posts/delete', 'PostController@delete');


//--用户模块
//--注册页面
Route::get('/register', 'RegisterController@index');
//注册行为
Route::post('/register', 'RegisterController@register');


//--登入页面
Route::get('/login', 'LoginController@index');
//登入行为
Route::post('/login', 'LoginController@login');


//--登出
Route::get('/logout', 'LoginController@logout');


Route::get('/user/setting', 'UserController@setting');
Route::post('/user/setting', 'UserController@settingStore');