<?php

namespace App;

use Illuminate\Database\Eloquent\Model;


class Organization extends Model
{
  protected $fillable = ['name', 'idUser', 'icon', 'address', 'numberPhone'];
}
