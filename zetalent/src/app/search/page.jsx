"use client"
import SearchGridItem from '@/components/search/SearchGriditem';
import { SEARCH_GIGS_ROUTE } from '@/utils/constants';
import axios from 'axios';
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const page = () => {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams()
  const category = params.category;
  const q = searchParams.get("q");
  const [gigs, setGigs] = useState([]);

  useEffect(() => {
    const getData = async() => {
      try{
        const {data} = await axios.get(
          `${SEARCH_GIGS_ROUTE}?searchTerm=${q || ''}&category=${category || ''}`
        );
        console.log(data.gigs);
        setGigs(data.gigs);
      }
      catch(err){
        console.log(err);
      }
    };
    if(category || q) getData();
  }, [category, q]);

  return (
    <div className='text-[#000000]'>
      {gigs && (
        <div className="mx-24 mb-24">
          {q && (
            <h3 className="text-4xl mb-10">
              Results for <strong>{q}</strong>
            </h3>
          )}
          <div className="flex gap-4">
            <button className="py-3 px-5 border border-gray-400 rounded-lg font-medium">
              Category
            </button>
            <button className="py-3 px-5 border border-gray-400 rounded-lg font-medium">
              Budget
            </button>
            <button className="py-3 px-5 border border-gray-400 rounded-lg font-medium">
              Delivery Time
            </button>
          </div>
          <div>
            <div className="my-4">
              <span className="text-[#5e5e5e] font-medium ">
                {gigs.length} services available
              </span>
            </div>
            <div className="grid grid-cols-4">
              {gigs.map((gig) => (
                <SearchGridItem gig={gig} key={gig.id} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default page