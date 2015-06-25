{{#each players}}
<div class="player">
  <div class="avatar" style="background:#{{color}};">{{initials}}</div>
  <div class="player-meta">
    <h5 class="player-name">{{firstName}} {{lastName}}</h5>
    <span class="player-email">{{email}}</span>
    <button class="btn btn-circle player-action {{#if added}}active{{/if}} {{#if admin}}admin{{/if}}">
      <i class="glyphicon glyphicon glyphicon-ok"></i>
    </button>
  </div>
</div>
{{/each}}
