<?php

namespace App;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class FriendsRequest extends Model
{
  use HasFactory;
  protected $fillable = ['idSender', 'idRecipient', 'state'];

    // Define the relationship with the User model
    public function recipient()
    {
        return $this->belongsTo(User::class, 'idRecipient');
    }
    public function sender()
    {
        return $this->belongsTo(User::class, 'idSender');
    }
}
