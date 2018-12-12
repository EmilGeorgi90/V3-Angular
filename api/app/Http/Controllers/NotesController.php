<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Notes;
class NotesController extends Controller
{
    public function index()
    {
        return Notes::all();
    }

    public function show(Notes $note)
    {
        return $note;
    }

    public function store(Request $request)
    {
        $Note = Note::create($request->all());

        return response()->json($note, 201);
    }

    public function update(Request $request, Note $note)
    {
        $note->update($request->all());

        return response()->json($note, 200);
    }

    public function delete(Note $note)
    {
        $note->delete();

        return response()->json(null, 204);
    }
}
