
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
            $(courseTemplate).appendTo(whereShowCourseDashboard);
            alert(courseSec.val());
        }
    });
}

let courseName = $("#Form-Course-Name");
let courseSec = $("#Form-Course-Section");
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
    "                            </div>";

courseAddBtn.click(function () {
    addCourseInDashboard();
});