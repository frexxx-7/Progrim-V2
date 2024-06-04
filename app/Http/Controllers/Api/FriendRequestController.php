<?php

namespace App\Http\Controllers\Api;

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
      ->with('recipient') // Eager load the recipient relationship
      ->get();
    $users = $friendsRequests->map(function ($friendRequest) {
      $recipientData = $friendRequest->recipient->toArray(); // Convert recipient data to array
      $recipientData['friendsRequestId'] = $friendRequest->id; // Add FriendsRequest ID to the array
      return $recipientData;
    });
    return response(compact("users"));
  }

  public function getAllInpox(Request $request)
  {
    $userId = request('userId');
    $friendsRequests = FriendsRequest::where('idRecipient', $userId)
      ->whereNotIn('state', ['confirmed', 'refused'])
      ->with('sender') // Eager load the recipient relationship
      ->get();
    $users = $friendsRequests->map(function ($friendRequest) {
      $recipientData = $friendRequest->sender->toArray(); // Convert recipient data to array
      $recipientData['friendsRequestId'] = $friendRequest->id; // Add FriendsRequest ID to the array
      return $recipientData;
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
