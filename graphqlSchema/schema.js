const graphql = require('graphql');
const User = require('../models/user');
const validator = require("validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLNonNull} = graphql;

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: ()=>({
        _id: {type: GraphQLID},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
    })
});

const MessageType = new GraphQLObjectType({
    name: 'Message',
    fields: ()=>({
        message: {type: GraphQLString},
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields:{
        getUserById:{
            type: UserType,
            args:{
                _id: {type: new GraphQLNonNull(GraphQLID)},
            },
            resolve: async(_,args) => {
                return await User.findById(args._id);
            }
        },
        getUsers:{
            type: new graphql.GraphQLList(UserType),
            resolve: async() => {
                return await User.find({});
            }
        }

    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields:{
        createUser:{
            type: UserType,
            args:{
                name: {type: new GraphQLNonNull(GraphQLString)},
                email: {type: new GraphQLNonNull(GraphQLString)},
                password: {type: new GraphQLNonNull(GraphQLString)},
            },
            resolve: async(_,args) => {
                try{
                    let email = args.email.toLowerCase();
                    if(!validator.isEmail(email)){
                        throw new Error("Email is not valid");
                    }
                    if(validator.isEmpty(args.password) || !validator.isLength(args.password,{min:5})){
                        throw new Error("Password is not valid");
                    }
                    const user = await User.find({email});
                    if(user.length>0){
                        throw new Error("User Already Exists !!!");
                    }else{
                        const hashPassword = await bcrypt.hash(args.password,12);
                        const newUser = new User({
                            email,
                            password:hashPassword,
                            name: args.name
                        });
                        const result = await newUser.save();
                        return result;
                    }
                }catch(err){
                    throw new Error("Error !!!");
                }
            }
        },
        updateUser:{
            type: UserType,
            args:{
                _id: {type: new GraphQLNonNull(GraphQLID)},
                name: {type: new GraphQLNonNull(GraphQLString)},
                password: {type: new GraphQLNonNull(GraphQLString)},
            },
            resolve: async(_,args) => {
                try{
                    let email = args.email.toLowerCase();
                    if(!validator.isEmail(email)){
                        throw new Error("Email is not valid");
                    }
                    if(validator.isEmpty(args.password) || !validator.isLength(args.password,{min:5})){
                        throw new Error("Password is not valid");
                    }
                    const user = await User.findById(args._id);
                    if(user){
                        const hashPassword = await bcrypt.hash(args.password,12);
                        const newUser = new User({
                            email: user.email,
                            password:hashPassword,
                            name: args.name
                        });
                        const result = await User.updateOne({_id:args._id},newUser);
                        const token = await jwt.sign({userId:result._id,email:result.email},"somesupersecretkey");
                        return {token,...newUser};
                    }else{
                        throw new Error("User Does not Exists !!!");
                    }
                }catch(err){
                    throw new Error("Error !!!");
                }
            }
        },
        deleteUser:{
            type: MessageType,
            args:{
                _id: {type: new GraphQLNonNull(GraphQLID)},
            },
            resolve: async(_,args) => {
                try{
                    await User.deleteOne({_id:args._id});
                    return {message:"Successfully Removed"}
                }catch(err){
                    return {message:"Failed to Remove"}
                }
            }
        }

    }
});

module.exports = new graphql.GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})
