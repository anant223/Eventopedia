import HeroSection   from "./HeroSection";
import FeaturesSection from "./FeaturesSection";
import StorySection  from "./StorySection";

const LandingPage = ({
  onJoinWaitlist,
  founderName   = "Anant",
  founderAvatar = null,
}) => (
  <div className="min-h-screen bg-[#f0ede6] font-roboto">
    <HeroSection onJoinWaitlist={onJoinWaitlist} />
    <FeaturesSection />
    <StorySection name={founderName} avatar={founderAvatar} />
  </div>
);

export default LandingPage;