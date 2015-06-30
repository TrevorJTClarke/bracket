<div class="row profile">
  <div class="col-md-6 col-md-offset-3">
    <div class="profile-meta">
      <h3>{{firstName}} {{lastName}}</h3>
      <span>{{email}}{{this/win}}</span>
    </div>
  </div>
</div>
<div class="row">
  <div class="col-md-6 col-md-offset-3 stats-row">
    <div class="stats-score">
      <div class="score-num">{{win}}</div>
      <div class="score-title">Win</div>
    </div>
    <div class="stats-score loss">
      <div class="score-num">{{loss}}</div>
      <div class="score-title">Loss</div>
    </div>
    <div class="stats-score tie">
      <div class="score-num">{{tie}}</div>
      <div class="score-title">Tie</div>
    </div>
  </div>
</div>
<hr>
<div class="row matches">
  <div class="col-md-6 col-md-offset-3">
    <h3>Championships</h3>
    <button id="newChampionship" class="btn btn-outline btn-create">New Championship</button>
    <ul class="profile-matches">
      {{{gamesTpl}}}
    </ul>
  </div>
</div>
