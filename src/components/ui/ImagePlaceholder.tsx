import {
  BookOpen,
  HeartPulse,
  MapPin,
  Navigation,
  ParkingCircle,
  Search,
  ShieldCheck,
  Wallet,
} from "lucide-react";
import type { ProjectTheme } from "@/types/project";
import {
  GalleryDemonstration,
  hasGalleryDemonstration,
} from "./GalleryDemonstration";

function LuriaVisual() {
  return (
    <div className="demo-luria">
      <div className="demo-sidebar">
        <div className="demo-brand">
          luria<span>✳</span>
        </div>
        <div className="demo-nav-active">Visão geral</div>
        <span>Meus estudos</span>
        <span>Simulações</span>
        <span>Cronograma</span>
        <div className="demo-sidebar-bottom">Seu espaço de evolução</div>
      </div>
      <div className="demo-main">
        <div className="demo-topline">
          <span>Ambiente de aprendizagem</span>
          <span className="demo-avatar">L</span>
        </div>
        <h4>Conhecimento em movimento.</h4>
        <p>Um espaço para aprender e colocar em prática.</p>
        <div className="demo-luria-feature">
          <HeartPulse size={28} />
          <div>
            <span>Prática clínica</span>
            <strong>Simulador de emergência</strong>
            <p>Explore situações. Conecte conhecimentos.</p>
          </div>
          <span className="demo-round-arrow">↗</span>
        </div>
        <div className="demo-luria-bottom">
          <div>
            <BookOpen size={20} />
            <strong>Seus estudos</strong>
            <span>Questões e flashcards</span>
          </div>
          <div>
            <div className="demo-ring" />
            <strong>Continue aprendendo</strong>
            <span>No seu ritmo.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
function FinanceVisual() {
  return (
    <div className="demo-finance">
      <div className="demo-topline">
        <span className="demo-brand">
          <Wallet size={18} /> finanças
        </span>
        <span>Visão mensal</span>
      </div>
      <h4>Seu dinheiro, com clareza.</h4>
      <div className="demo-finance-stats">
        <div>
          <span>Receitas</span>
          <strong>R$ 4.800</strong>
        </div>
        <div>
          <span>Despesas</span>
          <strong>R$ 2.450</strong>
        </div>
        <div>
          <span>Saldo do mês</span>
          <strong>R$ 2.350</strong>
        </div>
      </div>
      <div className="demo-chart">
        <div className="demo-chart-label">
          <strong>Movimentações</strong>
          <span>Dados ilustrativos</span>
        </div>
        <div className="demo-bars">
          {[35, 64, 48, 80, 58, 93, 72, 54, 85, 68, 92, 76].map(
            (height, index) => (
              <div key={index}>
                <i style={{ height: `${height}%` }} />
                <i style={{ height: `${height * 0.56}%` }} />
              </div>
            ),
          )}
        </div>
        <div className="demo-months">
          <span>Jan</span>
          <span>Mar</span>
          <span>Mai</span>
          <span>Jul</span>
          <span>Set</span>
          <span>Dez</span>
        </div>
      </div>
    </div>
  );
}
function GaragoVisual() {
  return (
    <div className="demo-garago">
      <div className="garago-type">
        Espaço livre.
        <br />
        Vida prática.<span>garago</span>
      </div>
      <div className="phone phone-back">
        <div className="phone-island" />
        <div className="phone-screen">
          <span className="phone-logo">garago</span>
          <div className="parking-illustration">
            <ParkingCircle size={58} strokeWidth={1} />
          </div>
          <h4>Seu próximo espaço está aqui.</h4>
          <div className="demo-input">E-mail</div>
          <div className="demo-input">Senha</div>
          <div className="demo-primary">Entrar</div>
          <span className="phone-small">Um condomínio mais conectado.</span>
        </div>
      </div>
      <div className="phone phone-front">
        <div className="phone-island" />
        <div className="phone-screen">
          <span className="phone-logo">garago</span>
          <p>Encontre seu espaço</p>
          <div className="phone-search">
            <Search size={12} /> Buscar no condomínio
          </div>
          <div className="parking-space">
            <span>Vaga de garagem</span>
            <ParkingCircle size={42} strokeWidth={1} />
          </div>
          <strong>Mais perto de você</strong>
          <p>Vagas e armários disponíveis</p>
          <div className="phone-list">
            <ShieldCheck size={19} />
            <span>Dentro do seu condomínio</span>
          </div>
          <div className="demo-primary">Explorar espaços</div>
        </div>
      </div>
    </div>
  );
}
function TravelVisual() {
  return (
    <div className="demo-travel">
      <div className="travel-map">
        <svg viewBox="0 0 640 400" fill="none" aria-hidden="true">
          <path
            d="M-20 310C120 350 160 220 320 210S500 260 670 110M50-20C130 100 250 140 270 420M480-20C370 100 480 220 560 440"
            stroke="currentColor"
            strokeWidth="38"
          />
          <path
            d="M-20 310C120 350 160 220 320 210S500 260 670 110M50-20C130 100 250 140 270 420M480-20C370 100 480 220 560 440"
            stroke="#d7dace"
            strokeWidth="2"
            strokeDasharray="6 8"
          />
          <path
            d="M90 280Q230 190 335 230T520 130"
            stroke="#476e48"
            strokeWidth="3"
            strokeDasharray="7 7"
          />
        </svg>
        <span className="map-pin pin-a">
          <MapPin size={20} />
        </span>
        <span className="map-pin pin-b">
          <MapPin size={20} />
        </span>
        <span className="map-pin pin-c">
          <MapPin size={20} />
        </span>
      </div>
      <div className="travel-panel">
        <div className="travel-brand">
          <Navigation size={18} /> OndeFica
        </div>
        <span>Explore a capital</span>
        <h4>
          O próximo lugar
          <br />é uma descoberta.
        </h4>
        <div className="catedral">
          <svg viewBox="0 0 300 160" aria-hidden="true">
            <path
              d="M30 145 Q115 110 134 22 M68 145 Q125 105 142 18 M108 145 Q140 94 150 15 M192 145 Q160 94 150 15 M232 145 Q175 105 158 18 M270 145 Q185 110 166 22"
              fill="none"
              stroke="currentColor"
              strokeWidth="9"
            />
            <path d="M20 148H280" stroke="currentColor" strokeWidth="4" />
          </svg>
        </div>
        <div className="travel-location">
          <div>
            <strong>Catedral de Brasília</strong>
            <span>Arquitetura e história</span>
          </div>
          <span>↗</span>
        </div>
      </div>
    </div>
  );
}

export function ImagePlaceholder({
  theme,
  label,
  className = "",
}: {
  theme: ProjectTheme;
  label: string;
  className?: string;
}) {
  return (
    <div
      className={`project-visual visual-${theme} ${className}`}
      role="img"
      aria-label={`${label}. Composição demonstrativa, não é uma captura real da aplicação.`}
    >
      <div className="demo-stage" aria-hidden="true">
        {hasGalleryDemonstration(theme, label) ? (
          <GalleryDemonstration theme={theme} label={label} />
        ) : theme === "luria" ? (
          <LuriaVisual />
        ) : theme === "financeiro" ? (
          <FinanceVisual />
        ) : theme === "garago" ? (
          <GaragoVisual />
        ) : (
          <TravelVisual />
        )}
      </div>
      <span className="demo-disclaimer">Demonstração visual</span>
    </div>
  );
}
