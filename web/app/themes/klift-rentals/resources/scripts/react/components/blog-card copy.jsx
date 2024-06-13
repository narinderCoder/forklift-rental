import Reply from "./reply";

const replies = [
  {
    user: "John Doe",
    comment: "This is a brand new commment posted by the user name john doe",
    replies: [
      {
        user: "John Doe",
        comment:
          "This is a brand new commment posted by the user name john doe",
        replies: [],
      },
    ],
  },
];

const Blogcard = ({ title, description, slug, readMore = false }) => {
  return (
    <div className="position-relative bg-tertiary blog-card">
      <div
        className={`position-relative row blog-card-main`}
        style={{ minHeight: readMore ? "20rem" : "14rem" }}
      >
        <div className="blog-card-date col-1">
          <h6 className="blog-card-date-heading h6">13</h6>
          <p className="w-100 px-1 py-2 p3 text-center">Jan 2024</p>
        </div>

        <div className="blog-card-content col-md-10 col-12 offset-md-1">
          <img
            src={
              "https://media-live2.prod.scw.jungheinrichcloud.com/resource/image/544832/landscape_ratio12x5/1920/800/bb7be4344bfe40f927e66d9bc021e2c8/72A0438B3B23A5D806589769C7AF7B3E/stage-forklifts.jpg"
            }
            alt=""
            className="rounded-circle"
            style={{ width: "3.5rem", height: "3.5rem", objectFit: "cover" }}
          />
          <div className="d-flex flex-column h-100 gap-4 justify-content-between">
            <div>
              <h4 className="h4">{title}</h4>
              <p
                className={`p1 ${
                  !readMore ? "line-clamp-2" : "line-clamp-none"
                }`}
              >
                {description}
              </p>
            </div>
            <div
              className={`position-relative ${readMore ? "d-block" : "d-none"}`}
            >
              <textarea
                className="input-primary"
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
                >
                  Comment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div
        className="d-flex flex-column justify-content-between w-100 flex-md-row align-items-md-center px-md-4"
        style={{ gap: "2rem" }}
      >
        <div className="d-flex flex-column flex-md-row align-items-md-center gap-md-5 gap-3">
          <div className="d-flex align-items-center gap-1 p2">
            <p className="text-secondary text-opacity-40">Posted By</p>{" "}
            <p className="text-secondary">Author</p>
          </div>
          <div className="d-flex items-center gap-1 p2">
            <p className="text-secondary text-opacity-40">Posted in</p>{" "}
            <p className="text-secondary">Caterpillar Final Drives</p>
          </div>
          <div className="d-flex align-items-center gap-1 p2">
            <svg
              width="24"
              height="22"
              viewBox="0 0 24 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <mask
                id="mask0_270_277"
                style={{ maskType: "alpha" }}
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="24"
                height="22"
              >
                <rect
                  y="0.5"
                  width="24"
                  height="21"
                  fill="url(#pattern0_270_277)"
                />
              </mask>
              <g mask="url(#mask0_270_277)">
                <rect x="-1" y="0.5" width="24" height="21" fill="#008FC1" />
              </g>
              <defs>
                <pattern
                  id="pattern0_270_277"
                  patternContentUnits="objectBoundingBox"
                  width="1"
                  height="1"
                >
                  <use
                    xlinkHref="#image0_270_277"
                    transform="matrix(0.00195312 0 0 0.00223214 0 -0.0714286)"
                  />
                </pattern>
                <image
                  id="image0_270_277"
                  width="512"
                  height="512"
                  xlinkHref="data:image/png;base64,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"
                />
              </defs>
            </svg>

            <p className="text-secondary">0 Comments</p>
          </div>
        </div>
        <a
          href={`/blogs/${slug}`}
          className={`text-primary ${readMore ? "d-none" : "d-block"}`}
        >
          <div className="d-flex align-items-center gap-2">
            <p className="p2">Read More</p>
            <svg
              width="8"
              height="12"
              viewBox="0 0 8 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 6.65217L0 12L0 9.91304L6.13665 6.03261L6.08696 6.16304V5.83696L6.13665 5.96739L0 2.08696L0 0L8 5.34783L8 6.65217Z"
                fill="#404040"
              />
            </svg>
          </div>
        </a>
      </div>
      <div className={`${readMore ? "d-block" : "d-none"}`}>
        <hr />
        <h6 className="h6 fw-medium mb-3">Replies</h6>
        <div className="d-flex flex-column gap-4">
          {replies.map((reply, index) => (
            <Reply reply={reply} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogcard;
