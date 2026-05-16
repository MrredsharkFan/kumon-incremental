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
        document.getElementById("upg").innerHTML + `<button v-if="(player.upage == ${Math.floor(L/15)} && (hasUpgrade(Math.floor(${L+1}/5)*5-1) || ${id<=5}))" :style="{
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
    function () { return new Decimal(percent(player.skill, level)).times(-1).div(100).add(2).pow(2).pow(hasUpgrade(7)?upgrade_effects[7]():1) })
upgrade_set(4, 150, "Repetition","Data *2")
upgrade_set(5, 200, "Let's count!", "Unlocks a new feature, also *4 Data.")
upgrade_set(6, 250, "This is an index finger!", "*2 counting speed.")
upgrade_set(7, 277, "Candies!", "<b>Motivation</b> is stronger based on current exercise.",
    function(){return new Decimal(level).sub(200).max(0).div(100).add(1).pow(0.85)}
)
upgrade_set(8, 300, "I can count faster!", "*2.5 counting speed.")
upgrade_set(9, 320, "I can see my progress.", "Data gain is boosted by current exercise #.",
    function(){return new Decimal(level).sub(200).max(0).pow_base(1.01)}
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
    function(){return player.number.div(200).add(1).log10().add(1)}
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
upgrade_set(23, 1000, "Faster addition", "If the second number >5,<b>I am understand bigger numbers better</b> effect ^1.5.")
upgrade_set(99, 4659, "I wonder what this is.", "Beat the game, and never come back.")




const upgrade_costs_real = upgrade_costs

function hasUpgrade(x) {
    return player.upgrades.indexOf(x)!=-1
}

function upgrade_effect(x) {
    return upgrade_effects[x]()
}