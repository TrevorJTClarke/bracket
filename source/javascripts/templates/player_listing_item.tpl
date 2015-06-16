{{#each players}}
<div class="player">
  <div class="player-avatar" style="background:#{{color}};">{{initials}}</div>
  <div class="player-meta">
    <h5 class="player-name">{{firstName}} {{lastName}}</h5>
    <span class="player-email">{{email}}</span>
    <i class="player-action glyphicon glyphicon-remove"></i>
  </div>
</div>
{{/each}}
