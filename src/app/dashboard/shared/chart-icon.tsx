export const ChartIcon = ({ color, id }: { color: string; id: string }) => {
  return (
    <svg width='76' height='29' viewBox='0 0 76 29' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M1.55865e-05 28.7883L0 20.1519C4.14736 19.0086 9.09187 11.964 11.4099 11.964C13.7279 11.964 21.2209 17.8263 24.5155 17.8263C27.8101 17.8263 34.1085 1.27783 36.6279 1.27783C39.1473 1.27783 43.9302 13.2983 46.2592 13.2983C48.5881 13.2983 55.814 8.55229 58.1395 8.55229C60.4651 8.55229 66.4729 11.964 68.7985 11.964C69.6342 11.964 75 9.69835 75 9.69835V28.7883H1.55865e-05Z'
        fill={`url(#paint0_linear_461_1548_${id})`}
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M0.387695 19.896C2.4222 19.896 9.09193 11.6986 11.4099 11.6986C13.728 11.6986 21.221 17.5677 24.5156 17.5677C27.8101 17.5677 34.1086 1 36.628 1C39.1473 1 43.9302 13.0344 46.2592 13.0344C48.5882 13.0344 55.814 8.28291 58.1396 8.28291C60.4652 8.28291 66.4729 11.6986 68.7985 11.6986C71.1241 11.6986 75.0001 9.43031 75.0001 9.43031'
        fill={`url(#paint1_linear_461_1548_${id})`}
      />
      <path
        d='M0.387695 19.896C2.4222 19.896 9.09193 11.6986 11.4099 11.6986C13.728 11.6986 21.221 17.5677 24.5156 17.5677C27.8101 17.5677 34.1086 1 36.628 1C39.1473 1 43.9302 13.0344 46.2592 13.0344C48.5882 13.0344 55.814 8.28291 58.1396 8.28291C60.4652 8.28291 66.4729 11.6986 68.7985 11.6986C71.1241 11.6986 75.0001 9.43031 75.0001 9.43031'
        stroke={color}
        strokeWidth='2'
      />
      <defs>
        <linearGradient
          id={`paint0_linear_461_1548_${id}`}
          x1='-4.8967'
          y1='-5.65212'
          x2='-4.8967'
          y2='31.9784'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor={color} />
          <stop offset='1' stopColor='white' stopOpacity='0.01' />
        </linearGradient>
        <linearGradient
          id={`paint1_linear_461_1548_${id}`}
          x1='-4.48369'
          y1='-3.75997'
          x2='-4.48369'
          y2='22.0873'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor={color} />
          <stop offset='1' stopColor='white' stopOpacity='0.01' />
        </linearGradient>
      </defs>
    </svg>
  );
};
