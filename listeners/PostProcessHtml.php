<?php

namespace App\Listeners;

use TightenCo\Jigsaw\Jigsaw;

/**
 * Rewrites the built HTML (every page):
 * - images from /assets/img/uploads/ get width/height (from the file) and, when a smaller .webp copy sits next
 *   to the file, a <picture> with a WebP <source> and the original as the fallback;
 * - headings inside #post-content are renumbered so they never skip a level after the page <h1>
 *   (older posts start at ###). A renumbered heading keeps its look through a class (e.g. <h2 class="h3">).
 */
class PostProcessHtml
{
    public function handle(Jigsaw $jigsaw)
    {
        $dest = $jigsaw->getDestinationPath();
        $it = new \RecursiveIteratorIterator(new \RecursiveDirectoryIterator($dest, \FilesystemIterator::SKIP_DOTS));
        foreach ($it as $file) {
            if ($file->getExtension() !== 'html') {
                continue;
            }
            $html = file_get_contents($file->getPathname());
            $out = $this->headings($this->images($html, $dest));
            if ($out !== $html) {
                file_put_contents($file->getPathname(), $out);
            }
        }
    }

    private function images(string $html, string $dest): string
    {
        return preg_replace_callback('~(<picture>\s*)?<img\s[^>]*?src="(/assets/img/uploads/[^"]+)"[^>]*>~i', function ($m) use ($dest) {
            if (! empty($m[1])) {
                return $m[0]; // already wrapped
            }
            $img = $m[0];
            $path = $dest . rawurldecode($m[2]);
            if (! is_file($path)) {
                return $img;
            }
            if (! preg_match('~\swidth=~i', $img) && ($size = @getimagesize($path))) {
                $img = preg_replace('~^<img\s~i', '<img width="' . $size[0] . '" height="' . $size[1] . '" data-dim ', $img);
            }
            $webp = preg_replace('~\.(jpe?g|png)$~i', '.webp', $m[2]);
            if ($webp !== $m[2] && is_file($dest . rawurldecode($webp))) {
                $img = '<picture><source type="image/webp" srcset="' . $webp . '">' . $img . '</picture>';
            }
            return $img;
        }, $html);
    }

    private function headings(string $html): string
    {
        $start = strpos($html, 'id="post-content"');
        if ($start === false) {
            return $html;
        }
        $end = strpos($html, 'site-cta-box', $start);
        $end = $end === false ? strlen($html) : $end;
        $body = substr($html, $start, $end - $start);
        $stack = []; // [original level, new level] of the open headings
        $body = preg_replace_callback('~<h([1-6])(\s[^>]*)?>(.*?)</h\1>~is', function ($m) use (&$stack) {
            $level = (int) $m[1];
            while ($stack && end($stack)[0] >= $level) {
                array_pop($stack);
            }
            $new = min($level, $stack ? end($stack)[1] + 1 : 2);
            $stack[] = [$level, $new];
            if ($new === $level) {
                return $m[0];
            }
            $attrs = $m[2] ?? '';
            $attrs = preg_match('~\sclass="~i', $attrs)
                ? preg_replace('~\sclass="~i', ' class="h' . $level . ' ', $attrs, 1)
                : ' class="h' . $level . '"' . $attrs;
            return "<h$new$attrs>{$m[3]}</h$new>";
        }, $body);

        return substr($html, 0, $start) . $body . substr($html, $end);
    }
}
