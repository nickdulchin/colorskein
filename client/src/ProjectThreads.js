import { useState, useEffect} from "react"
var DeltaE = require('delta-e');
var chromatism = require('chromatism');



function ProjectThreads({colors, colorVals, currentUser}){
    const [projectFloss, setProjectFloss] = useState([])
    const [dmc, setDmc] = useState([])

//  console.log(colors)
 
  
    // let color1 = {L: 92.19, A: 9.94, B: 3.63};
    // let color2 = {L: 85.63, A: 19.14, B: 7.33};
    // let color3 = {L: 77.47, A: 26.37, B: 10.58};

    //  console.log(color1, color2 )
    // // 1976 formula

   
    // console.log(DeltaE.getDeltaE76(color1, color2));
    
    // // 1994 formula
    // console.log(DeltaE.getDeltaE94(color1, color2));
    
    // // 2000 formula
    // console.log(DeltaE.getDeltaE00(color1, color2));
    //  console.log(DeltaE.getDeltaE00(color2, color3))

  //  let newColor = chromatism.convert( {r:255, g: 226, b: 226} ).cielab
  //  let colorTwo = chromatism.convert ( { r: 255, g: 201, b: 201}).cielab
  // let newer = {
  //   L: newColor.L, 
  //   A: newColor.a, 
  //   B: newColor.b
  // }
  // let twoNew = {
  //   L: colorTwo.L, 
  //   A: colorTwo.a, 
  //   B: colorTwo.b
  // }
  // console.log(DeltaE.getDeltaE00(newer, twoNew))

  // console.log(newer)
  
 
  // console.log(newColor)

  //  console.log(chromatism.difference(newColor, colorTwo))

  // console.log(newColor.L)
// console.log((`L: ${newColor.L.toFixed(2)} A: ${newColor.a.toFixed(2)} B: ${newColor.b.toFixed(2)}}`), (`{L: ${colorTwo.L.toFixed(2)} A: ${colorTwo.a.toFixed(2)} B: ${colorTwo.b.toFixed(2)}}`))
// console.log(DeltaE.getDeltaE00((`{L: ${newColor.L} A: ${newColor.a} B: ${newColor.b}}`), (`{L: ${colorTwo.L} A: ${colorTwo.a} B: ${colorTwo.b}}`)))

useEffect(() => {
    fetch('/flosses')
      .then(r => {
        if (r.ok) {
          r.json().then(data => setProjectFloss(data))
        }
      })
  }, [])
// hex version
//   for (let i = 0; i < colors.length; i++) {
//     const col = colors[i];
//     if (col === projectFloss.hex)
//     dmc.push(col)
//   }
const compareThreads = projectFloss.map(pf => chromatism.convert(pf.hex).cielab)

const labThreadColors = compareThreads.map(col => {
  return {
    L: col.L,
    A: col.a, 
    B: col.b
  }
})

function getColorConvert(){
  const conv = colors.map(color => {
     return ({
      r: color[0],
       g: color[1],
       b: color[2]
        })
     })

  const convColor = conv.map(pf => chromatism.convert(pf).cielab)

  const labColors = convColor.map(col => {
  return {
    L: col.L,
    A: col.a, 
    B: col.b
  }
})
console.log(labColors)
for (let i = 0; i < labThreadColors.length; i++){
  const col = labThreadColors[i]
  const deltaNum = [(DeltaE.getDeltaE00(labColors[0], labThreadColors[i]))]
  // console.log(labThreadColors)
  const closeEnough = (deltaNum.filter(e => e <= 10))
  console.log(closeEnough)
  
}


// console.log(DeltaE.getDeltaE00(labColors[1], labThreadColors[0]))

}


const dmcColors = projectFloss.map(pf => `${pf.red}, ${pf.green}, ${pf.blue}`)


function showMe(){
  getColorConvert()
      for (let i = 0; i < colorVals.length; i++) {
          const col = colorVals[i];
          if (dmcColors.includes(col)) {
          setDmc(projectFloss.filter(pf => `${pf.red}, ${pf.green}, ${pf.blue}` === col))
          }
          // else {
          //   console.log((dmcRed))
          // }
        
          }
  }



  // function compareColors(){
  //   for (let i = 0; i < colorVals.length; i++){
  //     const col = colorVals[i];
  //     console.log(col)
  //     console.log(labThreadColors)
  //   }
  // }
// need to convert dmc colors to LAB, then turn those into the syntactically correct LAB object
// for each color from image, compare all threads to it and return the closest
// if deltaE val === 0, "perfect match!"

const myThreadCard = dmc.map(d => {
  return (
    <div>
      <img src={d.image}></img>
    </div>
  )
})

return (
    <div>
{myThreadCard}
    <button onClick={showMe}>Show my threads!</button>
</div>
)

}
export default ProjectThreads