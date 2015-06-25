<header>
  <nav class="navbar navbar-fixed-top">
    {{#if firstName}}
    <div class="profile">
      <div class="avatar" style="background:#{{color}};">{{initials}}</div>
    </div>
    {{/if}}

    <div class="logo">
      <svg version="1.1" id="BracketLogo" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 512 512" style="enable-background:new 0 0 128 128;" xml:space="preserve">
        <path style="fill:none;" d="M130.031,75h-27.715C97.345,75,93,70.747,93,65.776V42H69.374c-0.579,12-0.492,33.457,6.308,57.606 c11.542,40.988,36.705,70.444,74.879,87.59c-1.728-4.99-3.358-10.03-4.889-15.421C137.924,144.482,132.685,112,130.031,75z"/>
        <polygon style="fill:none;" points="271.916,107.375 254.95,73.001 237.987,107.375 200.052,112.893 227.498,139.647 221.02,177.43 254.95,159.589 288.881,177.429 282.399,139.647 309.849,112.893 	"/>
        <path style="fill:none;" d="M417,42v23.776c0,4.971-4.446,9.224-9.417,9.224h-25.602c-2.683,38-8.026,70.573-15.97,98.119 c-1.55,5.373-3.199,10.488-4.948,15.457c38.335-17.2,62.922-47.113,73.168-88.733C440.252,75.386,439.537,53,438.565,42H417z"/>
        <path style="fill:#F4F4F4;" d="M455.421,31.611c-0.748-4.312-4.49-7.611-8.867-7.611h-38.971c-4.971,0-8.583,4.33-8.583,9.301V57 h-15.961C383.676,43,384,29.155,384,14.5V10H128v4.5c0,14.653,0.327,28.5,0.968,42.5H111V33.301c0-4.971-3.713-9.301-8.684-9.301 H61.097c-4.486,0-8.287,3.454-8.912,7.896c-0.192,1.364-4.582,33.914,5.986,72.002c9.868,35.563,35.088,82.755,99.203,105.436 c0.771,0.272,1.553,0.45,2.33,0.508c16.34,34.665,38.908,56.435,67.375,64.902L215.366,381H181v39h-27.28l-14.509,86h231.477 l-14.507-86H327v-39h-32.468l-11.658-105.65c29.164-7.931,52.256-29.521,68.95-64.371c0.925-0.023,1.86-0.183,2.78-0.508 c64.245-22.727,88.267-70.373,97.104-106.278C461.159,65.806,455.66,32.986,455.421,31.611z M75.682,99.606 C68.882,75.457,68.794,54,69.374,42H93v23.776C93,70.747,97.345,75,102.316,75h27.715c2.653,37,7.893,69.52,15.641,96.813 c1.53,5.391,3.161,10.45,4.889,15.439C112.387,170.106,87.223,140.594,75.682,99.606z M288.881,177.429l-33.931-17.84l-33.93,17.84 l6.478-37.782l-27.446-26.754l37.936-5.518l16.963-34.374l16.966,34.374l37.933,5.518l-27.449,26.755L288.881,177.429z M434.231,99.814c-10.246,41.62-34.833,71.43-73.168,88.63c1.749-4.969,3.398-9.99,4.948-15.363 C373.955,145.536,379.299,113,381.981,75h25.602c4.971,0,9.417-4.253,9.417-9.224V42h21.565 C439.537,53,440.252,75.358,434.231,99.814z"/>
      </svg>
    </div>
    {{#if firstName}}
    <div class="nav-action">
      <button class="btn btn-action">+</button>
    </div>
    {{/if}}
  </nav>
</header>
