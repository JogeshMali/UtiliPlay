import { View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Formik } from 'formik';
import * as Yup from 'yup';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const passwordSchema = Yup.object().shape({
  passwordLength: Yup.number()
    .min(4, 'Should be min of 4 characters')
    .max(16, 'Should be max of 16 characters')
    .required('Length is required')
})
export default function PasswordGenerator() {
  const [password, setPassword] = useState('')
  const [lowercase, setLowerCase] = useState(true)
  const [upercase, setUperCase] = useState(false)
  const [number, setNumber] = useState(false)
  const [symbols, setSymbols] = useState(false)
  const [isPassword, setIsPassword] = useState(false)

  const generatePssword = (passwordLength: number) => {
    let characterList = ''
    const upperCaseList = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const lowerCaseList = 'abcdefghijklmnopqrstuvwxyz'
    const numberList = '0123456789'
    const symbolsList = '!@#$%&*-+^'
    if (upercase) characterList += upperCaseList
    if (lowercase) characterList += lowerCaseList
    if (number) characterList += numberList
    if (symbols) characterList += symbolsList
    if (characterList.length === 0) {
      setPassword('Select at least one option!')
      setIsPassword(true)
      return
    }
    setPassword(createPassword(characterList, passwordLength))
    setIsPassword(true)

  }
  const createPassword = (characterList: string, passwordLength: number) => {
    let result = ''
    for (let i = 0; i < passwordLength; i++) {
      let charIndex = Math.round(Math.random() * characterList.length)
      result += characterList.charAt(charIndex);
    }
    return result
  }
  const resetPassword = () => {
    setPassword('')
    setLowerCase(true)
    setUperCase(false)
    setNumber(false)
    setSymbols(false)
    setIsPassword(false)
  }
  return (
    <ScrollView keyboardShouldPersistTaps="handled" className='flex-1 bg-black'>
      <SafeAreaView className='bg-blacko'>
        <View  className='p-3'>
          <Text className=" text-center text-white text-2xl  m-3">Password Generator</Text>
          <Formik
            initialValues={{ passwordLength: '' }}
            validationSchema={passwordSchema}
            onSubmit={(values) => {
              generatePssword(+values.passwordLength)
            }}
          >{
              ({
                values,
                handleSubmit,
                handleReset,
                errors,
                touched,
                isValid,
                handleChange
              }) => (
                <>
                  <View style={styles.inputWrapper}>
                    <View className='flex-1 flex-col items-baseline'>
                      <Text className='text-white text-xm'>Password Length</Text>
                      {touched.passwordLength && errors.passwordLength && (
                        <Text className='text-red-600'>{errors.passwordLength}</Text>
                      )}
                    </View>
                    <TextInput style={styles.inputstyle} className='mr-3  p-2 w-1/3  '
                      value={values.passwordLength}
                      onChangeText={handleChange('passwordLength')}
                      placeholder='Ex. 8'
                      keyboardType="numeric" 
                      placeholderTextColor={"#fff"}
                      />
                  </View>
                  <View  className='flex-1 flex-row justify-between mb-5 '>
                      <Text className='text-white text-xm'>Include LowerCase</Text>
                      <BouncyCheckbox
                       useBuiltInState={false}
                       isChecked={lowercase}
                       onPress={()=>setLowerCase(!lowercase)}
                       fillColor='#29AB87'/>
                  </View>
                  <View  className='flex-1 flex-row justify-between mb-5'>
                      <Text className='text-white text-xm'>Include UpperCase</Text>
                      <BouncyCheckbox
                       useBuiltInState={false}
                       isChecked={upercase}
                       onPress={()=>setUperCase(!upercase)}
                       fillColor='#FED85D'/>
                  </View>
                  <View  className='flex-1 flex-row justify-between mb-5'>
                      <Text className='text-white text-xm'>Include Numbers</Text>
                      <BouncyCheckbox
                       useBuiltInState={false}
                       isChecked={number}
                       onPress={()=>setNumber(!number)}
                       fillColor='#FC80A5'/>
                  </View>
                  <View  className='flex-1 flex-row justify-between mb-5'>
                      <Text className='text-white text-xm'>Include Symbols</Text>
                      <BouncyCheckbox
                       useBuiltInState={false}
                       isChecked={symbols}
                       onPress={()=>setSymbols(!symbols)}
                       fillColor='#29AB87'/>
                  </View>
                  <View className='flex-1 flex-row justify-evenly '>
                    <TouchableOpacity className='bg-slate-400 rounded-sm  border-white py-1 px-2 '
                    disabled={!isValid}
                    onPress={handleSubmit}>
                      <Text  className='text-white text-xm'> Generate Password</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className='bg-slate-400 rounded-sm  border-white py-1 px-2 '
                    disabled={!isValid}
                    onPress={()=>{handleReset();
                         resetPassword()
                    }}>
                      <Text className='text-white text-xm '> Reset</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )
            }</Formik>
            {isPassword?
            <View className='flex-1 justify-center items-center'>
            <View className=' flex-1 bg-white mt-5 justify-center items-center w-1/2 rounded-md px-3 py-2'>
              <Text className='text-red-600 text-lg'>Result:</Text>
              <Text className='text-base font-semibold'>Long Press to Copy</Text>
              <Text className='text-xl font-bold  mt-1' selectable={true}>{password}</Text>
            </View>
            </View>:null
            }
        </View>
      </SafeAreaView>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  inputWrapper:{
    
    marginBottom:14,
    justifyContent:"space-between",
    alignItems:"center",
    flexDirection:"row"
  },
  inputstyle:{
    borderRadius:4,
    borderWidth:1,
    borderColor:"white",
    color:"white"
  }
})