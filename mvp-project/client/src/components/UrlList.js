import { useEffect } from "react";
import UrlItem from "./UrlItem";


function UrlItem({url, getAllUrls}){
  return (
    <>
    <div>
    <UrlItem url= {url} getAllUrls={getAllUrls} />
    </div>
    </>
  );
}


export default UrlItem;
