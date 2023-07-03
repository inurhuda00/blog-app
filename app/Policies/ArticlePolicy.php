<?php

namespace App\Policies;

use App\Enums\ArticleStatus;
use App\Models\Article;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Auth\Access\HandlesAuthorization;

class ArticlePolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any models.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function viewAny(?User $user)
    {
        return $this->allow();
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Article  $article
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function view(?User $user, Article $article)
    {
        if ($article->status === ArticleStatus::PUBLISHED && $article->published_at <= Carbon::now()) {
            return $this->allow();
        }

        // visitors cannot view unpublished items
        if ($user === null) {
            return $this->denyAsNotFound();
        }

        // admin overrides published status
        if ($user->can('view any article')) {
            return $this->allow();
        }

        // authors can view their own unpublished articles
        return $user->id == $article->user_id ? $this->allow() : $this->denyAsNotFound();
    }

    /**
     * Determine whether the user can create models.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function create(User $user)
    {
        if ($user->can('create or delete articles')) {
            return $this->allow();;
        }

        return $this->deny();
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Article  $article
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function update(?User $user, Article $article,)
    {

        if ($user->can('manage articles')) {
            return $this->allow();
        }

        if ($user->can('edit any articles') || $user->can('accept or reject articles') && !ArticleStatus::DRAFT->equals($article->status)) {
            return $this->allow();
        }

        if ($user->can('edit own articles') && ArticleStatus::DRAFT->equals($article->status) || ArticleStatus::REJECTED->equals($article->status)) {
            return $article->author()->is($user)
                ? $this->allow()
                : $this->denyAsNotFound();
        }

        return $this->deny();
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Article  $article
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function delete(User $user, Article $article)
    {
        if ($user->can('create or delete articles')) {
            return $this->update($user, $article);
        }

        if ($user->can('manage articles')) {
            return true;
        }
        return $this->deny();
    }

    /**
     * Determine whether the user can restore the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Article  $article
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function restore(User $user, Article $article)
    {
        return $this->update($user, $article);
    }

    /**
     * Determine whether the user can permanently delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Article  $article
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function forceDelete(User $user, Article $article)
    {
        return $this->update($user, $article);
    }
}
