<?php

// Jigsaw 1.x and its Illuminate packages predate PHP 8.4; their deprecation notices were printed into
// the built pages. Keep real errors, drop the deprecations (PLAN.md item 12 tracks the upgrade).
error_reporting(E_ALL & ~E_DEPRECATED & ~E_USER_DEPRECATED);

/** @var $container \Illuminate\Container\Container */
/** @var $events \TightenCo\Jigsaw\Events\EventBus */

/**
 * You can run custom code at different stages of the build process by
 * listening to the 'beforeBuild', 'afterCollections', and 'afterBuild' events.
 *
 * For example:
 *
 * $events->beforeBuild(function (Jigsaw $jigsaw) {
 *     // Your code here
 * });
 */

$events->afterBuild(App\Listeners\GenerateSitemap::class);
$events->afterBuild(App\Listeners\GenerateIndex::class);
$events->afterBuild(App\Listeners\CopyBrandAssets::class);