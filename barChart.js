  //jQuery ready...
$(function() {
  let drawBarChart = function(data, options, element) {

  //helper function to help create new elements
  let makeEl = function(type, className) {
    let string = "<" + type;
    if (className === undefined) {
      string += "></" + type + ">";
    } else {
      string += " class='" + className + "'></" + type + ">";
    }
    return string;
  };

  var container = $(makeEl("div", "chart-container"));
  var chart = $(makeEl("div", "chart"));

  container.appendTo(element);
  chart.appendTo(container);

  //convert data points into percentages in order to use as heights
  //store the percentages into an array scaledValues
  let scaledValues = [];
  for (let i = 0; i < data.length; i++) {
    if (typeof data[i].value === "object") {
      let subConverts = data[i].value.map(function(x) {
        let converted  = ((x - options[0].start) / (options[0].end - options[0].start) * 100).toFixed(2) + "%";
        return converted;
      });
      scaledValues.push(subConverts);
    } else {
      let converted = ((data[i].value - options[0].start) / (options[0].end - options[0].start) * 100).toFixed(2) + "%";
      scaledValues.push(converted);
    }
  }
  console.log("data heights converted to: " + scaledValues);

  };
});