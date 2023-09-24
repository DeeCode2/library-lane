import React, {useState, useEffect} from "react";
import { collection, doc, getDocs, addDoc } from "firebase/firestore";
import  { db }  from '../config/firebase.jsx';

const NewLocation = () => {

    const [locations, setLocations] = useState([]);
    const [name, setName] = useState("");
    const [thumbnail, setThumbnail] = useState("");
    const [primaryDesc, setPrimaryDesc] = useState("");
    const [secondaryDesc, setSecondaryDesc] = useState("");
    const [address, setAddress] = useState("");
    const [geopoint, setGeopoint] = useState("");
    const [tags, setTags] = useState("");

    const fetchPlaces = async () => {
        await getDocs(collection(db, "places"))
            .then((querySnapshot) => {
                const newData = querySnapshot.docs
                    .map((doc) => ({...doc.data(), id:doc.id}));
                
                setLocations(newData);
                //console.log(locations)
            })
    }

    useEffect(() => {
        fetchPlaces();
    }, [])

    console.log(locations)

    const insertDoc = async (placeObj) => {
        await addDoc(collection(db, "places"), placeObj);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        //console.log(parseFloat(geopoint.split(", ")[0]))
        //const geo = new GeoPoint ( latitude :  parseFloat(geopoint.split(", ")[0]) ,  longitude :  parseFloat(geopoint.split(", ")[1]) ) : GeoPoint

        

        const place = {
            name: name,
            thumbnail: thumbnail,
            primaryDescription: primaryDesc,
            secondaryDescription: secondaryDesc,
            placeId: locations.length + 1,
            address: address,
            geopoints: [parseFloat(geopoint.split(", ")[0]), parseFloat(geopoint.split(", ")[1])],
            tags: tags.split(", ")
            //address: [address, [geopoi]]
        }

        insertDoc(place)

        console.log("place added!")
    }

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-400 bg-opacity-70 backdrop-blur-sm z-50 sm:py-12 overflow-y-scroll">
            <form onSubmit={handleSubmit} className="rounded sm:w-3/4 max-w-2xl m-auto p-6 bg-gray-100 sm:overflow-y-scroll sm:aspect-[1/0.9]">
                <div className="flex flex-col mb-4">
                    <label for="name" className="mb-2 font-semibold">Name</label>
                    <input
                        type="text"
                        id="name"
                        onChange={(e) => setName(e.target.value)}
                        className="rounded p-3 bg-gray-200"
                    />
                </div>

                <div className="flex flex-col mb-4">
                    <label for="thumbnail" className="mb-2 font-semibold">Image link</label>
                    <input
                        type="text"
                        id="thumbnail"
                        onChange={(e) => setThumbnail(e.target.value)}
                        className="rounded p-3 bg-gray-200"
                    />
                </div>

                <div className="flex flex-col mb-4">
                    <label for="primary-desc" className="mb-2 font-semibold">Primary Description</label>
                    <textarea
                        id="primary-desc"
                        onChange={(e) => setPrimaryDesc(e.target.value)}
                        className="rounded p-3 bg-gray-200"
                    >
                    </textarea>
                </div>

                <div className="flex flex-col mb-4">
                    <label for="secondary-desc" className="mb-2 font-semibold">Secondary Description</label>
                    <textarea
                        id="secondary-desc"
                        onChange={(e) => setSecondaryDesc(e.target.value)}
                        className="rounded p-3 bg-gray-200"
                    >
                    </textarea>
                </div>

                <div className="flex flex-col mb-4">
                    <label for="address" className="mb-2 font-semibold">Address</label>
                    <input
                        type="text"
                        id="address"
                        onChange={(e) => setAddress(e.target.value)}
                        className="rounded p-3 bg-gray-200"
                    />
                </div>

                <div className="flex flex-col mb-4">
                    <label for="geopoint" className="mb-2 font-semibold">Geopoint (latitude, longitude)</label>
                    <input
                        type="text"
                        id="geopoint"
                        onChange={(e) => setGeopoint(e.target.value)}
                        className="rounded p-3 bg-gray-200"
                    />
                </div>

                <div className="flex flex-col mb-4">
                    <label for="tags" className="mb-2 font-semibold">Tags</label>
                    <textarea 
                        id="tags" 
                        name="tags" 
                        onChange={(e) => setTags(e.target.value)}
                        className="rounded p-3 bg-gray-200"
                    >
                    </textarea>
                </div>

                <button className="p-2 rounded bg-green-100 border">Submit</button>
            </form>
        </div>
    )
}

export default NewLocation