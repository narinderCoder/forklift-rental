import React from 'react'
import { PuffLoader } from 'react-spinners'

export default function Loader({
    loading
}) {
  return (
    <div
    className={`${
      loading ? "d-flex" : "d-none"
    } align-items-center justify-content-center h-100 product-loader`}
  >
    <PuffLoader
      color={"#008fc1"}
      loading={loading}
      size={80}
      aria-label="Loading Spinner"
      data-testid="loader"
     
    />
  </div>
  )
}
