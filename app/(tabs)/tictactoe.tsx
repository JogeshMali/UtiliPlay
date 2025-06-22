import { View, Text, SafeAreaView, StatusBar,FlatList, Pressable  } from 'react-native'
import React, { useState } from 'react'
import { PaperProvider, Snackbar } from 'react-native-paper';

import Icon from '../components/icon';

export default function tictactoe() {

  const [isCross,setIsCross] = useState<boolean>(true);
  const [gameWinner,setGameWinner]=useState<string>('');
  const [gameState,setGameState]= useState(new Array(9).fill('empty',0,9))
  

  const reload=()=>{
    setIsCross(true)
    setGameState(new Array(9).fill('empty',0,9))
    setGameWinner('')
  }
  const checkWinner = ()=>{
    if (
      gameState[0] === gameState[1] &&
      gameState[1] === gameState[2] &&
      gameState[0] !== 'empty'
    ) {
      setGameWinner(`${gameState[0]} won the game! 🥳`);
    }else if (
      gameState[3] === gameState[4] &&
      gameState[3] === gameState[5] &&
      gameState[3] !== 'empty'
    ) {
      setGameWinner(`${gameState[3]} won the game! 🥳`);
    }else if (
      gameState[6] !== 'empty' &&
      gameState[6] === gameState[7] &&
      gameState[7] === gameState[8]
    ) {
      setGameWinner(`${gameState[6]} won the game! 🥳`);
    } else if (
      gameState[0] !== 'empty' &&
      gameState[0] === gameState[3] &&
      gameState[3] === gameState[6]
    ) {
      setGameWinner(`${gameState[0]} won the game! 🥳`);
    } else if (
      gameState[1] !== 'empty' &&
      gameState[1] === gameState[4] &&
      gameState[4] === gameState[7]
    ) {
      setGameWinner(`${gameState[1]} won the game! 🥳`);
    } else if (
      gameState[2] !== 'empty' &&
      gameState[2] === gameState[5] &&
      gameState[5] === gameState[8]
    ) {
      setGameWinner(`${gameState[2]} won the game! 🥳`);
    } else if (
      gameState[0] !== 'empty' &&
      gameState[0] === gameState[4] &&
      gameState[4] === gameState[8]
    ) {
      setGameWinner(`${gameState[0]} won the game! 🥳`);
    } else if (
      gameState[2] !== 'empty' &&
      gameState[2] === gameState[4] &&
      gameState[4] === gameState[6]
    ) {
      setGameWinner(`${gameState[2]} won the game! 🥳`);
    } else if (!gameState.includes('empty', 0)) {
      setGameWinner('Draw game... ⌛️');
    }
  }

  const changeItem = (itemNumber:number)=>{
   if(gameWinner){
    return(
      <PaperProvider>
        <Snackbar 
        visible={true}
        onDismiss={()=>{}}
        style={ {backgroundColor:"#000"} }
        theme={{colors:{onSurface:"#fff"}}}
        > 
          gameWinner
        </Snackbar>
      </PaperProvider>
    )
   }
   if(gameState[itemNumber]==='empty' ){
      gameState[itemNumber] = isCross ? 'cross': 'circle'
      setIsCross(!isCross)   
   } else{
    return(
      <PaperProvider>
        <Snackbar 
        visible={true}
        onDismiss={()=>{}}
        style={ {backgroundColor:"red"} }
        theme={{colors:{onSurface:"#fff"}}}
        > 
          Position is already filled
        </Snackbar>
      </PaperProvider>
    )
   }
   checkWinner()
  }
  return (
    <SafeAreaView className=' flex-1 bg-black'>
      <StatusBar/>
      {gameWinner ?(
        <View className='flex-row h-14 mt-3 mx-4 justify-center items-center rounded-lg bg-[#38CC77]'>
          <Text>{gameWinner}</Text>
        </View>
      ):(
        <View className='flex-row h-14  mt-3 mx-4 justify-center items-center rounded-lg ' style={{backgroundColor:isCross?'#38CC77':'#F7CD2E'}}>
          <Text> Player {isCross? 'X' : 'O'}'s Turn</Text>
        </View>
      )}
      <View className='  mt-6 justify-center items-center mx-3'>
        <FlatList
        numColumns={3}
        data={gameState}
        renderItem={({item,index})=>(
          <Pressable
           className='p-3 w-1/3 h-28 border border-[#333] items-center justify-center '
           onPress={()=>changeItem(index)}
           key={index}
           >
          <Icon name={item}/>
          </Pressable>
        )}
        />
        </View>
       <Pressable
       onPress={reload} 
        className='flex-row h-14 mt-5 mx-4 justify-center items-center rounded-lg' style={{backgroundColor:'#8D3DAF'}}>

        <Text className='text-white text-lg font-medium'>{gameWinner?'Start a new Game ':'Reload a Game'}</Text>
       </Pressable>
    </SafeAreaView>
  )
}