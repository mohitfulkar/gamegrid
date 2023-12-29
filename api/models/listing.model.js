import mongoose from "mongoose";

const listingSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        sport: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        venue: {
            type: String,
            required: true,
        },
        categoryMS: {
            type: Boolean,
            required:true,
        },
        categoryWS: {
            type: Boolean,
            required:true,
        },
        categoryMD: {
            type: Boolean,
            required:true,
        },
        categoryWD: {
            type: Boolean,
            required:true,
        },
        categoryXD: {
            type: Boolean,
            required:true,
        },
        startDate: {
            type: Date,
            required: true,
        },
        endDate: {
            type: Date,
            required: true,
        },
        lastRegDate: {
            type: Date,
            required: true,
        },
        regFee: {
            type: Number,
            required: true,
        },
        imageUrls: {
            type: Array,
            required: true,
        },
        userRef: {
            type: String,
            required: true,
        },
    }, {timestamps: true}
)

const Listing = mongoose.model('Listing', listingSchema);

export default Listing;