<?php

namespace App\Http\Controllers;

use App\Enums\ArticleStatus;
use App\Http\Resources\ArticleTableCollection;
use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SubmissionController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {

        $this->authorize('viewSubmission', $request->user());

        $validator = Validator::make($request->all(), [
            'direction' => ['in:asc,desc'],
            'field' => ['in:title,status'],
            'load' => ['int'],
            'q' => ['string'],
        ]);

        $load = $request->load;

        if ($validator->errors()->get('load')) {
            $load = '5';
        }

        $user = $request->user();

        $articles = Article::query()
            ->select(
                "slug",
                "uuid",
                "title",
                "picture",
                "status",
                "user_id",
                "category_id",
                "updated_at",
            )
            ->with([
                'author',
                'category' => fn ($query) => $query->select('name', 'slug', 'id')
            ])->where(['status' => ArticleStatus::REVIEW])
            ->whereDoesntHave('author', function ($query) use ($user) {
                $query->where('user_id', $user->id);
            });
        $articleResource = $articles->orderBy('updated_at')
            ->fastPaginate($load <= 50 ? $load ?? 5 : 5);

        return inertia(
            'Submission',
            [

                'articles' => new ArticleTableCollection($articleResource),

            ]
        );
    }
}
