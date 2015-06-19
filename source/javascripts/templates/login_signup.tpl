<div class="row ls-tabs">
  <div class="col-md-6 col-md-offset-3">
    <div class="btn-group" role="group" aria-label="...">
      <button type="button" id="tabLogin" class="btn btn-tabs">Login</button>
      <button type="button" id="tabSignup" class="btn btn-tabs">Sign Up</button>
    </div>
  </div>
</div>

<div id="loginSection" class="row ls-section">
  <div class="col-md-6 col-md-offset-3">
    <form id="loginForm">
      <div class="form-group">
        <input type="email" name="email" placeholder="Email" required>
      </div>
      <div class="form-group">
        <input type="password" name="password" placeholder="Password" required>
      </div>
      <button id="loginSubmit" type="submit" class="btn btn-default btn-fixed-bottom">Login</button>
    </form>
  </div>
</div>
<div id="signupSection" class="row ls-section">
  <div class="col-md-6 col-md-offset-3">
    <form id="signupForm">
      <div class="form-group">
        <input type="text" name="firstName" placeholder="First Name" required>
      </div>
      <div class="form-group">
        <input type="text" name="lastName" placeholder="Last Name" required>
      </div>
      <div class="form-group">
        <input type="email" name="email" placeholder="Email" required>
      </div>
      <div class="form-group">
        <input type="password" name="password" placeholder="Password" required>
      </div>
      <div class="form-group">
        <input type="color" value="#2FAB70" name="color" pattern="^#([A-Fa-f0-9]{6})$" required title="Hexadecimal value required">
      </div>
      <button id="signupSubmit" type="submit" class="btn btn-default btn-fixed-bottom">Create Account</button>
    </form>
  </div>
</div>
