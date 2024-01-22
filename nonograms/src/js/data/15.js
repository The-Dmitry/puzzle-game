const bee = [
  [true, true, true, false, true,true, false, false, true, true,true, true, false, false, false,],
  [false, false, true, false, false,true, false, true, true, false,false, true, true, true, true,],
  [false, false, true, false, false,true, false, true, false, false,true, true, false, false, true,],
  [false, true, true, true, true,true, false, true, false, true,true, false, false, false, true,],
  [true, false, false, false, true,true, true, true, false, true,false, false, false, false, true,],

  [true, true, false, true, false,false, true, true, false, true,false, false, false, true, true,],
  [true, false, false, false, false   ,true, true, true, true, true,    false, true, true, true, false,],
  [true, true, false, false, true,true, false, false, true, true,true, true, false, false, false,],
  [false, true, true, true, true,true, true, false, false, true,true, true, true, false, false,],
  [false, false, false, false, false,false, true, true, true, true,false, false, true, true, true,],

  [true, false, false, true, true,true, true, true, false, false,false, true, true, true, true,],
  [true, true, false, true, false,true, false, true, false, true,true, true, true, false, true,],
  [true, true, false, true, false,true, false, true, true, true,true, true, false, false, true,],
  [true, true, true, false, false,false, false, false, true, true,true, false, true, true, true,],
  [true, true, true, true, true,true, true, true, true, true,true, true, true, true, true,],
];


const cat = [
  [false, true, false, false, false,      false, false, false, false, true,        false, false, true, true, true,],
  [false, true, true, false, false,      false, false, false, true, true,        false, false, false, false, true,],
  [false, true, true, true, true,      true, true, true, true, true,        false, false, false, true, true,],
  [true, true, true, true, true,      true, true, true, true, true,        true, false, false, true, false,],
  [false, true, false, true, true,      false, true, true, false, true,        false, false, false, true, false,],

  
  [true, true, true, true, false,      true, false, true, true, true,        true, false, true, true, false,],
  [false, true, true, true, true,      true, true, true, true, true,        false, false, true, false, false,],
  [false, false, true, true, true,      true, true, true, true, false,        false, false, true, true, false,],
  [false, false, false, false, true,      true, true, true, false, false,        false, false, false, true, false,],
  [false, false, false, true, true,      true, true, true, true, false,        false, false, false, true, false,],


  [false, false, false, true, true,      true, true, true, true, false,        false, false, true, true, false,],
  [false, false, true, true, true,      true, true, true, true, true,        false, true, true, false, false,],
  [false, false, true, true, true,      true, true, true, true, true,        true, true, false, false, false,],
  [false, false, true, true, true,      true, true, true, true, true,        true, false, false, false, false,],
  [false, true, true, true, true,      true, true, true, true, true,        true, true, false, false, false,],
  
];

const camera = [
  [false, false, false, false, true,      true, true, true, true, true,        true, false, false, false, false,],
  [false, false, false, false, true,      false, false, false, false, false,        true, false, false, false, false,],
  [false, false, false, false, true,      false, false, false, false, false,        true, false, false, false, false,],
  [false, false, false, false, true,      true, true, true, true, true,        true, false, false, false, false,],
  [false, true, true, false, false,      false, true, true, true, false,        false, true, true, true, false,],

  
  [true, true, true, true, true,      true, true, true, true, true,        true, true, true, true, true,],
  [true, false, false, false, false,      true, true, true, true, true,        false, false, false, false, true,],
  [true, false, false, false, true,      true, false, false, false, true,        true, false, false, false, true,],
  [true, true, true, true, true,      false, true, true, true, false,        true, true, true, true, true,],
  [true, true, false, true, false,      true, true, false, true, true,        false, true, true, true, true,],


  [true, true, false, true, false,      true, false, true, true, true,        false, true, true, true, true,],
  [true, true, false, true, false,      true, false, true, true, true,        false, true, true, true, true,],
  [true, true, false, true, true,      false, true, true, true, false,        true, true, true, true, true,],
  [true, true, true, true, true,      true, false, false, false, true,        true, true, true, true, true,],
  [false, false, false, false, false,      true, true, true, true, true,        false, false, false, false, false,],
  
];


const bike = [
  [false, false, false, false, false,      false, false, true, true, true,        false, false, false, false, false,],
  [false, false, false, false, false,      false, false, true, false, true,        true, true, true, false, false,],
  [false, false, false, false, false,      false, false, false, false, false,        true, false, true, true, false,],
  [false, false, false, false, false,      false, false, false, false, false,        true, false, false, true, false,],
  [false, false, false, true, true,      true, true, false, false, false,        true, false, false, false, false,],

  
  [false, false, false, true, true,      true, false, false, false, false,        true, false, false, false, false,],
  [false, false, false, false, true,      true, true, true, true, true,        true, true, false, false, false,],
  [false, true, true, true, true,      true, false, false, false, true,        true, true, true, true, false,],
  [true, true, false, false, true,      true, true, false, true, true,        false, true, false, true, true,],
  [true, false, false, true, true,      false, true, false, true, false,        false, true, false, false, true,],


  [true, false, true, true, false,      false, true, true, true, false,        false, true, true, false, true,],
  [true, false, true, true, false,      false, true, true, true, false,        false, true, false, false, true,],
  [true, true, false, false, false,      true, true, false, true, true,        false, false, false, true, true,],
  [true, true, true, true, true,      true, true, true, true, true,        true, true, true, true, true,],
  [true, true, true, true, true,      true, true, true, true, true,        true, true, true, true, true,],
  
];


const scales = [
  [false, false, false, false, false,      false, true, true, true, false,        false, false, false, false, false,],
  [false, false, false, false, false,      false, true, false, true, false,        false, false, false, false, false,],
  [false, false, false, false, false,      false, true, true, true, false,        false, false, false, false, false,],
  [true, true, false, false, false,      false, false, true, false, false,        false, false, false, true, true,],
  [false, true, true, true, true,      true, true, true, true, true,        true, true, true, true, false,],

  
  [false, false, true, false, false,      false, false, true, false, false,        false, false, true, false, false,],
  [false, false, true, false, false,      false, false, true, false, false,        false, false, true, false, false,],
  [false, true, true, true, false,      false, false, true, false, false,        false, true, true, true, false,],
  [false, true, false, true, false,      false, false, true, false, false,        false, true, false, true, false,],
  [false, true, false, true, false,      false, false, true, false, false,        false, true, false, true, false,],


  [true, true, true, true, true,      false, false, true, false, false,        true, true, true, true, true,],
  [true, true, true, true, true,      false, true, true, true, false,        true, false, false, false, true,],
  [false, true, true, true, false,      false, true, false, true, false,        false, true, true, true, false,],
  [false, false, false, false, false,      true, true, true, true, true,        false, false, false, false, false,],
  [false, false, false, false, true,      true, true, true, true, true,        true, false, false, false, false,],
  
];

const fifteen = {
  bee, cat, camera, bike, scales
}

export default fifteen