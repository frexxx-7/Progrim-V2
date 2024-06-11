<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\EditOrganizationRequest;
use App\Organization;
use Illuminate\Http\Request;

class OrganizationsController extends Controller
{
  public function getAll()
  {
    $organizations = Organization::all();
    return response(compact("organizations"));
  }
  public function addOrganization(EditOrganizationRequest $request)
  {
    $data = $request->all();

    try {
      $organization = Organization::create([
        'name' => $data['name'],
        'idUser' => $data['idUser'],
        'icon' => $data['icon'],
        'address' => $data['address'],
        'numberPhone' => $data['numberPhone'],
      ]);
    } catch (\Throwable $th) {
      return response($th->getMessage(), 500);
    }
    return response()->json(['organization' => $organization, 'message' => 'Данные изменены'], 200);
  }
  public function editOrganization(EditOrganizationRequest $request, string $id)
  {
    $data = $request->all();

    try {
      Organization::where('id', $id)->update([
        'name' => $data['name'],
        'idUser' => $data['idUser'],
        'icon' => $data['icon'],
        'address' => $data['address'],
        'numberPhone' => $data['numberPhone'],
      ]);
      $organization = Organization::find($id);
    } catch (\Throwable $th) {
      return response($th->getMessage(), 500);
    }
    return response()->json(['organization' => $organization, 'message' => 'Данные изменены'], 200);
  }

  public function loadInfoOrganization(Request $request, string $id)
  {
    $organization = Organization::where("id", $id)->first();
    return response(compact('organization'));
  }
}
