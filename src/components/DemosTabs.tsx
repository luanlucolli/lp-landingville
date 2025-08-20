import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import copy from '@/content/landingville';

const DemosTabs = () => {
  const [activeTab, setActiveTab] = useState('landing');

  useEffect(() => {
    const handleChangeDemoTab = (event: CustomEvent) => {
      setActiveTab(event.detail.tab);
    };

    window.addEventListener('changeDemoTab', handleChangeDemoTab as EventListener);
    return () => {
      window.removeEventListener('changeDemoTab', handleChangeDemoTab as EventListener);
    };
  }, []);

  // Handle URL hash for deep linking
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.includes('tab=landing')) {
        setActiveTab('landing');
      } else if (hash.includes('tab=site')) {
        setActiveTab('site');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <section id="demos" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {copy.demos.title}
          </h2>
          <p className="text-muted-foreground">{copy.demos.note}</p>
        </div>

        <div className="max-w-6xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
              {copy.demos.tabs.map((tab) => (
                <TabsTrigger 
                  key={tab.key} 
                  value={tab.key}
                  className="text-base font-semibold py-3"
                >
                  {tab.title}
                </TabsTrigger>
              ))}
            </TabsList>

            {copy.demos.tabs.map((tab) => (
              <TabsContent key={tab.key} value={tab.key} className="mt-0">
                <Card className="border-2 border-primary/20 overflow-hidden">
                  <CardContent className="p-0">
                    {/* Image placeholder - reserved space */}
                    <div className="relative w-full aspect-video bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center border-b">
                      <div className="text-center space-y-4 p-8">
                        <div className="w-20 h-20 mx-auto bg-primary/20 rounded-2xl flex items-center justify-center">
                          <div className="text-2xl">📱💻</div>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-foreground mb-2">
                            {tab.title} - Preview
                          </h3>
                          <p className="text-sm text-muted-foreground max-w-lg mx-auto">
                            {tab.image.alt}
                          </p>
                        </div>
                        <div className="text-xs text-muted-foreground bg-muted/50 px-3 py-1 rounded-full inline-block">
                          Imagem: {tab.image.src}
                        </div>
                      </div>
                      
                      {/* Future image element - ready for when images are available */}
                      {/* 
                      <img 
                        src={tab.image.src}
                        alt={tab.image.alt}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      */}
                    </div>
                    
                    <div className="p-8">
                      <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div>
                          <h3 className="text-2xl font-bold text-foreground mb-4">
                            {tab.title}
                          </h3>
                          <ul className="space-y-3">
                            {tab.bullets.map((bullet, index) => (
                              <li key={index} className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                                <span className="text-muted-foreground">{bullet}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="text-center">
                          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                            ✨ Demonstração
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default DemosTabs;