function courseFilterFunction() {
    var input, filter, cards, cardContainer, h5, title, i;
    input = document.getElementById("courseFilterInput");
    filter = input.value.toUpperCase();
    cardContainer = document.getElementById("courseGroup");
    cards = cardContainer.getElementsByClassName("courseCard");
    for (i = 0; i < cards.length; i++) {
        title = cards[i].querySelector(".flip-card .flip-card-inner .flip-card-front h3.card-title");
        if (title.innerText.toUpperCase().indexOf(filter) > -1) {
            cards[i].style.display = "";
        } else {
            cards[i].style.display = "none";
        }
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