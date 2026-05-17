//well ima copy stuff
function get_add_total() {
    var c = new Decimal((level - 870) / 10 + 1)
    if (hasUpgrade(25)) { c = c.add(3) }
    if (hasUpgrade(30)) { c = c.add(upgrade_effect(30)) }
    return c
}

function add_first_effect() { //points
    var t = player.sums[0]
    t = t.times(add_third_effect())
    return t.pow_base(16)
}

function add_second_effect() { //skip counting
    var t = player.sums[1]
    t = t.times(add_third_effect())
    t = t.pow_base(2).times(t.add(1).pow(3))
    if (hasUpgrade(22)) { t = t.add(player.write)}
    return t
}

function add_third_effect() {
    var t = player.sums[2]
    t = t.add(10).log(10).pow(2)
    return t
}