import Listing from "../models/listingModel.js";
import { errorHandler } from "../utils/error.js"

export const createListing = async (req, res, next) => {
    try {
        const listing = await Listing.create(req.body);
        return res.status(201).json({
            listing: listing,
            success: true,
        })
    } catch (error) {
        next(error);
    }
}
export const deleteListing = async (req, res, next) => {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
        return next(errorHandler(401, "No listing Found"))
    }
    if (req.user.id != listing.userRef) {
        return next(errorHandler(401, "You can delete only the listing the made by you"))
    }
    try {
        const listings = await Listing.findByIdAndDelete(req.params.id);
        res.status(200).json({
            listings: listings._id,
            message: "Deleted Successfully"
        }
        )
    } catch (error) {
        next(error);
    }
}
export const updateListing = async (req, res, next) => {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
        return next(errorHandler(401, "No listing Found"))
    }
    if (req.user.id != listing.userRef) {
        return next(errorHandler(401, "You can update only the listing the made by you"))
    }
    try {
        const updateListing = await Listing.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(
            {
                listing: updateListing,
                success: true,
            }
        )
    } catch (error) {
        next(error);
    }
}
export const getListing = async (req, res, next) => {


    try {
        const listing = await Listing.findById(req.params.id);
        if (!listing) return next(new errorHandler(404, "No listing exist"));
        res.status(200).json(
            {
                listing: listing,
            }
        )
    } catch (error) {
        next(error);
    }
}

export const getLisitngs = async (req, res, next) => {

    try {
        const limit = parseInt(req.query.limit) || 9;
        const startIndex = parseInt(req.query.startIndex) || 0;
        const searchTerm = req.query.searchTerm || '';
        const sort = req.query.sort || "createdAt";
        const order = req.query.order || "desc";
        let offer = req.query.offer;
        if (offer === undefined || offer === 'false') {
            offer = { $in: [false, true] }
        }
        let furnished = req.query.furnished;
        if (furnished === undefined || furnished === 'false') {
            furnished = { $in: [false, true] }
        }

        let parking = req.query.parking;
        if (parking === undefined || parking === 'false') {
            parking = { $in: [false, true] };
        }

        let type = req.query.type;
        if (type === undefined || type === 'all') {
            type = { $in: ['rent', 'sell'] }
        }

        const listing = await Listing.find({
            name: { $regex: searchTerm, $options: 'i' },
            offer, furnished, parking, type,
        }
        ).sort({ [sort]: order }).limit(limit).skip(startIndex);

        return res.status(200).json({
            listing: listing
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
}