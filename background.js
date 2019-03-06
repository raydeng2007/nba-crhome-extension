
chrome.runtime.onInstalled.addListener(function() {


    chrome.storage.sync.set({
        favoriteTeams: ['atl','bkn','bos','cha','chi','cle','dal','den',
            'det','gsw','hou','ind','lac','lal','mem','mia','mil','min',
        'nop','nyk','okc','orl','phi','phx','por','sac','sas','tor','uta','was']
    });
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [new chrome.declarativeContent.PageStateMatcher({
            })
            ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });
});


chrome.extension.onConnect.addListener(function(port) {

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd;
    }

    if (mm < 10) {
        mm = '0' + mm;
    }
    today = yyyy +mm + dd;

    console.log("Connected .....");
    port.onMessage.addListener(function(msg) {
        console.log("message recieved " + msg);
        port.postMessage("Establish connection");

        fetch_score(today).then(function(value) {
            console.log(value);
            port.postMessage(value)
        })
    });
})

function fetch_score(date){
    
    return new Promise(function (resolve,reject) {
        var xhr = new XMLHttpRequest();
        var url = 'http://data.nba.net/10s/prod/v2/'+date+'/scoreboard.json';
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200){
                var result = xhr.responseText
                var jsonResponse = JSON.parse(result)
                resolve(jsonResponse);
            }
        };
        xhr.onerror = reject;
        xhr.open('GET',url);
        xhr.send();
    })
}
