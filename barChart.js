//jQuery ready...
// $(function() {
  function drawBarChart(data, options, element) {

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

  let createBar = function(dataArr, visArr) {
    let outer = $(makeEl("div", "outer"));

    //newly added to get titles...moved
    let xValues = $(makeEl("div", "xValues"));
    outer.append(xValues);
    xValues.html(dataArr[2]);
    //...above, newly added

    outer.appendTo(chart);
    outer.css("padding-right", visArr[2]);
    

    if (typeof dataArr[1] === "object") {

      let stack = $(makeEl("div", "stack"));
      outer.prepend(stack);
      for (let i = 0; i < dataArr[0].length; i++) {
        let inner = $(makeEl("div", "inner"));
        stack.append(inner);
        inner.css({
                  "height" : dataArr[0][i],
                  "background-color" : visArr[0][i][1],
                  "align-items" : visArr[1],
                  "color" : "black"
                })
              .text(dataArr[1][i]);
      }
    } else {
      let inner = $(makeEl("div", "inner"));
      outer.prepend(inner);

      inner.css({
                "height" : dataArr[0],
                "align-items" : visArr[1],
                "color" : "black",
                "background-color" : visArr[0],
              })
            .text(dataArr[1]);
    }

    
  }; //end createBar()

  //create one bar for every data point
  for (let i = 0; i < data.length; i++) {
    createBar([scaledValues[i], data[i].value, data[i].title], [options[2].barColor, options[2].xValuePos, options[2].padding]);
  }

   //rotate xValue titles if required
   if(options[1].rotate) {
    $(element + " .xValues").css({
      "transform" : "rotate(45deg)",
      "transform-origin" : "10px 20px"
    })
  }

      //check whether or not to create a legend
  if (typeof options[2].barColor === "object" ) {
    console.log("lets's make a legend");
    let legend = $(makeEl("div", "legend"));
    legend.appendTo(chart);

    options[2].barColor.forEach(element => {
      let swatch = $(makeEl("div", "swatch"));
      let subCatTitle = $(makeEl("div", "subCatTitle"));
      swatch.css("background-color", element[1]);
      subCatTitle.text(element[0]);

      $(makeEl("div", "subCat")).append(swatch).append(subCatTitle).appendTo(legend);
    });
    
  }

  }; //end drawBarChart()

  drawBarChart([
    {title: "winter", value: [12, 2, 10]},
    {title: "spring", value: [3, 13, 4]},
    {title: "summer", value: [4, 16, 1]},
    {title: "autumn", value: [14, 4, 13]}
              ],
              [
                {start: 0, end: 35, increment: 5},
                {
                  title: "Items Purchased",
                  yTitle: "amount",
                  xTitle: "season",
                  rotate: false
                },
                {
                  barColor: [
                    ["pants", "blue"],
                    ["shorts", "red"],
                    ["coats", "gray"]
                  ],
                  xValuePos: "center",
                  
                  padding: "20px"
                }
              ], ".new-chart");

// }); //end ready