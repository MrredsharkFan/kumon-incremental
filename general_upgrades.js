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
        backgroundColor: player.upgrades.indexOf(${id})!=-1?'#99ff99':(upgrade_costs_real[${id}]>level?'#999999':'#ffffff')}" onclick="buy_upgrade(${id})">
        ${title}<br><span style="font-size: 75%">${desc}</span><br>Req: ${get_level_text(cost)[1]}<br>{{upgrade_effects[${id}]=="none"?"":"Currently: "+format(upgrade_effects[${id}](),3)}}</button>`
}

function buy_upgrade(id) {
    console.log(level,upgrade_costs_real[id])
    if (new Decimal(level).gte(upgrade_costs_real[id]) && player.upgrades.indexOf(id)==-1) {
        player.skill = player.skill.sub(get_real_lvl_req(upgrade_costs_real[id]-1))
        player.upgrades.push(id)
    }
}

upgrade_set(1, 10, "Grasp", "Data *2<br><i><small>Just to be reminded that, the complexity of the game ramps up as you play, but it starts rather simple and boring.<br>Developer options may be added soon.</small></i>",
    function () {
        var x = new Decimal(2)
        if (hasUpgrade(64)) {
            x = x.pow(upgrade_effect(64))
        }
        return x
    }
)
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
    function () {
        var x = new Decimal(level).sub(200).max(0).div(100).add(1).pow(0.85)
        if (hasUpgrade(52)){x = x.pow(1.4)}
        return x
    }
)
upgrade_set(8, 300, "I can count faster!", "*2.5 counting speed.")
upgrade_set(9, 320, "I can see my progress.", "Data gain is boosted by current exercise #.",
    function () {
        var r = new Decimal(level).sub(200).max(0).pow_base(1.01)
        if (hasUpgrade(24)) { r = r.pow(1.5) }
        if (hasUpgrade(52)) { r = star(r, 1.25) }
        if (hasUpgrade(59)) { r = star(r, 1.5) }
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
        if (hasUpgrade(53)) { t = t.add(player.number.add(1).pow(0.25)) }
        if (hasUpgrade(33)) { t = t.times(upgrade_effect(18)) }
        if (hasUpgrade(36)) { t = t.times(4) }
        if (hasUpgrade(37)) { t = t.times(2) }
        if (hasUpgrade(38)) { t = t.times(2) }
        if (hasUpgrade(46)) { t = t.times(upgrade_effect(46)) }
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
upgrade_set(43, 1400, "Welcome to B.", "Gain counted numbers/s based on written numbers.",
    function () { return player.write.pow(0.75).div(10) }
)
upgrade_set(44, 1405, "6 + 9 &rarr; (6-1) + 10", "Counted number effect ^1.5 in subtraction.")
upgrade_set(45, 1410, "6 + 11 - 1", "Counted number effect ^1.1")
upgrade_set(46, 1415, "Calculator? Naw", "Written number gain is boosted based on challenge essence.",
    function(){return player.ce.add(1).pow(0.25)}
)
upgrade_set(47, 1420, "Hey Mom, I want a burger! How much will it cost for a burger and a fry? Would you calculate that for me?", "Sum 1,2,3 are all set to your total sum/3, and total sum *2")
upgrade_set(48, 1470, "What is the x in instagram...?", "Number 4 increases base total sum by 3 each.")
upgrade_set(49, 1493, "I think I'm <i>really</i> proficient in addition!", "Maximum sum is boosted based on data.",
    function(){return player.skill.add(10).log10().sub(990).max(10).log10().pow(0.25)}
)
upgrade_set(50, 1555, "Let's zoom through the remainder of this, this is too boring! -Me", "Subtraction effect is stronger based on challenge essence.",
    function(){return player.ce.add(10).log10().add(1).log10().add(1).pow(0.5)}
)
upgrade_set(51, 1580, "And there! What if I try adding multiple things...", "Number 4 nerf is decreased based on written numbers.",
    function () { return player.write.add(1).log10().add(1).log10().add(1).log10().div(3).add(1) }
)
upgrade_set(52, 1600, "The teacher said we are learning something new today! I'm sooo excited!", "<b>Candies</b> effect ^1.4, <b>I can see my progress!</b> effect &star; 1.25<br><i>&star; = raise exponent</i>")
upgrade_set(53, 1602, "Count while writing... I think that's the best I'll get in counting (smiles)", "Counted numbers<sup>0.25</sup> produce written numbers. (Before multis)")
upgrade_set(54, 1610, "&times;", "Unlocks multiplication.<br><i>If you are bad at it, QUIT THE GAME until you get good at it. Trust me. We prefer ~0.8s/times table</i>")
upgrade_set(55, 1618, "&times;4 > &times;3 (x>0)", "The product boosts ME gain at ^0.5.")
upgrade_set(56, 1630, "&times;5 > &times;3 (x>0)", "The previous upgrade is now ^1.")
upgrade_set(57, 1650, "&times;11? That's not on the table...", "There is a 20% chance that ONE of the multiplicand / multiplier is much higher, and if that happens, ME gain *10")
upgrade_set(58, 1660, "This is kind of boring.... I guess that's the point of Kumon-", "Data boosts multiplication essence.",
    function(){return player.skill.div("1e3600").add(1).log10().div(400).add(1).pow(2)}
)
upgrade_set(59, 1690, "I've gone so far that there is something new again!", "<b>I can see my progress</b> effect &star; 1.5.")
upgrade_set(60, 1695, "New type of multiplication in 5 hours (bursts into laughing) (forgets all the pain)", "Challenge essence boosts multiplication essence.",
    function(){return player.ce.add(10).log10().sub(14).max(1).pow(3)}
)
upgrade_set(61, 1710, "&divide;", "Unlocks division.<br>Also *4 multiplication essence.<br><small>Also fixes the bug where you get a lot of data when you start subtraction. As compensation, the subtraction data nerf is /2.888.</small>")
upgrade_set(62, 1711, "More repetition coming, eugh", "Number of completed exercises past C111 boosts division essence gain.",
    function(){return new Decimal(level).sub(1710).max(0).pow(0.5).pow_base(2)}
)
upgrade_set(63, 1713, "&divide; 2", "ME boosts DE gain.",
    function () { return player.m_ess.div(1e18).add(1).log10().pow(1.5).add(1) }
)
upgrade_set(64, 1716, "Grasping the arithmetic", "<b>Grasp</b>'s effect is exponentiated based on ME.",
    function () { return player.m_ess.div(1e21).add(1).log10().pow(2).times(40).add(1) }
)
upgrade_set(65, 1718, "Prestige the balance", "Unlocks a new thing in multiplication.")
upgrade_set(66, 1724, "Well, I don't like that~ Change to a new one", "Autobuy multiplication upgrades 1-3. You're welcome.")
upgrade_set(67, 1735, "This! is upgrade SIX SEVEN!!!!", "Written number's effect &star; 1.2 AFTER the softcap")
upgrade_set(68, 1755, "#68 < #69", "&times;4 ME, and amplify the effect of <b>&times; 11? That's not on the table...</b> by x9.")
upgrade_set(69, 1767, "Division is repeated subtraction!", "Division essence is boosted based on subtraction level.",
    function (){return player.sub_level.sub(35).max(0).pow_base(1.5)}
)
upgrade_set(70, 1770, "Division expansion", "Unlock remainders, also make division maximum 81&divide;9")
upgrade_set(71, 1776, "Multiplication <-> division synergy", "DE boosts ME.",
    function(){return player.d_ess.div(1e9).add(1).log10().times(2).add(1).pow(2)}
)
upgrade_set(72, 1780, "Isn't this just a better version of &divide;2?", "Remainder's exponential base is boosted by ME.",
    function () { return player.m_ess.div(1e36).add(1).log10().add(1).log10().add(1) }
)
upgrade_set(73, 1784, "More automation", "Unlocks a new buyable.")
upgrade_set(99, 4659, "... GGs?", "<i>The beyond lies expertise that kumon can't ever breach. Its principles forbid its existence.<br>Find the knowledge yourself, will you?</i>")




const upgrade_costs_real = upgrade_costs

function hasUpgrade(x) {
    return player.upgrades.indexOf(x)!=-1
}

function upgrade_effect(x) {
    return upgrade_effects[x]()
}