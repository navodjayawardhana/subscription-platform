<?php

namespace Tests\Feature\Website;


use App\Models\Website;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class WebsiteGetAllTest extends TestCase
{
    use RefreshDatabase;

    public function test_get_all_websites(): void
    {

        Website::factory(5)->create();

        $response = $this->getJson('api/all-websites');

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'message',
            'data' => [
                '*' => [
                    'id',
                    'name',
                    'url',
                    'created_at',
                    'updated_at',
                ],
            ],
        ]);
    }
}
