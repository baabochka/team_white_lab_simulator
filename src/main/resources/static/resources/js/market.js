

$(function () {

    $('body').on('click', '.list-group .list-group-item', function () {
        $(this).toggleClass('active');
    }).not('.local-items unselectable');
    $('.list-arrows button').click(function () {
        var $button = $(this), actives = '';
        var addedCourses = null;
        if ($button.hasClass('move-left')) {
            actives = $('.list-right .container .tab-content #addedCourses ul li.active');
            actives.clone().appendTo('.list-left ul');
            actives.remove();
        } else if ($button.hasClass('move-right')) {
            actives = $('.list-left ul li.active');
            actives.clone().appendTo('.list-right .container .tab-content #addedCourses ul');
            actives.remove();
        } else if ($button.hasClass('saveAddedCourses')) {
            addedCourses = $('.list-right .container .tab-content #addedCourses ul li');
            // var list=[];
            //
            // console.log("addedCourses",addedCourses);
            // $.ajax({
            //     type:"POST",
            //     url:"/market",
            //     data:{
            //         "addedCourses":addedCourses.val()
            //     },
            //     success : function(data){
            //         console.log("addedCourses",addedCourses.val());
            //     }
            // });
        }
    });
    $('.dual-list .selector').click(function () {
        var $checkBox = $(this);
        if (!$checkBox.hasClass('selected')) {
            $checkBox.addClass('selected').closest('.well').find('ul li:not(.active)').addClass('active');
            $checkBox.children('i').removeClass('glyphicon-unchecked').addClass('glyphicon-check');
        } else {
            $checkBox.removeClass('selected').closest('.well').find('ul li.active').removeClass('active');
            $checkBox.children('i').removeClass('glyphicon-check').addClass('glyphicon-unchecked');
        }
<<<<<<< Updated upstream
    }
}

// Move Items function
$(function () { function moveItems(origin, dest) {
    $(origin).find(':selected').appendTo(dest);
}

    function moveAllItems(origin, dest) {
        $(origin).children().appendTo(dest);
    }

    $('#left').click(function () {
        moveItems('#sbTwo', '#sbOne');
    });

    $('#right').on('click', function () {
        moveItems('#sbOne', '#sbTwo');
    });

    $('#leftall').on('click', function () {
        moveAllItems('#sbTwo', '#sbOne');
    });

    $('#rightall').on('click', function () {
        moveAllItems('#sbOne', '#sbTwo');
    });
});


// Add course function
$( function() {
    var dialog, form,
        courseNamePatt = /^(?!\s*$).+/,
        name = $( "#name" ),
        section = $( "#section" ),
        description = $( "#description" ),
        allFields = $( [] ).add( name ).add( section ).add( description ),
        tips = $( ".validateTips" );

    function updateTips( t ) {
        tips
            .text( t )
            .addClass( "ui-state-highlight" );
        setTimeout(function() {
            tips.removeClass( "ui-state-highlight", 1500 );
        }, 500 );
    }

    function checkLength( o, n, min, max ) {
        if ( o.val().length > max || o.val().length < min ) {
            o.addClass( "ui-state-error" );
            updateTips( "Length of " + n + " must be between " +
                min + " and " + max + "." );
            return false;
        } else {
            return true;
        }
    }

    function checkRegexp( o, regexp, n ) {
        if ( !( regexp.test( o.val() ) ) ) {
            o.addClass( "ui-state-error" );
            updateTips( n );
            return false;
        } else {
            return true;
        }
    }

    function addCourse() {
        var valid = true;
        allFields.removeClass( "ui-state-error" );

        valid = valid && checkLength( name, "coursename", 3, 80 );

        if ( valid ) {
            $( "#users tbody" ).append( "<tr>" +
                "<td>" + name.val() + "</td>" +
                "<td>" + section.val() + "</td>" +
                "<td>" + description.val() + "</td>" +
                "</tr>" );
            dialog.dialog( "close" );
        }
        return valid;
    }

    dialog = $( "#dialog-form" ).dialog({
        autoOpen: false,
        height: 400,
        width: 350,
        modal: true,
        buttons: {
            "Create a course": addCourse,
            Cancel: function() {
                dialog.dialog( "close" );
            }
        },
        close: function() {
            form[ 0 ].reset();
            allFields.removeClass( "ui-state-error" );
        }
    });

    form = dialog.find( "form" ).on( "submit", function( event ) {
        event.preventDefault();
        addCourse();
    });

    $( "#create-course" ).button().on( "click", function() {
        dialog.dialog( "open" );
    });
} );
=======
    });
    $('[name="SearchDualList"]').keyup(function (e) {
        var code = e.keyCode || e.which;
        if (code == '9') return;
        if (code == '27') $(this).val(null);
        var $rows = $(this).closest('.dual-list').find('.list-group li');
        var val = $.trim($(this).val()).replace(/ +/g, ' ').toLowerCase();
        $rows.show().filter(function () {
            var text = $(this).text().replace(/\s+/g, ' ').toLowerCase();
            return !~text.indexOf(val);
        }).hide();
    });

});
>>>>>>> Stashed changes
