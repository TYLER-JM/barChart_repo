createChart(data, options, element) 

1. **data**
  -an array of objects:

  ```javascript
  [
    {title: "value", value: 12},
    {title: "another", value: 20},
  ]
  ```

  -if including stacked bars, **data.value** will be an array of numbers, each one representing the value
  of one of the "sub-catagories", like this...

  ```javascript
    {title: "january", value: [12, 7, 14]},
  ```
1. **options**: an array of different objects
  1. `options[0]` will be...
    `{start: x, end: y, increment: z}`
  
  1. `options[1]` will be...
  ```javascript
    {
      title: "Family Ages", 
      yTitle: "Age",
      xTitle: "Family Member",
      rotate: false
    }
  ```
  set `rotate` to **true** or **false** to rotate the xTitles by 45º to accomadate long words

  1. `options[2]` will be...
  ```javascript
    {
      barColor: "salmon",
      xValuePos: "start",
      padding: "10px"
    }
  ```
    1. **barColor** can be any format used to set a color: rgba(), rgb(), `#ffddff`, etc... just put it all in quotes. If including stacked bars, **barColor** will be a 2D array like this...
  ```javascript
      barColor: [
                ["sub-catagory", "desired-color"],
                ["2ndSub", "2ndColor"]
                ],
  ```
    1. **xValuePos** positions the value displayed inside each bar. set it to something `align-items:` can take, ie... `start`, `center`, or `end` 

    1. **padding** sets distance between bars.

1. **element** should include a period for class, or hashtag for id: `".new-bar"` or `"#new-item"`
