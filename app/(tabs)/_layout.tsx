import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import React from 'react'

export default function _layout() {
  return (
    <Tabs 
      screenOptions={{
        headerShown:false,
        tabBarActiveTintColor:"green",
        tabBarInactiveTintColor:"gray",
        tabBarStyle:{
            backgroundColor:"#1A1A1A",
            borderRadius:50,
            padding:5,    
            borderTopWidth:0,
            position:"absolute",
            marginBottom:10,
            marginHorizontal:5
        }
        }}>

        <Tabs.Screen 
          name='product'
          options={{title:'Trending Products', 
                    headerShown:true,
          tabBarIcon:({color})=> <FontAwesome  name='shopping-cart' size={20} color={color} />} }/>
        <Tabs.Screen 
          name='index'
          options={{title:'Pass Gen', 
          tabBarIcon:({color})=> <Ionicons  name='key' size={20} color={color} />} }/>

        <Tabs.Screen 
          name='bgChanger'
          options={{title:'BgChanger', 
          tabBarIcon:({color})=> <Ionicons  name='brush' size={20} color={color} />} }/>
       
        <Tabs.Screen 
          name='CurrencyConvertor'
          options={{title:'Currency Convertor', 
          tabBarIcon:({color})=> <FontAwesome  name='money' size={20} color={color} />} }/>

        <Tabs.Screen 
          name='tictactoe'
          options={{title:'Tic Tac Toe', 
          tabBarIcon:({color})=> <FontAwesome  name='gamepad' size={20} color={color} />} }/>
    </Tabs>
  )
}
