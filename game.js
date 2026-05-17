function get_level_pt_req(x) {
    var t = new Decimal(x)
    if (x < 0) { return new Decimal(-1) }
    if (x < 200) {
        return t.div(50).add(1).pow(new Decimal(3).add(x / 100)).add(t.div(10).add(1).pow(2).sub(1).times(4))
    }
    else if (x < 400) {
        return get_level_pt_req(199).pow(t.sub(199).div(200).add(1)).times(t.sub(199).div(200).pow(2.25).add(1))
    }
    else if (x < 600) {
        return get_level_pt_req(399).pow(t.sub(399).div(300).add(1)).times(t.sub(399).div(200).pow(3).add(1))
    }
    else if (x < 870) {
        return get_level_pt_req(599).pow(t.sub(599).div(250).add(1).pow(1.2)).times(t.sub(599).div(200).pow(4).add(1))
    }
    else if (x < 1000) {
        return new Decimal(1e36).pow(t.sub(870).div(130).add(1))
    }
    else if (x < 1200) {
        return new Decimal(1e75).pow(t.sub(1000).div(200).add(1))
    }
    else if (x < 1280) {
        return new Decimal(1e150).pow(t.sub(1200).div(200).add(1))
    }
    else {
        return new Decimal(Infinity)
    }
}

function get_cur_level(x) {
    var x = new Decimal(x)
    var o_level = 4660
    var step = 4096
    while (step != 0.5) {
        if (x.lte(get_level_pt_req(o_level - step))) {
            o_level = o_level - step
        }
        step = step / 2
    }
    return o_level
}

function percent(x=player.skill, l=level) {
    var L1 = get_level_pt_req(l - 1)
    var L2 = get_level_pt_req(l)
    return x.sub(L1).div(L1.sub(L2)).times(100)
}


level = 0

function skill_gain() {
    var g = player.points
    if (hasUpgrade(1)){g = g.times(2)}
    if (hasUpgrade(2)) { g = g.times(2) }
    if (hasUpgrade(3)) { g = g.times(upgrade_effects[3]()) }
    if (hasUpgrade(4)) { g = g.times(2) }
    if (hasUpgrade(5)) { g = g.times(4) }
    g = g.times(get_num_effect())
    if (hasUpgrade(9)) { g = g.times(upgrade_effect(9)) }
    g = g.times(get_write_effect())
    g = g.times(add_first_effect())
    if (hasUpgrade(31)) { g = g.times(upgrade_effect(31)) }
    if (hasUpgrade(28)) { g = g.pow(1.02) }
    return g
}

function update(dt) {
    player.t = player.t+1
    level = get_cur_level(player.skill)
    if (typeof app !== "undefined" && app) { //note: so i dont need the "()" in typeof huh
        app.level = level
    }
    document.getElementById("prog").value = Number(percent(player.skill, level).times(-1))
    //the player, dt = delta time    
    player.skill = player.skill.add(skill_gain().times(dt))
    if (hasUpgrade(32)) {
        player.write = player.write.add(upgrade_effect(32).times(dt))
    }



    player.max_sum = get_add_total()
    player.actual_sum = player.sums[0].add(player.sums[1]).add(player.sums[2])


}

ct = Date.now()
let loop = setInterval(function () {

    var t = Date.now() - ct
    ct = Date.now()
    update(typeof (t) == "undefined" ? 0 : t / 1000)


})