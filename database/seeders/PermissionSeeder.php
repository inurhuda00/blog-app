<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
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
            $userProfilePermission = [
                'view any user',
                'create users',
                'edit own users',
                'edit all users',
                'delete own users',
                'delete any user'
            ];

            // article permission
            $articlePermission = [
                'view unpublished article',
                'create articles',
                'edit own articles',
                'edit all articles',
                'delete own articles',
                'delete any article'
            ];

            // category permission 
            $categoryPermission = [
                'view any category',
                'create categories',
                'edit own categories',
                'edit all categories',
                'delete own categories',
                'delete any category'
            ];

            // tag permission 
            $tagPermission = [
                'view any tag',
                'create tags',
                'edit own tags',
                'edit all tags',
                'delete own tags',
                'delete any tag'
            ];



            foreach (array_merge(
                $articlePermission,
                $categoryPermission,
                $userProfilePermission,
                $tagPermission
            ) as $permission) {
                Permission::create(['name' => $permission]);
            }


            // create roles and assign existing permissions
            $adminRole = Role::create(['name' => 'admin']);
            $writerRole = Role::create(['name' => 'writer']);

            $permissionsWriter = [
                'create articles',
                'edit own articles',
                'delete own articles'
            ];

            foreach ($permissionsWriter as $permission) {
                $writerRole->givePermissionTo($permission);
            }
            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
        }
    }
}
