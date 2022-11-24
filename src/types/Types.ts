export interface User {
    userId? : String,
    name : String,
    email : String,
    gender? : number, // 1 = male 2 = female
    age? : number,
    height? : number,
    weight? : number,
    notificationTokens? : Array<String>,
    dateJoined? : Date,
    notificationsEnabled? : Boolean,
    isAdmin? : boolean
}