<div class="edit-players">
  <div id="randomize" class="game-player">
    <div class="avatar randomize">
      <i class="glyphicon glyphicon-random"></i>
    </div>
  </div>
  {{#each this}}
  <div class="game-player" data-drag="{{objectId}}" draggable="true">
    <div class="avatar" style="background:#{{color}};">{{initialz this}}</div>
  </div>
  {{/each}}
</div>
<button id="doneEditingPlayers" class="btn btn-default btn-fixed-bottom">Finish</button>
