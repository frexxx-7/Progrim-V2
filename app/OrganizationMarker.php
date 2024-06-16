<?php

namespace App;

use Illuminate\Database\Eloquent\Model;


class OrganizationMarker extends Model
{
  protected $fillable = ['title', 'text', 'coordinates', 'idOrganization'];
}
