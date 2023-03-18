<?php

namespace App\Http\Resources;

use App\Models\Article;
use Illuminate\Http\Resources\Json\ResourceCollection;

class ArticleTableCollection extends ResourceCollection
{

    public $defaultLoad = 5;

    /**
     * The "data" wrapper that should be applied.
     *
     * @var string|null
     */
    public static $wrap = 'data';

    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {

        return [
            'data' => $this->collection,
            'attributes' => [
                'total' => Article::count(),
                'per_page' => 5,
            ],
            'filtered' => [
                'load' => $request->load ?? $this->defaultLoad,
                ...$q = $request->q ? ['q' => $request->q] : [],
                ...$page = $request->page ? ['page' => $request->page] : [],
                ...$field = $request->field ? ['field' => $request->field] : [],
                ...$direction = $request->direction ? ['direction' => $request->direction] : [],
            ]
        ];
    }
}
