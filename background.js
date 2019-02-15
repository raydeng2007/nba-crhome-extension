chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({color: '#3aa757'}, function() {
        console.log("The color is green.");
    });
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [new chrome.declarativeContent.PageStateMatcher({
                pageUrl: {hostEquals: 'developer.chrome.com'},
            })
            ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });
});

var xhr = new XMLHttpRequest();
xhr.open("GET", "http://data.nba.net/10s/prod/v2/20190211/scoreboard.json", true);
xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
        // WARNING! Might be injecting a malicious script!
        console.log( xhr.responseText);


    }
}
xhr.send()
console.log('gay')