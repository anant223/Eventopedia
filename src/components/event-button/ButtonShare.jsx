import { Share2 } from 'lucide-react';

const ShareButton = ({eventId, imgSrc, eventName}) => {
  
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
      <button onClick={handleShareBtn} className="text-text hover:text-white transition-colors duration-200 bg-background/20 hover:bg-background/40 backdrop-blur-sm p-2 rounded-full border border-white/20 hover:border-white/30 h-10 w-10 sm:h-12 sm:w-12 sm:p-3 min-h-[44px] min-w-[44px]">
        <Share2 size={18} />
      </button>
    </div>
  );
}

export default ShareButton