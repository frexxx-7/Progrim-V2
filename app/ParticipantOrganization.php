<?php

namespace App;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;


class ParticipantOrganization extends Model
{
  protected $fillable = ['idOrganization', 'idUser', 'role'];
  public function user()
  {
    return $this->belongsTo(User::class, 'idUser');
  }
}
