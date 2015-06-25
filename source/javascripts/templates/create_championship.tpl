<div id="sectionFirst" class="row">
  <div class="col-md-6 col-md-offset-3">
    <form>
      <h3>New Championship</h3>
      <div class="form-group">
        <input type="text" id="chTitle" placeholder="Title">
      </div>
      <button id="newChampionship" type="submit" class="btn btn-default btn-fixed-bottom">Next</button>
    </form>
  </div>
</div>
<div id="sectionSecond" class="row">
  <div class="col-md-6 col-md-offset-3">
    <form>
      <h3>Add Players</h3>
      <div class="form-group">
        <input type="text" id="chPlayer" placeholder="Enter An Email">
      </div>
      <button type="submit" class="btn btn-default btn-fixed-bottom">Next</button>
    </form>
  </div>
  <div class="col-md-6 col-md-offset-3 create-players">
    <div class="create-title">Current Players</div>
    <div class="col-md-6 col-md-offset-3">
      {{{ playerListTpl }}}
    </div>
  </div>
</div>

<div class="footer-pad"></div>
