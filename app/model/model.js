const mongoose = require("mongoose");

const fieldSchema = new mongoose.Schema({
    fieldName: {
        type: String,
        required: true,
        min: [4, "At least 4 characters, got {VALUE}"]
    },

    fieldAddress: {
        type: String
    },

    priceFrom: {
        type: Number,
        min: 0,
    },

    priceTo: {
        type: Number,
        min: 0,
    },

    ownerPhoneNumber: {
        type: String
    },

    rating: {
        type: Number,
        default: 0,
        min: [0, "Rating is too low, got {VALUE}"],
        max: [5, "Rating is too high, got {VALUE}"]
    },

    sports: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Sport",
            required: true
        },
    ]
});

const sportSchema = mongoose.Schema({
    sportName: {
        type: String,
        required: true,
    },
    fields: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Field",
        },
    ]
});

const fieldManagerSchema = mongoose.Schema({
    // username
    // password
    // email
    // phoneNumber
    // role
    // field
    
    username: {
        type: String,
        required: true,
    },

    password:{
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
    },

    phoneNumber: {
        type: String,
        required: true,
    },

    role: {
        type: String,
        required: true,
        enum: {
            values: ['admin', 'staff'],
            message: '{VALUE} is not suportted'
        },
    },

    field: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Field",
    },
});

const customerSchema = mongoose.Schema({
    // username
    // password
    // email
    // phoneNumber

    username: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
    },

    phoneNumber: {
        type: String,
    }
});

const RatingSchema = mongoose.Schema({
    rate: {
        type: Number,
        required: true,
        min: [0, "Rating is too low, got {VALUE}"],
        max: [5, "Rating is too high, got {VALUE}"]
    },

    comment: {
        type: String,
    },

    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
        required: true,
    },

    field: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Field",
        required: true,
    }
})

let Field = mongoose.model("Field", fieldSchema);
let Sport = mongoose.model("Sport", sportSchema);
let FieldManager = mongoose.model("FieldManager", fieldManagerSchema);
let Customer = mongoose.model("Customer", customerSchema);
let Rating = mongoose.model("Rating", RatingSchema);

module.exports = { Field, Sport, FieldManager, Customer, Rating};