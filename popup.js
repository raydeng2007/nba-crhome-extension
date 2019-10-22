var teamInfo = {
    'GSW':'http://i.cdn.turner.com/nba/nba/teamsites/images/legacy/warriors/1112_GSW3_300.png',
    'LAL':'https://ssl.gstatic.com/onebox/media/sports/logos/4ndR-n-gall7_h3f7NYcpQ_96x96.png',
    'TOR':'https://upload.wikimedia.org/wikipedia/en/thumb/3/36/Toronto_Raptors_logo.svg/400px-Toronto_Raptors_logo.svg.png',
    'BOS':'https://upload.wikimedia.org/wikipedia/en/thumb/8/8f/Boston_Celtics.svg/400px-Boston_Celtics.svg.png',
    'BKN':'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Brooklyn_Nets_newlogo.svg/300px-Brooklyn_Nets_newlogo.svg.png',
    'ATL':'https://upload.wikimedia.org/wikipedia/en/thumb/2/24/Atlanta_Hawks_logo.svg/400px-Atlanta_Hawks_logo.svg.png',
    'CHA':'https://upload.wikimedia.org/wikipedia/en/thumb/c/c4/Charlotte_Hornets_%282014%29.svg/400px-Charlotte_Hornets_%282014%29.svg.png',
    'CHI':'https://upload.wikimedia.org/wikipedia/en/thumb/6/67/Chicago_Bulls_logo.svg/400px-Chicago_Bulls_logo.svg.png',
    'CLE':'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Cleveland_Cavaliers_secondary_logo.svg/1186px-Cleveland_Cavaliers_secondary_logo.svg.png',
    'DAL':'https://upload.wikimedia.org/wikipedia/en/thumb/9/97/Dallas_Mavericks_logo.svg/400px-Dallas_Mavericks_logo.svg.png',
    'DEN':'https://upload.wikimedia.org/wikipedia/en/thumb/7/76/Denver_Nuggets.svg/400px-Denver_Nuggets.svg.png',
    'DET':'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Pistons_logo17.svg/400px-Pistons_logo17.svg.png',
    'HOU':'https://upload.wikimedia.org/wikipedia/en/thumb/2/28/Houston_Rockets.svg/400px-Houston_Rockets.svg.png',
    'IND':'https://upload.wikimedia.org/wikipedia/en/thumb/1/1b/Indiana_Pacers.svg/400px-Indiana_Pacers.svg.png',
    'LAC':'https://upload.wikimedia.org/wikipedia/en/thumb/b/bb/Los_Angeles_Clippers_%282015%29.svg/400px-Los_Angeles_Clippers_%282015%29.svg.png',
    'MEM':'https://upload.wikimedia.org/wikipedia/en/thumb/f/f1/Memphis_Grizzlies.svg/400px-Memphis_Grizzlies.svg.png',
    'MIA':'https://upload.wikimedia.org/wikipedia/en/thumb/f/fb/Miami_Heat_logo.svg/400px-Miami_Heat_logo.svg.png',
    'MIL':'https://upload.wikimedia.org/wikipedia/en/thumb/4/4a/Milwaukee_Bucks_logo.svg/400px-Milwaukee_Bucks_logo.svg.png',
    'MIN':'https://upload.wikimedia.org/wikipedia/en/thumb/c/c2/Minnesota_Timberwolves_logo.svg/400px-Minnesota_Timberwolves_logo.svg.png',
    'NOP':'https://upload.wikimedia.org/wikipedia/en/thumb/0/0d/New_Orleans_Pelicans_logo.svg/400px-New_Orleans_Pelicans_logo.svg.png',
    'NYK':'https://upload.wikimedia.org/wikipedia/en/thumb/2/25/New_York_Knicks_logo.svg/400px-New_York_Knicks_logo.svg.png',
    'OKC':'https://upload.wikimedia.org/wikipedia/en/thumb/5/5d/Oklahoma_City_Thunder.svg/400px-Oklahoma_City_Thunder.svg.png',
    'ORL':'https://upload.wikimedia.org/wikipedia/en/thumb/1/10/Orlando_Magic_logo.svg/400px-Orlando_Magic_logo.svg.png',
    'PHI':'https://upload.wikimedia.org/wikipedia/en/thumb/0/0e/Philadelphia_76ers_logo.svg/400px-Philadelphia_76ers_logo.svg.png',
    'PHX':'https://upload.wikimedia.org/wikipedia/en/thumb/d/dc/Phoenix_Suns_logo.svg/400px-Phoenix_Suns_logo.svg.png',
    'POR':'https://upload.wikimedia.org/wikipedia/en/thumb/2/21/Portland_Trail_Blazers_logo.svg/440px-Portland_Trail_Blazers_logo.svg.png',
    'SAC':'https://upload.wikimedia.org/wikipedia/en/thumb/c/c7/SacramentoKings.svg/400px-SacramentoKings.svg.png',
    'SAS':'https://upload.wikimedia.org/wikipedia/en/thumb/a/a2/San_Antonio_Spurs.svg/400px-San_Antonio_Spurs.svg.png',
    'UTA':'https://upload.wikimedia.org/wikipedia/en/thumb/0/04/Utah_Jazz_logo_%282016%29.svg/400px-Utah_Jazz_logo_%282016%29.svg.png',
    'WAS':'https://upload.wikimedia.org/wikipedia/en/thumb/0/02/Washington_Wizards_logo.svg/400px-Washington_Wizards_logo.svg.png',
}


var port = chrome.extension.connect({
    name: "Communication Chanel"
});


port.postMessage('hi backend');
// Recieve JSON object from back
port.onMessage.addListener(function(data) {
    console.log("message recieved" + data);
    console.log('daa'+ data['games']);


    var date_of_game = data['games'][0]['startDateEastern'];
    var today = new Date();
    var dd = today.getDate()+'';
    var mm = (today.getMonth() + 1)+''; //January is 0!
    var yyyy = today.getFullYear()+'';


    if (dd < 10) {
        dd = '0' + dd;
    }

    if (mm < 10) {
        mm = '0' + mm;
    }
    today = yyyy +mm + dd;


    if (date_of_game === today) {

        var numGames = data['numGames'];



        function createBreaks() {
            var br = document.createElement('br');
            var wrapper = document.getElementById('wrapper');
            wrapper.appendChild(br);
        }


        function getValue(callback) {
            chrome.storage.sync.get('favoriteTeams', callback);

        }


        //Loop through the json object to populate the divs with score.
        for (let i = 0; i < numGames; i++) {


            getValue(function (value) {
                var gameObj = data['games'][i];
                var homeTeam = gameObj['hTeam']['triCode'].toLowerCase();
                var homeScore = gameObj['hTeam']['score'];
                var visitTeam = gameObj['vTeam']['triCode'].toLowerCase();
                var visitScore = gameObj['vTeam']['score'];
                var favTeams = value['favoriteTeams'];
                try {
                    var vTeamWon  = gameObj['playoffs']['vTeam']['seriesWin'];
                }
                catch {
                    var vTeamWon  = 0;
                };

                try {
                    var hTeamWon  = gameObj['playoffs']['hTeam']['seriesWin'];
                }
                catch {
                    var hTeamWon  = 0;
                }

                if (favTeams.includes(homeTeam) || favTeams.includes(visitTeam)) {


                    //IF the game is finished
                    if (gameObj['statusNum'] === 3) {

                        var divScoreBoard = document.createElement('div');
                        divScoreBoard.classList.add("scoreboard");

                        var divHomeTeam = document.createElement('div');
                        divHomeTeam.classList.add("team");
                        divHomeTeam.classList.add(homeTeam);

                        if (parseInt(homeScore) > parseInt(visitScore)) {
                            divHomeTeam.classList.add('win');
                        }

                        var divRank1 = document.createElement('div');
                        divRank1.classList.add('rank');
                        divRank1.innerHTML = hTeamWon;

                        var img1 = document.createElement("img");
                        img1.src = teamInfo[homeTeam.toUpperCase()];
                        img1.classList.add('logo');

                        var divName1 = document.createElement('div');
                        divName1.classList.add('name');
                        divName1.innerHTML = homeTeam.toUpperCase();

                        var scoreHome = document.createElement('div');
                        scoreHome.classList.add('score');
                        scoreHome.innerHTML = homeScore;

                        var divAwayTeam = document.createElement('div');
                        divAwayTeam.classList.add("team");
                        divAwayTeam.classList.add(visitTeam);

                        if (parseInt(homeScore) < parseInt(visitScore)) {
                            divAwayTeam.classList.add('win');
                        }

                        var divRank2 = document.createElement('div');
                        divRank2.classList.add('rank');
                        divRank2.innerHTML = vTeamWon;

                        var img2 = document.createElement("img");
                        img2.src = teamInfo[visitTeam.toUpperCase()];
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
                        var final = document.createTextNode("FINAL");
                        paragraph.appendChild(final);
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
                    else if (gameObj['statusNum'] === 2 && gameObj['period']['current'] <= 4) {

                        var divScoreBoard = document.createElement('div');
                        divScoreBoard.classList.add("scoreboard");

                        var divHomeTeam = document.createElement('div');
                        divHomeTeam.classList.add("team");
                        divHomeTeam.classList.add(homeTeam);


                        var divRank1 = document.createElement('div');
                        divRank1.classList.add('rank');
                        divRank1.innerHTML = hTeamWon;

                        var img1 = document.createElement("img");
                        img1.src = teamInfo[homeTeam.toUpperCase()];
                        img1.classList.add('logo');

                        var divName1 = document.createElement('div');
                        divName1.classList.add('name');
                        divName1.innerHTML = homeTeam.toUpperCase();

                        var scoreHome = document.createElement('div');
                        scoreHome.classList.add('score');
                        scoreHome.innerHTML = homeScore;

                        var divAwayTeam = document.createElement('div');
                        divAwayTeam.classList.add("team");
                        divAwayTeam.classList.add(visitTeam);


                        var divRank2 = document.createElement('div');
                        divRank2.classList.add('rank');
                        divRank2.innerHTML = vTeamWon;

                        var img2 = document.createElement("img");
                        img2.src = teamInfo[visitTeam.toUpperCase()];
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
                        var quarter = gameObj['period']['current'].toString()
                        var t = document.createTextNode(quarter + 'Q');
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

                    //IF the game is during and in OT
                    else if (gameObj['statusNum'] === 2 && gameObj['period']['current'] >= 5) {
                        var divScoreBoard = document.createElement('div');
                        divScoreBoard.classList.add("scoreboard");

                        var divHomeTeam = document.createElement('div');
                        divHomeTeam.classList.add("team");
                        divHomeTeam.classList.add(homeTeam);


                        var divRank1 = document.createElement('div');
                        divRank1.classList.add('rank');
                        divRank1.innerHTML = hTeamWon;

                        var img1 = document.createElement("img");
                        img1.src = teamInfo[homeTeam.toUpperCase()];
                        img1.classList.add('logo');

                        var divName1 = document.createElement('div');
                        divName1.classList.add('name');
                        divName1.innerHTML = homeTeam.toUpperCase();

                        var scoreHome = document.createElement('div');
                        scoreHome.classList.add('score');
                        scoreHome.innerHTML = homeScore;

                        var divAwayTeam = document.createElement('div');
                        divAwayTeam.classList.add("team");
                        divAwayTeam.classList.add(visitTeam);


                        var divRank2 = document.createElement('div');
                        divRank2.classList.add('rank');
                        divRank2.innerHTML = vTeamWon;

                        var img2 = document.createElement("img");
                        img2.src = teamInfo[visitTeam.toUpperCase()];
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

                        var ot = (gameObj['period'] - 4).toString()
                        var t = document.createTextNode(ot + ' OT');
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

                    //IF the game has not yet begun
                    else if (gameObj['statusNum'] === 1) {

                        var divScoreBoard = document.createElement('div');
                        divScoreBoard.classList.add("scoreboard");

                        var divHomeTeam = document.createElement('div');
                        divHomeTeam.classList.add("team");
                        divHomeTeam.classList.add(homeTeam);


                        var divRank1 = document.createElement('div');
                        divRank1.classList.add('rank');
                        divRank1.innerHTML = hTeamWon;

                        var img1 = document.createElement("img");
                        img1.src = teamInfo[homeTeam.toUpperCase()];
                        img1.classList.add('logo');

                        var divName1 = document.createElement('div');
                        divName1.classList.add('name');
                        divName1.innerHTML = homeTeam.toUpperCase();

                        var scoreHome = document.createElement('div');
                        scoreHome.classList.add('score');
                        scoreHome.innerHTML = '0';

                        var divAwayTeam = document.createElement('div');
                        divAwayTeam.classList.add("team");
                        divAwayTeam.classList.add(visitTeam);

                        var divRank2 = document.createElement('div');
                        divRank2.classList.add('rank');
                        divRank2.innerHTML = vTeamWon;


                        var img2 = document.createElement("img");
                        img2.src = teamInfo[visitTeam.toUpperCase()];
                        img2.classList.add('logo');

                        var divName2 = document.createElement('div');
                        divName2.classList.add('name');
                        divName2.innerHTML = visitTeam.toUpperCase();

                        var scoreAway = document.createElement('div');
                        scoreAway.classList.add('score');
                        scoreAway.innerHTML = '0';

                        //Create home team
                        divHomeTeam.appendChild(divRank1);
                        divHomeTeam.appendChild(img1);
                        divHomeTeam.appendChild(divName1);
                        divHomeTeam.appendChild(scoreHome);

                        //Create the divider
                        var divider = document.createElement('div');
                        divider.classList.add('divider');
                        var paragraph = document.createElement('p');
                        var time = gameObj['startTimeEastern'].substring(0, 5)
                        var t = document.createTextNode(time);
                        paragraph.appendChild(t);
                        divider.appendChild(paragraph);

                        //Create the Away team
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

                }
            })


        }

    }else {
        var numGames = data['numGames'];



        function createBreaks() {
            var br = document.createElement('br');
            var wrapper = document.getElementById('yesterday');
            wrapper.appendChild(br);
        }


        function getValue(callback) {
            chrome.storage.sync.get('favoriteTeams', callback);

        }


        //Loop through the json object to populate the divs with score.
        for (let i = 0; i < numGames; i++) {


            getValue(function (value) {
                var gameObj = data['games'][i];
                var homeTeam = gameObj['hTeam']['triCode'].toLowerCase();
                var homeScore = gameObj['hTeam']['score'];
                var visitTeam = gameObj['vTeam']['triCode'].toLowerCase();
                var visitScore = gameObj['vTeam']['score'];
                var favTeams = value['favoriteTeams'];

                try {
                    var vTeamWon  = gameObj['playoffs']['vTeam']['seriesWin'];
                }
                catch {
                    var vTeamWon  = 0;
                };

                try {
                    var hTeamWon  = gameObj['playoffs']['hTeam']['seriesWin'];
                }
                catch {
                    var hTeamWon  = 0;
                }
                if (favTeams.includes(homeTeam) || favTeams.includes(visitTeam)) {


                    //IF the game is finished
                    if (gameObj['statusNum'] === 3) {

                        var divScoreBoard = document.createElement('div');
                        divScoreBoard.classList.add("scoreboard");

                        var divHomeTeam = document.createElement('div');
                        divHomeTeam.classList.add("team");
                        divHomeTeam.classList.add(homeTeam);

                        if (parseInt(homeScore) > parseInt(visitScore)) {
                            divHomeTeam.classList.add('win');
                        }


                        var divRank1 = document.createElement('div');
                        divRank1.classList.add('rank');
                        divRank1.innerHTML = hTeamWon;

                        var img1 = document.createElement("img");
                        img1.src = teamInfo[homeTeam.toUpperCase()];
                        img1.classList.add('logo');

                        var divName1 = document.createElement('div');
                        divName1.classList.add('name');
                        divName1.innerHTML = homeTeam.toUpperCase();

                        var scoreHome = document.createElement('div');
                        scoreHome.classList.add('score');
                        scoreHome.innerHTML = homeScore;

                        var divAwayTeam = document.createElement('div');
                        divAwayTeam.classList.add("team");
                        divAwayTeam.classList.add(visitTeam);

                        if (parseInt(homeScore) < parseInt(visitScore)) {
                            divAwayTeam.classList.add('win');
                        }

                        var divRank2 = document.createElement('div');
                        divRank2.classList.add('rank');
                        divRank2.innerHTML = vTeamWon;

                        var img2 = document.createElement("img");
                        img2.src = teamInfo[visitTeam.toUpperCase()];
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


                        document.getElementById('yesterday').appendChild(divScoreBoard);

                        createBreaks();
                        createBreaks();
                        createBreaks();


                    }

                    //IF the game is during but not in OT
                    else if (gameObj['statusNum'] === 2 && gameObj['period']['current'] <= 4) {

                        var divScoreBoard = document.createElement('div');
                        divScoreBoard.classList.add("scoreboard");

                        var divHomeTeam = document.createElement('div');
                        divHomeTeam.classList.add("team");
                        divHomeTeam.classList.add(homeTeam);


                        var divRank1 = document.createElement('div');
                        divRank1.classList.add('rank');
                        divRank1.innerHTML = hTeamWon;

                        var img1 = document.createElement("img");
                        img1.src = teamInfo[homeTeam.toUpperCase()];
                        img1.classList.add('logo');

                        var divName1 = document.createElement('div');
                        divName1.classList.add('name');
                        divName1.innerHTML = homeTeam.toUpperCase();

                        var scoreHome = document.createElement('div');
                        scoreHome.classList.add('score');
                        scoreHome.innerHTML = homeScore;

                        var divAwayTeam = document.createElement('div');
                        divAwayTeam.classList.add("team");
                        divAwayTeam.classList.add(visitTeam);


                        var divRank2 = document.createElement('div');
                        divRank2.classList.add('rank');
                        divRank2.innerHTML = vTeamWon;

                        var img2 = document.createElement("img");
                        img2.src = teamInfo[visitTeam.toUpperCase()];
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
                        var quarter = gameObj['period']['current'].toString()
                        var t = document.createTextNode(quarter + 'Q');
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


                        document.getElementById('yesterday').appendChild(divScoreBoard);

                        createBreaks();
                        createBreaks();
                        createBreaks();

                    }

                    //IF the game is during and in OT
                    else if (gameObj['statusNum'] === 2 && gameObj['period']['current'] >= 5) {
                        var divScoreBoard = document.createElement('div');
                        divScoreBoard.classList.add("scoreboard");

                        var divHomeTeam = document.createElement('div');
                        divHomeTeam.classList.add("team");
                        divHomeTeam.classList.add(homeTeam);


                        var divRank1 = document.createElement('div');
                        divRank1.classList.add('rank');
                        divRank1.innerHTML = hTeamWon;

                        var img1 = document.createElement("img");
                        img1.src = teamInfo[homeTeam.toUpperCase()];
                        img1.classList.add('logo');

                        var divName1 = document.createElement('div');
                        divName1.classList.add('name');
                        divName1.innerHTML = homeTeam.toUpperCase();

                        var scoreHome = document.createElement('div');
                        scoreHome.classList.add('score');
                        scoreHome.innerHTML = homeScore;

                        var divAwayTeam = document.createElement('div');
                        divAwayTeam.classList.add("team");
                        divAwayTeam.classList.add(visitTeam);


                        var divRank2 = document.createElement('div');
                        divRank2.classList.add('rank');
                        divRank2.innerHTML = vTeamWon;

                        var img2 = document.createElement("img");
                        img2.src = teamInfo[visitTeam.toUpperCase()];
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

                        var ot = (gameObj['period'] - 4).toString()
                        var t = document.createTextNode(ot + ' OT');
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


                        document.getElementById('yesterday').appendChild(divScoreBoard);

                        createBreaks();
                        createBreaks();
                        createBreaks();


                    }

                    //IF the game has not yet begun
                    else if (gameObj['statusNum'] === 1) {
                        var divScoreBoard = document.createElement('div');
                        divScoreBoard.classList.add("scoreboard");

                        var divHomeTeam = document.createElement('div');
                        divHomeTeam.classList.add("team");
                        divHomeTeam.classList.add(homeTeam);


                        var divRank1 = document.createElement('div');
                        divRank1.classList.add('rank');
                        divRank1.innerHTML = hTeamWon;

                        var img1 = document.createElement("img");
                        img1.src = teamInfo[homeTeam.toUpperCase()];
                        img1.classList.add('logo');

                        var divName1 = document.createElement('div');
                        divName1.classList.add('name');
                        divName1.innerHTML = homeTeam.toUpperCase();

                        var scoreHome = document.createElement('div');
                        scoreHome.classList.add('score');
                        scoreHome.innerHTML = '0';

                        var divAwayTeam = document.createElement('div');
                        divAwayTeam.classList.add("team");
                        divAwayTeam.classList.add(visitTeam);


                        var divRank2 = document.createElement('div');
                        divRank2.classList.add('rank');
                        divRank2.innerHTML = vTeamWon;

                        var img2 = document.createElement("img");
                        img2.src = teamInfo[visitTeam.toUpperCase()];
                        img2.classList.add('logo');

                        var divName2 = document.createElement('div');
                        divName2.classList.add('name');
                        divName2.innerHTML = visitTeam.toUpperCase();

                        var scoreAway = document.createElement('div');
                        scoreAway.classList.add('score');
                        scoreAway.innerHTML = '0';

                        //Create home team shit
                        divHomeTeam.appendChild(divRank1);
                        divHomeTeam.appendChild(img1);
                        divHomeTeam.appendChild(divName1);
                        divHomeTeam.appendChild(scoreHome);

                        //Create the divider
                        var divider = document.createElement('div');
                        divider.classList.add('divider');
                        var paragraph = document.createElement('p');
                        var time = gameObj['startTimeEastern'].substring(0, 5)
                        var t = document.createTextNode(time);
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


                        document.getElementById('yesterday').appendChild(divScoreBoard);

                        createBreaks();
                        createBreaks();
                        createBreaks();
                    }

                }
            })


        }
    }

});
