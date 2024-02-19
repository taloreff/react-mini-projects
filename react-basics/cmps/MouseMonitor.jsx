const { useState, useEffect } = React;

export function MouseMonitor() {
  const [isOn, setIsOn] = useState(true)
  const [pos, setPos] = useState({
    x: 0,
    y: 0,
  })

  useEffect(() => {
    if (isOn) addMouseListener()

    return () => {
      removeMouseListener()
      if (isOn) {
        console.log('removed mouse event')
      }
    }
  }, [isOn])

  function updatePos({
    clientX: x,
    clientY: y
  }) {
    setPos({ x, y })
  }

  function addMouseListener() {
    document.addEventListener('mousemove', updatePos)
  }

  function removeMouseListener() {
    document.removeEventListener('mousemove', updatePos)
  }

  function handleClick() {
    setIsOn(prevIsOn => !prevIsOn)
  }

  return (
    <div className="mouse-monitor">
      <h3 className="component-title">Mouse Monitor</h3>
      <div className="inner-border">
        {isOn ? `x: ${pos.x}, y: ${pos.y}` : <p>Resume to track your mouse...</p>}
      </div>
      <button onClick={handleClick}>{isOn ? 'Pause' : 'Resume'}</button>
    </div>
  )
}
