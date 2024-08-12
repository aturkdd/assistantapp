'use client'
import './index.css'
export const ImageTextComp =({data}) => {
    console.log(data.type)
const direction =  data.type === "photo_right_text"?"row":"row-reverse"
console.log(direction) 
return (
        <div  className='comp-container' style={{flexDirection : direction}}>
            <p > {data.text}</p>
         <img  src={data.imagSRC}/>
        </div>
    )
}