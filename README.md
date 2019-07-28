drawBarChart(data, options, element) 

1. **data**: an array of objects:

  ```javascript
  [
    {title: "January", value: 31},
    {title: "February", value: 28},
  ]
  ```

  -if including stacked bars, `data.value` will be an array of numbers, each one representing the value
  for one of the *sub-catagories*, like this...

  ```javascript
    {title: "Clothes", value: [14, 10, 7]},
  ```
  ...each element in the `data.value` array will correspond to a nested array in the `barColor` array found in the **options** parameter, where the **title** and **color** of each *sub-catagory* can be set.
  
2. **options**: an object with all of the customizable elements of the bar chart. It will look something like this...

```javascript
  {
    scale: [0, 35, 5],
    width: "500px",
    height: "400px",
    mainTitle: ["the Main Title", "20px", "black"],
    xTitle: ["the x-axis Title", "12px", "blue"],
    yTitle: ["the y-axis Title", "12px", "red"],
    positionValues: "start",
    labelColor: "red",
    barColor: ["#336bff", "#6690ff", "#99b5ff"],
    padding: "15px";
  }
```
  * `scale:` is an array containing the **start**, **end**, and **increment** that will determine how the y-axis is layed out.
  * `width:` and `height:` will determine the chart's size.
  * Each **Title** key contains an array with 3 strings: 
    - the title itself
    - the desired size
    - the desired color. Any syntax for setting color should work
  * `positionValues:` should be set to something that the css rule `align-items:` can take, i.e... `start`, `center`, or `end`. It will position the values displayed inside the bar at either the top, middle, or bottom of the bar.
  * `labelColor:` will set the color of the labels displayed beneath each bar.
  * `barColor:` will be an array of colors in the form of strings, each one corresponding to the object at the same index of the **data** parameter. If using stacked values `barColor` will take a 2-D array, each nested array will include a **title** and **color** that will correspond to the value at the same index inside of each `data.value` array: in the following example the array at `barColor[0]` will refer to the value at `data[i].value[0]`.
  ```javascript
    barColor: [
                ["pants", "blue"],
                ["shorts", "red"],
                ["coats", "gray"]                        
              ]
  ```
  * `padding: ` sets the gap between each bar.

3. **element:** should include a period for class, or hashtag for id: `".new-bar"` or `"#new-item"`
