<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Post;
use App\User;
//use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
    //列表
    public function index() {
        print_r(unserialize('a:1:{s:10:"gcg_god_ib";b:1;}'));



        exit;
        $posts = Post::orderBy('created_at', 'desc')->paginate(6);
        //$posts = Post::orderBy('created_at', 'desc')->first();
        return view('post.index', compact('posts'));
    }

    //详情
    //路由Post模型绑定
    public function show(Post $post) {
        return view('post.show', compact('post'));
    }

    //创建
    public function create() {
        return view('post.create');
    }

    //
    public function store(Request $request) {

       $param = array();
       //$param = request(['title', 'content']);
       //Post::create(request(['title', 'content']));

        //$param['title'] = request('title');
        //$param['content'] = request('content');

        //表单数据验证
        $this->validate($request, [
            'title' => 'required|string|max:100|min:5',
            'content' => 'required|string|min:10',
        ]);
        $userId = \Auth::id();

        $param = array_merge($request->only('title', 'content'), compact('userId'));

        Post::create($param);

        //渲染
        return redirect('/posts');
    }

    //编辑
    public function edit() {
        return view('post.edit');
    }


    public function update() {

    }

    //删除
    public function delete() {

    }

}
