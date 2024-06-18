<?php

namespace App;

use Illuminate\Database\Eloquent\Model;


class MessageFilesList extends Model
{
  protected $fillable = ['idMessage', 'idFile'];
}
