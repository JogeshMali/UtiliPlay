import { View, Text, FlatList, Pressable } from 'react-native'
import React from 'react'
import { PRODUCTS_LIST } from '../constant/product_list'
import { useRouter } from 'expo-router'
import ProductItem from '../components/productItem'
import ItemSeperator from '../components/itemSeperator'

export default function Product() {
  const route = useRouter()
  return (
    <View className='flex-1 justify-center items-start p-2'>
      <FlatList
       data={PRODUCTS_LIST}
       renderItem={({item})=>(
        <Pressable 
          onPress={()=>
            route.push({
              
              pathname:'/screens/productDetails',
              params:{product:JSON.stringify(item)}
            })}
          >
          <ProductItem product={item}/>
         </Pressable> 
       )}
       ItemSeparatorComponent={ItemSeperator}
       keyExtractor={item => item.id}
      />
    </View>
  )
}