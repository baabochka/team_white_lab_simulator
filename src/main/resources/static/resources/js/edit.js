

let equip_market_modal = $( "#equip-market-modal" );
let market_body = equip_market_modal.find('.modal-body .row');
let equip_cart_modal = $('#equip-cart-modal');
let cart_body = equip_cart_modal.find('.modal-body ul');

equip_market_modal.on('shown.bs.modal', function(){
    loadEquipmentFromMarket();
});

function loadEquipmentFromMarket() {
    market_body.empty();
    $.ajax({
        type: "POST",
        url: "/api/equipments",
        data: {},
        success: function (data) {
            let e;
            for (e of data) {
                market_body.append($(constructRadio( e["id"], e["name"])));
            }
        }
    });
}

function constructRadio(id, name) {
    let link = "/resources/images/equipments/" + id + ".png";
    return "<div class='col col-sm-3 equip-unit'>" +
        "<label class=\"layersMenu\">\n" +
        "    <input type=\"checkbox\" id=" + id + " name=" + name + ">\n" +
        "    <img src=" + link + ">\n" +
        "    <div>" + name + "</div>\n" +
        "</label>" +
        "</div>"
}

function loadSelectionToCart() {
    cart_body.empty();

    let selection = $('#equip-market-modal input:checked');
    let s;
    for(s of selection) {
        let link = "/resources/images/equipments/" + $(s).attr('id') + ".png";
        cart_body.append($("<li class='cart-item list-group-item'><img src=" + link + "><span>" + $(s).attr('name') + "</span>"
            +"<div class=\"form-group row\">\n" +
            "  <div class=\"col-10\">\n" +
            "    <input class=\"form-control\" type=\"number\" value=\"1\">\n" +
            "  </div>\n" +
            "</div>"
            + "</li>"));
    }

}

$("#view-cart-button").click(function () {
    equip_market_modal.modal('hide');
    loadSelectionToCart();
});

let equip_list = $('#equip-list ul');

$("#add-to-lab-btn").click(function () {
    equip_cart_modal.modal('hide');
    let items = equip_cart_modal.find('li');
    let i;
    for(i of items) {
        let count = $(i).find('input').val();
        let src = $(i).find('img').attr('src');
        let name = $(i).find('span').text();
        for(let j = 0; j < count; j++) {
            equip_list.append($("<li class='list-group-item'><img src=" + src + "><span>" + name+ "</span></li>"))
        }
    }
});