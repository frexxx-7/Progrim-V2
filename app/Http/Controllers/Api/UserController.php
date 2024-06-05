<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ChangePasswordRequest;
use App\Http\Requests\EditUserRequest;
use App\Http\Requests\FriendRequest;
use App\Models\User;
use Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

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


  public function editUser(EditUserRequest $request, string $id)
  {
    $data = $request->all();

    if (!empty($data['avatar'])) {
      list($meta, $avatarContent) = explode(',', $data['avatar']);
      $avatarContent = base64_decode($avatarContent);
      $extension = '';
      if (preg_match('/^data:image\/(\w+);base64,/', $data['avatar'], $type)) {
        $extension = strtolower($type[1]); // jpg, png, gif, etc.
      }
      $fileName = Str::random(10) . '.' . $extension;
      $directory = 'users/' . now()->format('FY');
      Storage::disk('public')->put("$directory/$fileName", $avatarContent);
      $avatarPath = "/$directory/$fileName";
    } else {
      $avatarPath = null;
    }

    try {
      User::where('id', $id)->update([
        'name' => $data['name'],
        'email' => $data['email'],
        'quote' => $data['quote'],
        'avatar' => $avatarPath,
      ]);
      $user = User::find($id);
    } catch (\Throwable $th) {
      return response($th->getMessage(), 500);
    }
    return response()->json(['user' => $user, 'message' => 'Данные изменены'], 200);
  }
  public function updatePassword(ChangePasswordRequest $request)
  {
    try {
      $user = $request->user();

      if ($user) {
        if (Hash::check($request->old_password, $user->password)) {
          if ($request->new_password == $request->new_password_confirmation) {
            $user->password = Hash::make($request->new_password);
            $user->save();
            return response()->json(['message' => 'Password changed successfully'], 200);
          } else {
            return response()->json(['error' => 'New password and confirmation do not match'], 400);
          }
        } else {
          return response()->json(['error' => 'Invalid old password'], 400);
        }
      } else {
        return response()->json(['error' => 'Unauthorized'], 401);
      }
    } catch (\Throwable $th) {
      return response($th->getMessage());
    }

  }
  public function loadInfoUser(Request $request, string $id)
  {
    $user = User::where("id", $id)->first();
    return response(compact('user'));
  }

}
