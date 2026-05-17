//code for generating the ui of upgrades
//wait what if i made a dynamic variable then deleted it then replaced it with a constant
//OMG IM ACTUALLY SO SMART WOOOOOOOOOO
//wait how do we deal with buyables
//WE DONT
var upgrade_costs = {} //currently just the levels though
var upgrade_effects = {}

function upgrade_set(id, cost, title, desc, eff="none") {
    upgrade_costs[id] = new Decimal(cost)
    upgrade_effects[id] = eff
    var L = id-1
    document.getElementById("upg").innerHTML =
        document.getElementById("upg").innerHTML + `<button v-if="(player.upage == ${Math.floor(L/15)} && (hasUpgrade(Math.floor(${L}/5)*5) || ${id<=5}))" :style="{
        backgroundColor: player.upgrades.indexOf(${id})!=-1?'#99ff99':(upgrade_costs_real[${id}]>level?'#999999':'#ffffff')}" style="position: absolute; left: ${(L%15) * 20 % 100}%; top: ${Math.floor((L%15) / 5) * 32}%; width: 18%; height: 30%" onclick="buy_upgrade(${id})">
        ${title}<br><span style="font-size: 75%">${desc}</span><br>Req: ${get_level_text(cost)}<br>{{upgrade_effects[${id}]=="none"?"":"Currently: "+format(upgrade_effects[${id}](),3)}}</button>`
}

function buy_upgrade(id) {
    console.log(level,upgrade_costs_real[id])
    if (new Decimal(level).gte(upgrade_costs_real[id]) && player.upgrades.indexOf(id)==-1) {
        player.skill = player.skill.sub(get_level_pt_req(upgrade_costs_real[id]-1))
        player.upgrades.push(id)
    }
}

upgrade_set(1, 10, "Grasp","Data *2<br><i><small>Just to be reminded that, the complexity of the game ramps up as you play, but it starts rather simple and boring.<br>Developer options may be added soon.</small></i>")
upgrade_set(2, 33, "Think","Data *2")
upgrade_set(3, 67, "Motivation","Exercises are done quicker based on your current progress on it.",
    function () {
        var t = percent(player.skill, level)
        if (hasUpgrade(27)){t = t.min(-50)}
        return new Decimal(t).times(-1).div(100).add(2).pow(2).pow(hasUpgrade(7) ? upgrade_effects[7]() : 1)
    })
upgrade_set(4, 150, "Repetition","Data *2")
upgrade_set(5, 200, "Let's count!", "Unlocks a new feature, also *4 Data.")
upgrade_set(6, 250, "This is an index finger!", "*2 counting speed.")
upgrade_set(7, 277, "Candies!", "<b>Motivation</b> is stronger based on current exercise.",
    function(){return new Decimal(level).sub(200).max(0).div(100).add(1).pow(0.85)}
)
upgrade_set(8, 300, "I can count faster!", "*2.5 counting speed.")
upgrade_set(9, 320, "I can see my progress.", "Data gain is boosted by current exercise #.",
    function () {
        var r = new Decimal(level).sub(200).max(0).pow_base(1.01)
        if (hasUpgrade(24)){r = r.pow(1.5)}
        return r
    }
)
upgrade_set(10, 340, "Practise makes perfect.", "Counting speed is boosted based on number.",
    function () {
        var e = player.number.div(2).add(3).pow(0.4)
        if (hasUpgrade(13)){e = e.times(3)}
        return e
    }
)
upgrade_set(11, 355, "Neural connections with counting", "Numbers counted are more efficient based on current level.",
    function () { return new Decimal(level).sub(340).max(0).div(100).add(1).log(2).add(1).pow(0.5) }
)
upgrade_set(12, 410, "Why do people count notebooks in two?", "15% chance to count 2 numbers instead of 1.")
upgrade_set(13, 500, "More repetition = Skill", "<b>Practise makes perfect</b> is 3x better.")
upgrade_set(14, 550, "Free QoL", "Number's effect uses the highest reached effect.<br><small>Thank me for this duhhhhhh</small>")
upgrade_set(15, 600, "The back side of the page", "Unlocks new pages of upgrades every 15 upgrades. (Techinally this upgrade does nothing)")
upgrade_set(16, 601, "Let's write!", "Unlocks writing.")
upgrade_set(17, 630, "Write better, count better.", "Chance of failure when counting is reduced based on written numbers.",
    function(){return player.write.add(1).log10().add(1)}
)
upgrade_set(18, 670, "Incoporating writing into counting!", "Current number counted decreases the scaling of writing.",
    function () {
        var t = hasUpgrade(26)?player.best_number:player.number
        return t.div(200).add(1).log10().add(1)
    }
)
upgrade_set(19, 750, "I am understanding bigger numbers better!", "Current number counted's effect is boosted by written numbers.",
    function () {
        var v = player.write.div(30).add(1).log10().add(1)
        if (hasUpgrade(18) & player.sums[1].gte(5)){v = v.pow(1.5)}
        return v
     }
)
upgrade_set(20, 820, "And writing numbers more neatly!", "Writing scaling is further decreased by current level.",
    function () { return new Decimal(level).sub(700).max(0).div(200).add(1).log(10).add(1) }
)
upgrade_set(21, 870, "One plus one...", "Unlocks addition.")
upgrade_set(22, 900, "'What is this \'book of calculus\' they say?'", "Written numbers add to the boost of the 2nd addition effect, and chance of failure /3.")
upgrade_set(23, 1000, "Faster addition", "If the second number >5,<b>I am understanding bigger numbers better</b> effect ^1.5.<br><small>This also means you've reached level 1,000!</small>")
upgrade_set(24, 1010, "Reviews.", "I can see my progress</b> effect ^1.5")
upgrade_set(25, 1024, "Addition table", "Add 3 to the maximum sum.")
upgrade_set(26, 1044, "Recall", "<b>Incoporating writing into counting</b> is based on best counted.")
upgrade_set(27, 1060, "Progress chart", "<b>Motivation</b> always acts like at least 50% of the exercise is done.")
upgrade_set(28, 1088, "I know who I am!", "Data gain ^1.02.")
upgrade_set(29, 1100, "Adding in my minds!", "Unlocks a third addition.")
upgrade_set(30, 1120, "Things get easier after I master addition!", "The second addition increases maximum sum.",
    function(){return player.sums[1].div(4)}
)
upgrade_set(31, 1170, "Dynamic connections", "Data boosts itself.",
    function () { return player.skill.div("1e120").add(1).pow(0.1) }
)
upgrade_set(32, 1200, "Welcome to the main sequence!", "You automatically write 0.5 numbers/s, and disable buying numbers manually. Its effect is softcapped after 1.00 Dc.<br><i>You should feel accomplished.</i>",
    function () {
        var t = new Decimal(0.5)
        if (hasUpgrade(33)) { t = t.times(upgrade_effect(18)) }
        if (hasUpgrade(36)) { t = t.times(4) }
        if (hasUpgrade(37)) { t = t.times(2) }
        if (hasUpgrade(38)) { t = t.times(2) }
        t = t.times(sub_effect())
        return t
    }
)
upgrade_set(33, 1250, "Counting helps me write faster!", "<b>Incoporating writing into counting</b> now boosts number gain.")
upgrade_set(34, 1280, "One minus one...", "Unlocks subtraction.")
upgrade_set(35, 1281, "&square; - 1=1", "Subtraction level directly increases maximum sum.")
upgrade_set(36, 1285, "This subtraction thing is kind of boring...", "Unlocks subtraction again, and x4 written numbers.")
upgrade_set(37, 1290, "Why does subtraction feel harder than usual?", "Current level reduces subtraction requirement, and x2 written numbers.",
    function(){return new Decimal(level).sub(500).max(0).pow_base(1.07)}
)
upgrade_set(38, 1300, "There're so many new things to challenge in Mathematics!", "Unlocks challenge essence, and x2 written numbers.")
upgrade_set(39, 1315, "Those challenges seem enjoyable.", "Challenge essence reduces the root base for the subtraction in addition.",
    function () { return player.ce.div(100).add(1).log10().add(1).log10().add(1) }
)
upgrade_set(40, 1325, "Subtraction is just addition... in reverse", "Subtraction's first effect is exponentiated based on current maximum sum.",
    function () { return get_add_total().max(1).div(50).add(1).max(1).pow(0.5)}
)
upgrade_set(41, 1326, "Let me count in peace!", "\'What is this book of calculus they say\' 's first effect is nullified.")
upgrade_set(42, 1380, "Let the second number have some use!", "The second adding number boosts challenge essence gain.",
    function(){return player.sums[1].sub(3).max(1).log10().add(1).pow(3)}
)
upgrade_set(43, 4659, "... GGs?", "<i>The beyond lies expertise that kumon can't ever breach. Its principles forbid its existence.<br>Find the knowledge yourself, will you?</i>")




const upgrade_costs_real = upgrade_costs

function hasUpgrade(x) {
    return player.upgrades.indexOf(x)!=-1
}

function upgrade_effect(x) {
    return upgrade_effects[x]()
}