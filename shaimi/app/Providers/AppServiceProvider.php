<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

//--迁移时出错
use Illuminate\Support\Facades\Schema;
//--

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //--版本问题，迁移时出错
        Schema::defaultStringLength(191);
        //
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
