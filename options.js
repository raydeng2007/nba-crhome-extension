

let divs = document.getElementsByTagName("div");
for(var i = 0; i < divs.length; i++){
    if( divs[i].className == 'tile') {

        console.log(divs[i])
    }
}


let senvensixers = document.getElementById('76er');

senvensixers.onclick = function(){
    var tile = document.getElementById('76er');
    tile.classList.toggle("mystyle")
}

