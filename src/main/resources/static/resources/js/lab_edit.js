// jQuery Selectors
let instruction_input = $('#step-instruction-input');
let initial_edit = $('#initial-edit');
let not_initial_edit = $('#not-initial-edit');
let initial_states_list = $('#initial-states-container');
let delete_step_btn =$("#delete-step-btn");
let select_input = $(".inputEquip");
let inputGroups = $(".option");
let before_one = $("#before-section .optionOne");
let before_two = $("#before-section .optionTwo");
let after_one = $("#after-section .optionOne");
let after_two = $("#after-section .optionTwo");
let delete_step_modal = $("#delete-step-confirm");

// load steps to the right panel, the last step will be selected
function loadSteps() {
    step_list.empty();
    for(let i = 0; i < steps.length; i++) {
        step_list.append(
            "<div class=\"form-check\">\n" +
            "  <input class=\"form-check-input col-sm-1\" type=\"radio\" name=\"exampleRadios\" id=\"exampleRadios" + i + "\" value=" + i + " checked>\n" +
            " <dt class='col-sm-4'>Step " + i + "</dt>" +
            " <dd class='col-sm-12 brief'>" + steps[i]['brief'] +"</dd>" +
            "</div>"
        )
    }
    // set current step selection to the last 1
    current_step = steps.length - 1
}

function initialStates() {
    equip_list.empty();
    for(let v of (Object.values(states))) {
        let src = "data:image/png;base64,";
        $.ajax({
            type: "get",
            url: "/api/equipments/image/" + v['equipmentId'],
            success: function (data) {
                src += data;
                equip_list.append($("<div class=\"card state-card\" id=" + v['id'] + ">\n" +
                    "    <div class=\"card-header\">\n" +
                    "        <img src=" + src + "><textarea class='equip-name-input'>" + v['name'] + "</textarea>\n" +
                    "        <button class=\"btn btn-link\" data-toggle=\"collapse\" data-target=\"#collapse-" + v['id'] + "\" aria-expanded=\"true\" aria-controls=\"collapseOne\">\n" +
                    "            <span><i class=\"fas fa-eye\"></i></span>" +
                    "        </button>\n" +
                    "        <button class=\"btn btn-link remove-state-btn\">\n" +
                    "            <span><i class=\"fas fa-times\"></i></span>" +
                    "        </button>\n" +
                    "    </div>\n" +
                    "\n" +
                    "    <div id=\"collapse-" + v['id'] + "\" class=\"collapse\" aria-labelledby=\"headingOne\" data-parent=\"#accordion\">\n" +
                    "      <div class=\"card-body\">" +
                    " <dl class='row'></dl>" +
                    "      </div>\n" +
                    "    </div>\n" +
                    "  </div>"));
            }

        });

    }
}

function loadFields(rows, fields) {
    let keys = (Object.keys(fields)).reverse();
    for(let i = 0; i < keys.length; i++) {
        let row = $(rows[i]);
        row.find('.inputProperty').val(keys[i]);
        row.find('.inputValue').val(fields[keys[i]]);
    }
}
function loadStepCanvas() {
    $('#step-edit-counter').text(current_step);
    instruction_input.val(steps[current_step]['brief']);
    if(current_step == 0){
        delete_step_btn.prop('disabled', true);
        instruction_input.prop('disabled', true);
        initial_edit.css('display', 'block');
        not_initial_edit.css('display', 'none');
        initial_states_list.empty();
        let map = steps[0]['map'];
        for(let v of (Object.values(states))) {
            let li = $(constructStepInput(v)).appendTo(initial_states_list);
            let fields = map[v['id']];
            if(fields == null) {
                continue;
            }
            let rows = [$(li).find(".form-row")];
            for(let i = Object.keys(fields).length; i > 1; i --) {
                rows.push($(constructStepInputTextOnly()).appendTo(li));
            }
            loadFields(rows, fields);

        }
    } else {
        delete_step_btn.prop('disabled', false);
        instruction_input.prop('disabled', false);
        loadOption();
        for(let li of inputGroups) {
            clean(li);
        }
        loadInputFromStep();
        initial_edit.css('display', 'none');
        not_initial_edit.css('display', 'block');
    }
}

function reFetch() {
    $.ajax({
        type: "POST",
        url: "/api/labs/" + labId,
        data: {},
        success: function (data) {
            lab = data;
            extractLabInfo();
        }
    });
}

function reFetchLabAndLoadSteps() {
    $.ajax({
        type: "POST",
        url: "/api/labs/" + labId,
        data: {},
        success: function (data) {
            lab = data;
            extractLabInfo();
            loadSteps();
            loadPanelsByStep();
        }
    });
}


function reFetchLabAndLoadStates() {
    $.ajax({
        type: "POST",
        url: "/api/labs/" + labId,
        data: {},
        success: function (data) {
            lab = data;
            extractLabInfo();
            initialStates();
            loadPanelsByStep();
        }
    });
}

function loadOption() {
    select_input.empty();
    select_input.append($("<option value=-1>None</option>"));
    for(let v of Object.values(states)) {
        select_input.append($("<option value=" + v['id'] + ">" + v['name'] + "</option>"))
    }
}


$('#add-step-btn').click(function () {
    addStep();
});

function addStep() {
    $.ajax({
        type: "POST",
        url: "/lab/" + labId + "/add_step",
        data: {},
        success: function (data) {
            reFetchLabAndLoadSteps();
        }
    });
}


function changeStateName(id, name) {
    states[id]['name'] = name;
    $.ajax({
        type: "POST",
        url: "/lab/" + labId + "/changeStateName/" + id,
        data: {'name': name},
        success: function (data) {
        }
    });
}

function constructStepInput(state) {
    return "<li class=\"list-group-item\">\n" +
    "                                <div class=\"form-row\">\n" +
    "                                    <div class=\"form-group col-md-3\">\n" +
    "                                        <label>Equipment</label>\n" +
    "                                        <select class=\"form-control\" disabled>\n" +
    "                                            <option selected value='" + state['id'] + "'>" + state['name'] + "</option>\n" +
    "                                        </select>\n" +
    "                                    </div>\n" +
    "                                    <div class=\"form-group col-md-4\">\n" +
    "                                        <label>Property</label>\n" +
    "                                        <input type=\"text\" class=\"form-control inputProperty\">\n" +
    "                                    </div>\n" +
    "                                    <div class=\"form-group col-md-4\">\n" +
    "                                        <label>Value</label>\n" +
    "                                        <input type=\"text\" class=\"form-control inputValue\">\n" +
    "                                    </div>\n" +
    "                                    <button class=\"text-btn no-border-btn add-property-btn\"><span aria-hidden=\"true\">+</span></button>\n" +
    "                                </div>\n" +
    "                            </li>"
}

function constructStepInputTextOnly() {
     return   "                                <div class=\"form-row\">\n" +
        "                                    <div class=\"form-group col-md-3\">\n" +
        "                                    </div>\n" +
        "                                    <div class=\"form-group col-md-4\">\n" +
        "                                        <label>Property</label>\n" +
        "                                        <input type=\"text\" class=\"form-control inputProperty\">\n" +
        "                                    </div>\n" +
        "                                    <div class=\"form-group col-md-4\">\n" +
        "                                        <label>Value</label>\n" +
        "                                        <input type=\"text\" class=\"form-control inputValue\">\n" +
        "                                    </div>\n" +
        "                                    <button class=\"text-btn no-border-btn delete-property-btn\"><span aria-hidden=\"true\">-</span></button>\n" +
        "                                </div>\n"
}

function constructStepInputTextOnlyDisabled() {
    return   "                                <div class=\"form-row\">\n" +
        "                                    <div class=\"form-group col-md-3\">\n" +
        "                                    </div>\n" +
        "                                    <div class=\"form-group col-md-4\">\n" +
        "                                        <label>Property</label>\n" +
        "                                        <input type=\"text\" class=\"form-control inputProperty\" disabled>\n" +
        "                                    </div>\n" +
        "                                    <div class=\"form-group col-md-4\">\n" +
        "                                        <label>Value</label>\n" +
        "                                        <input type=\"text\" class=\"form-control inputValue\" disabled>\n" +
        "                                    </div>\n" +
        "                                </div>\n"
}
function updateStepState(li) {
    let stateId = li.find('select').children('option:selected').val();
    let props = [];
    let vals = [];
    li.find('.form-row').each(function (i, row) {
        row = $(row);
        props.push("\"" + row.find('.inputProperty').val());
        vals.push("\"" + row.find('.inputValue').val());
    });
    $.ajax({
        type: "POST",
        url: "/lab/" + labId + "/changeStepState",
        data: {
            'property': props,
            'value': vals,
            'stateId': stateId,
            'stepId': current_step
        },
        success: function (data) {
            reFetch();
        }
    });
}
$(document).on('click', '#step-item-list input:radio', function (event) {
    let i = $('#step-item-list input:radio:checked').val();
    if(i !== current_step) {
        current_step = i;
        loadPanelsByStep();
    }
});

$(document).on('change', '.equip-name-input', function (event) {
    let input = $(this);
    changeStateName(input.closest('.card').attr('id'), input.val());
    loadPanelsByStep();
});

$(document).on('click', '.add-property-btn', function () {
    $(this).closest('li').append(constructStepInputTextOnly());
});

$(document).on('click', '.delete-property-btn', function () {
    let parent = $(this).closest('li');
    $(this).closest('.form-row').remove();
    updateStepState(parent);
});

$(document).on('change', '.inputProperty, .inputValue', function () {
    updateStepState($(this).closest('li'));
});

function change_instruction() {
    let brief = instruction_input.val();
    $.ajax({
        type: "POST",
        url: "/lab/" + labId + "/change_step_brief",
        data: {
            'brief': brief,
            'i': current_step
        },
        success: function (data) {
            $('#step-item-list input:radio:checked').siblings('.brief').text(instruction_input.val());
            steps[current_step]['brief'] = brief;
        }
    });
}


instruction_input.change(function () {
    change_instruction();
});

function loadInputFromStep() {
    let map = steps[current_step]['map'];
    if(map != null && Object.keys(map).length > 0) {

        let keys = Object.keys(map);
        console.log(keys);
        if(keys.length == 1) {
            before_two.find('select').val(-1);
            after_two.find('select').val(-1);
            before_one.find('select').val(keys[0]);
            after_one.find('select').val(keys[0]);
        } else {
            before_two.find('select').val(keys[1]);
            after_two.find('select').val(keys[1]);
            before_one.find('select').val(keys[0]);
            after_one.find('select').val(keys[0]);
        }
    } else {
        console.log("empty step");
        select_input.val(-1);
    }
    updateInputGroupBaseOnSelection(before_one, true, false);
    updateInputGroupBaseOnSelection(before_two, true, false);
    updateInputGroupBaseOnSelection(after_one, false, true);
    updateInputGroupBaseOnSelection(after_two, false, true);
}

function fullUpdateStep() {
    let stateId1 = after_one.find('select').children('option:selected').val();
    let props1 = [];
    let vals1 = [];
    let stateId2 = after_two.find('select').children('option:selected').val();
    let props2 = [];
    let vals2 = [];
    after_one.find('.form-row').each(function (i, row) {
        row = $(row);
        props1.push("\"" + row.find('.inputProperty').val());
        vals1.push("\"" + row.find('.inputValue').val());
    });
    after_two.find('.form-row').each(function (i, row) {
        row = $(row);
        props2.push("\"" + row.find('.inputProperty').val());
        vals2.push("\"" + row.find('.inputValue').val());
    });
    $.ajax({
        type: "POST",
        url: "/lab/" + labId + "/fullUpdateStep",
        data: {
            'property1': props1,
            'value1': vals1,
            'stateId1': stateId1,
            'property2': props2,
            'value2': vals2,
            'stateId2': stateId2,
            'stepId': current_step
        },
        success: function (data) {
            reFetch();
        }
    });
}

select_input.change(function () {
    let li = $(this).closest('li');
    clean(li);
    let stateId = $(this).val();
    updateInputGroupBaseOnSelection(li, true, false);
    if($(li).hasClass('optionOne')) {
        li = $('#after-section .optionOne');
    } else {
        li = $('#after-section .optionTwo');
    }
    clean(li);
    $(li).find('select').val(stateId);
    updateInputGroupBaseOnSelection(li, false, false);
    fullUpdateStep();
});

function updateInputGroupBaseOnSelection(li, isBefore, isFromStep) {
    let stateId = $(li).find('select').val();
    if(stateId != -1) {
        let row = $(li).find('.form-row')[0];
        let fields;
        if(!isFromStep) {
            fields = current_states[stateId];
        } else {
            fields = steps[current_step]['map'][stateId];
        }

        let rows = [row];
        if(fields != null) {
            for (let i = Object.keys(fields).length; i > 1; i--) {
                if(isBefore) {
                    rows.push($(constructStepInputTextOnlyDisabled()).appendTo(li));
                } else {
                    rows.push($(constructStepInputTextOnly()).appendTo(li));
                }
            }
            loadFields(rows, fields);
        }
    }
}

function clean(li) {
    let rows = $(li).find('.form-row');
    for(let i = 1; i < rows.length; i++) {
        $(rows[i]).remove();
    }
    $(rows[0]).find('input').val("");
    return rows[0];
}

function removeState(card) {
    let stateId = $(card).attr('id');
    for(let i = 1; i < steps.length; i++) {
        let map = steps[i]['map'];
        if(map != null && stateId in map) {
            // alert("Can't not be removed. This equipment is used in Step " + i + ".");
            $('#delete-state-err-msg').text("This equipment can't be removed. It's used in step " + i + ".");
            $('#delete-state-error').modal('show');
            return;
        }
    }
    $.ajax({
        type: "POST",
        url: "/lab/" + labId + "/removeState",
        data: {
            'stateId':stateId
        },
        success: function (data) {
            reFetchLabAndLoadStates();
        }
    });
}

$(document).on('click', '.remove-state-btn', function () {
    removeState($(this).closest('.card'));
});


$("#remove-step-confirm-btn").click(function () {
    deleteStep();
});
function deleteStep() {
    $.ajax({
        type: "POST",
        url: "/lab/" + labId + "/deleteStep",
        data: {
            'stepId':current_step
        },
        success: function (data) {
            reFetchLabAndLoadSteps();
            delete_step_modal.modal('hide');
        }
    });
}
delete_step_btn.click(function () {
    $('#delete-step-confirm-msg').text("Do you want to delete step " + current_step + "?")
});
$("#upload-form").submit(function(e) {

    e.preventDefault(); // avoid to execute the actual submit of the form.

    var url = "/equips/add";
    $.ajax({
        type: "POST",
        url: url,
        data: {
            'name': $('#equip-name-input').val(),
            'image': $('#equip-image-input').val()
        },
        success: function(data)
        {
            alert(data); // show response from the php script.
        }
    });


});
initialPage();
$(".custom-file-input").on("change", function() {
    var fileName = $(this).val().split("\\").pop();
    $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
});

$('#add-new-equip-btn').click(function () {
    $('#equip-market-modal').modal('hide');
});