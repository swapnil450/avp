import React from 'react'
 // for loading skeleton to map the element
 const dataskelton = ["1", "2", "3", "4", "5", "6"];


export default function LoadingSkeletonProduct() {
  return (
  <>
   <main className="flex flex-col gap-1 mb-10 justify-center items-center">
          <container className="  grid lg:grid-cols-3  sm:grid-cols-3 grid-cols-2 lg:gap-5 lg:m-5 gap-2 m-1">
            {dataskelton?.map(() => {
              return (
                <>
                  <div className="flex gap- animate-pulse  rounded-[20px] lg:w-[250px] lg:h-full h-[150px]   flex-col justify-center items-center">
                    <div className="flex w-full lg:h-[270px] image-rendering:_auto  h-[150px] lg:p-2 p-1">
                      <div className="lg:w-full w-[150px] lg:h-[250px] animate-pulse bg-gray-300 m-2 rounded-lg"></div>
                    </div>
                    <div className=" flex flex-col justify-center items-center  lg:gap-2 lg:m-2">
                      <p className="text-black p-2 lg:w-full h-[10px] lg:block hidden animate-pulse bg-gray-300 rounded-lg capitalize text-sm lg:text-[15px]"></p>
                      <div className="flex flex-row lg:gap-16 gap-10">
                        <div className="flex flex-col gap-1  lg:gap-1">
                          <p className="text-xs bg-gray-300 lg:w-full w-[30px] animate-pulse h-[10px] rounded-lg "></p>
                          <p className=" text-xs   bg-gray-300 lg:w-[50px] w-[35px] animate-pulse h-[10px] rounded-lg"></p>
                        </div>

                        <label
                          htmlFor="my-modal-4"
                          className="lg:p-3 p-2 h-[20px] lg:w-[70px] w-[50px] animate-pulse bg-gray-300 text-white capitalize lg:text-sm text-[11px]    rounded-lg "
                        ></label>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </container>
        </main>
  
  </>
  )
}
