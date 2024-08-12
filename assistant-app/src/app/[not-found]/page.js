'use client'
import { useEffect } from "react"
import { useTranslation } from "react-i18next"
const page = () =>{
   const style ={
    textAlign: 'center',
    fontSize: '2rem',
    padding: '2%',
    margin: '10%'
   }
   useEffect(()=>{
    console.log('not found')
   })
   const {t} = useTranslation()
   return  (
       <div style={style}>
           <h1>{t('notFound')}</h1>
       </div>
   )
}
export default page