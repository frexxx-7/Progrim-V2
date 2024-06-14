<?php

namespace App;

use Illuminate\Database\Eloquent\Model;


class ParticipantOrganization extends Model
{
  protected $fillable = ['idOrganization', 'idUser', 'role'];
    
}
