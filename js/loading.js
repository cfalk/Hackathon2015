Handlebars.registerHelper("each", function(array, block) {
  var HTML = "";
  for (var i=0; i<array.length; i+=1) {
    array[i]["i"] = i+1; // Count the number of elements during the loop.
    HTML += block.fn(array[i])
  }
  return HTML;
});

function addSuperScripts(results) {
  var clean = results.replace(/[0-9]+(th|rd|st|nd)/g, function(captured) {
    var number = captured.match(/([0-9]+)/)[1];
    captured = captured.replace(number, "");
    return number+"<span class='superscript'>"+captured+"</span>";
  });

  return clean;
}

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

    result = addSuperScripts(result);

    $("#"+idPrefix+templateID).append(result);

  }).fail(function() {
    var error = "Failed to load template...";
    $("#"+idPrefix+templateID).append(error);

  });
}
