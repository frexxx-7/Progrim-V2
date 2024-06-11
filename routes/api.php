<?php
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\FriendController;
use App\Http\Controllers\Api\FriendRequestController;
use App\Http\Controllers\Api\MessagesController;
use App\Http\Controllers\Api\OrganizationsController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->group(function () {
  Route::get('/user', function (Request $request) {
    return $request->user();
  });

  Route::post('/logout', [AuthController::class, 'logout']);
  Route::post('/updatePassword', [UserController::class, 'updatePassword']);
});

Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/signin', [AuthController::class, 'signin']);

Route::post('/friends', [FriendController::class, 'getAll']);
Route::post('/addFriend', [FriendController::class, 'addFriends']);
Route::post('/deleteFriend/{id}', [FriendController::class, 'deleteFriends']);

Route::get('/users', [UserController::class, 'getAll']);
Route::post('/getAllForFriends', [UserController::class, 'getAllForFriends']);
Route::post('/editProfile/{id}', [UserController::class, 'editUser']);
Route::get('/loadInfoUser/{id}', [UserController::class, 'loadInfoUser']);
Route::post('/updateAdditionalInfo/{id}', [UserController::class, 'editUserAdditionalInfo']);

Route::post('/friendsRequestInbox', [FriendRequestController::class, 'getAllInpox']);
Route::post('/friendsRequestOutbox', [FriendRequestController::class, 'getAllOutbox']);
Route::post('/addFriendRequest', [FriendRequestController::class, 'addFriendRequest']);
Route::post('/editState/{id}', [FriendRequestController::class, 'editState']);
Route::get('/deleteFriendRequest/{id}', [FriendRequestController::class, 'deleteOutbox']);

Route::post('/messages', [MessagesController::class, 'getAllChats']);
Route::post('/getAllMessagesInChat', [MessagesController::class, 'getAllMessagesInChat']);
Route::post('/addMessages', [MessagesController::class, 'addMessages']);

Route::get('/organizations', [OrganizationsController::class, 'getAll']);
Route::post('/addOrganization', [OrganizationsController::class, 'addOrganization']);
Route::post('/editOrganization', [OrganizationsController::class, 'editOrganization']);
Route::get('/loadInfoOrganization', [OrganizationsController::class, 'loadInfoOrganization']);
