
function addCourseInDashboard(){
    $.ajax({
        type:"POST",
        url:"/addCourse",
        data:{
            "courseName":courseName.val(),
            "courseSection":courseSec.val(),
            "courseDescription":courseDescription.val()
        },
        success : function(data){
            // $(courseTemplate).appendTo(whereShowCourseDashboard);
            whereShowCourseDashboard.appendChild($(courseTemplate));
            alert(courseSec.val());
        }
    });
}

let courseName = $("#Form-Course-Name");
let courseSec = $("#Form-Course-Section");
let courseDescription = $("#Form-Course-Descrip");
let courseAddBtn = $("#add-course-btn");

let whereShowCourseDashboard = $("#add-course-dashboard");

let courseTemplate = "<div class=\"col-lg-4 col-md-4 col-sm-4 col-xs-12\">\n" +
    "                            <div class=\"box-part text-center\">\n" +
    "                                <i class=\"mdi mdi-add\" aria-hidden=\"true\"></i>\n" +
    "                                <div class=\"title\">\n" +
    "                                    <h4>Add A New Course</h4>\n" +
    "                                </div>\n" +
    "                                <div class=\"text\">\n" +
    "                                    <span>add more course</span>\n" +
    "                                </div>\n" +
    "                                <a href=\"/addCourse\" th:href=\"@{/addCourse}\" class=\"stretched-link\">Click me</a>\n" +
    "                            </div>\n" +
    "                        </div>";

courseAddBtn.click(function () {
    // addCourseInDashboard();
});


var button = document.getElementById("add-course-btn");
var input = document.getElementById("Form-Course-Name");
var ul = document.getElementById("course-group");
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