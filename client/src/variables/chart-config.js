const Chartist = require("chartist");
const delays = 80;
const durations = 500;

const animation = {
  draw: function(data) {
    if (data.type === "line" || data.type === "area") {
      data.element.animate({
        d: {
          begin: 600,
          dur: 700,
          from: data.path
            .clone()
            .scale(1, 0)
            .translate(0, data.chartRect.height())
            .stringify(),
          to: data.path.clone().stringify(),
          easing: Chartist.Svg.Easing.easeOutQuint
        }
      });
    } else if (data.type === "point") {
      data.element.animate({
        opacity: {
          begin: (data.index + 1) * delays,
          dur: durations,
          from: 0,
          to: 1,
          easing: "ease"
        }
      });
    }
  }
};

const options = {
  lineSmooth: Chartist.Interpolation.cardinal({
    tension: 0
  }),
  low: 0,
  high: 1000,
  chartPadding: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }
};

module.exports = {
  animation,
  options
};
