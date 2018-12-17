<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUserTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user', function (Blueprint $table) {
            $table->increments('userId')->comment('用户id');
            $table->bigInteger('userRight')->comment('用户权限');
            $table->string('tag', 20)->comment('用户标签');
            $table->string('nickName', 20)->comment('昵称');
            $table->string('realName', 20)->comment('真实姓名');
            $table->enum('sex', [0, 1, 2])->comment('性别 0=未知, 1=男性, 2=女性');
            $table->string('country', 20)->comment('国家');
            $table->string('province', 20)->comment('省份');
            $table->string('city', 20)->comment('城市');
            $table->string('phone', 20)->comment('电话');
            $table->string('address', 255)->comment('地址');
            $table->string('identityImg', 255)->comment('身份证照');
            $table->string('businessImg', 255)->comment('营业执照');
            $table->string('remark', 255)->comment('用户备注(专家介绍)');
            $table->integer('spreaderUserId')->comment('所属推广人用户id');
            $table->string('spreaderNickName', 20)->comment('所属推广人昵称');
            $table->string('spreaderRealName', 20)->comment('所属推广人真实姓名');
            $table->tinyInteger('forbid')->comment('是否封号, 0=允许, 1=封号');
            $table->tinyInteger('discard' )->comment('是否被删除, 0=未删除, 1=已删除');
            $table->index('userRight');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user');
    }
}
