<hr class="hr-md my-7 text-secondary">

<blockquote class="blockquote mb-7">
  <p class="h2 mb-0 text-center">
    {{ $slot }}
  </p>

  @if (isset($credit))
  <p class="h4 mt-5 text-center">
    {{ $credit }}
  </p>
  @endif

</blockquote>

<hr class="hr-md my-7 text-secondary">