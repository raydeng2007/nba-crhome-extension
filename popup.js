let team = document.getElementById('team');

chrome.storage.sync.get(['favoriteTeams'], function(data) {

});



// <div class="scoreboard">
//     <div class="team gsw win">
//     <div class="rank"></div>
//     <img class="logo" src="http://i.cdn.turner.com/nba/nba/teamsites/images/legacy/warriors/1112_GSW3_300.png"></img>
//     <div class="name">GSW</div>
//     <div class="score">125</div>
//
//     </div>
//     <div class="divider"><p>FINAL</p></div>
// <div class="team utc">
//     <div class="rank"></div>
//     <img class="logo" src="http://www.stickpng.com/assets/images/58419bb6a6515b1e0ad75a55.png"></img>
//     <div class="name">UTA</div>
//     <div class="score">99</div>
//
//     </div>
//</div>

// Develop connection with backgroun.js

var port = chrome.extension.connect({
    name: "Sample Communication"
});


// Recieve JSON object from back
port.onMessage.addListener(function(msg) {
    console.log("message recieved" + msg);
    var numGames = msg['numGames']

    //Loop through the json object to populate the divs with score.
    for (var i =0;i < numGames;i++){



    }

    document.getElementById('test').innerHTML = Object.keys(msg['games']).length.toString();
});
