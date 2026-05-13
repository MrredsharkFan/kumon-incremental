function get_buyable_cost(name,amt) {
    if (name == "write") {
        var s = new Decimal(1)
        if (hasUpgrade(13)) { s = s.times(upgrade_effect(13)) }
        if (hasUpgrade(15)) { s = s.times(upgrade_effect(15)) }
        if (amt.gte(30)) {
            amt = amt.times(amt.div(30))
        }
        return amt.div(s).add(1).pow(0.75).pow_base(10).times(1e12)
    }
}

function buy_buyable(name, amt) {
    if (name == "write") {
        if (player.skill.gte(get_buyable_cost(name, amt))) {
            player.skill = player.skill.sub(get_buyable_cost(name, amt))
            player.write = player.write.add(1)
        }
    }
}