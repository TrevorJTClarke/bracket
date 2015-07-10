{{#tiersFlow this}}
  {{#each this}}
    <ul class="round">
      {{#each matches}}
      <li class="spacer">&nbsp;</li>
      <li class="match{{#if winner}} active{{/if}}"{{#if sort}} data-navigate="{{parentTier}}_{{index}}"{{/if}}>
        <div class="match-tag"><span>{{sort}}</span></div>
        {{#matchPlayer players}}
          {{#if firstName}}
          <div class="avatar" style="background:#{{color}};">{{initialz this}}</div>
          {{else}}
          <div class="avatar empty"></div>
          {{/if}}
        {{/matchPlayer}}
      </li>
      {{/each}}
      <li class="spacer">&nbsp;</li>
    </ul>
    {{#if spacers}}
    <ul class="round-spacers">
    {{#each spacers}}
      <li class="line-spacer"></li>
      <li class="line-spacer"></li>
    {{/each}}
    <li class="line-spacer"></li>
    </ul>
    {{/if}}
  {{/each}}
{{/tiersFlow}}
