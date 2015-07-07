<li class="spacer">&nbsp;</li>
<li class="match"{{#if sort}} id="match_{{sort}}"{{/if}}>
  <div class="match-tag"><span>{{sort}}</span></div>
  {{#each players}}
  <div class="match-player">
    {{#if firstName}}
    <div class="avatar" style="background:#{{color}};">{{initialz this}}</div>
    {{else}}
    <div class="avatar empty"></div>
    {{/if}}
  </div>
  {{/each}}
</li>
