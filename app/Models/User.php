<?php

namespace App\Models;

use App\Friend;
use App\FriendsRequest;
use App\Message;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends \TCG\Voyager\Models\User implements MustVerifyEmail
{
  use HasApiTokens, HasFactory, Notifiable;

  /**
   * The attributes that are mass assignable.
   *
   * @var array<int, string>
   */
  protected $fillable = [
    'name',
    'email',
    'quote',
    'password',
    'avatar'
  ];

  /**
   * The attributes that should be hidden for serialization.
   *
   * @var array<int, string>
   */
  protected $hidden = [
    'password',
    'remember_token',
  ];

  /**
   * The attributes that should be cast.
   *
   * @var array<string, string>
   */
  protected $casts = [
    'email_verified_at' => 'datetime',
  ];
  public function friendRequestsFromSender()
  {
    return $this->hasMany(FriendsRequest::class, 'idRecipient');
  }
  public function friendsOne()
  {
    return $this->hasMany(Friend::class, 'idOneUser');
  }

  public function friendsTwo()
  {
    return $this->hasMany(Friend::class, 'idTwoUser');
  }
  public function sentMessages()
  {
    return $this->hasMany(Message::class, 'idUserSender');
  }

  public function receivedMessages()
  {
    return $this->hasMany(Message::class, 'idUserRecipient');
  }
}
