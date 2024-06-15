<?php

namespace App;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;


class OrganizationNews extends Model
{
  protected $fillable = [
    'title',
    'content',
    'image',
    'is_published',
    'idOrganization'
  ];

}
