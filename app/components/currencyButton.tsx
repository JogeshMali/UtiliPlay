import React, { PropsWithChildren } from 'react'
import { View ,Text} from 'react-native'

type CurrencyProps = PropsWithChildren<{  
    name:string,
    flag:string
}>
const CurrencyButton=(props:CurrencyProps):JSX.Element =>{
  return (
    <View className='flex-1 justify-center items-center '>
      <Text  className='text-2xl'>{props.flag}</Text>
      <Text className='text-sm'>{props.name}</Text>        
    </View>
  )
}

export default CurrencyButton