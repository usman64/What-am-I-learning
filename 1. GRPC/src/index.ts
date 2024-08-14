import path from "path"
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader'
import { AddressBookServiceHandlers } from './generated/AddressBookService'
import { Status } from "@grpc/grpc-js/build/src/constants";
import { ProtoGrpcType } from "./generated/message";

const pkgDefinition = protoLoader.loadSync(path.join(__dirname, '../message.proto'))

const personProto = (grpc.loadPackageDefinition(pkgDefinition) as unknown) as ProtoGrpcType

const PERSONS = [
    {
        name: "Usman",
        age: 12
    },
    {
        name: "Tariq",
        age: 15,
    }
]

const handler: AddressBookServiceHandlers = {
    AddPerson: (call, callback) => {
        console.log(call)
        let person = {
            name: call.request.name,
            age: call.request.age,
        }
        PERSONS.push(person)
        callback(null, person)
    },
    GetPersonByName: (call, callback) => {
        const person = PERSONS.find(p => p.name === call.request.name)
        if (person) {
            callback(null, person)
        } else {
            callback({
                code: Status.NOT_FOUND,
                details: "Not found"
            }, null)
        }
    }
}

const server = new grpc.Server()

server.addService((personProto.AddressBookService).service, handler)
server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
    server.start();
})