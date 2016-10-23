$( document ).ready(function(){
  thingAttrGroupCount = 1;
  $('#newThingAttrGroupBtn').click(addNewThingAttrGroup);
});

function addNewThingAttrGroup() {
  $newThingAttrGroup = $('.thingattr:first').clone();

  var newThingAttrGroupNumber = thingAttrGroupCount + 1;

  $newThingAttrGroup.attr('number', newThingAttrGroupNumber);
  $newThingAttrGroup.children().each(function() {
    $(this).attr('number', newThingAttrGroupNumber);
  });
  $newThingAttrGroup.insertAfter(".thingattr[number='" + thingAttrGroupCount +"']");

  thingAttrGroupCount++;
}
