<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateNewsRequest;
use App\Models\News;
use App\OrganizationNews;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Request;

class OrganizationNewsController extends Controller
{
  public function readAll(Request $request, string $id)
  {
    $news = OrganizationNews::where("idOrganization", $id)->get();
    return response(compact("news"));
  }
  public function addNews(CreateNewsRequest $request)
  {
    $data = $request->all();
    if (!empty($data['image'])) {
      list($meta, $avatarContent) = explode(',', $data['image']);
      $avatarContent = base64_decode($avatarContent);
      $extension = '';
      if (preg_match('/^data:image\/(\w+);base64,/', $data['image'], $type)) {
        $extension = strtolower($type[1]); // jpg, png, gif, etc.
      }
      $fileName = Str::random(10) . '.' . $extension;
      $directory = 'organization-news/' . now()->format('FY');
      Storage::disk('public')->put("$directory/$fileName", $avatarContent);
      $avatarPath = "/$directory/$fileName";
    } else {
      $avatarPath = null;
    }
    try {
      $news = OrganizationNews::create([
        'title' => $data['title'],
        'content' => $data['content'],
        'image' => $avatarPath,
        'is_published' => $data['is_published'],
        'idOrganization' => $data['idOrganization'],
      ]);
    } catch (\Throwable $th) {
      return response($th->getMessage());
    }
    return response(compact("news"));
  }
  public function oneNews(Request $request, string $id)
  {
    try {
      $news = OrganizationNews::all()->where("id", $id)->first();

      if (!$news)
        return response("News not found", 404);
    } catch (\Throwable $th) {
      return response($th->getMessage());
    }
    return response(compact("news"));
  }

  public function updateNews(CreateNewsRequest $request, string $id)
  {
    $data = $request->all();
    $news = OrganizationNews::find($id);

    if ($news->image == $data["image"]) {
      $avatarPath = $news->image;
    } else
      if (!empty($data['image'])) {
        list($meta, $avatarContent) = explode(',', $data['image']);
        $avatarContent = base64_decode($avatarContent);
        $extension = '';
        if (preg_match('/^data:image\/(\w+);base64,/', $data['image'], $type)) {
          $extension = strtolower($type[1]); // jpg, png, gif, etc.
        }
        $fileName = Str::random(10) . '.' . $extension;
        $directory = 'organization-news/' . now()->format('FY');
        Storage::disk('public')->put("$directory/$fileName", $avatarContent);
        $avatarPath = "/$directory/$fileName";
      } else {
        $avatarPath = null;
      }
    try {
      OrganizationNews::where('id', $id)->update([
        'title' => $data['title'],
        'content' => $data['content'],
        'image' => $avatarPath,
        'is_published' => $data['is_published'],
      ]);
      $news = OrganizationNews::find($id);
    } catch (\Throwable $th) {
      return response($th->getMessage());
    }
    return response(compact("news"));
  }

  public function deleteNews(Request $request, string $id)
  {
    try {
      $news = OrganizationNews::where("id", $id)->delete();
    } catch (\Throwable $th) {
      return response($th->getMessage());
    }
    return response(compact("news"));
  }
  public function searchAllNews(Request $request)
  {
    $data = request('searchText');

    try {
      $news = OrganizationNews::whereRaw("concat(title, content) LIKE ?", ['%' . $data . '%'])->get();
    } catch (\Throwable $th) {
      return response($th->getMessage());
    }
    return response(compact("news"));
  }

}