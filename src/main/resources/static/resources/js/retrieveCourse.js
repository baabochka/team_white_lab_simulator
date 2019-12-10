function addCourseInDashboard(){
    $.ajax({
        type:"POST",
        url:"/market",
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