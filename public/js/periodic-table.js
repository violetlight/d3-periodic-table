var svg = d3.select('.chart');

// table formatting
var square = $(document).width()/22;
var border = 10;
var leftOffset = 35;
var topOffset = 35;

svg.attr('width', function() {
  return $(document).width();
}).attr('height', function() {
  return $(document).height();
});

d3.json('/data/periodic-table.json', function(error, data){
  if (error) return console.warn(error);

  svg.selectAll('rect')
      .data(data)
    .enter().append('rect')
      .attr('width', square)
      .attr('height', square)
      .attr('x', function(d, i) {
        return ((d.column-1) * (square+border))+leftOffset;
      })
      .attr('y', function(d, i) {
        if (d.row > 7){
          return ((d.row-1) * (square+border))+topOffset+square;
        }
        return ((d.row-1) * (square+border))+topOffset;
      })
      .attr('fill', '#FFA855')
});
