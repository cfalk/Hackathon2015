Handlebars.registerHelper("each", function(array, block) {
  var HTML = "";
  for (var i=0; i<array.length; i+=1) {
    array[i]["i"] = i+1; // Count the number of elements during the loop.
    HTML += block.fn(array[i])
  }
  return HTML;
});

window.loadTemplate = function(url, data) {
  var idPrefix = "td";
  if ((typeof data) === "undefined") data = {};

  var templateID = $(".templateBlock").length;
  var emptyTemplate = "<div class='templateBlock' id='"
                       +idPrefix + templateID+"'></div>";
  $("body").append(emptyTemplate);

  var templateDir = "templates/"
  $.get(templateDir+url, function(raw) {

    var template = Handlebars.compile(raw);
    var result = template(data);
    result = result+"</div>";
    $("#"+idPrefix+templateID).append(result);

  }).fail(function() {
    var error = "Failed to load template...";
    $("#"+idPrefix+templateID).append(error);

  });
}
