<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\FriendRequest;
use App\Models\User;
use Auth;
use Illuminate\Http\Request;

class UserController extends Controller
{
  public function getAll()
  {
    $users = User::all();
    return response(compact("users"));
  }

  public function getAllForFriends(Request $request)
  {
    $userId = request('userId');

    $users = User::whereDoesntHave('friendRequestsFromSender', function ($query) use ($userId) {
      $query->where('idSender', '=', $userId);
    })->whereDoesntHave('friendsOne', function ($query) use ($userId) {
      $query->where('idTwoUser', '=', $userId);
    })->whereDoesntHave('friendsTwo', function ($query) use ($userId) {
      $query->where('idOneUser', '=', $userId);
    })->get();

    return response(compact("users"));
  }

  public function addFriends(FriendRequest $request)
  {
    $data = $request->all();

    try {
      $friend = Friend::create([
        'idOneUser' => $data['idOneUser'],
        'idTwoUser' => $data['idTwoUser'],
      ]);
    } catch (\Throwable $th) {
      return response($th->getMessage());
    }
    return response(compact("friend"));
  }
  public function deleteFriends(Request $request, string $id)
  {
    try {
      $friend = Friend::where("id", $id)->delete();
    } catch (\Throwable $th) {
      return response($th->getMessage());
    }
    return response(compact("friend"));
  }
}
