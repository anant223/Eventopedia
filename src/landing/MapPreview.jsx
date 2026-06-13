import MapSvg from "@/assets/map.svg?react";
import { BodyContainer } from "@/components/container/Container";



const MapPreview = () => {
  return (
    <section className="py-10 relative">
      <BodyContainer>
        <div
          className="
            overflow-hidden
            rounded-[32px]
            border border-black/[0.08]
            shadow-sm
            bg-white
             absolute left-0 right-0 -top-20
          "
        >
          <MapSvg className="w-full h-auto" />
        </div>
      </BodyContainer>
    </section>
  );
};

export default MapPreview;