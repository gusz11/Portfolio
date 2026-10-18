import type { CSSProperties } from "react";
import { motion } from "motion/react";
import type { ProjectImage } from "@/types/project";
import { ProjectVisual } from "./ProjectVisual";

// Presentation copy belongs to this gallery variant; project data is unchanged.
const screens: Record<
  string,
  { category: string; title: string; description: string; angle: string }
> = {
  "Explorar Brasília": {
    category: "Exploração",
    title: "Descubra Brasília.",
    description:
      "Encontre pontos turísticos, explore categorias e salve seus lugares favoritos.",
    angle: "2deg",
  },
  "Detalhes da Catedral": {
    category: "Detalhes do lugar",
    title: "Conheça cada lugar.",
    description:
      "Consulte informações, localização e detalhes antes de planejar sua visita.",
    angle: "-2deg",
  },
  Login: {
    category: "Sua conta",
    title: "Sua viagem começa aqui.",
    description: "Acesse sua conta para organizar favoritos e programações.",
    angle: "1.5deg",
  },
  Favoritos: {
    category: "Lugares salvos",
    title: "Guarde suas descobertas.",
    description: "Salve lugares interessantes para visitar depois.",
    angle: "-1.5deg",
  },
  Programação: {
    category: "Planejamento",
    title: "Planeje cada momento.",
    description: "Organize viagens, horários e visitas em um só lugar.",
    angle: "2deg",
  },
  "Roteiro do dia": {
    category: "Roteiro diário",
    title: "Tudo no seu tempo.",
    description: "Visualize e organize as atividades de cada dia.",
    angle: "-2deg",
  },
  Configurações: {
    category: "Preferências",
    title: "Do seu jeito.",
    description: "Personalize suas preferências e informações de conta.",
    angle: "1.5deg",
  },
};

export function OndeFicaGallerySlide({
  image,
  available,
  index,
  total,
  reducedMotion,
}: {
  image: ProjectImage;
  available: boolean;
  index: number;
  total: number;
  reducedMotion: boolean;
}) {
  const screen = screens[image.label] ?? {
    category: "OndeFica",
    title: image.label,
    description: "Um olhar mais de perto na experiência do aplicativo.",
    angle: "2deg",
  };
  if (!available)
    return <ProjectVisual image={image} theme="ondefica" available={false} />;
  return (
    <div
      className="project-visual ondefica-gallery-slide"
      style={{ "--gallery-device-angle": screen.angle } as CSSProperties}
    >
      <div className="ondefica-gallery-route" aria-hidden="true">
        <svg viewBox="0 0 800 540" fill="none">
          <path
            d="M320 510C365 400 570 450 620 290S620 120 770 60"
            stroke="currentColor"
            strokeWidth="30"
          />
          <path
            d="M350 510C395 400 590 450 650 290S650 120 790 60"
            stroke="#75876c"
            strokeWidth="1.5"
            strokeDasharray="4 9"
          />
          <circle cx="350" cy="510" r="5" fill="#75876c" />
        </svg>
      </div>
      <motion.div
        className="ondefica-gallery-editorial"
        initial={reducedMotion ? false : { opacity: 0.75, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reducedMotion ? 0 : 0.28 }}
      >
        <p className="ondefica-gallery-category">{screen.category}</p>
        <h3>{screen.title}</h3>
        <p className="ondefica-gallery-description">{screen.description}</p>
        <span
          className="ondefica-gallery-position"
          aria-label={`Tela ${index + 1} de ${total}`}
        >
          {String(index + 1).padStart(2, "0")}
          <span aria-hidden="true"> / </span>
          {String(total).padStart(2, "0")}
        </span>
      </motion.div>
      <div className="ondefica-gallery-device-area">
        <motion.div
          className="ondefica-gallery-device-motion"
          initial={reducedMotion ? false : { y: 7 }}
          animate={{ y: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.32 }}
        >
          <div className="ondefica-device">
            <ProjectVisual
              image={image}
              theme="ondefica"
              available={available}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
