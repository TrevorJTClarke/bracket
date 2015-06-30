{{#each games}}
<li id="game_{{objectId}}" class="match-item {{#if active}}active{{/if}}">
  <div class="m-title">{{title}}</div>
  <div class="m-subtitle"><span class="label{{#if status}} label-{{gameStatus this}}{{/if}}">{{status}}</span> {{#if updatedAt}}{{timeago this}}{{/if}}</div>
  <i class="glyphicon glyphicon-chevron-right"></i>
</li>
{{/each}}
