
let senvensixers = document.getElementById('76er');
senvensixers.onclick = function(){
    var tile = document.getElementById('76er');
    tile.classList.toggle("checked")
}


function save_options() {
    var teams = document.getElementsByClassName('tile checked');
    var teamArray = [];
    for(var i = 0; i < teams.length; i++){
        teamArray.push(teams[i].id);
    }
    chrome.storage.sync.set({
        favoriteTeams: teamArray
    }, function() {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        console.log(teamArray)
        setTimeout(function() {
            status.textContent = '';
        }, 750);

    });
}

// function restore_options() {
//     // Use default value color = 'red' and likesColor = true.
//     chrome.storage.sync.get({
//         favoriteTeams: [],
//         likesColor: true
//     }, function(items) {
//         document.getElementById('color').value = items.favoriteColor;
//         document.getElementById('like').checked = items.likesColor;
//     });
// }
// document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);