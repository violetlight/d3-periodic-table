var svg = d3.select('.chart');

// table formatting
var square = $(document).width()/22;
var bigSquare = square*3
var border = 10;
var half = (square/2);
var offset = 35;
var extendedOffset = offset+square;

var grey = tinycolor('#EDECEB');




function getX(d, i) {
  if (i == 0) {
    return ((square+border)*2)+(offset*2);
  } else {
    return ((d.column-1) * (square+border))+offset;
  }
}

function getY(d, i) {
  if (i == 0) {
    return;
  }
  // Lanthanides and Actinides
  if (d.row > 7){
    return ((d.row-1) * (square+border))+extendedOffset;
  }
  // All others
  return ((d.row-1) * (square+border))+offset;
}

function getCenterX(d, i) {
  var result = getX(d, i);
  return result+half-(this.getBBox().width/2);
}

function getCenterY(d, i) {
  var result = getY(d, i);
  return result+half+(this.getBBox().height/2);
}


// "fullscreen" svg to whatever the viewport is
svg.attr('width', function() {
  return $(document).width();
}).attr('height', function() {
  return $(document).height();
});

// Render the "big" detail display
svg.append('g')
  .attr('id', 'detail-box')
  .append('rect')
  .attr('width', bigSquare)
  .attr('height', bigSquare)
  .attr('x', function() {
    return ((square+border)*2)+(offset*2);
  })
  .attr('y', function() {
    return offset+border;
  })
  .attr('fill', '#FFF');


// Render the table and elements
d3.json('/data/periodic-table.json', function(error, data){
  if (error) return console.warn(error);

  var elements = svg.selectAll('g').data(data)
                  .enter().append('g')
                  .attr('pointer-events', 'none')
                  .attr('id', function(d) {
                    console.log(d.name);
                    return d.name;
                  });

  // draw box
  elements.data(data)
  .append('rect')
  .attr('width', square)
  .attr('height', square)
  .attr('x', getX)
  .attr('y', getY)
  .attr('fill', grey);

  // Write symbol
  elements.data(data)
  .append('text')
  .text(function(d, i) {
    return d.symbol;
  })
  .attr('x', getCenterX)
  .attr('y', getCenterY)
  .style('font-size', '20px');


  // Mouseover individual element
  elements.selectAll('rect').on('mouseover', function(element) {

    d3.select(this).transition()
      .style("fill", "#6b6b6e");

    var detail = d3.select('#detail-box');

    detail.select('rect')
      .transition()
      .style('fill', '#6b6b6e');

    detail.selectAll('text')
      .data(element)
      .enter()
      .append('text')
      .attr('x', getCenterX)
      .text(element.symbol);

  }) // Mouseout of individual element
  .on('mouseout', function(element) {

    d3.select(this).transition()
      .style("fill", grey);

    var detail = d3.select('#detail-box');

      detail.select('rect')
        .transition()
        .style('fill', '#FFF');

      detail.selectAll('text')
        .data(element)
        .exit()
        .remove();
  })

});
