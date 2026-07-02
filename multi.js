function get_m_ess_gain() {
    var b = new Decimal(1)
    b = b.times(multi_buyable_effect(player.m_buyables[0], 0))
    if (hasUpgrade(58)) { b = b.times(upgrade_effect(58)) }
    if (hasUpgrade(60)) { b = b.times(upgrade_effect(60)) }
    if (hasUpgrade(61)) { b = b.times(4) }
    if (hasUpgrade(68)) { b = b.times(4) }
    if (hasUpgrade(71)) { b = b.times(upgrade_effect(71)) }
    if (hasUpgrade(75)) { b = b.times(upgrade_effect(75)) }
    if (hasUpgrade(78)) { b = b.times(upgrade_effect(78)) }
    return b
}

function get_d_ess_gain() {
    var b = new Decimal(1)
    if (hasUpgrade(62)) { b = b.times(upgrade_effect(62)) }
    if (hasUpgrade(63)) { b = b.times(upgrade_effect(63)) }
    if (hasUpgrade(69)) { b = b.times(upgrade_effect(69)) }
    b = b.times(remainder_effect(player.m_q[0] % player.m_q[1]))
    return b
}

function gen_new_multi() {
    var MAX = 3 + Number(multi_buyable_effect(player.m_buyables[3], 3))
    if (!hasUpgrade(61) || Math.random() < 0.5) {
        player.m_q = [Math.floor(Math.random() * (MAX) + 1), Math.floor(Math.random() * (MAX) + 1),0]
        if (hasUpgrade(57)) {
            if (Math.random() < 0.2) {
                var X = Math.floor(Math.random() * 2)
                player.m_q[X] = 10 + Math.floor(Math.random() * (!hasUpgrade(68)?10:90)) //ofc we do the not not = 
            }
        }
    }
    else {
        if (!hasUpgrade(70)) { var MAX = 3 }
        player.m_q = [Math.floor(Math.random() * (MAX) + 1), Math.floor(Math.random() * (MAX) + 1),1]
        player.m_q[0] *= player.m_q[1]
    }
}

function true_mul_gain() {
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
    return gain
}

function mul_mul(t = 1) {
    player.m_ess = player.m_ess.add(true_mul_gain().times(t))
}

function multi_logic() {
    player.rem = player.m_q[0] % player.m_q[1]
    if (player.tab == "mul") {
        var ans = document.getElementById("multi_table").value
        if (ans == player.m_q[0] * player.m_q[1] & player.m_q[2] == 0 || (ans == player.m_q[0] / player.m_q[1] & player.m_q[2] == 1 & player.m_q[0]%player.m_q[1]==0)) {
            if (player.m_q[2] == 0) {
                mul_mul()
            }
            else {
                var gain = get_d_ess_gain()
                player.d_ess = player.d_ess.add(gain)
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
        if (amt.eq(5) & !hasUpgrade(74)) {
            return new Decimal(Infinity)
        }
        var sc = new Decimal(2)
        if (hasUpgrade(76)) { sc = new Decimal(1.6) }
        if (hasUpgrade(77)) { sc = new Decimal(1.4) }
        return amt.pow(sc).pow_base(10).times(150)
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
    if (id == 8) {
        if (amt.eq(2)) {
            return new Decimal(Infinity)
        }
        if (amt.eq(1)) {
            return new Decimal(1e24)
        }
        return new Decimal(1e6)
    }
    if (id == 9) {
        return amt.pow(1.5).pow_base(3).times(1e35)
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
    if (id == 9) {
        return amt.pow_base(2).sub(1)
    }
}

function buy_m_buyable(id) {
    var b = player.m_buyables[id]
    if ([0, 1, 2, 3,8,9].includes(id) && !(hasUpgrade(66) && ![3,8,9].includes(id))) { //what kind of logic is this...
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

function get_remainder_cost(t) {
    return new Decimal(t).add(1).pow_base(100)
}

function remainder_add() {
    if (player.m_q[2] == 0) {
        window.alert("Hey! Multiplication has NO remainder!")
    }
    else {
        var rem = player.m_q[0] % player.m_q[1]
        if (player.d_ess.gte(get_remainder_cost(rem))) {
            player.d_ess = player.d_ess.sub(get_remainder_cost(rem))
            player.m_q[0]++
        }
    }
}

function remainder_effect(r = player.rem) {
    var b = new Decimal(4)
    if (hasUpgrade(72)){b = b.times(upgrade_effect(72))}
    return new Decimal(r).pow(0.9).pow_base(b)
}

function click_button(times) {
    var times = new Decimal(times)
    player.m_q[2] == 0 ? mul_mul(times.times(0.1)) : player.d_ess = player.d_ess.add(get_d_ess_gain().times(0.1).times(times))
}