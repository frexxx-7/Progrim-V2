<?php

namespace App;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;


class Friend extends Model
{
  protected $fillable = ['idOneUser', 'idTwoUser'];

  public function userOne()
  {
      return $this->belongsTo(User::class, 'idOneUser');
  }

  public function userTwo()
  {
      return $this->belongsTo(User::class, 'idTwoUser');
  }
    
}
