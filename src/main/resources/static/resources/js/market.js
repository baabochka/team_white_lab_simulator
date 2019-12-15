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