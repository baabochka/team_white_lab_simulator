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
            for (let e of data) {
                let link = "data:image/png;base64,";
                console.log(e);
                $.ajax({
                    type: "get",
                    url: "/api/equipments/image/" + e["id"],
                    success: function (data) {
                        link += data;
                        market_body.append("<div class='col col-sm-2'>" +
                            "<div class='equip-unit'>" +
                            "<label class=\"layersMenu\">\n" +
                            "    <input type=\"checkbox\" id=" + e["id"] + " name=" + e["name"] + ">\n" +
                            "    <img src=" + link + ">\n" +
                            "    <span>" + e["name"] + "</span>\n" +
                            "</label>" +
                            "</div>" + "</div>");
                    }

                });

            }
        }
    });
}

function constructRadio(id, name) {



}

function loadSelectionToCart() {
    cart_body.empty();

    let selection = $('#equip-market-modal input:checked');
    for(let s of selection) {
        let link = "data:image/png;base64,";
        let id =  $(s).attr('id');
        $.ajax({
            type: "get",
            url: "/api/equipments/image/" + id,
            success: function (data) {
                link += data;
                cart_body.append($("<li id='cart-" + id + "' class='cart-item list-group-item'><img src=" + link + "><span>" + $(s).attr('name') + "</span>"
                    +"<div class=\"form-group row\">\n" +
                    "  <div class=\"col-10\">\n" +
                    "    <input class=\"form-control\" type=\"number\" value=\"1\">\n" +
                    "  </div>\n" +
                    "</div>"
                    + "</li>"));
            }

        });

    }

}

$("#view-cart-button").click(function () {
    equip_market_modal.modal('hide');
    loadSelectionToCart();
});

$("#add-to-lab-btn").click(function () {
    equip_cart_modal.modal('hide');
    let items = equip_cart_modal.find('li');
    let map = {};
    for(let i of items) {
        let count = $(i).find('input').val();
        let id = $(i).attr('id').split('-')[1];
        map[id] = count;
    }
    $.ajax({
        type: "POST",
        url: "/lab/" + labId + "/add_from_cart",
        data: map,
        success: function (data) {
            reFetchLabAndLoadStates();
        }
    });
});

