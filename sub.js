function sub_first_debuff(l=player.sub_level) {
    var l = new Decimal(l)
    var j = l.pow_base(1.2).times(2)
    if (hasUpgrade(61)) { j = j.div(2.888) }
    j = j.div(multi_buyable_effect(player.m_buyables[4],4))
    return j
}

function sub_second_debuff(l=player.sub_level) {
    var l = new Decimal(l)
    return l.add(1)
}

function sub_req(l=player.sub_level) {
    var l = new Decimal(l)
    var q = l.add(10).pow(115)
    if (hasUpgrade(37)){q = q.div(upgrade_effect(37))}
    return q
}

function sub_effect(l = player.sub_level) {
    var l = new Decimal(l)
    var q = l.add(1).pow(1.5)
    if (hasUpgrade(40)) { q = q.pow(upgrade_effect(40).max(1)) }
    if (hasUpgrade(50)){q = q.pow(upgrade_effect(50).max(1))}
    return q
}

function ce_gain() {
    var v = player.skill.min(sub_req()).add(1).div(sub_req()).pow(0.025).max(1e-10).times(player.sub_level.pow_base(5))
    if (hasUpgrade(42)){v = v.times(upgrade_effect(42))}
    return v
}

function ce_effect() {
    return player.ce.add(1).pow(player.ce.add(1).log10().pow(0.5))
}