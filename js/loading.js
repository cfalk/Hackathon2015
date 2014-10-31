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
    $("body").append(error);

  });
}
