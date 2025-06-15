<?php

namespace App\Modules\DLBRegistration;

use InvalidArgumentException;
use Illuminate\Support\Facades\Http;

class GSheetService
{
    /**
     * Check if a value exists in the Google Sheet for a given column.
     */
    public function existsInGoogleSheet($column, $value, $sheet = "Sheet1")
    {
        $apiUrl = config('services.dnd.api_url') . '/check-exists';

        $response = Http::post($apiUrl, [
            'column' => $column,
            'value' => $value,
            'sheet' => $sheet,
        ]);

        if ($response->successful() && $response->json('success') === true) {
            return $response->json('data.exists');
        }
        logger()->error($response->json());
        throw new InvalidArgumentException("We could not process your request, please try again later");
    }

    public function appendToGoogleSheet(array $data, $sheet = "Sheet1")
    {
        $apiUrl = config('services.dnd.api_url') . '/register-dlb';
        $payload = array_merge($data, ['created_at' => now()]);

        $response = Http::post($apiUrl, $payload);
        if (!$response->successful()) {
            logger()->error($response->json());
            throw new InvalidArgumentException("We could not process your request, please try again later");
        }
    }
}
