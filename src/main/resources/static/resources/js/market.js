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