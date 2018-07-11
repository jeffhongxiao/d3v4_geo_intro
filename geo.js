// REF: https://bl.ocks.org/mbostock/3757110
// SEE ALSO: http://d3indepth.com/geographic/

var foo = d3.geoGraticule();
var svg = d3.select("svg");

// TODO: change flag to change projection
var useAE = true;
var projection = d3.geoMercator();
if (useAE) {
  var width = +svg.attr("width");
  var height = +svg.attr("height");

  projection = d3
    .geoAzimuthalEquidistant()
    .scale(150)
    .translate([width / 2, height / 2])
    .rotate([122.4194, -37.7749])
    .clipAngle(180 - 1e-3)
    .precision(0.1);
}

var path = d3.geoPath().projection(projection);

svg
  .append("path")
  .datum(foo()) // was: d3.geoGraticule10()
  .attr("class", "graticule")
  .attr("d", path);

// TODO: change flag to display atlas
var drawAtlas = true;
if (drawAtlas) {
  var url = "https://unpkg.com/world-atlas/world/50m.json";
  d3.json(url, function(error, world) {
    if (error) throw error;

    svg
      .insert("path", ".graticule")
      .datum(topojson.feature(world, world.objects.land))
      .attr("class", "land")
      .attr("d", path);

    svg
      .insert("path", ".graticule")
      .datum(
        topojson.mesh(world, world.objects.countries, function(a, b) {
          return a !== b;
        })
      )
      .attr("class", "boundary")
      .attr("d", path);
  });
}
