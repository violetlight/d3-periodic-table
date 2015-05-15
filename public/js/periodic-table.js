var svg = d3.select('.chart');

// table formatting
var square = $(document).width()/22;
var bigSquare = square*3
var border = 10;
var half = (square/2);
var offset = 35;
var extendedOffset = offset+square;

function getX(d, i) {
  return ((d.column-1) * (square+border))+offset;
}

function getY(d, i) {
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

svg.attr('width', function() {
  return $(document).width();
}).attr('height', function() {
  return $(document).height();
});

svg.append('rect')
  .attr('width', bigSquare)
  .attr('height', bigSquare)
  .attr('x', function() {
    return ((square+border)*2)+(offset*2);
  })
  .attr('y', function() {
    return offset+border;
  })
  .attr('fill', '#EDECEB');

d3.json('/data/periodic-table.json', function(error, data){
  if (error) return console.warn(error);

  var elements = svg.selectAll('g').data(data)
                  .enter().append('g')
                  .attr('id', function(d) {
                    return d.name;
                  });

  // draw box
  elements.data(data)
  .append('rect')
  .attr('width', square)
  .attr('height', square)
  .attr('x', getX)
  .attr('y', getY)
  .attr('fill', '#EDECEB');

  // Write symbol
  elements.data(data)
  .append('text')
  .text(function(d, i){
    return d.symbol;
  })
  .attr('x', getCenterX)
  .attr('y', getCenterY)
  .style('font-size', '20px');


});
