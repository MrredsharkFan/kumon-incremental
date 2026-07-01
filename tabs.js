tab_req = {}

function add_tab(name, req_f,tname=name, color='#ffffff') {
    tab_req[name] = req_f
    document.getElementById("tab_section").innerHTML = document.getElementById("tab_section").innerHTML + `
<button v-if='tab_req["${name}"]()' style="flex:1; background-color: ${color}" onclick='player.tab = "${name}"'>${tname}</button>`
}

add_tab("main", function(){return true}, "Main")
add_tab("num", function () { return hasUpgrade(5) }, "Numbers")
add_tab("add", function () { return hasUpgrade(21) }, "Addition", "#aaffaa")
add_tab("sub", function () { return hasUpgrade(34) }, "Subtraction", "#ffffaa")
add_tab("mul", function () { return hasUpgrade(54) }, "Multiplication", "#ffddaa")
add_tab("fra", function () { return hasUpgrade(6777) }, "Fractions", "#ffaaaa")
add_tab("ord", function () { return hasUpgrade(6777) }, "Order", "#ffaaff")
add_tab("neg", function () { return hasUpgrade(6777) }, "Negative", "#ddaaff")
add_tab("alg", function () { return hasUpgrade(6777) }, "Algebra", "#aaaaff")
add_tab("ine", function () { return hasUpgrade(6777) }, "Inequality", "#77aaff")
add_tab("fac", function () { return hasUpgrade(6777) }, "Factorization", "#22aaff")
add_tab("qua", function () { return hasUpgrade(6777) }, "Quadratics", "#22ddff")
add_tab("exp", function () { return hasUpgrade(6777) }, "Exponents", "#88ffff")
add_tab("der", function () { return hasUpgrade(6777) }, "Derivatives", "#ddffff")
add_tab("int", function () { return hasUpgrade(6777) }, "Integrals", "#ffddff")
add_tab("tri", function () { return hasUpgrade(6777) }, "Trigonometry", "#ddbbdd")
add_tab("seq", function () { return hasUpgrade(6777) }, "Sequences", "#aa88aa")
add_tab("vec", function () { return hasUpgrade(6777) }, "Vectors", "#8844aa")
add_tab("mat", function () { return hasUpgrade(6777) }, "Matricies", "#444488")
add_tab("com", function () { return hasUpgrade(6777) }, "Combintorics", "#444444")
add_tab("sta", function () { return hasUpgrade(6777) }, "Statistics", "#888888")
add_tab("fin", function () { return hasUpgrade(6777) }, "Finale", "#aaaaaa")
add_tab("set", function () { return true }, "Settings")