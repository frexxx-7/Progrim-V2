<?php

use Illuminate\Support\Facades\Route;

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
Route::group(['prefix' => 'admin'], function () {
  Voyager::routes();
});

Route::get('/', function () {
  return view('index');
});

Route::get('/env', function () {
  return response()->json([
    'env' => $_ENV,
  ]);
});

Route::get('/{any}', function () {
  return view('index');
})->where('any', '.*');

Route::get('email/verify/{id}/{hash}', fn () => 'verify')->middleware(['auth', 'signed'])->name('verification.verify'); 

