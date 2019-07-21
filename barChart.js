//helper function to help create new elements
function makeEl(type, className) {
  let string = "<" + type;
  if (className === undefined) {
    string += "></" + type + ">";
  } else {
    string += " class='" + className + "'></" + type + ">";
  }
  return string;
};

/*this function returns a 2D array
 * each sub-array contains: two strings used for positioning the markers
 * and the numbers displayed beside the markers, and one number used as
 * the number to be displayed beside the marker. In that order
 */
function getScale(s, e, inc) {
  arrOut = [];
  for (let i = s, j = 0; i <= e; i += inc, j++) {
    let val = 100 / ((e-s)/inc);
    let x = (val*j).toFixed(2) + "%";
    let y = (val*j-2.5).toFixed(2) + "%";
    let z = inc*j;
    arrOut.push([x,y,z]);
  }
  return arrOut;
}
/* This function will create the markers,
 * and the numbers to be displayed beside the markers
 * along the y Axis of the chart.
 * it takes as arguments two elements: [the element
 * which the entire chart is appendedTo, and the <yAxis>
 * element which each marker is prependedTo].
 * its second argument is an array that is made with getScale()
 */
function createYAxis(elem, selectors, arr) {
    elem.append(makeEl("div", "marker"));
    $(selectors[0] + " " + selectors[1] + " > div:last").css("bottom", arr[0]);
    elem.append(makeEl("div", "marker-value"));
    $(selectors[0] + " " + selectors[1] + " > div:last").css("bottom", arr[1])
                                       .text(arr[2]); 
} 

/* This function will take as arguments:
 * a 2D array (which will be options.barColor),
 * options.positionValues, options.padding
 * scaledValues[i], data[i].value, and data[i].title
 */
function createStack(dataArr, visArr) {
  let outer = $(makeEl("div", "outer"));

  //newly added to get titles...moved
  let xValues = $(makeEl("div", "xValues"));
  outer.append(xValues);
  xValues.html(dataArr[2]); 
  //...above, newly added

  outer.appendTo(chart);
  outer.css("padding-right", visArr[2]);

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
} //end createStack

/* This function will take as arguments:
 * a single value (as options.barColor[i]),
 * options.positionValues, options.padding
 * scaledValues[i], data[i].value, and data[i].title
 */
function createSingle(dataArr, visArr) {
  let outer = $(makeEl("div", "outer"));

  //newly added to get titles...moved
  let xValues = $(makeEl("div", "xValues"));
  outer.append(xValues);
  xValues.html(dataArr[2]); 
  //...above, newly added

  outer.appendTo(chart);
  outer.css("padding-right", visArr[2]);

  let inner = $(makeEl("div", "inner"));
  outer.prepend(inner);
  inner.css({
            "height" : dataArr[0],
            "background-color" : visArr[0],
            "align-items" : visArr[1],
            "color" : "black",
          })
        .text(dataArr[1]);

} //end createSingle

function drawBarChart(data, options, element) {

  var container = $(makeEl("div", "chart-container"));
  var chart = $(makeEl("div", "chart"));

  container.appendTo(element).append(chart);

  //adding title elements
  var mainTitle = $(makeEl("div", "main-title"));
  mainTitle.text(options.mainTitle)
            .appendTo(container);

  var yTitle = $(makeEl("div", "yTitle"));
  yTitle.appendTo(container)
        .append(makeEl("div"));
  $(element + " .yTitle > div:last").text(options.yTitle);

  var xTitle = $(makeEl("div", "xTitle"));
  xTitle.appendTo(container)
        .text(options.xTitle);

  //convert data points into percentages in order to use as heights
  //store the percentages into an array scaledValues
  let scaledValues = [];
  for (let i = 0; i < data.length; i++) {
    if (typeof data[i].value === "object") {
      let subConverts = data[i].value.map(function(x) {
        let converted  = ((x - options.scale[0]) / (options.scale[1] - options.scale[0]) * 100).toFixed(2) + "%";
        return converted;
      });
      scaledValues.push(subConverts);
    } else {
      let converted = ((data[i].value - options.scale[0]) / (options.scale[1] - options.scale[0]) * 100).toFixed(2) + "%";
      scaledValues.push(converted);
    }
  }
  console.log("data heights converted to: " + scaledValues);

  //creating the markers along the yAxis
  //using getScale() and createYaxis()
  let yAxis = $(makeEl("div", "yAxis"));
  yAxis.prependTo(chart);
  let yAxisScale = getScale(options.scale[0], options.scale[1], options.scale[2]);
  for (let i = 0; i < yAxisScale.length; i++) {
    createYAxis(yAxis, [element, ".yAxis"], yAxisScale[i]);
  } 


  /* This function creates one bar, its arguments are...
   * dataArr - an array containing the string used to set the height of the bar (i.e. '97%'),
   * the value to display inside the bar, and the label to displey beneath the bar
   */
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
                "background-color" : visArr[0],
                "align-items" : visArr[1],
                "color" : "black",
              })
            .text(dataArr[1]);
    }
  }; //end createBar()

  //create one bar for every data point
  for (let i = 0; i < data.length; i++) {
    createBar([scaledValues[i], data[i].value, data[i].title], [options.barColor, options.positionValues, options.padding]);
  }

      //check whether or not to create a legend
  if (typeof options.barColor === "object" ) {
    let legend = $(makeEl("div", "legend"));
    legend.appendTo(chart);

    options.barColor.forEach(element => {
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
            {
              scale: [0, 35, 5],
              width: "500px", //to come
              height: "400px", //to come
              mainTitle: "Items Purchased", // to come: [array with size + color]
              xTitle: "season",
              yTitle: "amount",
              positionValues: "center",
              labelColor: "red", //to come
              barColor: [
                ["pants", "blue"],
                ["shorts", "red"],
                ["coats", "gray"]                        
                ],
              padding: "15px"
            }, ".new-chart");

drawBarChart([
  {title: "Dave", value: 21},
  {title: "Amin", value: 32},
  {title: "Sarah", value: 25}
],
{
  scale: [0, 40, 10],
  width: "500px", //to come
  height: "400px", //to come
  mainTitle: "Employees", // to come: [array with size + color]
  xTitle: "Names",
  yTitle: "Age",
  positionValues: "end",
  labelColor: "red", //to come
  barColor: "pink",
  padding: "20px"
}, ".new-chart");