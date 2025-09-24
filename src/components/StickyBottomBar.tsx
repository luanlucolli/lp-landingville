import { MessageCircle } from 'lucide-react';
import { ChannelSheet } from './ChannelSheet';
import { useState } from 'react';

const StickyBottomBar = () => {
  const [showChannelSheet, setShowChannelSheet] = useState(false);

  const handleChannelsClick = () => {
    setShowChannelSheet(true);
  };

  return (
    <div className="fixed bottom-4 left-4 md:bottom-6 md:left-6 z-50" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
      <button
        onClick={handleChannelsClick}
        className="w-14 h-14 rounded-full border border-white/10 backdrop-blur-md shadow-lg
                   bg-gradient-to-br from-[hsl(215,85%,60%)] to-[hsl(145,60%,45%)]
                   hover:brightness-110 active:scale-95 
                   focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:outline-none
                   transition-all duration-200 ease-out
                   flex items-center justify-center"
        aria-label="Entrar em contato"
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </button>

      <ChannelSheet 
        open={showChannelSheet}
        onOpenChange={setShowChannelSheet}
      />
    </div>
  );
};

export default StickyBottomBar;