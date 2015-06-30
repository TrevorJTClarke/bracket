{{#each games}}
<li id="game_{{objectId}}" class="match-item {{#if active}}active{{/if}}">
  <div class="m-title">{{title}}</div>
  <div class="m-subtitle"><span class="label label-{{#if status}}{{gameType status}}{{/if}}">{{status}}</span> {{#if updatedAt}}{{updatedAt}}{{/if}}</div>
  <i class="glyphicon glyphicon-chevron-right"></i>
</li>
{{/each}}
