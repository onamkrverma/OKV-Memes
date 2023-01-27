import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const SkeletonCard = ({ amount }) => {
  const loadCard = Array(amount).fill(1);

  return (
    loadCard.map((value, i) =>
    <div className="videoBox" key={i}>
      <Skeleton height={154} />
      <div className="videoShortDetails">
        <Skeleton circle='true' width={33} height={33} />
        <h5 style={{ width: '100%' }} ><Skeleton /></h5>
      </div>
    </div>


    )
  )





}

export default SkeletonCard