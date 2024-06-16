<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateNewsRequest;
use App\Http\Requests\OrganizationMarkerRequest;
use App\OrganizationMarker;
use App\OrganizationNews;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Request;

class OrganizationMarkerController extends Controller
{
  public function readAll(Request $request, string $id)
  {
    $markers = OrganizationMarker::where("idOrganization", $id)->get();
    return response(compact("markers"));
  }
  public function addMarker(OrganizationMarkerRequest $request)
  {
    $data = $request->all();

    try {
      $markers = OrganizationMarker::create([
        'title' => $data['title'],
        'text' => $data['text'],
        'coordinates' => $data['coordinates'],
        'idOrganization' => $data['idOrganization'],
      ]);
    } catch (\Throwable $th) {
      return response($th->getMessage());
    }
    return response(compact("markers"));
  }
  public function oneMarker(Request $request, string $id)
  {
    try {
      $markers = OrganizationMarker::all()->where("id", $id)->first();

      if (!$markers)
        return response("Marker not found", 404);
    } catch (\Throwable $th) {
      return response($th->getMessage());
    }
    return response(compact("markers"));
  }

  public function updateMarker(OrganizationMarkerRequest $request, string $id)
  {
    $data = $request->all();

    try {
      OrganizationMarker::where('id', $id)->update([
        'title' => $data['title'],
        'text' => $data['text'],
        'coordinates' => $data['coordinates'],
        'idOrganization' => $data['idOrganization'],
      ]);
      $marker = OrganizationMarker::find($id);
    } catch (\Throwable $th) {
      return response($th->getMessage());
    }
    return response(compact("marker"));
  }

  public function deleteMarker(Request $request, string $id)
  {
    try {
      $marker = OrganizationMarker::where("id", $id)->delete();
    } catch (\Throwable $th) {
      return response($th->getMessage());
    }
    return response(compact("marker"));
  }
  public function searchAllMarkers(Request $request)
  {
    $data = $request->all();

    try {
      $marker = OrganizationMarker::whereRaw("concat(title, text, coordinates) LIKE ?", ['%' . $data['searchText'] . '%'])->where("idOrganization", $data['idOrganization'])->get();
    } catch (\Throwable $th) {
      return response($th->getMessage());
    }
    return response(compact("marker"));
  }

}