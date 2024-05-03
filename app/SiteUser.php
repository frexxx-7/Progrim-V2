<?php

namespace App;

use Illuminate\Database\Eloquent\Model;


class SiteUser extends Model
{
    public $table="siteusers";
    protected $fillable = ['id', 'login', 'password', 'avatar'];
}
