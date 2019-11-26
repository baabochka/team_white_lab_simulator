
function addCourseInDashboard(){
    $.ajax({
        type:"POST",
        url:"/addCourse",
        data:{
        },
        success : function(data){
            $(courseTemplate).appendTo(whereShowCourseDashboard);
            alert(courseName.val());
        }
    });
}

let courseName = $("#Form-Course-Name");
let courseDescription = $("#Form-Course-Descrip");
let courseAddBtn = $("#add-course-btn");

let whereShowCourseDashboard = $("#add-course-dashboard");

let courseTemplate = "<div class=\"box-part text-center\">\n" +
    "                                <i class=\"mdi mdi-add\" aria-hidden=\"true\"></i>\n" +
    "                                <div class=\"title\">\n" +
    "                                    <h4>" + courseName.val() + "</h4>\n" +
    "                                </div>\n" +
    "                                <div class=\"text\">\n" +
    "                                    <span>" + courseDescription.val() + "</span>\n" +
    "                                </div>\n" +
    "                                <a href=\"/addCourse\" th:href=\"@{/addCourse}\" class=\"stretched-link\">Read More</a>\n" +
    "                            </div>"

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