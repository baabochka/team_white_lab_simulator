
function addCourseInDashboard(){
    $.ajax({
        type:"POST",
        url:"/addCourse",
        data:{
            "stepName":stepName.val(),
            "stepDescription":stepDescription.val()
        },
        success : function(data){
            // $(courseTemplate).appendTo(whereShowCourseDashboard);
            whereShowCourseDashboard.appendChild($(courseTemplate));
            alert(stepName.val());
        }
    });
}

let stepName = $("#Form-Step-Name");
let stepDescription = $("#Form-Step-Descrip");
let stepAddBtn = $("#add-step-btn");

let whereShowStepDashboard = $("#add-step-dashboard");

let courseTemplate = "<div class=\"col-lg-4 col-md-4 col-sm-4 col-xs-12\">\n" +
    "                            <div class=\"box-part text-center\">\n" +
    "                                <i class=\"mdi mdi-add\" aria-hidden=\"true\"></i>\n" +
    "                                <div class=\"title\">\n" +
    "                                    <h4>Add A New Step</h4>\n" +
    "                                </div>\n" +
    "                                <div class=\"text\">\n" +
    "                                    <span>add more steps</span>\n" +
    "                                </div>\n" +
    "                                <a href=\"/addStep\" th:href=\"@{/addStep}\" class=\"stretched-link\">Add new step</a>\n" +
    "                            </div>\n" +
    "                        </div>";

stepAddBtn.click(function () {
    // addCourseInDashboard();
});


var button = document.getElementById("add-step-btn");
var input = document.getElementById("Form-Step-Name");
var ul = document.getElementById("step-group");
// var ul = document.querySelector("ul");
button.addEventListener("click", function() {
    var li = document.createElement("li");
    // Add Bootstrap class to the list element
    // li.classList.add("list-group-item list-group-item-action list-group-item-secondary");
    li.classList.add("list-group-item");
    li.classList.add("list-group-item-action");
    li.classList.add("list-group-item-secondary");

    li.appendChild(document.createTextNode(input.value));
    ul.appendChild(li);
    // Clear your input
    input.value = "";
})