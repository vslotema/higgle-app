export function scroll(targett, duration) {
  console.log("target ", targett);
  /* console.log(document.getElementById(targett).getBoundingClientRect());
  const target = document.getElementById(targett);
  var targetPosition = target.getBoundingClientRect().left;
  console.log(`target: ${target} targetpos: ${targetPosition}`);
  var startPosition = window.pageXOffset;
  console.log("start position ", startPosition);
  var distance = targetPosition - startPosition;
  console.log("distance ", distance);
  var startTime = null;

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    // console.log("start time ", startTime);
    var timeElapsed = currentTime - startTime;
    var run = ease(timeElapsed, startPosition, distance, duration);
    //console.log("run ", run);
    window.scrollTo(run, 0);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  function ease(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  }

  requestAnimationFrame(animation);*/
}
