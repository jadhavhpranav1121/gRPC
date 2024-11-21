const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");
const packageDef = protoLoader.loadSync("todo.proto",{});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const todoPackage = grpcObject.todoPackage;

const client = new todoPackage.Todo("localhost:40000", grpc.credentials.createInsecure());

client.CreateTodo({
  "id": -1,
  "text":"pranav"
}, (err, response) => {
  console.log("Received from server" + JSON.stringify(response));
})

client.ReadTodos(null, (err, response)=>{
  console.log(response);
});

const call = client.ReadTodosStream();
call.on("data", item => {
  console.log("received item from server" + JSON.stringify(item));
})

call.on("end", e => console.log("server end"));
