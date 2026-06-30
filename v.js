

function loadVue() {
    app = new Vue({
        el: "#app",
        data() {
            return {
                player,
                level,
                format,
                format_time,


                get_cur_level,
                get_level_name,
                get_level_pt_req,
                get_level_text,
                kumon_level_diff,
                kumon_level_name,
                kumon_data,
                Decimal,
                console,
                percent,
                skill_gain,
                skill_relative,
                upgrade_effects,
                Math,
                Date,
                get_num_chance,
                get_num_effect,
                roll_number,
                hasUpgrade,
                upgrade_costs_real,

                get_buyable_cost,
                buy_buyable,
                get_write_effect,
                tab_req,

                add_first_effect,
                add_second_effect,
                add_third_effect,
                add_fourth_effect,

                sub_first_debuff,
                sub_second_debuff,
                sub_req,
                sub_effect,
                
                ce_gain,
                ce_effect,

                get_m_ess_gain,
                multi_buyable_cost,
                multi_buyable_effect,

                get_d_ess_gain,
                get_real_lvl_req
            }
        }
    }
    )
    
}

loadVue()

