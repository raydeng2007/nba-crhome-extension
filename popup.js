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

var teaminfo = {
    'GSW':''

}


var port = chrome.extension.connect({
    name: "Sample Communication"
});

port.postMessage('hi backend');
// Recieve JSON object from back
port.onMessage.addListener(function(data) {
    console.log("message recieved" + data);
    var numGames = data['numGames'];

    function createBreaks() {
        var br = document.createElement('br');
        var wrapper = document.getElementById('wrapper');
        wrapper.appendChild(br);
    }

    //Loop through the json object to populate the divs with score.
    for (var i =0;i < numGames;i++){
        var gameObj = data['games'][i];

        var homeTeam = gameObj['hTeam']['triCode'].toLowerCase();
        var homeScore = gameObj['hTeam']['score'];
        var visitTeam = gameObj['vTeam']['triCode'].toLowerCase();
        var visitScore = gameObj['vTeam']['score'];




        //IF the game is finished
        if (gameObj['statusNum']===3){

            var divScoreBoard = document.createElement('div');
            divScoreBoard.classList.add("scoreboard");

            var divHomeTeam = document.createElement('div');
            divHomeTeam.classList.add("team");
            divHomeTeam.classList.add(homeTeam);

            if(parseInt(homeScore)>parseInt(visitScore)){
                divHomeTeam.classList.add('win');
            }


            var divRank1 = document.createElement('div');
            divRank1.classList.add('rank');

            var img1 = document.createElement("img");
            img1.src = 'http://i.cdn.turner.com/nba/nba/teamsites/images/legacy/warriors/1112_GSW3_300.png';
            img1.classList.add('logo');

            var divName1 = document.createElement('div');
            divName1.classList.add('name');
            divName1.innerHTML =  homeTeam.toUpperCase();

            var scoreHome = document.createElement('div');
            scoreHome.classList.add('score');
            scoreHome.innerHTML = homeScore;

            var divAwayTeam = document.createElement('div');
            divAwayTeam.classList.add("team");
            divAwayTeam.classList.add(visitTeam);

            if(parseInt(homeScore)<parseInt(visitScore)){
                divAwayTeam.classList.add('win');
            }

            var divRank2 = document.createElement('div');
            divRank2.classList.add('rank');

            var img2 = document.createElement("img");
            img2.src = 'http://i.cdn.turner.com/nba/nba/teamsites/images/legacy/warriors/1112_GSW3_300.png';
            img2.classList.add('logo');

            var divName2 = document.createElement('div');
            divName2.classList.add('name');
            divName2.innerHTML = visitTeam.toUpperCase();

            var scoreAway = document.createElement('div');
            scoreAway.classList.add('score');
            scoreAway.innerHTML = visitScore;

            //Create home team shit
            divHomeTeam.appendChild(divRank1);
            divHomeTeam.appendChild(img1);
            divHomeTeam.appendChild(divName1);
            divHomeTeam.appendChild(scoreHome);

            //Create the divider
            var divider = document.createElement('div');
            divider.classList.add('divider');
            var paragraph = document.createElement('p');
            var t = document.createTextNode("FINAL");
            paragraph.appendChild(t);
            divider.appendChild(paragraph);

            //Create the Away team shit
            divAwayTeam.appendChild(divRank2);
            divAwayTeam.appendChild(img2);
            divAwayTeam.appendChild(divName2);
            divAwayTeam.appendChild(scoreAway);


            divScoreBoard.appendChild(divHomeTeam);
            divScoreBoard.appendChild(divider);
            divScoreBoard.appendChild(divAwayTeam);


            document.getElementById('wrapper').appendChild(divScoreBoard);

            createBreaks();
            createBreaks();
            createBreaks();


        }

        //IF the game is during but not in OT
        else if (gameObj['statusNum']===2 && gameObj['period']<=4){

        }

        //IF the game is during but not in OT
        else if (gameObj['statusNum']===2 && gameObj['period'] >= 5){

        }

        //IF the game has not yet begun
        else if (gameObj['statusNum']===1){

        }

    }


    //document.getElementById('test').innerHTML = Object.keys(data['games']).length.toString();
});
