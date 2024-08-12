'use client'
export const ImageComp =({data,size}) => {
const imageSize = size ? `${size}%` : "50%"  
    return (
        <div style={{alignItems: "center",  padding :"20px", display:"flex", flexDirection:"row", justifyContent:"space-around"}} >
         <img style ={{height: "auto", flexShrink: "0", width : imageSize,height: imageSize , margin : "1%"}} src={data}/>
        </div>
    )
}