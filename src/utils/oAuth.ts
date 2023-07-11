
import {signIn} from "next-auth/react"
export const google = ():void=>{
    signIn("google")
}
export const github = ():void=>{
    signIn("github")
}
