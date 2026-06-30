function get_num_chance(L = level) {
    if (L<200){return new Decimal(0)}
    var t = 0.5 - 0.5*Math.max(0, 1 - 0.994 ** (L - 200))
    t = new Decimal(t).pow(-1)
    if (hasUpgrade(17)) { t = t.times(upgrade_effect(17).toNumber()) }
    if (hasUpgrade(22)) { t = t.times(3) }
    t = t.div(add_second_effect())
    return new Decimal(1).sub(t.pow(-1)).max(0) //so there are times when counting becomes IMPOSSIBLE LOL
}

function get_num_effect(n = hasUpgrade(14)?player.best_number:player.number) {
    var p = new Decimal(2)
    if (hasUpgrade(11)) { p = p.times(upgrade_effect(11)) }
    if (hasUpgrade(19)) { p = p.times(upgrade_effect(19)) }
    var e = n.add(1).pow(p)
    if (e.gte("1e300")) {
        e = e.log10().div(300).add(9).pow(300)
    }
    if (player.sub & hasUpgrade(44)) {
        e = e.pow(1.5)
    }
    if (hasUpgrade(45)) {
        e = e.pow(1.1)
    }
    return e
}

function get_write_effect(n = player.write) {
    var e = n.add(1).pow(0.8).sub(1).pow_base(2)
    if (e.gte("1e33")) {
        e = e.log(10).div(33).pow(25).times(1e33)
    }
    if (hasUpgrade(67)){e = star(e,1.2)}
    return e
}

function num_cooldown() {
    var t = 1e4
    if (player.upgrades.indexOf(6) != -1) { t = t / 2 }
    if (player.upgrades.indexOf(8) != -1) { t = t / 2.5 }
    if (hasUpgrade(10)) { t = t / upgrade_effect(10).toNumber() }
    if (hasUpgrade(22)) { t = t / 2 }
    return t
}

function roll_number() {
    if (Date.now() > player.nn) {
        player.nn = Date.now()+num_cooldown()
        if (new Decimal(Math.random()).lte(get_num_chance())) {
            var m = new Decimal(1)
            if (hasUpgrade(12) && Math.random()<0.15){m = m.times(2)}
            player.number = player.number.add(add_second_effect().times(m))
            if (player.number.gte(player.best_number)) {
                player.best_number = player.number
            }
        }
        else {
            player.number = new Decimal(0)
        }
    }
}