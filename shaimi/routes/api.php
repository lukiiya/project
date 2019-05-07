<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/*Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


Route::get('/user', function(){

});*/

$api = app('Dingo\Api\Routing\Router');

$api->version('v1', [
    'namespace'  => 'App\Http\Controllers\Api',
], function ($api) {
    //Auth Module
    $api->group([
        //'prefix'     => 'auth',
        //'middleware' => 'auth:api',
    ], function ($api) {
        //login
        $api->post('/login', 'AuthController@login');

        //register
        $api->post('/register', 'UsersController@register');
    });


    //User Module
    $api->group([
        'prefix'     => 'user',
        'middleware' => 'auth:api',
    ], function ($api) {
        //$api->post('/register','UsersController@register');
        $api->get('/index','UsersController@index');
    });

});

