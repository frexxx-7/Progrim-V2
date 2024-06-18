<?php

namespace App;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Message extends Model
{
  use HasFactory;

  protected $fillable = [
    'idUserRecipient',
    'idUserSender',
    'text',
    'idChat'
  ];

  public function sender()
  {
    return $this->belongsTo(User::class, 'idUserSender');
  }

  public function recipient()
  {
    return $this->belongsTo(User::class, 'idUserRecipient');
  }
  public function files()
  {
    return $this->hasManyThrough(
      MessageFile::class,
      MessageFilesList::class,
      'idMessage',
      'id',
      'id',
      'idFile'
    );
  }
}
