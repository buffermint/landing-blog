<hr class="hr-md my-7 text-secondary">

<blockquote class="blockquote mb-7">
  <p class="h2 mb-0 text-center text-primary">
    {{ $slot }}
  </p>

  @if (isset($credit))
  <p class="h5 mt-4 text-center text-primary">
    {{ $credit }}
  </p>
  @endif

</blockquote>

<hr class="hr-md my-7 text-secondary">