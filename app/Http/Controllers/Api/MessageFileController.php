<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Message;
use App\MessageFile;
use App\MessageFilesList;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class MessageFileController extends Controller
{
  public function upload(Request $request)
    {
        $request->validate([
            'file' => 'required|file|max:20480',
            'idMessage' => 'required|integer',
        ]);

        $file = $request->file('file');
        $path = $file->store('message_files', 'public');

        $messageFile = MessageFile::create(['pathFile' => $path]);

        MessageFilesList::create([
            'idMessage' => $request->idMessage,
            'idFile' => $messageFile->id,
        ]);

        return response()->json(['file' => $messageFile, 'message' => 'File uploaded successfully'], 200);
    }
    public function download($id)
    {
        $file = MessageFile::findOrFail($id);
        return Storage::disk('public')->download($file->pathFile);
    }
}
