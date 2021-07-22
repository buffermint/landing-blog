<ul class="list-unstyled my-4">
  @foreach ($list as $row)
  <li class="d-flex">

    <!-- Check -->
    <div class="badge badge-rounded-circle bg-success-soft mt-1 mr-4">
      <i class="fe {{ $bullet ?? 'fe-check' }}"></i>
    </div>

    <!-- Text -->
    <p>
      {{$row}}
    </p>

  </li>
  @endforeach
</ul>