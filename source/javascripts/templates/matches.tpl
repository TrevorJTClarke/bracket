<li class="spacer">&nbsp;</li>
<li class="match{{#if winner}} active{{/if}}"{{#if sort}} id="match_{{sort}}"{{/if}}>
  <div class="match-tag"><span>{{sort}}</span></div>
  {{#matchPlayer players}}
    {{#if firstName}}
    <div class="avatar" style="background:#{{color}};">{{initialz this}}</div>
    {{else}}
    <div class="avatar empty"></div>
    {{/if}}
  {{/matchPlayer}}
</li>
