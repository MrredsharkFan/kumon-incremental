function get_m_ess_gain() {
    var b = new Decimal(1)
    b = b.times(multi_buyable_effect(player.m_buyables[0], 0))
    if (hasUpgrade(58)) { b = b.times(upgrade_effect(58)) }
    if (hasUpgrade(60)) { b = b.times(upgrade_effect(60)) }
    return b
}

function gen_new_multi() {
    var MAX = 3 + Number(multi_buyable_effect(player.m_buyables[3], 3))
    player.m_q = [Math.floor(Math.random() * (MAX) + 1), Math.floor(Math.random() * (MAX) + 1)]
    if (hasUpgrade(57)) {
        if (Math.random() < 0.2) {
            var X = Math.floor(Math.random() * 2)
            player.m_q[X] = 10+Math.floor(Math.random()*10)
        }
    }
}

function multi_logic() {
    if (document.getElementById("multi_table").value == player.m_q[0] * player.m_q[1]) {
        var m_power = new Decimal(0)
        if (hasUpgrade(55)) {
            m_power = m_power.add(0.5)
        }
        if (hasUpgrade(56)) {
            m_power = m_power.add(0.5)
        }
        var gain = get_m_ess_gain().times(new Decimal(player.m_q[0] * player.m_q[1]).pow(m_power))
        if (player.m_q[0] >= 10 || player.m_q[1] >= 10) {
            gain = gain.times(10)
        }
        player.m_ess = player.m_ess.add(gain)
        document.getElementById("m_gain").innerHTML = `Gained ${format(gain)} multiplication essence!`
        gen_new_multi()
        document.getElementById("multi_table").value = ""
    }
}

function multi_buyable_cost(amt, id) {
    var amt = new Decimal(amt)
    if (id == 0) {
        return amt.pow_base(3).times(10)
    }
    if (id == 1) {
        return amt.pow_base(2).times(10)
    }
    if (id == 2) {
        return amt.pow_base(2).times(50)
    }
    if (id == 3) {
        if (amt == new Decimal(6)) {
            return new Decimal("eeeeeee99999")
        }
        return amt.pow(2).pow_base(10).times(150)
    }
}

function multi_buyable_effect(amt=player.m_buyables[id], id) {
    var amt = new Decimal(amt)
    if (id == 0) {
        return amt.pow_base(2)
    }
    if (id == 1) {
        return amt.times(0.01).add(1)
    }
    if (id == 2) {
        return amt.times(0.02).add(1)
    }
    if (id == 3) {
        return amt
    }
}

function buy_m_buyable(id) {
    if (player.m_ess.gte(multi_buyable_cost(player.m_buyables[id], id))) {
        player.m_ess = player.m_ess.sub(multi_buyable_cost(player.m_buyables[id], id))
        player.m_buyables[id] = player.m_buyables[id].add(1)
    }
}