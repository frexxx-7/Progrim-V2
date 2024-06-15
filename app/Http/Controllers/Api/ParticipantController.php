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

class ParticipantController extends Controller
{
  public function addParticipant(OrganizationRequestRequest $request)
  {
    $data = $request->all();

    try {
      $participant = ParticipantOrganization::create([
        'idOrganization' => $data['idOrganization'],
        'idUser' => $data['idUser'],
        'state' => $data['state'],
      ]);
    } catch (\Throwable $th) {
      return response($th->getMessage());
    }
    return response(compact("participant"));
  }

  public function getAllParticipant(Request $request){
    try {
      $data = $request->all();
      
      $participant = ParticipantOrganization::where("idOrganization", $data["idOrganization"])->with('user')->get();
    } catch (\Throwable $th) {
      return response($th->getMessage());
    }
    return response(compact("participant"));
  }

  public function deleteParticipant(Request $request)
  {
    $data = $request->all();

    try {
      $participant = ParticipantOrganization::where("idOrganization", $data["idOrganization"])->where("idUser", $data["idUser"])->delete();
    } catch (\Throwable $th) {
      return response($th->getMessage());
    }
    return response(compact("participant"));
  }
}
