Handlebars.registerHelper("each", function(array, block) {
  var HTML = "";
  for (var i=0; i<array.length; i+=1) {
    array[i]["i"] = i+1; // Count the number of elements during the loop.
    HTML += block.fn(array[i])
  }
  return HTML;
});

Handlebars.registerHelper("ifEqual", function(arg1, arg2, block) {
  return (arg1===arg2) ? block.fn(block) : "";
});




function addSuperScripts(results) {
  var clean = results.replace(/[0-9]+(th|rd|st|nd)/g, function(captured) {
    var number = captured.match(/([0-9]+)/)[1];
    captured = captured.replace(number, "");
    return number+"<span class='superscript'>"+captured+"</span>";
  });

  return clean;
}

function addHashLinks(results) {
  var $results = $(results);
  $results.find(".hashLink").each(function(i) {
    $(this).wrap("<a href=\"#"+i+"\" name=\""+i+"\"></a>");
  });
  return $results;
};

function addPopWords(results) {
  var $results = $(results);
  $(".popWord").each( function() {
    var colors = [
"#e41a1c",
"#377eb8",
"#4daf4a",
"#984ea3",
"#ff7f00",
"#a65628",
"#49d6dd",
"#f781bf"
    ];
    var color = colors[parseInt(Math.random()*colors.length)];
    $(this).css("color", color);
  });
  return $results;
}

window.loadTemplate = function(url, data) {
  var idPrefix = "td";
  if ((typeof data) === "undefined") data = {};

  var templateID = $(".templateBlock").length;
  var emptyTemplate = "<div class='templateBlock' id='"
                       +idPrefix + templateID+"'></div>";
  $("body").append(emptyTemplate);

  var container = "#"+idPrefix+templateID;

  var templateDir = "templates/"
  $.get(templateDir+url, function(raw) {

    var template = Handlebars.compile(raw);
    var result = template(data);
    result = result+"</div>";

    result = addSuperScripts(result);
    result = addHashLinks(result);
    result = addPopWords(result);

    $(container).append(result);

    if (typeof prepareTooltips !== "undefined"){
      prepareTooltips(container);
    }

  }).fail(function() {
    var error = "Failed to load template...";
    $("#"+idPrefix+templateID).append(error);

  });
}
