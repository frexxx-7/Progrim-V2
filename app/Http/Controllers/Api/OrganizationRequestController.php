<?php

namespace App\Http\Controllers\Api;

use App\Friend;
use App\FriendsRequest;
use App\Http\Controllers\Controller;
use App\Http\Requests\FriendRequestRequest;
use App\Http\Requests\OrganizationRequestRequest;
use App\Models\User;
use App\Organization;
use App\OrganizationRequest;
use App\ParticipantOrganization;
use Auth;
use Illuminate\Http\Request;

class OrganizationRequestController extends Controller
{
  public function getAllOutbox(Request $request)
  {
    $userId = request('idUser');

    $organizationRequests = OrganizationRequest::where('idUser', $userId)
      ->whereNotIn('state', ['confirmed', 'refused'])
      ->with('recipient')
      ->get();

    $users = $organizationRequests->map(function ($organizationRequest) {
      $recipientData = $organizationRequest->recipient->toArray();
      $recipientData['friendsRequestId'] = $organizationRequest->id;
      return $recipientData;
    });

    return response(compact("users"));
  }

  public function getAllInpox(Request $request)
  {
    $organizationId = request('idOrganization');

    $requests = OrganizationRequest::where('idOrganization', $organizationId)
      ->whereNotIn('state', ['confirmed', 'refused'])
      ->with('user')
      ->get();

    return response(compact('requests'));
  }
  public function addOrganizationRequest(OrganizationRequestRequest $request)
  {
    $data = $request->all();

    try {
      $organizationRequest = OrganizationRequest::create([
        'idOrganization' => $data['idOrganization'],
        'idUser' => $data['idUser'],
        'state' => $data['state'],
      ]);
    } catch (\Throwable $th) {
      return response($th->getMessage());
    }
    return response(compact("organizationRequest"));
  }

  public function checkOrganizationRequest(OrganizationRequestRequest $request)
  {
    $data = $request->all();

    try {
      $organizationRequest = OrganizationRequest::where('idOrganization', $data['idOrganization'])->where('idUser', $data['idUser'])->first();
    } catch (\Throwable $th) {
      return response($th->getMessage());
    }
    return response(compact("organizationRequest"));
  }
  public function applyRequestOrganization(Request $request)
  {
    $data = $request->all();

    try {
      $organizationRequest = OrganizationRequest::where('idOrganization', $data['idOrganization'])->where('idUser', $data['idUser'])->update([
        'state' => "confirmed",
      ]);
    } catch (\Throwable $th) {
      return response($th->getMessage());
    }

    $participantOrganization = ParticipantOrganization::create([
      'idOrganization' => $data['idOrganization'],
      'idUser' => $data['idUser'],
      'role' => 'participant',
    ]);
    return response(compact("participantOrganization"));
    
  }
  public function deleteOutbox(Request $request, string $id)
  {
    try {
      $organization = OrganizationRequest::where("id", $id)->delete();
    } catch (\Throwable $th) {
      return response($th->getMessage());
    }
    return response(compact("organization"));
  }
}
