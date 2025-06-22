import { Stack } from "expo-router";
import './global.css'
import { useState } from "react";
import Appwrite from "./appwrite/service";
export default function RootLayout() {
  
  return     <Stack
  screenOptions={{headerShown:false}} >
      
     
      
      <Stack.Screen 
      name="screens/productDetails"
      options={{title:'Product details',headerShown:true}}/> 
    </Stack>
     
}