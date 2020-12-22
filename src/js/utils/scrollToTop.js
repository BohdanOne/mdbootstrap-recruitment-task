export default function scrollToTop(duration) {
  const position = window.pageYOffset;
  const distance = 0 - position;
  let startTime = null;

  function animation(currentTime) {
    if (startTime === null) {
      startTime = currentTime;
    }

    const elapsedTime = currentTime - startTime;

    window.scrollTo(0, ease(elapsedTime, position, distance, duration));

    if (elapsedTime < duration) {
      requestAnimationFrame(animation);
    }
  }
  requestAnimationFrame(animation);

  function ease(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  }
}
