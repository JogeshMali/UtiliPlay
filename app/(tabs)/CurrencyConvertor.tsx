import { View, Text,TextInput, FlatList, Pressable, StyleSheet  } from 'react-native'
import React, { useState } from 'react'
import { currencyByRupee } from '../constant/currencyByRupee'
import CurrencyButton from '../components/currencyButton'
import Snackbar from 'react-native-snackbar'


export default function CurrencyConvertor() {
    const [inputValue,setInputValue]= useState('')
    const [targetCurrency,setTargetCurrency]= useState('')
    const [resultValue,setResultValue]= useState('')

    const convertCurrency = (targetValue:Currency)=>{
       if(!inputValue){
       setResultValue('Enter amount to convert')
       return
      }
      const inputAmount =  parseFloat(inputValue)
      if(!isNaN(inputAmount)){
        const convertedAmount = inputAmount * targetValue.value;
        const result = `${targetValue.symbol} ${convertedAmount.toFixed(2)}`
        setResultValue(result)
        setTargetCurrency(targetValue.name)

      }else{
        setResultValue('Enter a valid number to convert')
        return
        // return Snackbar.show({
        //   text:'Enter a valid number to convert',
        //   backgroundColor:"#F4BE2C",
        //   textColor:"#000000"
        // })
      }
    }
  return (
    
    <View className='flex-1 p-4 bg-black'>
      <View className='flex-1  items-center justify-evenly'>
        <View className='flex-row items-center mt-5 '>
            <Text className='text-2xl mr-2 text-white'>₹</Text>
            <TextInput 
              value={inputValue}
              onChangeText={setInputValue}
              maxLength={14}
              keyboardType='number-pad'
              placeholder='Enter amount to convert'
              placeholderTextColor={"#fff"}
              className="p-2 text-sm text-white border rounded-md border-white w-64"
              />
        </View>
        {resultValue && (
          <View>
            <Text className='text-2xl font-bold text-white mt-5'>{resultValue}</Text>
          </View>
        )}
        <View className='flex-3 mt-5 '>
          <FlatList
            data={currencyByRupee}
            numColumns={3}
            keyExtractor={item => item.name}
            renderItem={({item})=>(
              <Pressable className=' mr-2 mb-3 min-w-28 bg-white elevation-md rounded-xl border h-16 px-3 py-3 '
              style={targetCurrency === item.name  && style.selected} 
              onPress={()=>convertCurrency (item)}>
              <CurrencyButton {...item}/>
              </Pressable>
            )}
            />
        </View>
      </View>
    </View>
    
  )
}
const style = StyleSheet.create({
  selected: {
    backgroundColor: '#ffeaa7',
  },
})