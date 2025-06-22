import { View, Text, Image } from 'react-native'
import React, { PropsWithChildren } from 'react'
type ProductProf = PropsWithChildren<{
    product:Product
}>;
const ProductItem = ({product}:ProductProf) :JSX.Element=> {

  return (
    <View className=' flex-row m-2 '>
        <Image 
         className='w-24 h-40'
         resizeMode='contain'
         source={{uri:product.imageUrl}} />
         <View className='ml-2'>
            <Text className='mt-3 text-base font-bold mb-2'>{product.name}</Text>
         <View className='flex-row mb-2'>
            <View>
                <Text className='bg-green-500 px-2 text-sm text-white  rounded-md justify-center '>{product.rating}★</Text>
            </View>
            <View>
                <Text className='text-sm ml-2 text-gray-400'>({product.ratingCount})</Text>
            </View>
         </View>
         <View className='flex-row mb-2'>
            <View>
                <Text className='text-base text-gray-600 line-through mr-1'>₹{product.originalPrice}</Text>
            </View>
            <View>
                <Text className='text-base font-bold '>₹{product.discountPrice}</Text>
            </View>
            <View>
                <Text className='text-base text-green-500 font-bold ml-1'>%{product.offerPercentage}off</Text>
            </View>
         </View>
         </View>

    </View>
  )
}

export default ProductItem