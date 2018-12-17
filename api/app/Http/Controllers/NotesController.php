<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Notes;
class NotesController extends Controller
{
    public function index($userId)
    {
        return Notes::Where('user_id', $userId)->get();
    }

    public function show(Notes $note)
    {
        return $note;
    }

    public function store(Request $request)
    {
        return response()->json(Notes::create($request->all()), 201);
    }

    public function update(Request $request, Notes $note)
    {
        $note->update($request->all());

        return response()->json($note, 200);
    }

    public function delete(Notes $note)
    {
        $note->delete();

        return response()->json(null, 204);
    }
}
