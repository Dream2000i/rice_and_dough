import React from "react"
import ContentLoader from "react-content-loader"


const LoadingBlock = (props) => {
  
  return(
  <ContentLoader 
    speed={2}
    width={280}
    height={460}
    viewBox="0 0 280 460"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="288" y="101" rx="0" ry="0" width="0" height="1" /> 
    <rect x="133" y="98" rx="0" ry="0" width="155" height="0" /> 
    <circle cx="140" cy="140" r="140" /> 
    <rect x="0" y="291" rx="0" ry="0" width="280" height="26" /> 
    <rect x="0" y="386" rx="6" ry="6" width="280" height="31" /> 
    <rect x="105" y="460" rx="0" ry="0" width="39" height="6" /> 
    <rect x="138" y="460" rx="0" ry="0" width="46" height="13" /> 
    <rect x="0" y="325" rx="6" ry="6" width="280" height="50" /> 
    <rect x="186" y="428" rx="6" ry="6" width="91" height="31" />
  </ContentLoader>
)
}
export default LoadingBlock