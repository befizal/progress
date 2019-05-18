// https://gist.github.com/gre/1650294#gistcomment-1806616
// https://github.com/AndrewRayCode/easing-utils
// t must be in [0-1]

function EaseIn (power) {
  return function (t) {
    return Math.pow(t, power);
  }
}

function EaseOut (power) {
  return function (t) {
    return 1 - Math.abs(Math.pow(t - 1, power));
  }
}

function EaseInOut (power) {
  return function (t) {
    if (t < .5) {
      return EaseIn(power)(t * 2) / 2;
    } else {
      return EaseOut(power)(t * 2 - 1) / 2 + 0.5;
    }
  }
}

function easeOutBounce (t) {
  var scaledTime = t / 1;
  if (scaledTime < (1 / 2.75)) {
    return 7.5625 * scaledTime * scaledTime;
  } else if (scaledTime < (2 / 2.75)) {
    var scaledTime2 = scaledTime - (1.5 / 2.75);
    return (7.5625 * scaledTime2 * scaledTime2) + 0.75;
  } else if (scaledTime < (2.5 / 2.75)) {
    var scaledTime2 = scaledTime - (2.25 / 2.75);
    return (7.5625 * scaledTime2 * scaledTime2) + 0.9375;
  } else {
    var scaledTime2 = scaledTime - (2.625 / 2.75);
    return (7.5625 * scaledTime2 * scaledTime2) + 0.984375;
  }
}
