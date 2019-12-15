//
//
//
//
// function change_instruction() {
//     let i = $('#step-item-list input:radio:checked').val();
//     let brief = instruction_input.val();
//     $.ajax({
//         type: "POST",
//         url: "/lab/" + labId + "/change_step_brief",
//         data: {
//             'brief': brief,
//             'i': i
//         },
//         success: function (data) {
//             $('#step-item-list input:radio:checked').next().find('span').text(instruction_input.val());
//             steps[i]['brief'] = brief;
//         }
//     });
// }
//
//
// instruction_input.change(function () {
//     change_instruction();
// });
//
//
//
//
//
//
