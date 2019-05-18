!function () {

  var
    CW = 0 // clockwise
  , CCW = 1 // counterclockwise
  , POS = 0 // positive
  , NEG = 1 // negative
  , N = 0 // north
  , E = 1 // east
  , S = 2 // south
  , W = 3 // west
  ;

  var
    btw = "border-top-width"
  , brw = "border-right-width"
  , bbw = "border-bottom-width"
  , blw = "border-left-width"
  , div = document.createElement("div")
  , styles = [blw, bbw, btw, blw, brw, btw, bbw, brw]
  , ghostGif = "data:image/gif;base64,"
  + "R0lGODlhAQABAIAAAAAAAP///yH5"
  + "BAEAAAAALAAAAAABAAEAAAIBRAA7"
  ;

  function format (x) {
    return Math.floor(x * 100) + "%";
  }

  function makeEl (id) {
    return div.innerHTML = makeHtml(id), (
      div.removeChild(div.firstChild)
    );
  }

  function makeHtml (id) {
    return ""
    + "<div id=\"" + id + "\" class=\"progress\">"
    +   "<div></div><div></div><div></div><div></div>"
    +   "<span></span><img src=\"\" alt=\"\">"
    + "</div>"
    ;
  }

  function width (r, i, tan, head) {
    if (i < head) {
      return r * (1 - i % 2);
    } else if (i > head) {
      return r * (i % 2);
    } else if (i % 2) {
      return r * (1 - tan);
    } else {
      return r * tan;
    }
  }

  this.Progress = function (config) {
    if (!config) config = {};
    var el = this.el = makeEl(config.id || "");
    var children = el.getElementsByTagName("div");
    this.mask = el.getElementsByTagName("img")[0];
    this.span = el.getElementsByTagName("span")[0];
    this.color = config.color || POS;
    this.radius = config.radius || 50;
    this.start = config.startFrom || N;
    this.rotation = config.rotation || CW;
    this.format = config.format || format;
    this.mask.src = config.mask || ghostGif;
    el.style.width = this.radius * 2 + "px";
    el.style.height = this.radius * 2 + "px";
    el.style.lineHeight = this.radius * 2 + "px";
    for (var i = 0; i < children.length; i++) {
      var color = this.color === POS ? "pos" : "neg";
      var classAttr = children[i].getAttribute("class") || "";
      classAttr += " progress-" + i + " progress-" + i + "-" + color;
      children[i].style.borderWidth = this.radius + "px";
      children[i].setAttribute("class", classAttr);
      this[i] = children[i];
    }
  };

  Progress.prototype.refresh = function (pct) {
    this.span.innerHTML = this.format(pct);
    if (this.rotation === CCW) pct = 1 - pct;
    var head = Math.floor(pct / 0.125);
    var deg = (pct * 360) % 45;
    var rad = deg * Math.PI / 180;
    var tan = Math.tan(rad);
    for (var i = 0; i < 8; i++) {
      var iReal = (i + 2 * this.start) % 8;
      this[Math.floor(iReal / 2)].style[styles[iReal]] = (
        width(this.radius, i, tan, head) + "px"
      );
    }
  };

  Progress.CW = CW;
  Progress.CCW = CCW;
  Progress.POS = POS;
  Progress.NEG = NEG;
  Progress.N = Progress.NORTH = N;
  Progress.E = Progress.EAST = E;
  Progress.S = Progress.SOUTH = S;
  Progress.W = Progress.WEST = W;
}();
