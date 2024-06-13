const ShareIcon = ({ size = 20 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <mask
        id="mask0_966_362"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="20"
        height="20"
      >
        <rect
          width="20"
          height="20"
          transform="matrix(-1 0 0 1 20 0)"
          fill="url(#pattern0_966_362)"
        />
      </mask>
      <g mask="url(#mask0_966_362)">
        <rect width="19" height="19" fill="currentColor" />
      </g>
      <defs>
        <pattern
          id="pattern0_966_362"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use
            xlinkHref="#image0_966_362"
            transform="translate(-0.0588235 -0.117647) scale(0.00229779)"
          />
        </pattern>
        <image
          id="image0_966_362"
          width="512"
          height="512"
          xlinkHref="data:image/png;base64,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"
        />
      </defs>
    </svg>
  );
};

export default ShareIcon;
