


function loadVue() {
    app = new Vue({
        el: "#app",
        data() {
            return {
                player,
                level,
                format,
                get_cur_level,
                get_level_name,
                get_level_pt_req,
                get_level_text,
                kumon_level_diff,
                kumon_level_name,
                kumon_data,
                Decimal,
            }
        }
    }
    )
}

loadVue()

function force() {
    app["$data"].player = player
    app["$data"].level = level
}