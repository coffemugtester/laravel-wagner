import { Head } from '@inertiajs/react';
import '../../css/wagner.css';

export default function Impressum() {
    return (
        <>
            <Head title="Impressum - Café Wagner">
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500&family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&display=swap"
                />
            </Head>
            <div className="wagner-page page">
                <header className="nav">
                    <div className="logo">WAGNER</div>
                    <nav>
                        <a href="/">Home</a>
                        <a href="/#geschichte">Cafe Wagner</a>
                        <a href="/#speisekarte">Speisekarte</a>
                        <a href="/#galerie">Galerie</a>
                        <a href="/#reservierung">Reservierung</a>
                        <a href="/#veranstaltungen">Veranstaltungen</a>
                    </nav>
                </header>

                <section className="section">
                    <div className="container" style={{ maxWidth: '832px' }}>
                        <h1
                            style={{
                                fontFamily: 'Cinzel, serif',
                                fontSize: '48px',
                                color: '#800020',
                                textAlign: 'center',
                                marginBottom: '48px',
                            }}
                        >
                            Impressum
                        </h1>

                        <div style={{ lineHeight: '1.8', fontSize: '18px' }}>
                            <h2
                                style={{
                                    fontFamily: 'Cinzel, serif',
                                    fontSize: '28px',
                                    color: '#800020',
                                    marginTop: '32px',
                                    marginBottom: '16px',
                                }}
                            >
                                Anbieterkennzeichnung gem. § 5 TMG
                            </h2>

                            <p style={{ marginBottom: '24px' }}>
                                Celina Kutylo
                                <br />
                                Richard-Wagner-Platz 1<br />
                                D-04109 Leipzig
                            </p>

                            <p style={{ marginBottom: '32px' }}>
                                E-Mail: mail@cafe-wagner.de
                            </p>

                            <h2
                                style={{
                                    fontFamily: 'Cinzel, serif',
                                    fontSize: '28px',
                                    color: '#800020',
                                    marginTop: '48px',
                                    marginBottom: '16px',
                                }}
                            >
                                Rechtlicher Hinweis zu den geschützten Inhalten
                            </h2>

                            <p style={{ marginBottom: '24px' }}>
                                Inhalt und Struktur dieser Internet-Seite sind
                                urheberrechtlich geschützt. Die
                                Vervielfältigung, Verbreitung, Veröffentlichung,
                                Veränderung, Bereitstellung für Dritte oder
                                Bearbeitung sämtlicher Inhalte und
                                Strukturelemente, insbesondere Texte, Textteile,
                                Bildmaterial, Grafiken, Programme und
                                Designelemente, bedarf der ausdrücklichen
                                vorherigen schriftlichen Zustimmung des
                                Anbieters, sofern und soweit die Inhalte und
                                Strukturelemente nach deutschem Recht,
                                insbesondere deutschem Urheberrecht, schutzfähig
                                sind. Insbesondere bedarf die Übernahme auf
                                andere Internet-Seiten der vorgenannten
                                Zustimmung. Ohne Zustimmung ist lediglich die
                                private, nicht kommerzielle Nutzung der Inhalte
                                und Strukturelemente ohne deren Bearbeitung an
                                jeweils einem Arbeitsplatz zulässig. Der
                                Anbieter prüft und aktualisiert die Inhalte auf
                                dieser Internet-Seite regelmäßig. Trotz aller
                                Sorgfalt können sich zwischenzeitlich Änderungen
                                ergeben. Der Anbieter übernimmt keine Gewähr
                                dafür, dass alle Angaben zu jeder Zeit
                                vollständig, richtig und aktuell dargestellt
                                sind. Dies gilt insbesondere für alle
                                Verbindungen (Links) zu anderen Internet-Seiten,
                                auf die direkt oder indirekt verwiesen wird.
                                Alle Angaben können ohne vorherige Ankündigung
                                geändert, entfernt oder ergänzt werden. Der
                                Inhaber ist für die Inhalte anderer
                                Internet-Seiten, die der Nutzer durch
                                Aktivierung eines Links erreicht, nicht
                                verantwortlich.
                            </p>

                        </div>
                    </div>
                </section>

                <footer className="footer">
                    <div className="footer-grid container">
                        <div className="footer-col">
                            <h3>Café Wagner</h3>
                            <p>
                                Eine barocke Atmosphäre, gepaart mit modernem
                                Purismus
                            </p>
                        </div>
                        <div className="footer-col">
                            <h3>Adresse</h3>
                            <p>
                                Richard-Wagner-Platz 1<br />
                                D-04109 Leipzig
                            </p>
                        </div>
                        <div className="footer-col">
                            <h3>Kontakt</h3>
                            <p>
                                Telefon: 0341 99 99 49 48
                                <br />
                                E-Mail: mail@cafe-wagner.de
                            </p>
                        </div>
                        <div className="footer-col">
                            <h3>Öffnungszeiten</h3>
                            <p>
                                Mo-Fr: 10:00 - 22:00 Uhr
                                <br />
                                Sa-So: 09:00 - 23:00 Uhr
                            </p>
                        </div>
                    </div>
                    <div className="footer-bottom container">
                        <p>© 2013 Café Wagner. Alle Rechte vorbehalten.</p>
                        <div style={{ display: 'flex', gap: '16px' }}>
                            <a href="/impressum">Impressum</a>
                            <a href="/datenschutz">Datenschutz</a>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
