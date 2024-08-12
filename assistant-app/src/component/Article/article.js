import { TextComp } from "../TextComp/TextComp";
import { ImageComp } from "../ImageComp/ImageComp";

import VideoComp from "../VideoComp/VideoComp";
import { ImageTextComp } from "../ImageTextComp/ImageTextcomp";
const Article = ({data}) => {
    return (
        <>
        {data?.map((item, index) => {
            if( (item.type === "text")|| (item.type === "sub_address"))
              return <TextComp data={item} key={index} />;
            else if (item.type === "photo")
              return <ImageComp data={item.imagSRC} key={index} />;
            else if (item.type === "video")
              return <VideoComp data={item?.mediaURL} key={index} />;
            else return <ImageTextComp data={item} key={index} />;
          })}
          </>
    )
}
export default Article