
let senvensixers = document.getElementById('phi');
senvensixers.onclick = function(){
    var tile = document.getElementById('phi');
    tile.classList.toggle("checked")
};

let bos = document.getElementById('bos');
bos.onclick = function(){
    var tile = document.getElementById('bos');
    tile.classList.toggle("checked")
};

let mil = document.getElementById('mil');
mil.onclick = function(){
    var tile = document.getElementById('mil');
    tile.classList.toggle("checked")
};

let tor = document.getElementById('tor');
tor.onclick = function(){
    var tile = document.getElementById('tor');
    tile.classList.toggle("checked")
};

let ind = document.getElementById('ind');
ind.onclick = function(){
    var tile = document.getElementById('ind');
    tile.classList.toggle("checked")
};

let bkn = document.getElementById('bkn');
bkn.onclick = function(){
    var tile = document.getElementById('bkn');
    tile.classList.toggle("checked")
};

let det = document.getElementById('det');
det.onclick = function(){
    var tile = document.getElementById('det');
    tile.classList.toggle("checked")
};

let orl = document.getElementById('orl');
orl.onclick = function(){
    var tile = document.getElementById('orl');
    tile.classList.toggle("checked")
};

let cha = document.getElementById('cha');
cha.onclick = function(){
    var tile = document.getElementById('cha');
    tile.classList.toggle("checked")
};

let mia = document.getElementById('mia');
mia.onclick = function(){
    var tile = document.getElementById('mia');
    tile.classList.toggle("checked")
};

let was = document.getElementById('was');
was.onclick = function(){
    var tile = document.getElementById('was');
    tile.classList.toggle("checked")
};

let atl = document.getElementById('atl');
atl.onclick = function(){
    var tile = document.getElementById('atl');
    tile.classList.toggle("checked")
};

let chi = document.getElementById('chi');
chi.onclick = function(){
    var tile = document.getElementById('chi');
    tile.classList.toggle("checked")
};

let cle = document.getElementById('cle');
cle.onclick = function(){
    var tile = document.getElementById('cle');
    tile.classList.toggle("checked")
};

let nyk = document.getElementById('nyk');
nyk.onclick = function(){
    var tile = document.getElementById('nyk');
    tile.classList.toggle("checked")
};

let gsw = document.getElementById('gsw');
gsw.onclick = function(){
    var tile = document.getElementById('gsw');
    tile.classList.toggle("checked")
};

let den = document.getElementById('den');
den.onclick = function(){
    var tile = document.getElementById('den');
    tile.classList.toggle("checked")
};

let por = document.getElementById('por');
por.onclick = function(){
    var tile = document.getElementById('por');
    tile.classList.toggle("checked")
};

let okc = document.getElementById('okc');
okc.onclick = function(){
    var tile = document.getElementById('okc');
    tile.classList.toggle("checked")
};

let hou = document.getElementById('hou');
hou.onclick = function(){
    var tile = document.getElementById('hou');
    tile.classList.toggle("checked")
};

let uta = document.getElementById('uta');
uta.onclick = function(){
    var tile = document.getElementById('uta');
    tile.classList.toggle("checked")
};

let lac = document.getElementById('lac');
lac.onclick = function(){
    var tile = document.getElementById('lac');
    tile.classList.toggle("checked")
};

let sas = document.getElementById('sas');
sas.onclick = function(){
    var tile = document.getElementById('sas');
    tile.classList.toggle("checked")
};

let sac = document.getElementById('sac');
sac.onclick = function(){
    var tile = document.getElementById('sac');
    tile.classList.toggle("checked")
};

let lal = document.getElementById('lal');
lal.onclick = function(){
    var tile = document.getElementById('lal');
    tile.classList.toggle("checked")
};

let min = document.getElementById('min');
min.onclick = function(){
    var tile = document.getElementById('min');
    tile.classList.toggle("checked")
};

let nop = document.getElementById('nop');
nop.onclick = function(){
    var tile = document.getElementById('nop');
    tile.classList.toggle("checked")
};

let dal = document.getElementById('dal');
dal.onclick = function(){
    var tile = document.getElementById('dal');
    tile.classList.toggle("checked")
};

let mem = document.getElementById('mem');
mem.onclick = function(){
    var tile = document.getElementById('mem');
    tile.classList.toggle("checked")
};

let phx = document.getElementById('phx');
phx.onclick = function(){
    var tile = document.getElementById('phx');
    tile.classList.toggle("checked")
};





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