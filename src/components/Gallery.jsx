import React, {useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { collection, doc, getDocs } from "firebase/firestore";
import  { db }  from '../config/firebase.jsx';
import Map from "./Map.jsx";
//import Filters from "./Filters.jsx";
import AddIcon from "../assets/plus-icon.png"
import { categories } from "./categories.js";

const Gallery = () => {

    //retrieve all locations
    const [locations, setLocations] = useState([]);
    const [modal, setModal] = useState({show: false, data: null});
    const [filterOn, setFilterOn] = useState({isFiltered: false, data: null});
    const navigate = useNavigate();
    
    //RETRIEVING LOCATION DATA FROM FIREBASE
    const fetchPlaces = async () => {
        await getDocs(collection(db, "places"))
            .then((querySnapshot) => {
                const newData = querySnapshot.docs
                    .map((doc) => ({...doc.data(), id:doc.id}));
                
                setLocations(newData.sort((a, b) => a.placeId - b.placeId));
                
            })
    }

    useEffect(() => {
        fetchPlaces();
    }, [])

    //MODAL
    const openModal = (e) => {
        let locationId = e.target.closest('.card').dataset.id
        setModal({show: true, data: locations[locationId - 1]}) 
        
    }

    const handleClose = () => {
        setModal({ show: false, data: null });
    };

    //modal for detail
    const Modal = ({ closeModal, data }) => {
        return (
            <div className="fixed top-0 left-0 w-full h-full bg-gray-400 bg-opacity-70 backdrop-blur-sm flex items-center justify-center p-6 z-50 text-[#080401]">
                <div id="modal" className="relative rounded bg-white p-8 w-full max-w-4xl sm:aspect-[4/3] overflow-y-scroll">
                    <h2 className="text-5xl mb-2">{data.name}</h2>
                    <p className="text-sm text-gray-600 font-semibold mb-4">{data.primaryDescription}</p>
                    <p className="text-md mb-4 lg:max-w-md">{data.secondaryDescription}</p>
                    <p className="font-bold">Address</p>
                    <p className="mb-4">{data.address}</p>
                    <ul className="flex">
                        {data.tags.map((tag) => {
                            return (
                                <li className="mr-2 py-0.5 px-1.5 rounded bg-green-100">{tag}</li>
                            )
                        })}
                    </ul>
                    <div >
                        <div className="w-full ">
                            <img src={data.thumbnail} className="w-full rounded aspect-video my-6"/>
                        </div>
                        <div className="rounded overflow-hidden">
                            <Map 
                                lat={data.geopoints[0]}
                                long={data.geopoints[1]}
                            />    
                        </div>
                        <button onClick={() => closeModal()} className="absolute top-0 right-0 m-4 border border-gray-400  aspect-square p-2 rounded-full font-bold text-gray-600">X</button>
                    </div>
                    
                    
                </div>
            </div>
        )
    }

    //FILTERS
    const filterLocations = (e) => {
        
        if (filterOn.isFiltered == false) {
            setFilterOn({isFiltered: true, data: e.target.dataset.cat})
            //console.log(e.target)
            e.target.classList.remove("unselected");
            e.target.classList.add("selected");

        } else if (filterOn.data != null && filterOn.data !== e.target.dataset.cat) {
            setFilterOn({isFiltered: true, data: e.target.dataset.cat})
            //remove the selected class from the previously selected tag
            //console.log(document.querySelectorAll("[data-cat]"))

        } else {
            setFilterOn({isFiltered: false, data: null})
            e.target.classList.add("unselected");
        }
    }


    const Filters = () => {

        return (
            <section className="mx-24 sm:mx-12 px-4 mb-4 text-[#080401]">
                <h2 className="text-5xl mt-24 mb-4 max-w-2xl">Where are you going today?</h2>

                <div className="overflow-x-scroll">
                    <ul className="flex mb-4">
                        {
                            categories.map((category) => {
                                return (
                                    <li key={category} data-cat={category} onClick={filterLocations} className="mr-2 py-0.5 px-1.5 rounded cursor-pointer bg-green-100">{category}</li>
                                )
                            })
                        }
                    </ul>
                </div>   
            </section>
            
        )
    }

    let cards = locations.filter((location) => {
        if (filterOn.isFiltered == false) {
            return location
        } else if (filterOn.isFiltered == true && location.tags.includes(filterOn.data)) {
            return location
        }
    }).map((location) => {
        return (
            <div className="card flex flex-col" key={location.placeId} data-id={location.placeId} >
                <div onClick={openModal} className="rounded flex items-center overflow-hidden aspect-square mb-1 cursor-pointer">
                    <img src={location.thumbnail} className="scale-150" />
                </div>
                <p className="font-bold">{location.name}</p>
                <p className="">{location.primaryDescription}</p>
            </div>
        )
    })
    
    //GALLERY
    return (
        <>
            <Filters />
            <section className="mx-24 sm:mx-12 px-4 text-[#080401]">
                <div className="flex items-center mb-4">
                    <h2 className="text-3xl mr-4">Places</h2>
                    <ul>
                        {filterOn.isFiltered && <li className="mr-2 py-0.5 px-1.5 rounded cursor-pointer bg-green-300">{filterOn.data} x</li>}
                    </ul>    
                </div>
                
                <div id="gallery" className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-2 gap-5">
                    <div onClick={() => {navigate('/newlocation');}}>
                        <div className="rounded mb-1 cursor-pointer bg-white border border-gray-200 p-8">
                            <img src={AddIcon} className="scale-50"/>
                        </div>
                        <p className="font-bold">Add a new location</p>
                    </div>
                    {cards}
                </div>
                {modal.show && modal.data && <Modal closeModal={handleClose} data={modal.data} />}
            </section>
        </>
    )
}

export default Gallery;