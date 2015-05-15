var svg = d3.select('.chart');

// table formatting
var square = $(document).width()/22;
var border = 10;
var offset = 35;
var extendedOffset = offset*square

svg.attr('width', function() {
  return $(document).width();
}).attr('height', function() {
  return $(document).height();
});

d3.json('/data/periodic-table.json', function(error, data){
  if (error) return console.warn(error);

  var elements = svg.selectAll('g').data(data)
                  .enter().append('g')
                  .attr('id', function(d) {
                    return d.name;
                  });

  // draw "box"
  elements.data(data)
  .append('rect')
  .attr('width', square)
  .attr('height', square)
  .attr('x', function(d, i) {
    return ((d.column-1) * (square+border))+offset;
  })
  .attr('y', function(d, i) {
    if (d.row > 7){
      return ((d.row-1) * (square+border))+extendedOffset;
    }
    return ((d.row-1) * (square+border))+offset;
  })
  .attr('fill', '#EDECEB');

  // Write symbol
  elements.data(data)
  .append('text')
  .attr('x', function(d, i) {
    return ((d.column-1) * (square+border))+offset;
  })
  .attr('y', function(d, i) {
    if (d.row > 7){
      return ((d.row-1) * (square+border))+extendedOffset;
    }
    return ((d.row-1) * (square+border))+offset;
  })
  .text('H');

});
