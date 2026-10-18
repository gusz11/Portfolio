import {
  BookOpen,
  HeartPulse,
  MapPin,
  ParkingCircle,
  ShieldCheck,
} from "lucide-react";
import type { ProjectTheme } from "@/types/project";

// These are illustrative arrangements, not reconstructed application screenshots.
export function GalleryDemonstration({
  theme,
  label,
}: {
  theme: ProjectTheme;
  label: string;
}) {
  if (theme === "luria" && label === "Simulador de emergência")
    return (
      <div className="gallery-demo-panel demo-simulator">
        <div className="gallery-demo-heading">
          <span>luria / simulação</span>
          <HeartPulse size={22} />
        </div>
        <h4>Um ambiente para praticar.</h4>
        <div className="simulator-wave">
          <svg viewBox="0 0 600 120" aria-hidden="true">
            <path
              d="M0 65H100L115 52L130 65H175L187 84L205 15L225 105L240 65H330L345 52L360 65H410L422 84L440 15L460 105L475 65H600"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
          <span>Traçado ilustrativo — sem dados clínicos</span>
        </div>
        <div className="gallery-demo-columns">
          <div>
            <span>Ambiente</span>
            <strong>Simulação de emergência</strong>
          </div>
          <div>
            <span>Experiência</span>
            <strong>Aprender com a prática</strong>
          </div>
        </div>
      </div>
    );
  if (theme === "luria" && label === "Recursos de aprendizagem")
    return (
      <div className="gallery-demo-panel demo-education">
        <div className="gallery-demo-heading">
          <span>luria / estudos</span>
          <BookOpen size={22} />
        </div>
        <h4>Conhecimento que se conecta.</h4>
        <div className="learning-flashcards">
          <div>
            <span>Flashcards</span>
            <strong>
              Revisar.
              <br />
              Relacionar.
              <br />
              Relembrar.
            </strong>
          </div>
          <div>
            <span>Questões e simulados</span>
            <i />
            <i />
            <i />
            <span>Um passo de cada vez.</span>
          </div>
        </div>
      </div>
    );
  if (theme === "financeiro" && label === "Movimentações e parcelas")
    return (
      <div className="gallery-demo-panel demo-transactions">
        <div className="gallery-demo-heading">
          <span>finanças / movimentações</span>
          <span>Dados ilustrativos</span>
        </div>
        <h4>Cada registro no seu lugar.</h4>
        <div className="demo-transaction-table">
          <div>
            <span>Movimentação</span>
            <span>Categoria</span>
            <span>Valor</span>
          </div>
          {[
            ["Recebimento", "Receita", "R$ 4.800"],
            ["Mercado", "Alimentação", "R$ 350"],
            ["Parcela 1 de 3", "Compras", "R$ 120"],
            ["Transporte", "Mobilidade", "R$ 80"],
          ].map((row) => (
            <div key={row[0]}>
              {row.map((cell) => (
                <span key={cell}>{cell}</span>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  if (
    theme === "garago" &&
    ["Fluxos de acesso", "Espaços e anúncios"].includes(label)
  )
    return (
      <div
        className={`gallery-phone-demo ${label === "Fluxos de acesso" ? "access-demo" : "spaces-demo"}`}
      >
        <div className="gallery-phone-copy">
          <span>garago</span>
          <h4>
            {label === "Fluxos de acesso" ? (
              <>
                O primeiro passo
                <br />é se conectar.
              </>
            ) : (
              <>
                Um espaço.
                <br />
                Novas possibilidades.
              </>
            )}
          </h4>
        </div>
        <div className="phone">
          <div className="phone-island" />
          <div className="phone-screen">
            <span className="phone-logo">garago</span>
            {label === "Fluxos de acesso" ? (
              <>
                <div className="parking-illustration">
                  <ShieldCheck />
                </div>
                <h4>Bem-vindo ao seu condomínio.</h4>
                <div className="demo-input">E-mail</div>
                <div className="demo-input">Senha</div>
                <div className="demo-primary">Entrar</div>
                <span className="phone-small">Criar uma conta</span>
              </>
            ) : (
              <>
                <p>Espaços disponíveis</p>
                <div className="parking-space">
                  <ParkingCircle />
                </div>
                <strong>Vaga de garagem</strong>
                <p>No seu condomínio</p>
                <div className="demo-input">Armário disponível</div>
                <div className="demo-primary">Ver anúncio</div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  if (
    theme === "ondefica" &&
    [
      "Login",
      "Favoritos",
      "Programação",
      "Roteiro do dia",
      "Configurações",
      "Detalhes da Catedral",
    ].includes(label)
  )
    return (
      <div className="gallery-demo-panel demo-travel-detail">
        <div className="gallery-demo-heading">
          <span>OndeFica</span>
          <MapPin size={22} />
        </div>
        <h4>{label === "Login" ? "Sua próxima descoberta." : label}</h4>
        {label === "Login" ? (
          <div className="travel-login-fields">
            <div className="demo-input">Seu e-mail</div>
            <div className="demo-input">Sua senha</div>
            <div className="demo-primary">Entrar</div>
          </div>
        ) : label === "Configurações" ? (
          <div className="travel-demo-list">
            {["Preferências de viagem", "Notificações", "Sua conta"].map(
              (item) => (
                <div key={item}>
                  <strong>{item}</strong>
                  <span>›</span>
                </div>
              ),
            )}
          </div>
        ) : label === "Detalhes da Catedral" ? (
          <>
            <div className="catedral">
              <svg viewBox="0 0 300 160">
                <path
                  d="M30 145Q115 110 134 22M68 145Q125 105 142 18M108 145Q140 94 150 15M192 145Q160 94 150 15M232 145Q175 105 158 18M270 145Q185 110 166 22"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="7"
                />
              </svg>
            </div>
            <p>Arquitetura e história no centro de Brasília.</p>
          </>
        ) : (
          <div className="travel-demo-list">
            {["Catedral de Brasília", "Museu Nacional", "Parque da Cidade"].map(
              (place, index) => (
                <div key={place}>
                  <span>
                    {label === "Favoritos" ? "♡" : `${9 + index * 2}:00`}
                  </span>
                  <strong>{place}</strong>
                  <MapPin size={17} />
                </div>
              ),
            )}
            <p>
              {label === "Favoritos"
                ? "Lugares para voltar a descobrir."
                : "Roteiro ilustrativo. Organize as próximas visitas."}
            </p>
          </div>
        )}
      </div>
    );
  return null;
}

export function hasGalleryDemonstration(theme: ProjectTheme, label: string) {
  const variants: Record<ProjectTheme, string[]> = {
    luria: ["Simulador de emergência", "Recursos de aprendizagem"],
    financeiro: ["Movimentações e parcelas"],
    garago: ["Fluxos de acesso", "Espaços e anúncios"],
    ondefica: [
      "Login",
      "Favoritos",
      "Programação",
      "Roteiro do dia",
      "Configurações",
      "Detalhes da Catedral",
    ],
  };
  return variants[theme].includes(label);
}
