'use client'
export const TextComp =({data}) => {
    console.log(data)
    return (
        <div >
            {(data.type=== "text")? (<p style={{paddingLeft :"1%"}}> {data.text}</p>): (<h2 style={{fontSize: "1.3rem",paddingLeft :"1%"}}>{data.text}:</h2>)}
         
        </div>
    )
}