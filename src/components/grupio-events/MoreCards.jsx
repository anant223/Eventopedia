import {motion} from 'framer-motion'
import { ChevronRight } from 'lucide-react';

const MoreCards = ({ count, onClick }) => (
  <motion.div
    whileHover={{ y: -3 }}
    whileTap={{ scale: 0.97 }}
    onClick={onClick}
    className="flex-shrink-0 w-28 bg-[rgba(26,24,20,0.88)] rounded-2xl border border-white/10 shadow-lg cursor-pointer flex flex-col items-center justify-center gap-2 p-4"
  >
    <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
      <ChevronRight size={18} className="text-white" />
    </div>
    <div className="text-center">
      <p className="text-xs font-semibold text-white mb-0.5">See all</p>
      <p className="text-[10px] text-white/60">{count} events</p>
    </div>
  </motion.div>
);
export default  MoreCards;