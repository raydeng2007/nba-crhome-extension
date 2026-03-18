// NBA team logos - NBA CDN
var teamLogos = {
  'ATL': 'https://cdn.nba.com/logos/nba/1610612737/primary/L/logo.svg',
  'BOS': 'https://cdn.nba.com/logos/nba/1610612738/primary/L/logo.svg',
  'BKN': 'https://cdn.nba.com/logos/nba/1610612751/primary/L/logo.svg',
  'CHA': 'https://cdn.nba.com/logos/nba/1610612766/primary/L/logo.svg',
  'CHI': 'https://cdn.nba.com/logos/nba/1610612741/primary/L/logo.svg',
  'CLE': 'https://cdn.nba.com/logos/nba/1610612739/primary/L/logo.svg',
  'DAL': 'https://cdn.nba.com/logos/nba/1610612742/primary/L/logo.svg',
  'DEN': 'https://cdn.nba.com/logos/nba/1610612743/primary/L/logo.svg',
  'DET': 'https://cdn.nba.com/logos/nba/1610612765/primary/L/logo.svg',
  'GSW': 'https://cdn.nba.com/logos/nba/1610612744/primary/L/logo.svg',
  'HOU': 'https://cdn.nba.com/logos/nba/1610612745/primary/L/logo.svg',
  'IND': 'https://cdn.nba.com/logos/nba/1610612754/primary/L/logo.svg',
  'LAC': 'https://cdn.nba.com/logos/nba/1610612746/primary/L/logo.svg',
  'LAL': 'https://cdn.nba.com/logos/nba/1610612747/primary/L/logo.svg',
  'MEM': 'https://cdn.nba.com/logos/nba/1610612763/primary/L/logo.svg',
  'MIA': 'https://cdn.nba.com/logos/nba/1610612748/primary/L/logo.svg',
  'MIL': 'https://cdn.nba.com/logos/nba/1610612749/primary/L/logo.svg',
  'MIN': 'https://cdn.nba.com/logos/nba/1610612750/primary/L/logo.svg',
  'NOP': 'https://cdn.nba.com/logos/nba/1610612740/primary/L/logo.svg',
  'NYK': 'https://cdn.nba.com/logos/nba/1610612752/primary/L/logo.svg',
  'OKC': 'https://cdn.nba.com/logos/nba/1610612760/primary/L/logo.svg',
  'ORL': 'https://cdn.nba.com/logos/nba/1610612753/primary/L/logo.svg',
  'PHI': 'https://cdn.nba.com/logos/nba/1610612755/primary/L/logo.svg',
  'PHX': 'https://cdn.nba.com/logos/nba/1610612756/primary/L/logo.svg',
  'POR': 'https://cdn.nba.com/logos/nba/1610612757/primary/L/logo.svg',
  'SAC': 'https://cdn.nba.com/logos/nba/1610612758/primary/L/logo.svg',
  'SAS': 'https://cdn.nba.com/logos/nba/1610612759/primary/L/logo.svg',
  'TOR': 'https://cdn.nba.com/logos/nba/1610612761/primary/L/logo.svg',
  'UTA': 'https://cdn.nba.com/logos/nba/1610612762/primary/L/logo.svg',
  'WAS': 'https://cdn.nba.com/logos/nba/1610612764/primary/L/logo.svg'
};

var REFRESH_INTERVAL = 15000;
var refreshTimer = null;

// ── Helpers ──

function dateToStr(date) {
  return date.getFullYear() + '-' +
    String(date.getMonth() + 1).padStart(2, '0') + '-' +
    String(date.getDate()).padStart(2, '0');
}

function dateToEspn(date) {
  // ESPN wants YYYYMMDD
  return date.getFullYear() +
    String(date.getMonth() + 1).padStart(2, '0') +
    String(date.getDate()).padStart(2, '0');
}

function formatDisplayDate(date) {
  var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return days[date.getDay()] + ', ' + months[date.getMonth()] + ' ' + date.getDate();
}

function parseGameClock(clockStr) {
  if (!clockStr) return '';
  var match = clockStr.match(/PT(\d+)M([\d.]+)S/);
  if (!match) return clockStr;
  return parseInt(match[1]) + ':' + String(Math.floor(parseFloat(match[2]))).padStart(2, '0');
}

function todayStr() { return dateToStr(new Date()); }

// ── API: NBA CDN (today's live scoreboard) ──

function fetchNbaScoreboard() {
  var url = 'https://cdn.nba.com/static/json/liveData/scoreboard/todaysScoreboard_00.json?ts=' + Date.now();
  return fetch(url, { cache: 'no-store' })
    .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then(function (d) { return d.scoreboard; });
}

// ── API: ESPN (any date - reliable for yesterday/history) ──

function fetchEspnScoreboard(date) {
  var url = 'https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard?dates=' + dateToEspn(date);
  return fetch(url)
    .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then(function (data) { return convertEspnToNba(data); });
}

// ESPN uses different abbreviations for some teams — map to NBA standard tricodes
var espnToNba = {
  'WSH': 'WAS', 'SA': 'SAS', 'GS': 'GSW',
  'NY': 'NYK', 'NO': 'NOP', 'UTAH': 'UTA'
};
function normalizeTricode(abbr) {
  return espnToNba[abbr] || abbr;
}

// Convert ESPN format → same shape as NBA CDN so card builder works for both
function convertEspnToNba(espnData) {
  var games = [];
  var events = espnData.events || [];

  for (var i = 0; i < events.length; i++) {
    var ev = events[i];
    var comp = ev.competitions[0];
    var statusObj = comp.status || {};
    var statusType = statusObj.type || {};

    // ESPN status type id: 1=scheduled, 2=in-progress, 3=final
    var gameStatus = statusType.id ? parseInt(statusType.id) : 1;
    var period = statusObj.period || 0;
    var clock = statusObj.displayClock || '';

    // Find home and away competitors
    var homeComp = null, awayComp = null;
    for (var j = 0; j < comp.competitors.length; j++) {
      if (comp.competitors[j].homeAway === 'home') homeComp = comp.competitors[j];
      else awayComp = comp.competitors[j];
    }

    if (!homeComp || !awayComp) continue;

    // Parse W-L record from records array
    function parseRecord(competitor) {
      var wins = 0, losses = 0;
      var records = competitor.records || [];
      for (var k = 0; k < records.length; k++) {
        if (records[k].name === 'overall' || records[k].type === 'total') {
          var parts = records[k].summary.split('-');
          wins = parseInt(parts[0]) || 0;
          losses = parseInt(parts[1]) || 0;
          break;
        }
      }
      return { wins: wins, losses: losses };
    }

    var homeRec = parseRecord(homeComp);
    var awayRec = parseRecord(awayComp);

    // Build game clock in ISO format for parseGameClock()
    var gameClock = '';
    if (gameStatus === 2 && clock) {
      // ESPN clock is like "5:30" — convert to PT05M30.00S
      var clockParts = clock.split(':');
      if (clockParts.length === 2) {
        gameClock = 'PT' + clockParts[0] + 'M' + clockParts[1] + '.00S';
      }
    }

    // Series info for playoffs
    var seriesText = '';
    var seriesGameNumber = '';
    if (ev.season && ev.season.type === 3) {
      // Playoff game
      seriesGameNumber = '1';
      var notes = comp.notes || [];
      for (var n = 0; n < notes.length; n++) {
        if (notes[n].headline) { seriesText = notes[n].headline; break; }
      }
    }

    games.push({
      homeTeam: {
        teamTricode: normalizeTricode(homeComp.team.abbreviation),
        score: parseInt(homeComp.score) || 0,
        wins: homeRec.wins,
        losses: homeRec.losses
      },
      awayTeam: {
        teamTricode: normalizeTricode(awayComp.team.abbreviation),
        score: parseInt(awayComp.score) || 0,
        wins: awayRec.wins,
        losses: awayRec.losses
      },
      gameStatus: gameStatus,
      period: period,
      gameClock: gameClock,
      gameStatusText: statusType.shortDetail || statusType.detail || '',
      seriesGameNumber: seriesGameNumber,
      seriesText: seriesText
    });
  }

  return { games: games };
}

// ── Storage ──

function getFavoriteTeams() {
  return new Promise(function (resolve) {
    chrome.storage.sync.get('favoriteTeams', function (result) {
      resolve(result.favoriteTeams || []);
    });
  });
}

// ── Card Builder ──

function buildGameCard(game) {
  var home = game.homeTeam;
  var away = game.awayTeam;
  var status = game.gameStatus;
  var period = game.period;
  var isLive = status === 2;
  var isFinal = status === 3;
  var isPlayoff = game.seriesGameNumber && game.seriesGameNumber !== '';

  var card = document.createElement('div');
  card.className = 'game-card';
  if (isLive) card.classList.add('live');
  if (isPlayoff) card.classList.add('playoff');

  // Status bar
  var statusBar = document.createElement('div');
  statusBar.className = 'game-status';
  if (isFinal) statusBar.classList.add('final-status');

  if (isLive) {
    var dot = document.createElement('span');
    dot.className = 'live-dot';
    statusBar.appendChild(dot);
    var txt;
    if (period >= 5) {
      var otNum = period - 4;
      var clk = parseGameClock(game.gameClock);
      txt = (otNum > 1 ? otNum : '') + 'OT' + (clk ? ' ' + clk : '');
    } else {
      var clk = parseGameClock(game.gameClock);
      txt = 'Q' + period + (clk ? '  ' + clk : '');
    }
    statusBar.appendChild(document.createTextNode(txt));
  } else if (isFinal) {
    if (period > 4) {
      var otCount = period - 4;
      statusBar.textContent = 'Final' + (otCount > 1 ? ' ' + otCount + 'OT' : ' / OT');
    } else {
      statusBar.textContent = 'Final';
    }
  } else {
    statusBar.textContent = game.gameStatusText || 'Scheduled';
  }
  card.appendChild(statusBar);

  if (isPlayoff && game.seriesText) {
    var serDiv = document.createElement('div');
    serDiv.className = 'series-text';
    serDiv.textContent = game.seriesText;
    card.appendChild(serDiv);
  }

  var homeWon = isFinal && home.score > away.score;
  var awayWon = isFinal && away.score > home.score;

  card.appendChild(buildTeamRow(away, status, awayWon));
  card.appendChild(buildTeamRow(home, status, homeWon));

  return card;
}

function buildTeamRow(team, gameStatus, isWinner) {
  var tricode = team.teamTricode;
  var lower = tricode.toLowerCase();

  var row = document.createElement('div');
  row.className = 'team-row ' + lower;
  if (isWinner) row.classList.add('winner');

  var logo = document.createElement('img');
  logo.className = 'team-logo';
  logo.src = teamLogos[tricode] || '';
  logo.alt = tricode;

  var name = document.createElement('span');
  name.className = 'team-name';
  name.textContent = tricode;

  var record = document.createElement('span');
  record.className = 'team-record';
  record.textContent = team.wins + '-' + team.losses;

  var score = document.createElement('span');
  score.className = 'team-score';
  score.textContent = gameStatus === 1 ? '-' : team.score;

  row.appendChild(logo);
  row.appendChild(name);
  row.appendChild(record);
  row.appendChild(score);
  return row;
}

// ── Rendering ──

function renderGames(scoreboard, favTeams, containerId) {
  var container = document.getElementById(containerId);
  container.innerHTML = '';

  if (!scoreboard || !scoreboard.games || scoreboard.games.length === 0) {
    showEmpty(containerId, 'No games scheduled.');
    return;
  }

  var hasGames = false;
  for (var i = 0; i < scoreboard.games.length; i++) {
    var game = scoreboard.games[i];
    var h = game.homeTeam.teamTricode.toLowerCase();
    var a = game.awayTeam.teamTricode.toLowerCase();
    if (favTeams.includes(h) || favTeams.includes(a)) {
      hasGames = true;
      container.appendChild(buildGameCard(game));
    }
  }

  if (!hasGames) {
    showEmpty(containerId, 'No games for your favorite teams.');
  }
}

function showEmpty(containerId, message) {
  var container = document.getElementById(containerId);
  container.innerHTML = '';
  var msg = document.createElement('div');
  msg.className = 'empty-msg';
  msg.textContent = message;
  container.appendChild(msg);
}

function showError(containerId, message) {
  var container = document.getElementById(containerId);
  container.innerHTML = '';
  var msg = document.createElement('div');
  msg.className = 'error-msg';
  msg.textContent = message;
  container.appendChild(msg);
}

function showLoading(containerId) {
  var container = document.getElementById(containerId);
  container.innerHTML = '';
  var msg = document.createElement('div');
  msg.className = 'loading';
  msg.textContent = 'Loading scores...';
  container.appendChild(msg);
}

// ── Auto-refresh (today only) ──

function hasLiveGames(scoreboard) {
  if (!scoreboard || !scoreboard.games) return false;
  for (var i = 0; i < scoreboard.games.length; i++) {
    if (scoreboard.games[i].gameStatus === 2) return true;
  }
  return false;
}

function refreshToday(favTeams) {
  if (refreshTimer) clearTimeout(refreshTimer);

  fetchNbaScoreboard()
    .then(function (scoreboard) {
      var apiDate = scoreboard.gameDate;
      var today = todayStr();

      if (apiDate === today) {
        renderGames(scoreboard, favTeams, 'wrapper');
      }

      var interval = hasLiveGames(scoreboard) ? REFRESH_INTERVAL : 60000;
      refreshTimer = setTimeout(function () { refreshToday(favTeams); }, interval);
    })
    .catch(function () {
      refreshTimer = setTimeout(function () { refreshToday(favTeams); }, 30000);
    });
}

// ── Tabs ──

function setupTabs() {
  var tabToday = document.getElementById('tabToday');
  var tabYesterday = document.getElementById('tabYesterday');
  var panelToday = document.getElementById('panelToday');
  var panelYesterday = document.getElementById('panelYesterday');

  tabToday.addEventListener('click', function () {
    tabToday.classList.add('active');
    tabYesterday.classList.remove('active');
    panelToday.classList.add('active');
    panelYesterday.classList.remove('active');
  });

  tabYesterday.addEventListener('click', function () {
    tabYesterday.classList.add('active');
    tabToday.classList.remove('active');
    panelYesterday.classList.add('active');
    panelToday.classList.remove('active');
  });
}

// ── Init ──

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('headerDate').textContent = formatDisplayDate(new Date());
  setupTabs();

  showLoading('wrapper');
  showLoading('yesterday');

  getFavoriteTeams().then(function (favTeams) {

    // ── TODAY: NBA CDN (live, auto-refreshing) ──
    fetchNbaScoreboard()
      .then(function (scoreboard) {
        var apiDate = scoreboard.gameDate;
        var today = todayStr();

        if (apiDate === today) {
          renderGames(scoreboard, favTeams, 'wrapper');
        } else {
          showEmpty('wrapper', 'No games scheduled for today.');
        }

        // Start auto-refresh
        var interval = hasLiveGames(scoreboard) ? REFRESH_INTERVAL : 60000;
        refreshTimer = setTimeout(function () { refreshToday(favTeams); }, interval);
      })
      .catch(function () {
        showError('wrapper', 'Could not load today\'s scores.');
      });

    // ── YESTERDAY: ESPN API (always works, any date) ──
    var yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    fetchEspnScoreboard(yesterday)
      .then(function (scoreboard) {
        renderGames(scoreboard, favTeams, 'yesterday');
      })
      .catch(function () {
        showError('yesterday', 'Could not load yesterday\'s scores.');
      });
  });
});

// Settings button - open options page
document.getElementById('settingsBtn').addEventListener('click', function (e) {
  e.preventDefault();
  chrome.runtime.openOptionsPage();
});
