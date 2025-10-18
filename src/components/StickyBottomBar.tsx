import { MessageCircle } from 'lucide-react';
import { ChannelSheet } from './ChannelSheet';
import { useState } from 'react';
import copy from '@/content/landingville';

const StickyBottomBar = () => {
  const [showChannelSheet, setShowChannelSheet] = useState(false);

  const handleChannelsClick = () => {
    setShowChannelSheet(true);
  };

  return (
    <div
      className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <button
        onClick={handleChannelsClick}
        className="w-16 h-16 md:w-[68px] md:h-[68px] lg:w-[72px] lg:h-[72px]
                   rounded-full border border-white/20 backdrop-blur-xl shadow-lg
                   bg-white/10 hover:bg-white/15 active:bg-white/20
                   active:scale-95 transition-all duration-200 ease-out
                   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40
                   flex items-center justify-center"
        aria-label={copy.stickyBar.ariaLabel}
      >
        <MessageCircle
          className="w-7 h-7 lg:w-8 lg:h-8
                     text-[hsl(var(--primary-green))]
                     drop-shadow-[0_2px_10px_hsla(98,33%,47%,0.45)]"
        />
      </button>

      <ChannelSheet
        open={showChannelSheet}
        onOpenChange={setShowChannelSheet}
      />
    </div>
  );
};

export default StickyBottomBar;
