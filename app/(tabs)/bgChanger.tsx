import { View, Text, TouchableOpacity, Pressable } from 'react-native'
import React, { useState } from 'react'

export default function bgChanger() {
  const [changebackground,setChangebackground]  = useState("#000")
  const changeBg =()=>{
    let color = '#'
    for (let i = 0; i < 6; i++) {
        color+= (Math.floor(Math.random()*16)).toString(16)
        
    }
    setChangebackground(color)
  }
  return (
    <View className=' flex-1 justify-center items-center' style={{backgroundColor:changebackground}}>
        <TouchableOpacity 
        className='px-5 py-3  border-white rounded-md elevation-md'
        onPress={changeBg}
        style={{backgroundColor:changebackground}}>
        
        <Text  className='text-white text-xl'>Change </Text>
        </TouchableOpacity>
    </View>
  )
}