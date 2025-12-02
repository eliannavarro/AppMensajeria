<?php
// app/Http/Middleware/CheckRole.php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CheckRole
{
    public function handle(Request $request, Closure $next, $role)
    {
        // Verificar que el usuario está autenticado de otra manera
        if (!$request->user()) {
            return response()->json(['message' => 'No autenticado'], 401);
        }

        // Verificar el rol
        $user = $request->user();
        if ($user->role !== $role) {
            return response()->json([
                'message' => 'No tienes permisos para esta acción'
            ], 403);
        }

        return $next($request);
    }
}