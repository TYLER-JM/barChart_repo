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
    padding: "15px",
    rotate: false
  }
```
  * `scale:` is an array containing the **start**, **end**, and **increment** that will determine how the y-axis is layed out. If using stacked values, always use 0 to start the scale.
  * `width:` and `height:` will determine the chart's size.
  * Each **Title** key contains an array with 3 strings: 
    - the title itself
    - the desired size
    - the desired color

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
  * `rotate: ` will rotate the labels applied to each bar in order to accomodate lengthy titles. simply set to `true` or `false`. Adjust the `padding-top` declaration in the `.shifted` selector in the stylesheet to position the title of the x-axis appropriately

3. **element:** should include a period for class, or hashtag for id: `".new-bar"` or `"#new-item"`

## Known Bugs, and limitations

* currently, to avoid some bugs, each chart should have its own parent container.
* each element inside of the **title** arrays (mainTitle, xTitle, yTitle) in the **options** parameter should be present. If no title is prefered, include an empty array as the *value*, but do not remove the *key* entirely from the **options** object.
* the values displayed in each bar will be black. There is no way of modifying their color when invoking the function. The user can change the color at the `.inner` selector in the stylesheet. However, this will affect each chart that is generated
* when rotating the labels beneath each bar, the x-axis title can be moved further from the chart to accommodate the slanted labels by adjusting the `padding-top` declaration inside the `.shifted` selector.  However, this will affect each chart that is generated.
* when using stacked values the `scale` key inside the `options` parameter should always start at 0.
* Labels beneath each bar are aligned to the left.
* only the color and size of the titles are customizable when invoking the function. 
* a bar color must be provided for each bar (or each bar in a stack). There is no shortcut if the user would prefer each bar be the same color. In other words, the value of `barColor` always needs to be an array with 1 element for each value
* `width` can be set to a percentage, for a little responsiveness. But using percentage value for the value of `height` will take extra work. 


## Examples

![Image of Bar Chart](/example-barChart.png)

## what does the future hold?

* I would like to make it possible for numbers in the millions or billions to be displayed in a more readable way: 1.5M, not 1,500,000
* allow the labels beneath the bars to be center alligned
* improve the feature that rotates the labels beneath each bar
* improve the responsiveness of the charts. Little attention has yet to be paid to this
* lots more can be done to improve the visual appeal of the chart
