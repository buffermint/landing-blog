<!-- Share -->
<span class="h6 text-uppercase text-muted d-none d-md-inline mr-4">
    Share:
</span>

<!-- Icons -->
<ul class="d-inline list-unstyled list-inline list-social">
    <li class="list-inline-item list-social-item mr-3">
        <a href="https://www.facebook.com/sharer.php?u={{ $url }}"
            class="text-decoration-none">
            <img src="{{ mix('img/social/facebook.svg', 'assets/build') }}"
                class="list-social-icon" alt="Share on Facebook">
        </a>
    </li>
    <li class="list-inline-item list-social-item mr-3">
        <a href="https://twitter.com/share?url={{ $url }}&text={{ $title }}&hashtags=buffermint"
            class="text-decoration-none">
            <img src="{{ mix('img/social/twitter.svg', 'assets/build') }}"
                class="list-social-icon" alt="Share on Twitter">
        </a>
    </li>
</ul>