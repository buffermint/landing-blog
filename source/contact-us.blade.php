@extends('_layouts.main')

@section('page-title', 'Contact Us')
@section('page-description', 'Talk to BufferMint about your product idea: book a 30-minute call, message us on WhatsApp or email sales@buffermint.com.')

@section('content')

<section class="site-hero">
  <div class="bm-container">
    <h1 class="site-display">Talk to us</h1>
    <p class="site-lead">The quickest way to start is a 30-minute call about what you want to build. You can also message, call or email us.</p>
    <div class="site-actions">
      <a class="bm-btn bm-btn-primary bm-btn-lg" href="{{ $page->discovery_call_url }}" target="_blank" rel="noopener" data-cta="contact-call">Book a call</a>
    </div>
  </div>
</section>

<section class="site-section">
  <div class="bm-container">
    <div class="site-cards">
      <a class="site-card" href="https://wa.me/917767074808">
        <b>Message us</b>
        <span>WhatsApp: start a chat</span>
      </a>
      <a class="site-card" href="tel:+917767074808">
        <b>Call</b>
        <span>+91 77670 74808</span>
      </a>
      <a class="site-card" href="mailto:{{ $page->brand->email }}">
        <b>Email</b>
        <span>{{ $page->brand->email }}</span>
      </a>
    </div>
  </div>
</section>

@endsection
