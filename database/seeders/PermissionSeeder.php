<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::beginTransaction();

        try {

            // Reset cached roles and permissions
            app()[PermissionRegistrar::class]->forgetCachedPermissions();

            // user profile permission 
            $userPermission = [
                'create or delete users',
                'manage users',
                'delete own user',
            ];

            // article permission 
            $articlePermission = [
                'view article',
                'view any article',
                'create or delete articles',
                'edit own articles',
                'edit any articles',
                'accept or reject articles',
                'manage articles'
            ];

            // category permission 
            $categoryPermission = [
                'manage categories'
            ];

            // tag permission 
            $tagPermission = [
                'manage tags'
            ];

            $commentPermission = [
                'moderate comment'
            ];

            //Some initially role configuration
            $roles = [
                'admin' => [
                    ...$userPermission,
                    ...$articlePermission,
                    ...$categoryPermission,
                    ...$tagPermission,
                    ...$commentPermission
                ],
                'editor' => [
                    'view article',
                    'view any article',
                    'create or delete articles',
                    'edit own articles',
                    'edit any articles',
                    'accept or reject articles',
                ],
                'writer' => [
                    'view article',
                    'view any article',
                    'create or delete articles',
                    'edit own articles',
                ]
            ];

            collect($roles)->each(function ($permissions, $role) {
                $role = Role::findOrCreate($role);
                collect($permissions)->each(function ($permission) use ($role) {
                    $role->permissions()->save(Permission::findOrCreate($permission));
                });
            });

            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
        }
    }
}
