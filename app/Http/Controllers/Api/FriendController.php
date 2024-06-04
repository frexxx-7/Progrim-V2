<?php

namespace App\Http\Controllers\Api;

use App\Friend;
use App\Http\Controllers\Controller;
use App\Http\Requests\FriendRequest;
use App\Models\User;
use Auth;
use Illuminate\Http\Request;

class FriendController extends Controller
{
  public function getAll(Request $request)
  {
    $userId = request('userId');

    $friends = Friend::where('idOneUser', $userId)
      ->orWhere('idTwoUser', $userId)
      ->with(['userOne', 'userTwo'])
      ->get();

    $friendsInfo = $friends->map(function ($friend) use ($userId) {
      if ($friend->idOneUser == $userId) {
        return $friend->userTwo;
      } else {
        return $friend->userOne;
      }
    });

    return response()->json($friendsInfo);
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
    $userId = request('userId');

    try {
      $friend = Friend::where("idOneUser", $id)->where("idTwoUser", $userId)->delete();
      $friend = Friend::where("idTwoUser", $id)->where("idOneUser", $userId)->delete();
    } catch (\Throwable $th) {
      return response($th->getMessage());
    }
    return response(compact("friend"));
  }
}
