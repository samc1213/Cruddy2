thingAttrId = 'thingattr'

$( document ).ready(function(){
  thingAttrGroupCount = 1;
  $('#newThingAttrGroupBtn').click(addNewThingAttrGroup);
});

function addNewThingAttrGroup() {
  $newThingAttrGroup = $('#' + thingAttrId + thingAttrGroupCount).clone();

  var newThingAttrGroupNumber = thingAttrGroupCount + 1;
  
  $newThingAttrGroup.attr('id', thingAttrId + newThingAttrGroupNumber);
  $newThingAttrGroup.insertAfter('#' + thingAttrId + thingAttrGroupCount);

  thingAttrGroupCount++;
}
