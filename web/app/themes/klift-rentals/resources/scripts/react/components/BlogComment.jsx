import React from 'react'

export default function BlogComment({
    readMore = false,
    setComment,
    comment,
    handleSubmit,
    parent=0
}) {
  return (
    <div
     className={`position-relative ${readMore ? "d-block" : "d-none"}`}
     >
        <textarea
        className="input-primary"
        onChange={(e) => setComment?.(e.target.value)}
        value={comment}
        style={{
            height: "7.5rem",
            paddingInlineEnd: "6rem",
            resize: "none",
        }} 
        />
        <div className="d-flex justify-content-end">
        <button
            className="btn-secondary bg-primary text-white"
            style={{
            cursor: "pointer",
            }}
            onClick={() =>handleSubmit(parent)}
        >
            Comment
        </button>
        </div>
    </div>
  )
}
