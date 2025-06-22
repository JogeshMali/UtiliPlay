import {Account, Client, ID} from 'react-native-appwrite'
import {PaperProvider,Snackbar} from 'react-native-paper'
import { string } from 'yup'
const appwriteClient = new Client()
const APPWRITE_ENDPOINT :string = 'Your Appwrith endpoint'
const APPWRITE_PROJECT_ID :string  = 'Your Appwrith projectId'

type CreateUserAccount ={
    email:string,
    password:string,
    name:string
}
type LoginUserAccount = {
    email:string,
    password:string,
}

class Appwrite { 
    account;
    
    constructor(){
        appwriteClient
        .setEndpoint(APPWRITE_ENDPOINT)
        .setProject(APPWRITE_PROJECT_ID)

        this.account = new Account(appwriteClient)
    }

    async createAccount({email,password,name}:CreateUserAccount){
        try {
            const userAccount = await this.account.create(
                ID.unique(),
                email,
                password,
                name
            )
            if(userAccount){
                return this.login({email,password})
            }else{
                return userAccount
            }
        } catch (error:any) {
            throw new Error(error?.message || 'Failed to create account');


        }
    }

    async login({email,password}:LoginUserAccount){
        try {
            return await  this.account.createEmailPasswordSession(email,password)
        } catch (error:any) {
            throw new Error(error?.message || 'Failed to login');
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get()
        } catch (error:any) {
            throw new Error(error?.message || 'Failed to current user');
        }
    }

    async logout(){
       try {
          return await this.account.deleteSession('current')
       } catch (error:any) {
        throw new Error(error?.message || 'Failed to logout');
       }
    }

   
}
export default Appwrite
