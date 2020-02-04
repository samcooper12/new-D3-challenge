
var url = 'assets/data/data.csv'

var states = []

var svg

d3.csv(url, function(d) {

      // SET DIMENSIONS FOR SVG 

var margin = {top: 15, right: 10, bottom: 40, left: 60},
    width = 900 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom;

var svg = d3.select("#scatter").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)


// CREATE A LIST OF COL VALUES


function values(d, col) { 
  var list = []
  // poverty = toString(poverty)
  for (i = 0; i < d.length; i++) {
    var p = d[i][col]
    // console.log(p)
    p = parseFloat(p,)
    // console.log(p)
    list.push(p)
  }
  return list
  // console.log(list)
}

// USING VALUES() ^^  TO CREATE VALUE LISTS

var povertyVals = values(d, "poverty")
var healthVals = values(d, "healthcare")

var maxX = [Math.floor(d3.min(povertyVals)) -.5,Math.ceil(d3.max(healthVals) +1)]
var maxY = [Math.floor(d3.min(healthVals)) -.5, Math.ceil(d3.max(healthVals) +1)]

console.log(maxX)
console.log(maxY)
/*SCALING FUNCTIONS ---------
      DOMAIN 
      RANGE*/

var scaleX = d3.scaleLinear()
          .domain(maxX)
          // .range([0, width]);
          .range([margin.left + margin.right, width]);

var scaleY = d3.scaleLinear()
          .domain(maxY)
          .range([height, margin.top + margin.bottom]) 

/*
ADDS AXIS -- SCALEX, SCALE Y

  Y AXIS
*/

svg.append("g")
    .attr("transform", "translate(0" + [margin.left + margin.right, 0] + ")")
    .attr("fill","blackx")

    .style("stroke-width", 3)
    .style("font-size","16px")
    // .attr("width","50px")
    // .attr()

    .call(d3.axisLeft(scaleY))
    .call(g => g.selectAll(".tick text")
      .attr("x", -20))


/*
  X AXIS
*/  

svg.append("g")
    .attr("class","xAxis")
    .attr("transform", "translate(0," + height  + ")")
    .attr("fill","black")
    .style("stroke-width", 3)
    .style("font-size","16px")
    .call(d3.axisBottom(scaleX))
    // .tickSize(width - margin.left - margin.right)
    // .call(g => g.selectAll(".tick text")
        // .attr("x", 10)
        // .attr("dy", margin.bottom ))


        // Add Y axis
        // var y = d3.scaleLinear()
          // .domain([5, 27])
          // .domain([minHealthcare, maxHealthcare])
          // .range([ height, 0]);

// var scaleY = d3.scaleLinear()
//           .domain([minHealthcare, maxHealthcare])
//           .range([height, 0]) 
//         svg.append("g")
//             // .attr("transform", "translate(0" + [margin.left, 0] + ")")
//             // .text("healthcare")
//             .attr("fill","blackx")
            // .call(d3.axisLeft(y));


/*
add circles to 
*/
    svg
        .selectAll("circle")
        .data(d)
        .enter()
        .append("circle")
        // .attr("fill","rgb(139,188, 214)")
        .style("fill","rgb(139,188, 214)" )
        // .attr("stroke", "rgb(139,188, 214)")
        .attr("id","")
          .attr("cx", function (d) { return scaleX(d.poverty); } ) // scale circles to fit x 
          .attr("cy", function (d) { return scaleY(d.healthcare); } ) // scale circles to fit y
          .attr("r", 16)
          .attr("transform","translate(" + margin.left + "," + margin.top + ")")
        // .text()
        // .on("mouseover", handleMouseOver)
        // .on("mouseout", handleMouseOut);


/*
STATE ABBR 
*/

svg.selectAll("text")
    // .data(d)
    .enter()
    .append("text")
       .data(d)
       .enter()
       .append("text")
       .attr("transform","translate(" + margin.left + "," + margin.top + ")")
       .attr("fill","white")
       .attr("stroke","white")
       // .attr("x",function (d) { return xScale(d.poverty) } )
       .attr("x",function (d) { return scaleX(d.poverty) } )
       // .attr("y",function (d) { return yScale(d.healthcare) } )
       .attr("y",function (d) { return scaleY(d.healthcare) } )

       .attr("dominant-baseline","central" )
       .attr("font-size","14px" )
       // .attr("dominant-baseline","middle" )
       .text(d => d.abbr) 

/*
X axis text
*/

svg.append("text")
      .style("font-size","16px")
       .attr("dy", "1em")
      .attr("transform",
            "translate(" + (width/2) + " ," + 
                           (height + margin.top + 20) + ")")
      .style("text-anchor", "middle")
      .text("In Poverty (%)");  




/*
Y  text
*/

  svg.append("text")
      .style("font-size","16px")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 60)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      // .attr("transform",
      //       "translate(" + (width/2) + " ," + 
      //                      (height + margin.top + 20) + ")")
      // .style("text-anchor", "middle")
      .text("Lacks Health Care (%)")
      .style("fill","black");
})



// svg.selectAll("tick")
//   .attr("transform", "translate(0" + [-20, 0] + ")")


/*
function handleMouseOver(d, i) {  

            // Use D3 to select element, change color and size
            d3.select(this).attr({
              fill: "orange",
              r: 22
            });

            svg.selectAll("text")
            .enter()
            .append("text")
            .enter()
            .attr("id", ("t" + d.poverty + "-" + d.healthcare + "-" + i))
               // "id": "t" + d.poverty + "-" + d.healthcare + "-" + i,  // Create an id for text so we can select it later for removing on mouseout
            //     x: function() { return xScale(d.poverty) - 30; },
            //     y: function() { return yScale(d.healthcare) - 15; }
            // })
            // .attr('fill','red')
            .attr("x",function() { return xScale(d.poverty) - 30; })
            .attr("y",function() { return yScale(d.healthcare) - 15; })
            .text(function() {
              return [d.poverty, d.healthcare];  // Value of the text
            });
          }

function handleMouseOut(d, i) {
            // Use D3 to select element, change color back to normal
            d3.select(this).attr({
              fill: "rgb(139,188, 214)",
              stroke: "rgb(139,188, 214)",
              r: 20
            });
            d3.select("#t" + d.x + "-" + d.y + "-" + i).remove();  // Remove text location
}
*/

