export default (el, updateFn, options) => {
  if(!el) throw new Error(`Cannot find element`)
  if(!updateFn) throw new Error(`Must pass updateFn`)
  options = options || {rotateMin: 0, rotateMax: 360, startAngle: 0, tickDegStep: 20}
  const ticks = Array.from(el.getElementsByClassName('tick'))
  const wheel = el.getElementsByClassName('wheel')[0]

  const scrollSpeed = options.scrollSpeed || 10
  const min = options.rotateMin
  const max = options.rotateMax

  let angle = options.startAngle

  // transform compatibility detection
  const transform = (() => {
    for (let prop of ['transform', 'msTransform', 'webkitTransform', 'mozTransform', 'oTransform']) {
      if (typeof document.body.style[prop] !== 'undefined') {
        return prop
      }
    }
  })()

  /* eslint-disable require-jsdoc */
  /* eslint-disable camelcase */
  function scrollRotate(rotateCW) {
    if(rotateCW) {
      angle = (angle + scrollSpeed <= max) ? angle + scrollSpeed : angle
    } else {
      angle = (angle - scrollSpeed >= min) ? angle - scrollSpeed : angle
    }
    return setAngle()
  }

  function setAngle() {
    // rotate knob
    wheel.style[transform] = `rotate(${angle}deg)`

    // quickly reset ticks
    for (let tick of ticks) {
      tick.classList.remove('active')
    }
  
    // add glow to 'active' ticks
    const actives = (Math.round(angle / options.tickDegStep) + 1)
    if(actives.length > 0) {
      console.log(actives)
    }
    for (let tick of ticks.slice(0, actives)) {
      tick.classList.add('active')
    }
  
    let anglePct = angle / max
    updateFn(anglePct)
    // update % value as text
    // curr.innerHTML = `${Math.round(angle/max*100)}%`
  }

  const handler = (e) => scrollRotate(e.wheelDelta > 0)
  el.addEventListener('mousewheel', handler)
  el.addEventListener('DOMMouseScroll', handler)

  return {

  }
}