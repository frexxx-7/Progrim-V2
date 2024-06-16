<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class OrganizationMarkerRequest extends FormRequest
{

  /**
   * Get the validation rules that apply to the request.
   *
   * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
   */
  public function rules(): array
  {
    return [
      'title' => ["string", "nullable"],
      'text' => ["string", "nullable"],
      'coordinates' => ["string", "nullable"],
      'idOrganization' => ["integer", 'nullable'],
    ];
  }
}