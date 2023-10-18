import React from 'react'
import moment from "moment";
import { Spinner } from '@nextui-org/react';
export default function AllCard({ data, loading }) {
    const TotalPro = data?.ProductData
    const TotalUser = data?.userData
    const BlockUser = TotalUser?.filter((i) => i?.Active === false)
    const ActiveOrder = data?.order?.filter((i) => i?.active === true)
    const DeliveredOrder = data?.order?.filter((i) => i?.delivered === true)
    const UserCanceledOrder = data?.order?.filter((i) => i?.canceledByUser === true)
    const TotalEarning = DeliveredOrder?.length > 0 ? DeliveredOrder?.reduce((acc, val) => Number(acc?.totalAmount) + Number(val?.totalAmount), 0) : 0;
    const TodayOrder = data?.order?.filter((i) => i?.createdAt === moment(new Date()).format("DD/MM/YYYY"))
    const TotalProcess = data?.order?.filter((i) => i?.process === true && i?.delivered === false)


    return (
        <>
            <div className='grid grid-cols-4 gap-10'>
                <div className="">
                    <div class="flex items-center p-4 bg-white shadow rounded-lg">
                        <div class="inline-flex flex-shrink-0 items-center justify-center text-sm font-bold h-16 w-16 text-black bg-gray-100 rounded-full mr-6">
                            {/* <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg> */}
                            ₹{loading ? <Spinner size={`sm`} /> : TotalEarning}
                        </div>
                        <div>

                            <span class="block text-teal-500 font-semibold text-sm">Total Earning</span>
                        </div>
                    </div>
                </div>
                <div className="">
                    <div class="flex items-center p-4 bg-white shadow rounded-lg">
                        <div class="inline-flex flex-shrink-0 items-center justify-center text-sm font-bold h-16 w-16 text-black bg-gray-100 rounded-full mr-6">
                            {/* <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg> */}
                            {loading ? <Spinner size={`sm`} /> : TodayOrder?.length}
                        </div>
                        <div>

                            <span class="block text-teal-500 font-semibold text-sm">Today Orders</span>
                        </div>
                    </div>
                </div>
                <div className="">
                    <div class="flex items-center p-4 bg-white shadow rounded-lg">
                        <div class="inline-flex flex-shrink-0 items-center justify-center text-sm font-bold h-16 w-16 text-black bg-gray-100 rounded-full mr-6">
                            {/* <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg> */}
                            {loading ? <Spinner size={`sm`} /> : ActiveOrder?.length}
                        </div>
                        <div>

                            <span class="block text-teal-500 font-semibold text-sm">Total Order</span>
                        </div>
                    </div>
                </div>
                <div className="">
                    <div class="flex items-center p-4 bg-white shadow rounded-lg">
                        <div class="inline-flex flex-shrink-0 items-center justify-center text-sm font-bold h-16 w-16 text-black bg-gray-100 rounded-full mr-6">
                            {/* <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg> */}
                            {loading ? <Spinner size={`sm`} /> : UserCanceledOrder?.length}
                        </div>
                        <div>

                            <span class="block text-teal-500 font-semibold text-sm"> User Canceled</span>
                        </div>
                    </div>
                </div>
                <div className="">
                    <div class="flex items-center p-4 bg-white shadow rounded-lg">
                        <div class="inline-flex flex-shrink-0 items-center justify-center text-sm font-bold h-16 w-16 text-black bg-gray-100 rounded-full mr-6">
                            {/* <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg> */}
                            {loading ? <Spinner size={`sm`} /> : TotalPro?.length}
                        </div>
                        <div>

                            <span class="block text-teal-500 font-semibold text-sm">Total Product</span>
                        </div>
                    </div>
                </div>
                <div className="">
                    <div class="flex items-center p-4 bg-white shadow rounded-lg">
                        <div class="inline-flex flex-shrink-0 items-center justify-center text-sm font-bold h-16 w-16 text-black bg-gray-100 rounded-full mr-6">
                            {/* <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg> */}
                            {loading ? <Spinner size={`sm`} /> : TotalUser?.length}
                        </div>
                        <div>

                            <span class="block text-teal-500 font-semibold text-sm">Total User</span>
                        </div>
                    </div>
                </div>
                <div className="">
                    <div class="flex items-center p-4 bg-white shadow rounded-lg">
                        <div class="inline-flex flex-shrink-0 items-center justify-center text-sm font-bold h-16 w-16 text-black bg-gray-100 rounded-full mr-6">
                            {/* <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg> */}
                            {loading ? <Spinner size={`sm`} /> : TotalProcess?.length}
                        </div>
                        <div>

                            <span class="block text-teal-500 font-semibold text-sm">Processed Order</span>
                        </div>
                    </div>
                </div>
                <div className="">
                    <div class="flex items-center p-4 bg-white shadow rounded-lg">
                        <div class="inline-flex flex-shrink-0 items-center justify-center text-sm font-bold h-16 w-16 text-black bg-gray-100 rounded-full mr-6">
                            {/* <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg> */}
                            {loading ? <Spinner size={`sm`} /> : BlockUser?.length}
                        </div>
                        <div>

                            <span class="block text-teal-500 font-semibold text-sm">Blocked User</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
