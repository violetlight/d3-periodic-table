var svg = d3.select('.chart');

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
      .attr('width', '90')
      .attr('height', '90')
      .attr('x', function(d, i) {
        return d.column * 100;
      })
      .attr('y', function(d, i) {
        return d.row * 100;
      })
      .attr('fill', '#FFF000')
      .attr('fill-opacity', 1)
      .text(function(d){ return d.name });
});
