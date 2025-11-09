<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\LedController;

Route::get('led', [LedController::class, 'show']);
Route::post('led/toggle', [LedController::class, 'toggle']);
