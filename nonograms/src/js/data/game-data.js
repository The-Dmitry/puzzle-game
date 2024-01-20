



const chicken = {
  mode: 5,
  field: [
    [false, true, false, false, false],
    [true, true, false, true, true],
    [false, true,true,true, false],
    [false, true,true,true, false],
    [false, false,true,false, false],
  ]
}

const dog = {
  mode: 5,
  field: [
    [false, false, false, true, true, ],
    [true, false, false, true, true],
    [true, true,true,true, false],
    [false, true,false,true, false],
    [false, true,false,true, false],
  ]
}

const gameData = [chicken, dog]

export default gameData