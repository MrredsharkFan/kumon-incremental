//well ima copy stuff
function get_add_total() {
    var c = new Decimal((level - 870) / 10 + 1)
    return c
}

function add_first_effect() { //points
    var t = player.sums[0]
    return t.pow_base(16)
}

function add_second_effect() { //skip counting
    var t = player.sums[1]
    t = t.pow_base(2).times(t.add(1).pow(3))
    if (hasUpgrade(22)) { t = t.add(player.write)}
    return t
}