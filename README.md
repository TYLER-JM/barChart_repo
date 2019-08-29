# A Bar Chart Generator

## About
This project is part of the prep work curriculum for Lighthouse Labs. It uses HTML, CSS, and Javascript (with jQuery). The function allows users to generate and print a bar chart to an HTML page. I'll try to explain the usage of the function below

### Resources used
I go to [Mozilla Developers Network](https://developer.mozilla.org/en-US/) to find answers. As well as [w3schools.com](https://www.w3schools.com/), and [stackoverflow](https://stackoverflow.com/) for more specific answers. [Javascript & jQuery: the missing manual](http://shop.oreilly.com/product/0636920032663.do?CMP=ILC-MMcdpag3s) has also been helpful, along with the CSS edition of *The Missing Manual* series.

## The function:
`drawBarChart(data, options, element)`

## function parameters

1. **data**: an array of objects:

  ```javascript
  [
    {title: "Howick", value: 3852},
    {title: "Bluewater", value: 7120},
    {title: "Goderich", value: 7628},
  ]
  ```

  -if including stacked bars, the value of the `value` key in each object will be an array of numbers, each one representing one of the *sub-catagories*, like this...

  ```javascript
    {title: "Nikita Kucherov", value: [41, 53, 34]},
    {title: "Connor MacDavid", value: [42, 56, 19]},
  ```
  ...each number in each `value` array will correspond to a nested array in the `barColor` array found in the **options** parameter, where the **title** and **color** of each *sub-catagory* can be set.
  
2. **options**: an object with all of the customizable elements of the bar chart. Some of the *key* *value* pairs are optional, where the chart will still display correctly. However, some of them must be included. It will look something like this...

```javascript
  {
    scale: [2000, 10000, 1000],
    width: "800px",
    height: "500px",
    mainTitle: ["Townships of Huron County", "18px", "gray"],
    xTitle: ["Township Name", "14px", "#6133ff"],
    yTitle: ["Population", "14px", "#6133ff"],
    positionValues: "end",
    labelColor: "#ff6133",
    barColor: [
      "#336bff",
      "#6690ff",
      "#99b5ff",
      "#6c7a9f",
      "#5975bf",
      "#b3c7ff",
      "#ccdaff",
      "#e5ecff",
      "#6378af"
              ],
    padding: "20px",
    rotate: true
  }
```
  * `scale:` is an array containing the **start**, **end**, and **increment** that will determine how the y-axis is layed out. If using stacked values, always use 0 to start the scale. This *key* is **mandatory**.
  * `width:` and `height:` will determine the chart's size. If the size of the parent container has been set, the *width* and *height* of the bar chart can be set using percentage values to make the chart more responsive. These are **optional**
  * Each **Title** key contains an array with 3 strings: 
    - the title itself
    - the desired size
    - the desired color

    These are **mandatory**. If you would like to omit a title, include an empty array as the *value* for that particular title. But do not remove the *key* entirely from the object.

  * `positionValues:` should be set to something that the css rule `align-items:` can take, i.e... `start`, `center`, or `end`. It will position the values displayed inside the bar at either the top, middle, or bottom of the bar. This is **optional**.
  * `labelColor:` will set the color of the labels displayed beneath each bar. This is **optional**.
  * `barColor:` (This is **mandatory**). This will be an array of colors, each one corresponding to the object at the same index of the **data** parameter. If using stacked values `barColor` will take a 2-D array, each nested array will include a **title** and **color** that will correspond to the value at the same index inside of each `data.value` array: in the following example the array at `barColor[0]` will refer to the value at `data[i].value[0]`.
  ```javascript
    barColor: [
                ["Goals", "#61dc67"],
                ["Primary Assists", "#9ce9a0"],
                ["Secondary Assists", "#d7f6d9"]            
              ],
  ```
  * `padding: ` sets the gap between each bar. This is **optional**.
  * `rotate: ` will rotate the labels applied to each bar in order to accomodate lengthy titles. simply set to `true` or `false`. If needed, adjust the `padding-top` declaration in the `.shifted` selector in the stylesheet to position the title of the x-axis appropriately. This is **optional**.

3. **element:** should include a period for class, or hashtag for id: `".new-bar"` or `"#new-item"`. Just like when selecting elements with jQuery.

## Helper functions

1. `function makeEl(type, className)`
  - This function is used to help create new DOM elements. It returns a string that is used with jQuery to make new elements and attach them to a variable. It takes two arguments both in the form of a string:
    1. the type of element, i.e. "div", "p", "h1".
    2. an optional class name to be applied to the new element

2. `function getScale(s, e, inc)`
  - This function is used to help generate the scale displayed along the y-axis. It returns a 2D array. Each sub-array contains:
    1. one string used for positioning the markers
    2. one string used to position the numbers displayed beside the markers
    3. and one number used as the number to be displayed beside the marker. In that order
  - It takes 3 arguments, they are each taken from the information the user inputs to `options.scale` :
    1. `s` - the starting point for the scale
    2. `e` - the ending point for the scale
    3. `inc` - the increment used in the scale

3. `function createYAxis(elem, selectors, arr)`
  - This function generates the scale along the Y axis. It is used in a loop within the main function in order to create the necessary number of markers along the axis. It takes 3 arguments:
    1. `elem` - the element that the marker and number will be append to: `var yAxis`
    2. `selectors` - an array of with the element that the entire chart resides inside, and the ".yAxis" class name.
    3. `arr` - which will be one of the sub-arrays produced by the helper function `getScale()` 

## Known Bugs and Limitations

* currently, to avoid some bugs, each chart should have its own parent container.
* the values displayed in each bar will be black. There is no way of modifying their color when invoking the function. The user can change the color at the `.inner` selector in the stylesheet. However, this will affect each chart that is generated
* when rotating the labels beneath each bar, the x-axis title can be moved further from the chart to accommodate the slanted labels by adjusting the `padding-top` declaration inside the `.shifted` selector.  However, this will affect each chart that is generated.
* when using stacked values the `scale` key inside the `options` parameter should always start at 0.
* Labels beneath each bar are aligned to the left, with no way of customizing when invoking the function.
* only the color and size of the titles are customizable when invoking the function. 
* a bar color must be provided for each bar (or each *sub-catagory* in a stack). There is no shortcut if the user would prefer each bar be the same color. In other words, when displaying a single value for each bar, the *value* of `barColor` always needs to be an array with 1 element for each object inside the **data** parameter.
* `width` can be set to a percentage, for a little responsiveness. But using a percentage value for `height` requires the parent container to have its height set already, otherwise the chart seems to flatten itself. 
* The legend that is generated if stacked values are used is not customizable in any way when invoking the function


## Examples
1. The example below has no x-axis title in order to make room for the slanted labels:
![Image of Bar Chart](/example-barChart.png)
2. The example below uses stacked values:
![Another example of the function](/example-barChart2.png)

## what does the future hold?

* I would like to make it possible for numbers in the millions or billions to be displayed in a more readable way: 1.5M, not 1,500,000
* allow the labels beneath the bars to be center alligned
* allow the position and characteristics of the legend to be customized
* improve the feature that rotates the labels beneath each bar
* improve the responsiveness of the charts. Little attention has yet to be paid to this
* lots more can be done to improve the visual appeal of the chart
