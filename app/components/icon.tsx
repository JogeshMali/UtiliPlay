import { View, Text } from 'react-native'
import React, { PropsWithChildren } from 'react'
import { FontAwesome } from '@expo/vector-icons'

type IconProf =  PropsWithChildren<{
  name:string
}>
const Icon = ({name}:IconProf):JSX.Element => {
  {
    switch(name){
    case 'cross': 
        return <FontAwesome name='times' size={38} color='#F7CD2E'/>
        break;
    case 'circle': 
        return <FontAwesome name='circle-thin' size={38} color='#38CC77'/>
        break;
    default:
      return <FontAwesome name="pencil" size={38} color="#fff" />
    }
  }
}

export default Icon