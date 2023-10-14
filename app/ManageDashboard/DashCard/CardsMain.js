"use client"
import React from 'react'
import { gql, useQuery } from '@apollo/client';
import AllCard from './AllCard';
export default function CardsMain() {

  const DashboardData = gql`
    query DataForDashborad {
        DataForDashborad {
          ProductData {
            stock
          }
          order {
            active
            canceled
            canceledByUser
            createdAt
            delivered
            totalAmount
            process
          }
          userData {
            Active
          }
        }
      }
        `;
  const { data, loading } = useQuery(DashboardData);


  return (
    <>
      <AllCard data={data?.DataForDashborad} loading={loading} />
      {/* ProductData
      oredr 
      userData */}

    </>
  )
}
