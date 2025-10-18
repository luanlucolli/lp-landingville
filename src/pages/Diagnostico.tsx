import { useCallback } from 'react';
import Particles from "react-particles";
// 1. IMPORTAÇÃO DO TIPO ADICIONADA AQUI
import type { Container, Engine, ISourceOptions } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";
import Calculator30s from '@/components/Calculator30s';
import SchemaMarkup from '@/components/SchemaMarkup';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import copy from '@/content/landingville';

// 2. APLICADO O TIPO ISourceOptions À CONSTANTE
// substitua seu particlesOptions por este:
const particlesOptions: ISourceOptions = {
  background: { color: { value: "transparent" } },
  fpsLimit: 120,
  detectRetina: true,
  interactivity: {
    events: {
      onHover: { enable: true, mode: "repulse" },
      resize: true
    },
    modes: {
      repulse: { distance: 80, duration: 0.4 }
    }
  },
  particles: {
    number: {
      value: 180,                         // mesma densidade
      density: { enable: true, area: 900 }
    },
    color: {
      // Paleta Landingville: azul, verde e branco
      value: ["#2B6FA5", "#6D9F50", "#85BA62", "#93D277", "#FFFFFF"]
    },
    links: {
      enable: false
    },
    shape: { type: "circle" },
    size: {
      value: { min: 0.6, max: 2.2 },
      animation: {
        enable: true,
        speed: 2,
        minimumValue: 0.4,
        sync: false
      }
    },
    opacity: {
      value: { min: 0.18, max: 0.55 },
      animation: {
        enable: true,
        speed: 0.6,
        minimumValue: 0.18,
        sync: false
      }
    },
    move: {
      enable: true,
      speed: 0.25,
      direction: "none",
      random: true,
      straight: false,
      outModes: { default: "out" },
      attract: {
        enable: true,
        rotate: { x: 2000, y: 2000 }
      }
    }
  }
};


const Diagnostico = () => {
  const handleBack = () => {
    window.location.assign('/');
  };

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    // Esta função é chamada quando as partículas terminam de carregar
  }, []);

  return (
    <div
      className="dark min-h-screen relative overflow-hidden"
      style={{
        backgroundImage:
          'radial-gradient(1200px 600px at 15% -10%, hsl(210 90% 60% / 0.12), transparent 60%), radial-gradient(1200px 600px at 85% 110%, hsl(145 70% 50% / 0.12), transparent 60%), linear-gradient(165deg, hsl(222 48% 6%), hsl(223 50% 7%) 50%, hsl(165 45% 8%))',
        backgroundAttachment: 'fixed',
      }}
    >
      <SchemaMarkup />

      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={particlesOptions}
        className="absolute top-0 left-0 w-full h-full z-0"
      />

      <div className="relative z-10 flex flex-col min-h-screen">
        <header className="sticky top-0 bg-background/60 backdrop-blur-md border-b border-border/50">
          <div className="container mx-auto px-4">
            <div className="relative flex items-center h-16">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBack}
                className="flex items-center gap-2"
                aria-label={copy.diagnosticoPage.backButtonAriaLabel}
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">{copy.diagnosticoPage.backButton}</span>
              </Button>

              <a
                href="/"
                className="absolute left-1/2 -translate-x-1/2 inline-flex items-center justify-center"
                aria-label={copy.diagnosticoPage.logoLinkAriaLabel}
              >
                <img
                  src="/lovable-uploads/landingvillelogo.svg"
                  alt={copy.brand.logoAlt}
                  className="h-12 md:h-812 w-auto select-none cursor-pointer"
                />
              </a>

              <div className="ml-auto w-10 sm:w-[88px]" aria-hidden="true" />
            </div>
          </div>
        </header>

        <main className="dark flex-grow flex items-center">
          <div className="w-full pt-10 md:pt-12 pb-16 md:pb-20">
            <Calculator30s />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Diagnostico;