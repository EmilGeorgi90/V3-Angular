<?php

use Illuminate\Http\Request;
use App\Note;
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

Route::get('notes', function() {
    // If the Content-Type and Accept headers are set to 'application/json', 
    // this will return a JSON structure. This will be cleaned up later.
    return Note::all();
});
 
Route::get('notes/{id}', function($id) {
    return Note::find($id);
});

Route::post('notes', function(Request $request) {
    return Note::create($request->all);
});

Route::put('notes/{id}', function(Request $request, $id) {
    $article = Note::findOrFail($id);
    $article->update($request->all());

    return $article;
});

Route::delete('notes/{id}', function($id) {
    Note::find($id)->delete();

    return 204;
});