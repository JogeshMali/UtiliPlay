import { View, Text, Image, ScrollView } from 'react-native'
import React, { PropsWithChildren } from 'react'
import { useLocalSearchParams } from 'expo-router'

const PoductDetails = () :JSX.Element=> {
    const {product} = useLocalSearchParams();
    const parseProduct:Product = JSON.parse(product as string)
  return (
     
    <ScrollView className='flex-1 px-5 mt-3'>
        <View>
        <Image 
        className='w-96 h-96'
        resizeMode='contain'
        source={{uri:parseProduct.imageUrl}}/>
        </View>
        <View className='mt-4'>
            <Text className='mt-3 text-lg font-bold mb-2'>{parseProduct.name}</Text>
         <View className='flex-row mb-2 '>
            <View>
                <Text className='bg-green-600 px-2 text-sm text-white  rounded-md justify-center '>{parseProduct.rating}★</Text>
            </View>
            <View>
                <Text className='text-sm ml-2 text-gray-400'>{parseProduct.ratingCount} ratings</Text>
            </View>
         </View>
         <View className='flex-row mb-2 mt-2 bg-green-200 pt-6 pb-4 pl-4'>
         <View>
                <Text className='text-base text-green-500 font-bold ml-1'>%{parseProduct.offerPercentage} off</Text>
            </View>
            <View>
                <Text className='text-base text-gray-600 line-through ml-2 mr-1'>₹{parseProduct.originalPrice}</Text>
            </View>
            <View>
                <Text className='text-base font-bold ml-2'>₹{parseProduct.discountPrice}</Text>
            </View>
            
         </View>
           {parseProduct.tags.map((tag,index)=>(
                <View key={index} className='m-1 flex-wrap '>
                    <Text className='py-1 px-2 border rounded-md '>{tag}</Text>
                </View>
            ))}
         </View>
    </ScrollView>
  )
}

export default PoductDetails