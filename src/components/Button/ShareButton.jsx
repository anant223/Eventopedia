import { Share2 } from 'lucide-react';

const ShareButton = ({eventId, imgSrc, eventName}) => {
  
  console.log(imgSrc);

  const handleShareBtn = async () => {
    try {
      if(navigator.share){
        await navigator.share({
          title: eventName,
          text: "This Event for You",
          url: encodeURI(window.location.href)
        })
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <div>
      <button onClick={handleShareBtn} className="text-gray-300 hover:text-white transition-colors duration-200 bg-black/20 hover:bg-black/40 backdrop-blur-sm p-2 rounded-full">
        <Share2 size={18} />
      </button>
    </div>
  );
}

export default ShareButton