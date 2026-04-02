export function generateLayout(cards, width) {

  const columns = 4
  const gap = 12

  const cell = (width - gap*(columns-1)) / columns

  let cursorX = 0
  let cursorY = 0

  return cards.map((card,i)=>{

    const w = (i % 3 === 0) ? 2 : 1
    const h = (i % 5 === 0) ? 2 : 1

    const x = cursorX * (cell + gap)
    const y = cursorY * (cell + gap)

    cursorX += w

    if(cursorX >= columns){
      cursorX = 0
      cursorY++
    }

    return {
      ...card,
      x,
      y,
      width: cell*w + gap*(w-1),
      height: cell*h + gap*(h-1)
    }

  })

}