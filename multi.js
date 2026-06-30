function get_m_ess_gain() {
    var b = new Decimal(1)
    b = b.times(multi_buyable_effect(player.m_buyables[0], 0))
    if (hasUpgrade(58)) { b = b.times(upgrade_effect(58)) }
    if (hasUpgrade(60)) { b = b.times(upgrade_effect(60)) }
    if (hasUpgrade(61)) { b = b.times(4) }
    if (hasUpgrade(68)) { b = b.times(4) }
    if (hasUpgrade(69)) { b = b.times(10) }
    return b
}

function get_d_ess_gain() {
    var b = new Decimal(1)
    if (hasUpgrade(62)) { b = b.times(upgrade_effect(62)) }
    if (hasUpgrade(63)) { b = b.times(upgrade_effect(63)) }
    return b
}

function gen_new_multi() {
    var MAX = 3 + Number(multi_buyable_effect(player.m_buyables[3], 3))
    if (!hasUpgrade(61) || Math.random() < 0.5) {
        player.m_q = [Math.floor(Math.random() * (MAX) + 1), Math.floor(Math.random() * (MAX) + 1),0]
        if (hasUpgrade(57)) {
            if (Math.random() < 0.2) {
                var X = Math.floor(Math.random() * 2)
                player.m_q[X] = 10 + Math.floor(Math.random() * 10)
            }
        }
    }
    else {
        if (!hasUpgrade(70)) { var MAX = 3 }
        player.m_q = [Math.floor(Math.random() * (MAX) + 1), Math.floor(Math.random() * (MAX) + 1),1]
        player.m_q[0] *= player.m_q[1]
    }
}

function mul_mul() {
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
}

function multi_logic() {
    if (player.tab == "mul") {
        var ans = document.getElementById("multi_table").value
        if (ans == player.m_q[0] * player.m_q[1] & player.m_q[2] == 0 || ans == player.m_q[0] / player.m_q[1] & player.m_q[2] == 1) {
            if (player.m_q[2] == 0) {
                mul_mul()
            }
            else {
                var gain = get_d_ess_gain()
                player.d_ess = player.d_ess.add(gain)
                if (hasUpgrade(68)){mul_mul()}
                document.getElementById("m_gain").innerHTML = `Gained ${format(gain)} division essence!`
            }
            document.getElementById("multi_table").value = ""
            gen_new_multi()
        }
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
    if (id == 4) {
        var v = amt.pow(1.25).pow_base(2).times(10)
        v = v.div(multi_buyable_effect(player.m_buyables[7], 7))
        return v
    }
    if (id == 5) {
        var v = amt.pow(1.5).pow_base(3).times(100)
        v = v.div(multi_buyable_effect(player.m_buyables[7], 7))
        return v
    }
    if (id == 6) {
        var v = amt.pow_base(1.4).times(600)
        v = v.div(multi_buyable_effect(player.m_buyables[7], 7))
        return v
    }
    if (id == 7) {
        return amt.pow(2).pow_base(100).times(1000)
    }
}

function autobuy_u123() {
    player.m_buyables[0] = player.m_ess.div(10).add(1).log(3)
    player.m_buyables[1] = player.m_ess.div(10).add(1).log(2)
    player.m_buyables[2] = player.m_ess.div(50).add(1).log(2)
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
        var p = amt.times(0.02).add(1)
        if (p.gte(2)) {
            p = p.add(8).log10().add(1)
        }
        return p
    }
    if (id == 3) {
        return amt
    }
    if (id == 4) {
        return amt.pow_base(1.1)
    }
    if (id == 5) {
        return amt.times(0.01).add(1)
    }
    if (id == 6) {
        return amt.times(0.01).add(1)
    }
    if (id == 7) {
        return amt.pow_base(1000)
    }
}

function buy_m_buyable(id) {
    var b = player.m_buyables[id]
    if ([0, 1, 2, 3].includes(id) && !hasUpgrade(66)) {
        if (player.m_ess.gte(multi_buyable_cost(b, id))) {
            player.m_ess = player.m_ess.sub(multi_buyable_cost(b, id))
            player.m_buyables[id] = b.add(1)
        }
    } else {
        if (player.d_ess.gte(multi_buyable_cost(b, id))) {
            player.d_ess = player.d_ess.sub(multi_buyable_cost(b, id))
            player.m_buyables[id] = b.add(1)
        }
        if (id == 7) {
            player.m_buyables[0] = new Decimal(0)
            player.m_buyables[1] = new Decimal(0)
            player.m_buyables[2] = new Decimal(0)
            player.m_buyables[3] = new Decimal(0)
            player.m_ess = new Decimal(0)
        }
    }
}