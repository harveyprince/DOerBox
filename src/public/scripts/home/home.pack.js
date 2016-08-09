$('.ui.sidebar')
  .sidebar({
    context: $('.bottom.segment')
  })
  .sidebar('attach events', '.menu .item')
;
//fix the ios safari bug
if (false) {
    $('#container.segment').height($(document).height());
}
