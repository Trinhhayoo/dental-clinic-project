


import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";




import React, { useEffect, useState } from 'react';


import {retreatments} from "../redux/services/Api";
import { useSelector } from "react-redux";


const RequestComponent = ({ requestDetail}) => {






    return (
        <div>

            <div className='w-full grid grid-cols-[2fr,2fr,2fr,2fr,2fr] items-center hover:bg-black-400/50 py-2 p-4 rounded-2xl cursor-pointer mb-2 bg-white'>
                <h3 className='font-bold text-base text-100 '>


                    <Link className="pt-1" to={`/Retreatment/${requestDetail?.[0]}`}>
                        {requestDetail?.[0]}
                    </Link>



                </h3>

                <div className='flex flex-row  items-center  gap-6 '>



                    <p className='text-black-100 '>
                        {requestDetail?.[1]}

                    </p>

                </div >
                <div>
                    {requestDetail?.[2]}
                </div>
                <div>
                    {requestDetail?.[3]}
                </div>
                <div>
                    {requestDetail?.[4]}
                </div>

            </div>



        </div>
    )


};
const Retreatments = () => {
    const { username } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const [requests, setRequest] = useState([]);
    const [currentPage, setCurrentPage] = React.useState(1);
    
    useEffect(() => {
        const FetchData = async () => {

            try {
                const { data: response } = await retreatments();
               setRequest(response)

            } catch (error) {
                console.error(error.message);
            }

        }

        FetchData();
    }, []);
   



  
  

   
  



  
 


    const itemsPerPage = 6;

    // Assuming you have a state variable to track the current page


    // Calculate the starting index based on the current page and itemsPerPage
    const startIndex = (currentPage - 1) * itemsPerPage;
    const visibleRequest = requests?.slice(startIndex, startIndex + itemsPerPage);

    // Function to handle next page click
    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };
    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
    }
   
   

    return (
        <div className="flex flex-col my-5">
            <div className="flex flex-row mb-4 items-center ">

                <h2 className=" flex-grow text-black font-bold">Retreatment List</h2>
              

            </div>
          
            <div className=' px-4 mt-4 border-none bg-gray-200 grid grid-cols-[2fr,2fr,2fr,2fr,2fr,0.5fr] rounded-mds  font-bold py-4'>

                <p>Retreatment ID</p>
                
                <p>Treatment plan ID</p>
                <p>Note</p>
                <p>Date</p>
                <p>Status</p>

            </div>
            <div className="mt-4 flex flex-col gap-1 ">
                {visibleRequest?.map((request, index) => (
                    <React.Fragment key={index}>
                        <RequestComponent requestDetail={request} />
                      
                    </React.Fragment>
                ))}

            </div>
            <div className="flex flex-row">
                {currentPage > 1 && (
                    <div className="flex justify-end mt-4">
                        <button
                            className="text-blue-700 hover:underline focus:outline-none"
                            onClick={handlePrevPage}
                        >
                            <MdOutlineKeyboardDoubleArrowLeft size={30} />
                        </button>
                    </div>
                )}
                {requests?.length > itemsPerPage * currentPage && (
                    <div className="flex justify-end mt-4 flex-grow">
                        <button
                            className="text-blue-700 hover:underline focus:outline-none"
                            onClick={handleNextPage}
                        >
                            <MdOutlineKeyboardDoubleArrowRight size={30} />
                        </button>
                    </div>
                )}
            </div>






        </div>
    );
};

export default Retreatments;
