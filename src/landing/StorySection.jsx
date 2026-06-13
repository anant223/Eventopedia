import { BodyContainer } from "@/components/containers/Container";
import { FadeUp, SectionLabel } from "./Components";

/**
 * StorySection
 *
 * Props:
 *   name   — founder name (default "Anant")
 *   avatar — avatar URL (optional, falls back to initial)
 */
const StorySection = ({ name = "Anant", avatar }) => (
  <section id="story" className="py-16">
    <BodyContainer>
      <FadeUp>
        <SectionLabel>Why I'm building this</SectionLabel>

        <div className="bg-[#1a1814] rounded-2xl p-7">
          {/* quote */}
          <p className="text-[15px] text-[#9b9890] leading-[1.75] mb-6 m-0">
            I kept missing events happening right around me — not because they
            didn't exist, but because there was no good way to find them. Grupio
            is the app I wished existed.
            <span className="text-[#f2eee7] font-medium">
              {" "}
              Built in public, one feature at a time.
            </span>
          </p>

          {/* founder */}
          <div className="flex items-center gap-3">
            {avatar ? (
              <img
                src={avatar}
                alt={name}
                className="w-9 h-9 rounded-full object-cover shrink-0"
              />
            ) : (
              <div className="w-9 h-9 rounded-full bg-[#f2eee7] flex items-center justify-center text-[14px] font-medium text-[#1a1814] shrink-0">
                {name?.[0]?.toUpperCase()}
              </div>
            )}
            <div>
              <p className="text-[13px] font-medium text-[#f2eee7] m-0">
                {name}
              </p>
              <p className="text-[11px] text-[#9b9890] mt-0.5 m-0">
                Founder · building Grupio
              </p>
            </div>

            <div className="ml-auto flex items-center gap-1.5 bg-white/[0.06] border border-white/10 rounded-full px-3 py-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1D9E75] animate-pulse" />
              <span className="text-[11px] text-[#9b9890]">Live</span>
            </div>
          </div>
        </div>
      </FadeUp>
    </BodyContainer>
  </section>
);

export default StorySection;
