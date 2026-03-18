// Load saved favorite teams and mark them as checked
chrome.storage.sync.get(['favoriteTeams'], function (result) {
  var teams = result.favoriteTeams || [];
  for (var i = 0; i < teams.length; i++) {
    var tile = document.getElementById(teams[i]);
    if (tile) {
      tile.classList.add('checked');
    }
  }
});

// All 30 NBA team codes
var allTeams = [
  'phi', 'bos', 'tor', 'mil', 'cle', 'nyk', 'mia', 'ind', 'chi',
  'det', 'bkn', 'orl', 'was', 'atl', 'cha',
  'gsw', 'den', 'por', 'okc', 'hou', 'uta', 'lac', 'sas', 'sac',
  'lal', 'min', 'nop', 'dal', 'mem', 'phx'
];

// Add click handlers to all team tiles
for (var i = 0; i < allTeams.length; i++) {
  (function (teamId) {
    var tile = document.getElementById(teamId);
    if (tile) {
      tile.addEventListener('click', function () {
        tile.classList.toggle('checked');
      });
    }
  })(allTeams[i]);
}

// Save selected teams
function save_options() {
  var teams = document.getElementsByClassName('tile checked');
  var teamArray = [];
  for (var i = 0; i < teams.length; i++) {
    teamArray.push(teams[i].id);
  }
  chrome.storage.sync.set({
    favoriteTeams: teamArray
  }, function () {
    var status = document.getElementById('save');
    status.style.backgroundColor = '#4CAF50';
    status.textContent = 'SAVED ✓';

    setTimeout(function () {
      status.textContent = 'SAVE';
      status.style.backgroundColor = '#E8836B';
    }, 1200);
  });
}

document.getElementById('save').addEventListener('click', save_options);
