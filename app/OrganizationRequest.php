<?php

namespace App;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;


class OrganizationRequest extends Model
{
  protected $fillable = ['idOrganization', 'idUser', 'state'];

  public function user()
  {
    return $this->belongsTo(User::class, 'idUser');
  }
}
