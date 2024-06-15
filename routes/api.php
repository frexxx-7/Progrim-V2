<?php
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\FriendController;
use App\Http\Controllers\Api\FriendRequestController;
use App\Http\Controllers\Api\MessagesController;
use App\Http\Controllers\Api\OrganizationNewsController;
use App\Http\Controllers\Api\OrganizationRequestController;
use App\Http\Controllers\Api\OrganizationsController;
use App\Http\Controllers\Api\ParticipantController;
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
Route::post('/editOrganization/{id}', [OrganizationsController::class, 'editOrganization']);
Route::get('/loadInfoOrganization/{id}', [OrganizationsController::class, 'loadInfoOrganization']);

Route::post('/addOrganizationRequest', [OrganizationRequestController::class, 'addOrganizationRequest']);
Route::post('/checkOrganizationRequest', [OrganizationRequestController::class, 'checkOrganizationRequest']);
Route::post('/loadInfoRequests', [OrganizationRequestController::class, 'getAllInpox']);
Route::post('/applyRequestOrganization', [OrganizationRequestController::class, 'applyRequestOrganization']);

Route::post('/loadInfoParticipant', [ParticipantController::class, 'getAllParticipant']);
Route::post('/deleteParticipant', [ParticipantController::class, 'deleteParticipant']);

Route::get('/organization/{id}/news', [OrganizationNewsController::class, 'readAll']);
Route::post('/organization/addNews', [OrganizationNewsController::class, 'addNews']);
Route::get('/organization/news/{id}', [OrganizationNewsController::class, 'oneNews']);
Route::post('/organization/editNews/{id}', [OrganizationNewsController::class, 'updateNews']);
Route::get('/organization/deleteNews/{id}', [OrganizationNewsController::class, 'deleteNews']);
Route::post('/organization/searchAllNews', [OrganizationNewsController::class, 'searchAllNews']);
