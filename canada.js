var width = 960,
    height = 960;

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

var projection = d3.geoMercator()
    // .scale(1500)
    .translate([width / 2, height / 2]);
var path = d3.geoPath().projection(projection);

console.log(projection.scale());

d3.json("./data/canada.json", function(error, canada) {
    if (error) return console.error(error);

    svg.append("path")
        .datum(topojson.feature(canada, canada.objects.subunits))
        .attr("d", path);
});