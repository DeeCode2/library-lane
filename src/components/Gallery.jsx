import React, {useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { collection, doc, getDocs } from "firebase/firestore";
import  { db }  from '../config/firebase.jsx';
import Map from "./Map.jsx";
//import Filters from "./Filters.jsx";
//import AddIcon from "../assets/plus-icon.png"
import { categories } from "./categories.js";
import { twMerge } from "tailwind-merge";

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
        console.log(locations[locationId - 1])
        const selectedLocation = locations.filter(location => location.placeId == locationId)
        setModal({show: true, data: selectedLocation[0]}) 
        
    }

    const handleClose = () => {
        setModal({ show: false, data: null });
    };

    //modal for detail
    const Modal = ({ closeModal, data }) => {
        return (
            <div className="fixed top-0 left-0 w-full h-full md:p-6 bg-gray-400 bg-opacity-70 backdrop-blur-sm flex items-center justify-center  z-50 text-[#080401]">
                <div id="modal" className="relative rounded bg-white p-4 md:p-8 w-full max-w-3xl lg:max-h-[600px] sm:aspect-[4/3] overflow-y-scroll h-screen">
                    <h2 className="text-2xl md:text-4xl mb-2">{data.name}</h2>
                    {/* <p className="text-sm text-gray-600 font-semibold mb-4">{data.primaryDescription}</p>
                    <p className="text-md mb-4 lg:max-w-md">{data.secondaryDescription}</p> */}

                    <div>
                        <div className="flex items-center gap-2">
                            <img src="/icons/map-icon.svg" className="max-w-[20px]"/>
                            <p className="font-bold">Address</p>
                        </div>
                        <p className="mb-4">{data.address}</p>    
                    </div>
                    
                    {
                        data.website &&
                        <div className="pb-4">
                            <div className="flex items-center gap-2">
                                <img src="/icons/link-icon.svg" className="max-w-[20px]"/>
                                <p className="font-bold">Website</p>
                            </div>
                            
                            <a href={data.website} target="_blank" className="hover:underline">{data.website}</a>    
                        </div>
                    }
                    
                    
                    <ul className="flex flex-wrap gap-2 mb-4">
                        {data.tags.map((tag) => {
                            return (
                                <li className="flex items-center gap-1 py-0.5 px-2.5 rounded-full border border-[#080401]">
                                    <div className="indicator bg-[#080401]"></div>
                                    {tag}
                                </li>
                            )
                        })}
                    </ul>
                    <div >
                        <div className="w-full rounded aspect-video overflow-hidden mb-4">
                            <img src={data.thumbnail} className="w-full my-6 scale-125"/>
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
        } else if (filterOn.data && filterOn.data !== e.target.dataset.cat) {
            setFilterOn({isFiltered: true, data: e.target.dataset.cat})
        } else {
            setFilterOn({isFiltered: false, data: null})
        }

        console.log(filterOn) 

    }

    const Filters = () => {

        return (
            <section className="filter-wrapper mx-3 md:mx-12 px-4 mb- text-[#080401]">
                <h2 className="text-2xl md:text-4xl mt-24 mb-4 max-w-2xl">Find an independent bookstore in...</h2>

                <div className="">
                    <ul className="flex flex-wrap mb-4 gap-2">
                        {
                            categories.map((category) => {
                                return (
                                    <li key={category} data-cat={category} onClick={filterLocations} className=" flex items-center border border-[#080401] hover:font-bold py-0.5 px-2.5 rounded-full cursor-pointer gap-1">
                                        <div className="indicator"></div>
                                        {category}
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>   
            </section>
            
        )
    }

    const sortedLocations = locations.sort((a, b) => a.placeId - b.placeId)

    let cards = sortedLocations.filter((location) => {
        if (filterOn.isFiltered == false) {
            return location
        } else if (filterOn.isFiltered == true && location.tags.includes(filterOn.data)) {
            return location
        }
    }).map((location) => {
        return (
            <div className="card flex flex-col" key={location.placeId} data-id={location.placeId} >
                <div onClick={openModal} className="rounded flex items-center overflow-hidden aspect-square mb-1 cursor-pointer">
                    <img src={location.thumbnail} className="scale-[2.5]" />
                </div>
                <p className="font-bold">{location.name}</p>
                <p className="">{location.tags[0]}</p>
            </div>
        )
    })

    
    
    //GALLERY
    return (
        <>
            <Filters />
            <section className="mx-3 md:mx-12 pb-1 px-4 text-[#080401]">
                
                {
                    filterOn.isFiltered &&
                    <ul className="w-max mb-4">
                        <li key={filterOn.data} data-cat={filterOn.data} onClick={filterLocations} className="flex items-center gap-1 border border-[#080401] font-bold py-0.5 px-2.5 rounded-full cursor-pointer">
                        <div className="indicator bg-[#080401]"></div>
                        {filterOn.data}
                        </li>
                    </ul>
                }
                <div id="gallery" className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-5">
                    {/* <div onClick={() => {navigate('/newlocation');}}>
                        <div className="rounded mb-1 cursor-pointer bg-white border border-gray-200 p-8">
                            <img src={AddIcon} className="scale-50"/>
                        </div>
                        <p className="font-bold">Add a new location</p>
                    </div> */}
                    {cards}
                </div>
                {modal.show && modal.data && <Modal closeModal={handleClose} data={modal.data} />}
            </section>
        </>
    )
}

export default Gallery;