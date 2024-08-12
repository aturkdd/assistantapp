import mongoose from "mongoose"
export const  connectDB =()=> {
 const {connection} = mongoose
 connection.on('connected', () => console.log('connected'))
 connection.on('error', () => console.log('error'))
 connection.on('disconnected', () => console.log('disconnected'))
 process.on('SIGINT',()=>{
    connection.close()
    console.log('DB disconnect due the app is closed')
    process.exit(0)
 })
 return mongoose.connect(process.env.DB_CONNECTION_STRING)
} 



//______________________NOTS______________
//The process.on('SIGINT', ...) statement is used to listen for the SIGINT 
//signal in a Node.js application.
// The SIGINT signal is generated when the user sends an interrupt signal
// to the process, typically by pressing Ctrl+C in the terminal.

// Other common signals that you might listen for in a Node.js process include:

// SIGTERM:

// This signal is typically used to request a process to terminate.
// It can be sent by tools like the kill command or
// by process management systems.


// SIGHUP:

// This signal is often used to instruct a process to reload its configuration.
// SIGUSR1 and SIGUSR2:

// These are user-defined signals that can be used for specific purposes in your application.