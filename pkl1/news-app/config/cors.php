<?php
return [

    /*
    |--------------------------------------------------------------------------
    | Allowable Origins
    |--------------------------------------------------------------------------
    |
    | Here you may specify the origins that are allowed to make requests to
    | your application. Set it to `*` to allow all origins, or provide a
    | list of origins that are allowed to access your application.
    |
    */

    'allowed_origins' => [
        'http://localhost:3000',
    ],

    /*
    |--------------------------------------------------------------------------
    | Allowable Headers
    |--------------------------------------------------------------------------
    |
    | Here you may specify which headers are allowed to be sent by the client.
    | If you wish to allow all headers, you may set this to '*'.
    |
    */

    'allowed_headers' => [
        'X-Requested-With',
        'Content-Type',
        'Authorization',
    ],

    /*
    |--------------------------------------------------------------------------
    | Allowable Methods
    |--------------------------------------------------------------------------
    |
    | Here you may specify which HTTP methods are allowed when making requests
    | to your application. Set this to '*' to allow all methods.
    |
    */

    'allowed_methods' => ['*'],

    /*
    |--------------------------------------------------------------------------
    | Supports Credentials
    |--------------------------------------------------------------------------
    |
    | Set this to `true` if you want to allow credentials such as cookies to be
    | sent with the request.
    |
    */

    'supports_credentials' => true,

    /*
    |--------------------------------------------------------------------------
    | Exposed Headers
    |--------------------------------------------------------------------------
    |
    | Here you may specify which headers are exposed to the client.
    | Set this to `*` to allow all headers.
    |
    */

    'exposed_headers' => [],

    /*
    |--------------------------------------------------------------------------
    | Max Age
    |--------------------------------------------------------------------------
    |
    | This option determines the number of seconds the response from a preflight
    | request can be cached by the client.
    |
    */

    'max_age' => 0,

];
