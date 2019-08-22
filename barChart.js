


//helper function to help create new elements
function makeEl(type, className) {
  let string = "<" + type;
  if (className === undefined) {
    string += "></" + type + ">";
  } else {
    string += " class='" + className + "'></" + type + ">";
  }
  return string;
}

/*this function returns a 2D array
 * each sub-array contains: two strings used for positioning the markers
 * and the numbers displayed beside the markers, and one number used as
 * the number to be displayed beside the marker. In that order
 */
function getScale(s, e, inc) {
  let arrOut = [];
  for (let i = s, j = 0; i <= e; i += inc, j++) {
    let val = 100 / ((e-s)/inc);
    let x = (val*j).toFixed(2) + "%";
    let y = (val*j-2.5).toFixed(2) + "%";
    arrOut.push([x,y,i]);
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
                                       .text(arr[2].toLocaleString("us-EN")); 
} 

/* This function will take as arguments:
 * [scaledValues[i], data[i].value, and data[i].title],
 * [options.barColor, *options.labelColor*, options.positionValues, options.padding],
 * chart (where outer will be appended to)
 */
function createStack(dataArr, visArr, elem) {
  let outer = $(makeEl("div", "outer"));

  let xValues = $(makeEl("div", "xValues"));
  outer.append(xValues);
  xValues.html(dataArr[2])
         .css("color", visArr[1]); 

  outer.appendTo(elem);
  outer.css("padding-right", visArr[3]);

  let stack = $(makeEl("div", "stack"));
  outer.prepend(stack);
  for (let i = 0; i < dataArr[0].length; i++) {
    let inner = $(makeEl("div", "inner"));
    stack.append(inner);
    inner.css({
              "height" : dataArr[0][i],
              "background-color" : visArr[0][i][1],
              "align-items" : visArr[2],
            })
          .text(dataArr[1][i]);
  }
} //end createStack()

/* This function will take as arguments:
 * [scaledValues[i], data[i].value, and data[i].title],
 * [options.barColor[i], *options.labelColor*, options.positionValues, options.padding],
 * chart (where outer will be appended to)
 */
function createSingle(dataArr, visArr, elem) {
  let outer = $(makeEl("div", "outer"));

  let xValues = $(makeEl("div", "xValues"));
  outer.append(xValues);
  xValues.html(dataArr[2])
         .css("color", visArr[1]); 

  outer.appendTo(elem);
  outer.css("padding-right", visArr[3]);

  let inner = $(makeEl("div", "inner"));
  outer.prepend(inner);
  inner.css({
            "height" : dataArr[0],
            "background-color" : visArr[0],
            "align-items" : visArr[2],
          })
        .text(dataArr[1]);

} //end createSingle()

function rotateLabels(parent) {
  $(parent + " .xValues").addClass("rotated");
  $(parent + " .xTitle").addClass("shifted");
}

const drawBarChart = function(data, options, element) {

  var container = $(makeEl("div", "chart-container"));
  var chart = $(makeEl("div", "chart"));

  container.appendTo(element)
           .append(chart)
           .css({
             "height" : options.height,
             "width" : options.width
           });

  //adding title elements
  var mainTitle = $(makeEl("div", "main-title"));
  mainTitle.text(options.mainTitle[0])
            .appendTo(container)
            .css({
              "font-size" : options.mainTitle[1],
              "color" : options.mainTitle[2]
            });

  var yTitle = $(makeEl("div", "yTitle"));
  yTitle.appendTo(container)
        .append(makeEl("div"));
  $(element + " .yTitle > div:last").text(options.yTitle[0])
                                    .css({
                                      "font-size" : options.yTitle[1],
                                      "color" : options.yTitle[2]
                                    });

  var xTitle = $(makeEl("div", "xTitle"));
  xTitle.appendTo(container)
        .text(options.xTitle[0])
        .css({
          "font-size" : options.xTitle[1],
          "color" : options.xTitle[2]
        });

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

//create a bar for each object in the data parameter
  for (let i = 0; i < data.length; i++) {
    if (typeof data[i].value === "object") {
      createStack([scaledValues[i], data[i].value, data[i].title],
                   [options.barColor, options.labelColor, options.positionValues, options.padding],
                   chart);
    } else {
      createSingle([scaledValues[i], data[i].value, data[i].title],
        [options.barColor[i], options.labelColor, options.positionValues, options.padding],
        chart);
    }
  }

      //check whether or not to create a legend
  if (typeof options.barColor[0] === "object" ) {
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

  if (options.rotate) {
    rotateLabels(element);
  }

} //end drawBarChart()

//// THE FOLLOWING IS ONLY AN
//// EXAMPLE OF THE FUNCTION BEING INVOKED
//// make sure to call the function inside of $(document).ready()
$(function() {
  drawBarChart(
    [
      {title: 2015, value: 103},
      {title: 2016, value: 134},
      {title: 2017, value: 120},
      {title: 2018, value: 147}
    ],
    {
      scale: [0, 150, 25],
      width: "100%",
      height: "400px",
      mainTitle: ["Attendence from '15-'18", "20px", "blue"],
      xTitle: [],
      yTitle: ["Number of Attendees", "16px", "black"],
      positionValues: "center",
      labelColor: "gray",
      barColor: ["#3B6F5B", "#598977", "#144633", "#063020"],
      padding: "5px",
      rotate: false
    }, ".chart-one"
  );
}); //end ready

//// END OF THE FUNCTION INVOCATION