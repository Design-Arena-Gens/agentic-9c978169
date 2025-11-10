import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Painel Acad?mico",
  description: "Vis?es por professor, por turma e ferramentas de migra??o",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <div className="container">
          <header className="header">
            <div className="brand">
              <div className="logo" aria-hidden />
              <div>
                <div>Painel Acad?mico</div>
                <div className="subtitle">Gest?o de desempenho e migra??o de dados</div>
              </div>
            </div>
            <nav aria-label="Links r?pidos">
              <a className="button" href="#professor">Professor</a>
              <a className="button" href="#turma">Turma</a>
              <a className="button" href="#migracao">Migra??o</a>
            </nav>
          </header>
          {children}
          <footer className="footer">? {new Date().getFullYear()} Painel Acad?mico</footer>
        </div>
      </body>
    </html>
  );
}
