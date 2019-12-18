let instruction = $('#step-instruction');
let check_equip_btn = $('#check-equip-btn');
let selection_holder = $('.select-equip-holder');
let do_action_container = $('#action_pane');
let next_step_btn = $('#next-step-btn');
// load steps to the right panel, the last step will be selected
function loadSteps() {
    step_list.empty();
    for(let i = 1; i < steps.length; i++) {
        step_list.append(
            "<div class=\"form-check\">\n" +
            " <dt class='col-sm-4'>Step " + i + "</dt>" +
            " <dd class='col-sm-12 brief'>" + steps[i]['brief'] +"</dd>" +
            "</div>"
        )
    }
    // set current step selection to the last 1
    current_step = 1;
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
                equip_list.append($("<div class=\"card state-card draggable\" id=" + v['id'] + ">\n" +
                    "    <div class=\"card-header\">\n" +
                    "        <img src=" + src + "><div class='state-name'>" + v['name'] + "</div>\n" +
                    "        <button class=\"btn btn-link\" data-toggle=\"collapse\" data-target=\"#collapse-" + v['id'] + "\" aria-expanded=\"true\" aria-controls=\"collapseOne\">\n" +
                    "            <i class=\"fas fa-eye\"></i>" +
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

function loadStepCanvas() {
    $('#step-edit-counter').text(current_step);
    instruction.text(steps[current_step]['brief']);
    selection_holder.empty();
    selection_holder.removeClass('after-drop');
    check_equip_btn.removeClass('btn-danger btn-info');
    check_equip_btn.addClass('btn-success');
    check_equip_btn.text('check');
    check_equip_btn.prop('disabled', false);
    do_action_container.css('display', 'none');
    $('.ui-draggable').addClass('draggable');
    if(current_step == steps.length - 1) {
        next_step_btn.text("Finish Lab!!!");
    }
}

initialPage();
$('.draggable').draggable({
    revert: "invalid",
    stack: ".draggable",
    helper: 'clone',
    handle: '.card-header'
});

$('.droppable').droppable({
    accept: '.draggable',
    drop: function(event, ui) {
        let droppable = $(this);
        droppable.empty();
        let id = ui.draggable.attr('id');
        let state = states[id];
        let src = "/resources/images/equipments/" + state['equipmentId'] + ".png";
        let card = $("<div class=\"card state-card\" id=selection-" + id + ">\n" +
            "    <div class=\"card-header\">\n" +
            "        <img src=" + src + "><div class='state-name'>" + state['name'] + "</div>\n" +
            "        <button class='btn btn-link remove-selected-equip-btn'>\n" +
            "            <i class=\"fas fa-times\"></i>" +
            "        </button>\n" +
            "    </div>\n" +
            "    <div class=\"card-body\">" +
            "       <dl class='row'></dl>" +
            "    </div>\n" +
            "  </div>");
        loadFieldsToStates(card.find('dl'), current_states[id]);
        card.appendTo(droppable);
        droppable.addClass("after-drop");
    }
});

$(document).on('click', '.remove-selected-equip-btn', function () {
    let p = $(this).closest('.droppable');
    p.empty();
    p.removeClass('after-drop');

});

check_equip_btn.click(function () {
    let step = steps[current_step]['map'];
    let keys = Object.keys(step);
    let selection = selection_holder.find('.card');
    console.log(selection);
    let res;
    if(selection == null || selection.length != keys.length) {
        res = false;
    } else {
        keys.sort();
        let temp = [];
        for(let k of selection) {
            temp.push($(k).attr('id').split("-")[1]);
        }
        temp.sort();
        console.log(keys);
        console.log(temp);
        res = JSON.stringify(temp) == JSON.stringify(keys);
    }
    if(res) {
        check_equip_btn.removeClass('btn-info');
        check_equip_btn.removeClass('btn-danger');
        check_equip_btn.addClass('btn-success');
        check_equip_btn.text('checked');
        check_equip_btn.prop('disabled', true);
        $('.draggable').removeClass('draggable');
        loadActions();
    } else {
        check_equip_btn.removeClass('btn-info');
        check_equip_btn.addClass('btn-danger');
        check_equip_btn.text('recheck');
    }
});

function loadActions() {
    do_action_container.css('display', 'block');
}

next_step_btn.click(function () {
    current_step += 1;
    if(current_step < steps.length) {
        loadPanelsByStep();
    } else {
        $('#finish-modal').modal('show');
    }

});

