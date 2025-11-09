<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Led;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class LedController extends Controller
{
    // GET /api/led -> devuelve estado
    public function show(): JsonResponse
    {
        // asumimos que hay al menos una fila; si no, crearla
        $led = Led::first();
        if (!$led) {
            $led = Led::create(['is_on' => false]);
        }

        return response()->json([
            'id' => $led->id,
            'is_on' => (bool) $led->is_on,
            'updated_at' => $led->updated_at,
        ]);
    }

    // POST /api/led/toggle -> cambia estado y devuelve nuevo estado
    public function toggle(Request $request): JsonResponse
    {
        $led = Led::first();
        if (!$led) {
            $led = Led::create(['is_on' => false]);
        }

        $led->is_on = ! $led->is_on;
        $led->save();

        return response()->json([
            'id' => $led->id,
            'is_on' => (bool) $led->is_on,
            'updated_at' => $led->updated_at,
        ]);
    }
}
