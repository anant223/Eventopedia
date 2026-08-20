import HeroSection   from "./HeroSection";
import FeaturesSection from "./FeaturesSection";
import StorySection  from "./StorySection";

const LandingPage = ({
  onJoinWaitlist,
  founderName   = "Anant",
  founderAvatar = null,
}) => (
  <>
    <HeroSection onJoinWaitlist={onJoinWaitlist} />
    <FeaturesSection />
    <StorySection name={founderName} avatar={founderAvatar} />
  </>
);

export default LandingPage;