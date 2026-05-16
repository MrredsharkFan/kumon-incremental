tab_req = {}

function add_tab(name, req_f,tname=name) {
    tab_req[name] = req_f
    document.getElementById("tab_section").innerHTML = document.getElementById("tab_section").innerHTML + `
<button v-if='tab_req["${name}"]()' onclick='player.tab = "${name}"'>${tname}</button>`
}

add_tab("main", function(){return true}, "Main")
add_tab("num", function () { return hasUpgrade(5) }, "Numbers")
add_tab("add", function () { return hasUpgrade(21) }, "Addition")
add_tab("set", function () { return true }, "Settings")