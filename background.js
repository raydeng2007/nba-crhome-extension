chrome.runtime.onInstalled.addListener(function (details) {
  if (details.reason === 'install') {
    chrome.storage.sync.set({
      favoriteTeams: [
        'atl', 'bkn', 'bos', 'cha', 'chi', 'cle', 'dal', 'den',
        'det', 'gsw', 'hou', 'ind', 'lac', 'lal', 'mem', 'mia',
        'mil', 'min', 'nop', 'nyk', 'okc', 'orl', 'phi', 'phx',
        'por', 'sac', 'sas', 'tor', 'uta', 'was'
      ]
    });
  }
});
