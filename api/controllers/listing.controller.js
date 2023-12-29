import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";

export const createListing = async (req, res, next) => {
    try {
        const listing = await Listing.create(req.body);
        return res.status(201).json(listing);
    } catch (error) {
        next(error);
    }
};

export const deleteListing = async (req, res, next) => {
    const listing = await Listing.findById(req.params.id);
    
    if (!listing) {
        return next(errorHandler(404, 'Tournament not found'));
    }

    if (req.user.id !== listing.userRef) {
        return next(errorHandler(401, 'You can delete only your own tournaments'));
    }

    try {
        await Listing.findByIdAndDelete(req.params.id);
        res.status(200).json('Tournament has been deleted');
    } catch (error) {
        next(error);
    }
};

export const updateListing = async (req, res, next) => {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next(errorHandler(404, 'Tournament not found'));
    }
    if (req.user.id !== listing.userRef) {
      return next(errorHandler(401, 'You can only update your own tournament'));
    }
  
    try {
      const updatedListing = await Listing.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.status(200).json(updatedListing);
    } catch (error) {
      next(error);
    }
  };

  export const getListing = async (req, res, next) => {
    try {
      const listing = await Listing.findById(req.params.id);
      if (!listing) {
        return next(errorHandler(404,'Tournamnet not found'));
      }
      res.status(200).json(listing);
    } catch (error) {
      next(error);
    }
  };

 export const getListings = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;
    
    let categoryMS = req.query.categoryMS;
    if (categoryMS === undefined || categoryMS === 'false') {
      categoryMS = { $in: [false, true] };
    }

    let categoryWS = req.query.categoryWS;
    if (categoryWS === undefined || categoryWS === 'false') {
      categoryWS = { $in: [false, true] };
    }

    let categoryMD = req.query.categoryMD;
    if (categoryMD === undefined || categoryMD === 'false') {
      categoryMD = { $in: [false, true] };
    }

    let categoryWD = req.query.categoryWD;
    if (categoryWD === undefined || categoryWD === 'false') {
      categoryWD = { $in: [false, true] };
    }

    let categoryXD = req.query.categoryXD;
    if (categoryXD === undefined || categoryXD === 'false') {
      categoryXD = { $in: [false, true] };
    }

    /*let type = req.query.type;
    if (type === undefined || type === 'all') {
      type = { $in: [''] };
    }*/

    const searchTerm = req.query.searchTerm || '';

    const sort = req.query.sort || 'createdAt';

    const order = req.query.order || 'desc';


    const listings = await Listing.find({
      name: { $regex: searchTerm, $options: 'i' },
      categoryMS,
      categoryWS,
      categoryMD,
      categoryWD,
      categoryXD,
    }).sort(
      {[sort]: order}
    ).limit(limit).skip(startIndex);

    return res.status(200).json(listings);

  } catch (error) {
    next(error);
  }
 } 