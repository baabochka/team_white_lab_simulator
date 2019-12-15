// Basic variable
let states;
let steps;
let labId;
let current_step = 0;
let instruction_input = $('#step-instruction-input');
// jQuery Selectors
let equip_list = $('#equip-item-list');
let step_list = $('#step-item-list');
let initial_edit = $('#initial-edit');
let not_initial_edit = $('#not-initial-edit');
console.log(lab);
// get field from lab object
function extractLabInfo() {
    states = lab['stateMap'];
    steps = lab['steps'];
    labId = lab['id'];
}

// load steps to the right panel, the last step will be selected
function loadSteps() {
    step_list.empty();
    for(let i = 0; i < steps.length; i++) {
        step_list.append(
            "<div class=\"form-check\">\n" +
            "  <input class=\"form-check-input\" type=\"radio\" name=\"exampleRadios\" id=\"exampleRadios" + i + "\" value=" + i + " checked>\n" +
            "  <label class=\"form-check-label\" for=\"exampleRadios" + i + "\">\n" +
            " Step " +i +": <span>" + steps[i]['brief']+ "</span>\n" +
            "  </label>\n" +
            "</div>"
        )
    }
    // set current step selection to the last 1
    current_step = steps.length - 1
}

function initialStates() {
    equip_list.empty();
    for(let v of (Object.values(states))) {
        let src = "/resources/images/equipments/" + v['equipmentId'] + ".png";
        equip_list.append($("<div class=\"card\" id=" + v['id'] + ">\n" +
            "    <div class=\"card-header\">\n" +
            "        <img src=" + src + "><textarea class='equip-name-input'>" + v['name'] + "</textarea>\n" +
            "        <button class=\"btn btn-link\" data-toggle=\"collapse\" data-target=\"#collapse-" + v['id'] + "\" aria-expanded=\"true\" aria-controls=\"collapseOne\">\n" +
            "            <span>+</span>" +
            "        </button>\n" +
            "    </div>\n" +
            "\n" +
            "    <div id=\"collapse-" + v['id'] + "\" class=\"collapse\" aria-labelledby=\"headingOne\" data-parent=\"#accordion\">\n" +
            "      <div class=\"card-body\">\n" +
            "      </div>\n" +
            "    </div>\n" +
            "  </div>"));
    }
}

function loadStepEdit() {
    $('#step-edit-counter').text(current_step);
    instruction_input.val(steps[current_step]['brief']);
    if(current_step == 0){
        instruction_input.prop('disabled', true);
        initial_edit.css('display', 'block');
        not_initial_edit.css('display', 'none');
    } else {
        instruction_input.prop('disabled', false);
        initial_edit.css('display', 'none');
        not_initial_edit.css('display', 'block');
    }
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

function loadStates() {

}
// initial left and right side bar
function initialPanels() {
    loadSteps();
    initialStates();
}

function loadPanelsByStep() {
    loadStates();
    loadStepEdit();
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
// initial page
function initialPage() {
    extractLabInfo();
    initialPanels();
    loadPanelsByStep();
}

function changeStateName(id, name) {
    $.ajax({
        type: "POST",
        url: "/lab/" + labId + "/changeStateName/" + id,
        data: {'name': name},
        success: function (data) {
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
});

initialPage();