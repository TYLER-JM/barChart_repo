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
  };
});