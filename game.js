

















function update(dt) {
    //the player, dt = delta time    
}

ct = Date.now()
let loop = setInterval(function () {

    var t = Date.now() - ct
    ct = Date.now()
    update(typeof (t) == "undefined" ? 0 : t)

    
},1)