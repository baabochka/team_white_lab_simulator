// Basic variable
let states;
let steps;
let labId;
let current_step = 0;
let current_states;

let equip_list = $('#equip-item-list');
let step_list = $('#step-item-list');

// get field from lab object
function extractLabInfo() {
    states = lab['stateMap'];
    steps = lab['steps'];
    labId = lab['id'];
}

function performStep() {
    current_states = {};
    for(let i = 0; i < current_step; i++) {
        let map = steps[i]['map'];
        for(let k of Object.keys(map)){
            current_states[k] = map[k]
        }
    }
    // console.log(current_states);
}

function loadStates() {
    console.log((current_states));
    console.log(equip_list.find(".card"));
    for(let card of equip_list.find(".card")) {
        console.log(card);
        let stateId = $(card).attr('id');
        let fields = current_states[stateId];
        let list = $(card).find('dl');
        loadFieldsToStates(list, fields)
    }
}

function loadFieldsToStates(list, fields) {
    list.empty();
    if(fields != null) {
        for(let k of Object.keys(fields).reverse()) {
            $("<dt class='col-sm-6'>" + k + "</dt><dd class='col-sm-6'>"+ fields[k] + "</dd>").appendTo(list);
        }
    }
}

function initialPanels() {
    loadSteps();
    initialStates();
}


function loadPanelsByStep() {
    performStep();
    loadStates();
    loadStepCanvas();
}

// initial page
function initialPage() {
    extractLabInfo();
    initialPanels();
    loadPanelsByStep();
}