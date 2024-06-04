<?php

namespace App\Http\Controllers\Api;

use App\Chat;
use App\Http\Controllers\Controller;
use App\Http\Requests\MessageRequest;
use App\Message;
use App\Models\User;
use Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MessagesController extends Controller
{
  public function getAllChats(Request $request)
  {
    $userId = request('userId');

    $latestMessages = Message::select(DB::raw('MAX(id) as id'))
      ->where('idUserRecipient', $userId)
      ->orWhere('idUserSender', $userId)
      ->groupBy(DB::raw('GREATEST(idUserSender, idUserRecipient), LEAST(idUserSender, idUserRecipient)'))
      ->pluck('id');

    $messages = Message::whereIn('id', $latestMessages)
      ->with(['sender', 'recipient'])
      ->get();

    $chats = [];

    foreach ($messages as $message) {
      if ($message->idUserRecipient == $userId) {
        $chatUser = $message->sender;
      } else {
        $chatUser = $message->recipient;
      }

      $chats[] = [
        'message' => $message,
        'chatUser' => $chatUser,
      ];
    }

    return response()->json($chats);
  }

  public function getAllMessagesInChat(Request $request)
  {
    $userId = $request->input('userId');
    $userTwoId = $request->input('userTwoId');

    $messages = Message::where(function ($query) use ($userId, $userTwoId) {
      $query->where('idUserSender', $userId)
        ->where('idUserRecipient', $userTwoId);
    })
      ->orWhere(function ($query) use ($userId, $userTwoId) {
        $query->where('idUserRecipient', $userId)
          ->where('idUserSender', $userTwoId);
      })
      ->with(['sender', 'recipient'])
      ->orderBy('created_at', 'asc')
      ->get();

    return response()->json($messages);
  }

  public function addMessages(MessageRequest $request)
  {
    $data = $request->all();

    try {
      //if (empty($data['idChat'])) {
      //  $chat = Chat::create([
      //    'discription' => $data['dev'],
      //  ]);
      //  $data['idChat'] = $chat->id;
      //}

      $message = Message::create([
        'idUserSender' => $data['idUserSender'],
        'idUserRecipient' => $data['idUserRecipient'],
        'text' => $data['text'],
        //'idChat' => $data['idChat'],
      ]);
    } catch (\Throwable $th) {
      return response($th->getMessage());
    }

    return response(compact("message"));
  }
}
