import bcrypt from "bcrypt"

export const hashpassword = async(password) =>{
    try{
        return await bcrypt.hash(password,12)
    }catch(err){
        throw new Error("400 error in hashing")
    }
}

export const compareHashedpassword =  async(password, hashedPassword)=>{
    try{
        return await bcrypt.compare(password, hashedPassword)
    }catch(err){
        throw new Error("Password not match")
    }
}