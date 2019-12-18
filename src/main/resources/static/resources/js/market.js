$(function () {
    $('body').on('click', ".list-group .list-group-item:not('.local-items')", function () {
        $(this).toggleClass('active');
    });
    $('.list-arrows button').click(function () {
        var $button = $(this), actives = '';
        var addedCourses = null;
        if ($button.hasClass('move-left')) {
            actives = $('.list-right .container .tab-content #addedCourses ul li.active');
            actives.toggleClass('active');
            actives.clone().appendTo('.list-left ul');
            actives.remove();
        } else if ($button.hasClass('move-right')) {
            actives = $('.list-left ul li.active');
            actives.toggleClass('active');
            actives.clone().appendTo('.list-right .container .tab-content #addedCourses ul');
            actives.remove();
        } else if ($button.hasClass('saveAddedCourses')) {
            addedCourses = $('.list-right .container .tab-content #addedCourses ul li');
            var idList=[];
            addedCourses.each(function(){
                idList.push($(this).attr('id'));
            });
            $.ajax({
                type:"POST",
                url:"/market",
                data:{
                    "addedCourses":idList
                },
                success : function(data){
                }
            });
        }
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