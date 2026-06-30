//well ima copy stuff
function get_add_total() {
    var c = new Decimal((level - 870) / 10 + 1)
    if (hasUpgrade(25)) { c = c.add(3) }
    if (hasUpgrade(30)) { c = c.add(upgrade_effect(30)) }
    if (hasUpgrade(35)) { c = c.add(player.sub_level) }
    if (hasUpgrade(47)) { c = c.times(2).max(sub_second_debuff().times(3).add(1)) }
    if (hasUpgrade(48)) { c = c.add(player.sums[3].times(3)) }
    if (hasUpgrade(49)) { c = c.times(upgrade_effect(49)) }
    c = c.times(multi_buyable_effect(player.m_buyables[2],2))
    return c
}

function add_first_effect() { //points
    var t = player.sums[0]
    if (player.sub){t = t.sub(sub_second_debuff())}
    t = t.times(add_third_effect())
    return t.pow_base(16)
}

function add_second_effect() { //skip counting
    var t = player.sums[1]
    t = t.times(add_third_effect())
    t = t.pow_base(2).times(t.add(1).pow(3))
    if (hasUpgrade(22) && !hasUpgrade(41)) { t = t.add(player.write)}
    return t
}

function add_third_effect() {
    var t = player.sums[2]
    if (player.sub) { t = t.sub(sub_second_debuff()) }
    t = t.add(10).log(10).pow(2)
    return t
}

function add_fourth_effect() {
    var t = player.sums[3]
    if (hasUpgrade(39)) { t = t.div(upgrade_effect(39)) }
    if (hasUpgrade(51)) { t = t.div(upgrade_effect(51)) }
    t = t.div(multi_buyable_effect(player.m_buyables[5],5))
    return t.pow(1.25).pow_base(1.005)
}