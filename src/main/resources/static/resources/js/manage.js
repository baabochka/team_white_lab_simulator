name_input.change(function(){change_base_info()});
description_input.change(function(){change_base_info()});
function change_base_info() {
    $.ajax({
        type: "POST",
        url: "/lab/" + labId + "/change_base_info",
        data: {
            'name': name_input.val(),
            'description': description_input.val()
        },
        success: function (data) {
        }
    });
}
let name_input = $('#lab_name_input');
let description_input = $('#lab_description_input');