function long(){
    let sum = 0
    for(i=0;i<ie9;i++){
        sum+=i
    }
    return sum
}

Process.on("message", (message)=>{
    const sum = long()
    process.send(sum)
})