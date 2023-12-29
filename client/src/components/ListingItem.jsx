import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";

export default function ListingItem({ listing }) {
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]">
        <Link to={`/listing/${listing._id}`}>
            <img src={listing.imageUrls[0]} alt="listing cover"
            className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300"
            />

            <div className="p-3 flex flex-col gap-2 w-full">
                <p className="text-lg font-semibold truncate">{listing.name}</p>

                <p className="font-medium ">{listing.sport}</p>
                <div className="flex items-center gap-1">
                    <MdLocationOn className="h-4 w-4 text-emerald-600"/>
                    <p className="text-sm font-medium truncate w-full">{listing.venue}</p>
                </div>

                <div className="">
                    <p className="text-sm line-clamp-3">{listing.description}</p>
                    <p className="mt-2 font-medium">Registration Fee: ₹ {listing.regFee}</p>
                </div>

                <div className="">
                    <p className="text-sm font-medium">Last Date for Registration: {listing.lastRegDate.split('T')[0]}</p>
                </div>
            </div>
        </Link>
    </div>
  )
}
