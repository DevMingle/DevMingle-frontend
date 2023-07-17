
import {signIn} from "next-auth/react"
export const google = ():void=>{
    signIn("google", {
        callbackUrl:'/user/me'
    })
}
export const github = ():void=>{
    signIn("github", {
        callbackUrl:'/user/me'
    })
}
