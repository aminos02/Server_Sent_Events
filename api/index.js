const app=require("express")();

app.get("/",(req,res)=>res.send("hello"));

app.get("/stream",(req,res)=>{
    res.setHeader("Content-Type","text/event-stream");
    res.write("data: lola\n\n")
}
);


app.listen(8080);

console.log("Listening on 8080")