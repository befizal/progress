!function () {

  var fps = 30;
  var speed = 1 / 3; // %/s
  var easeA = EaseInOut(4);
  var easeB = easeOutBounce;

  var progressA = new Progress({
    id : "progress-a"
  , rotation : Progress.CCW
  });

  var progressB = new Progress({
    id : "progress-b"
  , startFrom : Progress.EAST
  , color : Progress.NEG
  , format : format
  , radius : 75
  });

  document.body.appendChild(progressA.el);
  document.body.appendChild(progressB.el);

  function format (x) {
    if (x < 1) {
      x = Math.floor(x * 1e4) / 100;
      return x.toFixed(2) + "<br>" + (
        "<small>Working...</small>"
      );
    } else {
      return "100.00<br>" + (
        "<small>Done!</small>"
      );
    }
  }

  !function loop (t0) {
    var time = +(new Date) - t0;
    var pct = speed / 1000 * time;
    if (pct > 1) pct = 1;
    progressA.refresh(easeA(pct));
    progressB.refresh(easeB(pct));
    if (pct < 1) {
      setTimeout(function () {
        loop(t0);
      }, 1000 / fps);
    } else {
      setTimeout(function () {
        loop(+(new Date));
      }, 2 * 1000);
    }
  }(+(new Date));
}();
