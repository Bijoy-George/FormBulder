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

// Route::get('/', function () {
//     return view('welcome');
// });

Route::get('/', function () {
    return view('dashboard');
})->middleware(['auth'])->name('dashboard');

Route::resource('settings','App\Http\Controllers\SettingsController');
Route::post('list-inputs','App\Http\Controllers\SettingsController@listInput');
Route::get('add-field-options','App\Http\Controllers\SettingsController@addOptions');
Route::post('/get_all_options','App\Http\Controllers\SettingsController@getAllOptions'); 
Route::post('/save_options','App\Http\Controllers\SettingsController@saveOptions')->name('save_options'); 
Route::get('/view-form','App\Http\Controllers\SettingsController@viewRegistrationForm'); 


require __DIR__.'/auth.php';
