let team = document.getElementById('team');

chrome.storage.sync.get(['favoriteTeams'], function(data) {
    console.log(data);
    let g = document.getElementById('hee')
    g.innerHTML = 'fuck me .'
});