function get_num_chance(L=level) {
    var t = 1 - Math.max(0, 1 - 0.994 ** (L - 200))
    if (hasUpgrade(12)){t = t/(upgrade_effect(12).toNumber())}
    return 1-t
}

function get_num_effect(n=player.number) {
    var e = player.number.add(1).pow(0.75).sub(1).pow_base(9)
    var s = new Decimal(1e7)
    if (hasUpgrade(14)) { s = s.times(upgrade_effect(14)) }
    if (e.gte(s)){
        e = e.pow(1/7).times(s.pow(6/7))
    }
    return e
}

function get_write_effect(n = player.write) {
    var e = n.add(1).pow(0.8).sub(1).pow_base(2)
    return e
}

function num_cooldown() {
    var t = 1e4
    if (player.upgrades.indexOf(6) != -1) { t = t / 2 }
    if (player.upgrades.indexOf(8) != -1) { t = t / 2.5 }
    if (hasUpgrade(10)) { t = t / upgrade_effect(10).toNumber() }
    return t
}

function roll_number() {
    if (Date.now() > player.nn) {
        player.nn = Date.now()+num_cooldown()
        if (Math.random() < get_num_chance()) {
            player.number = player.number.add(1)
        }
        else {
            player.number = new Decimal(0)
        }
    }
}