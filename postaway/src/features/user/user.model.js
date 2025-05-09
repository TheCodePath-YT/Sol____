const users=[];
export default class UserModel{
    constructor(name,email,password){
        this.id=users.length+1;
        this.name=name;
        this.email=email;
        this.password=password;
    }
    static getAllUsers(){
        return users;
    }
    static getUserById(id){
        return users.find(user=>user.id===id);
    }
    static createUser(name,email,password){
        if(!name||!email||!password){
            return false;
        }
        let user =new UserModel(name,email,password);
        users.push(user);
        return user;
    }
    static checkUser(email,password){
        return users.find(user=>user.email==email&&user.password==password);
    }
}
UserModel.createUser("Darshan Deshmukh","darshandeshmukh968@gmail.com","darshan123");
UserModel.createUser("John Doe","John.doe@gmail.com","john123");
UserModel.createUser("Jane Doe","Jane.doe@gmail.com","jane123");