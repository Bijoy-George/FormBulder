<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Helpers;

class CheckPermission
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next, $permission)
    {
        if(Helpers::check_permissions($permission)){
            return $next($request);
        }

        return redirect('/');
    }
}
