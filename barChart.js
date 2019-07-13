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

  //adding title elements
  var mainTitle = $(makeEl("div", "main-title"));
  mainTitle.text(options[1].title)
           .appendTo(container);

  var yTitle = $(makeEl("div", "yTitle"));
  yTitle.appendTo(container)
        .append(makeEl("div"));
  $(element + " .yTitle > div:last").text(options[1].yTitle);

  var xTitle = $(makeEl("div", "xTitle"));
  xTitle.appendTo(container)
        .text(options[1].xTitle);

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

  let createScale = function(obj) {
    //obj will be <options[0]>
    let yAxis = $(makeEl("div", "yAxis"));
    yAxis.prependTo(chart);

    //get %s for heights of <div>s...
    var equalPer = (obj.end - obj.start) / obj.increment;
    equalPer = 100 / equalPer;
    console.log("scale markers distance from top = " + equalPer);

    
    let adjustedPer;
    for (let i = obj.start, j = 0; i <= obj.end; i += obj.increment, j++) {
      //create the 'ticks' marking the y-axis
      yAxis.append(makeEl("div", "marker"));
      adjustedPer = (equalPer * j).toFixed(2) + "%";
      $(element + " .yAxis > div:last").css({
                                "position" : "absolute",
                                "bottom" : adjustedPer,
                                "border-bottom" : "1px solid red",
                                "width" : "20px"
                                 });
      //create the values beside each tick
      yAxis.append(makeEl("div"));
      adjustedPer = ((equalPer * j) - 2.5).toFixed(2) + "%";
      $(element + " .yAxis > div:last").text(i.toLocaleString("en-us"))
                            .css({
                                "position" : "absolute",
                                "bottom" : adjustedPer,
                                "right" : "25px",
                                "align-self" : "start",
                                "width" : "auto"
                                });                         

    }

  }; //end createScale

  createScale(options[0]);

  }; //end drawBarChart()
}); //end ready