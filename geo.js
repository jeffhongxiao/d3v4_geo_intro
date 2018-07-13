// REF: https://bl.ocks.org/mbostock/3757110
// SEE ALSO: http://d3indepth.com/geographic/

var svg = d3.select("svg");

// TODO: change flag to change projection
var useAE = false;
var projection = d3.geoMercator();
if (useAE) {
  var width = +svg.attr("width");
  var height = +svg.attr("height");

  projection = d3
    .geoAzimuthalEquidistant()
    .scale(150)
    // .translate([width / 2, height / 2])
    // .rotate([122.4194, -37.7749])
    .clipAngle(180 - 1e-3)
    .precision(0.1);
}

var path = d3.geoPath().projection(projection);

svg
  .append("path")
  .datum(d3.geoGraticule10())
  .attr("class", "graticule")
  .attr("d", path);

// TODO: change flag to display atlas
var drawAtlas = true;
if (drawAtlas) {
  var url = "https://unpkg.com/world-atlas/world/50m.json";
  d3.json(url, function(error, world) {
    if (error) throw error;

    // draw land, needed for draw country
    svg
    .insert("path", ".graticule")
    .datum(topojson.feature(world, world.objects.land))
    .attr("class", "land")
    .attr("d", path);

    // TODO: change flag to display country
    var drawCountry = true;
    if (drawCountry) {
      svg
        .insert("path", ".graticule")
        .datum(
          topojson.mesh(world, world.objects.countries, function(a, b) {
            return a !== b;
          })
        )
        .attr("class", "boundary")
        .attr("d", path);
    }
  });
}

// TODO: add circle at my city
var circle = d3.geoCircle()
  .center([-95.940116, 36.109668])  // [long, lat]; tool: https://www.latlong.net/
  // .center([28.034088, -26.195246]) // Johannesburg (South Africa)
  .radius(1);
// path(circle());

svg.append("path")
  .attr("fill", "red")
  .attr("d", path(circle()));

