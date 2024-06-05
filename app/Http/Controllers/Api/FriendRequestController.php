<?php

namespace App\Http\Controllers\Api;

use App\Friend;
use App\FriendsRequest;
use App\Http\Controllers\Controller;
use App\Http\Requests\FriendRequestRequest;
use App\Models\User;
use Auth;
use Illuminate\Http\Request;

class FriendRequestController extends Controller
{
  public function getAllOutbox(Request $request)
  {
    $userId = request('userId');

    $friendsRequests = FriendsRequest::where('idSender', $userId)
      ->whereNotIn('state', ['confirmed', 'refused'])
      ->with('recipient') 
      ->get();
    $users = $friendsRequests->map(function ($friendRequest) {
      $recipientData = $friendRequest->recipient->toArray(); 
      $recipientData['friendsRequestId'] = $friendRequest->id;
      return $recipientData;
    });
    return response(compact("users"));
  }

  public function getAllInpox(Request $request)
  {
    $userId = request('userId');

    $friendsRequests = FriendsRequest::where('idRecipient', $userId)
      ->whereNotIn('state', ['confirmed', 'refused'])
      ->with('sender')
      ->get();

    $filteredRequests = $friendsRequests->filter(function ($friendRequest) use ($userId) {
      $senderId = $friendRequest->idSender;
      $areFriends = Friend::where(function ($query) use ($userId, $senderId) {
        $query->where('idOneUser', $userId)
          ->where('idTwoUser', $senderId);
      })->orWhere(function ($query) use ($userId, $senderId) {
        $query->where('idOneUser', $senderId)
          ->where('idTwoUser', $userId);
      })->exists();
      return !$areFriends;
    });

    $users = $filteredRequests->map(function ($friendRequest) {
      $senderData = $friendRequest->sender->toArray();
      $senderData['friendsRequestId'] = $friendRequest->id;
      return $senderData;
    });

    return response(compact("users"));
  }
  public function addFriendRequest(FriendRequestRequest $request)
  {
    $data = $request->all();

    try {
      $friend = FriendsRequest::create([
        'idSender' => $data['idSender'],
        'idRecipient' => $data['idRecipient'],
        'state' => $data['state'],
      ]);
    } catch (\Throwable $th) {
      return response($th->getMessage());
    }
    return response(compact("friend"));
  }
  public function editState(Request $request, string $id)
  {
    $data = $request->all();

    try {
      $friend = FriendsRequest::where('id', $id)->update([
        'state' => $data['state'],
      ]);
    } catch (\Throwable $th) {
      return response($th->getMessage());
    }
    return response(compact("friend"));
  }
  public function deleteOutbox(Request $request, string $id)
  {
    try {
      $friend = FriendsRequest::where("id", $id)->delete();
    } catch (\Throwable $th) {
      return response($th->getMessage());
    }
    return response(compact("friend"));
  }
}
