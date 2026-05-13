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
                        <h1 style={{
                            fontFamily: 'Cinzel, serif',
                            fontSize: '48px',
                            color: '#800020',
                            textAlign: 'center',
                            marginBottom: '48px'
                        }}>
                            Impressum
                        </h1>

                        <div style={{ lineHeight: '1.8', fontSize: '18px' }}>
                            <h2 style={{
                                fontFamily: 'Cinzel, serif',
                                fontSize: '28px',
                                color: '#800020',
                                marginTop: '32px',
                                marginBottom: '16px'
                            }}>
                                Anbieterkennzeichnung gem. § 5 TMG
                            </h2>

                            <p style={{ marginBottom: '24px' }}>
                                Celina Kutylo<br />
                                Richard-Wagner-Platz 1<br />
                                D-04109 Leipzig
                            </p>

                            <p style={{ marginBottom: '32px' }}>
                                E-Mail: mail@cafe-wagner.de
                            </p>

                            <h2 style={{
                                fontFamily: 'Cinzel, serif',
                                fontSize: '28px',
                                color: '#800020',
                                marginTop: '48px',
                                marginBottom: '16px'
                            }}>
                                Rechtlicher Hinweis zu den geschützten Inhalten
                            </h2>

                            <p style={{ marginBottom: '24px' }}>
                                Inhalt und Struktur dieser Internet-Seite sind urheberrechtlich geschützt. Die Vervielfältigung, Verbreitung, Veröffentlichung, Veränderung, Bereitstellung für Dritte oder Bearbeitung sämtlicher Inhalte und Strukturelemente, insbesondere Texte, Textteile, Bildmaterial, Grafiken, Programme und Designelemente, bedarf der ausdrücklichen vorherigen schriftlichen Zustimmung des Anbieters, sofern und soweit die Inhalte und Strukturelemente nach deutschem Recht, insbesondere deutschem Urheberrecht, schutzfähig sind. Insbesondere bedarf die Übernahme auf andere Internet-Seiten der vorgenannten Zustimmung. Ohne Zustimmung ist lediglich die private, nicht kommerzielle Nutzung der Inhalte und Strukturelemente ohne deren Bearbeitung an jeweils einem Arbeitsplatz zulässig. Der Anbieter prüft und aktualisiert die Inhalte auf dieser Internet-Seite regelmäßig. Trotz aller Sorgfalt können sich zwischenzeitlich Änderungen ergeben. Der Anbieter übernimmt keine Gewähr dafür, dass alle Angaben zu jeder Zeit vollständig, richtig und aktuell dargestellt sind. Dies gilt insbesondere für alle Verbindungen (Links) zu anderen Internet-Seiten, auf die direkt oder indirekt verwiesen wird. Alle Angaben können ohne vorherige Ankündigung geändert, entfernt oder ergänzt werden. Der Inhaber ist für die Inhalte anderer Internet-Seiten, die der Nutzer durch Aktivierung eines Links erreicht, nicht verantwortlich.
                            </p>

                            <h2 style={{
                                fontFamily: 'Cinzel, serif',
                                fontSize: '28px',
                                color: '#800020',
                                marginTop: '48px',
                                marginBottom: '16px'
                            }}>
                                Weitere Hinweise zum Datenschutz
                            </h2>

                            <p style={{ marginBottom: '24px' }}>
                                Der Schutz Ihrer personenbezogenen Daten ist uns wichtig. Die Erhebung, Verarbeitung und Nutzung personenbezogener Daten erfolgt ausschließlich unter Beachtung der geltenden datenschutzrechtlichen Vorschriften, insbesondere der Datenschutz-Grundverordnung (DSGVO), des Bundesdatenschutzgesetzes (BDSG), des Digitale-Dienste-Gesetzes (DDG) sowie des Telekommunikation-Digitale-Dienste-Datenschutz-Gesetzes (TDDDG).
                            </p>

                            <p style={{ marginBottom: '24px' }}>
                                Personenbezogene Daten werden nur verarbeitet, soweit dies zur Bereitstellung unserer Website, zur Bearbeitung Ihrer Anfragen, zur Durchführung vorvertraglicher Maßnahmen oder zur Wahrung berechtigter Interessen erforderlich ist oder Sie ausdrücklich eingewilligt haben.
                            </p>

                            <p style={{ marginBottom: '24px' }}>
                                Beim Besuch unserer Website können technische Daten verarbeitet werden, insbesondere IP-Adresse, Datum und Uhrzeit des Zugriffs, aufgerufene Seiten, verwendeter Browser, Betriebssystem sowie Referrer-URL. Diese Daten werden verarbeitet, um die technische Bereitstellung, Stabilität und Sicherheit der Website zu gewährleisten. Rechtsgrundlage hierfür ist Art. 6 Abs. 1 lit. f DSGVO.
                            </p>

                            <p style={{ marginBottom: '32px' }}>
                                Beim Besuch unserer öffentlichen Website setzen wir ausschließlich technisch notwendige Cookies ein. Diese umfassen Session-Cookies zur Verwaltung Ihrer Sitzung sowie CSRF-Schutz-Cookies zur Sicherheit von Formularen. Diese Cookies sind für die Funktion der Website erforderlich und werden auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO gesetzt. Im geschützten Verwaltungsbereich unserer Website können zusätzliche Cookies zur Speicherung von Benutzereinstellungen (z.B. Darstellungsoptionen) gesetzt werden. Diese dienen ausschließlich der Nutzerfreundlichkeit für authentifizierte Mitarbeiter. Sie können Ihren Browser so einstellen, dass Sie über das Setzen von Cookies informiert werden, Cookies nur im Einzelfall erlauben oder die Annahme von Cookies generell ausschließen.
                            </p>

                            <h3 style={{
                                fontFamily: 'Cinzel, serif',
                                fontSize: '24px',
                                color: '#800020',
                                marginTop: '32px',
                                marginBottom: '16px'
                            }}>
                                Reservierungsanfragen per E-Mail
                            </h3>

                            <p style={{ marginBottom: '24px' }}>
                                Sie können Reservierungsanfragen per E-Mail an uns richten. In diesem Fall verarbeiten wir die von Ihnen übermittelten Angaben, insbesondere Name, E-Mail-Adresse, Telefonnummer, gewünschtes Datum, gewünschte Uhrzeit, Anzahl der Personen sowie gegebenenfalls weitere Angaben aus Ihrer Nachricht.
                            </p>

                            <p style={{ marginBottom: '24px' }}>
                                Die Verarbeitung erfolgt ausschließlich zum Zweck der Bearbeitung Ihrer Reservierungsanfrage und der damit verbundenen Kommunikation. Eine per E-Mail gestellte Reservierung stellt zunächst lediglich eine Anfrage dar. Die Reservierung kommt erst zustande, wenn wir diese ausdrücklich bestätigen.
                            </p>

                            <p style={{ marginBottom: '24px' }}>
                                Rechtsgrundlage für die Verarbeitung ist Art. 6 Abs. 1 lit. b DSGVO, soweit die Verarbeitung zur Bearbeitung Ihrer Reservierungsanfrage oder zur Durchführung vorvertraglicher Maßnahmen erforderlich ist. Soweit die Verarbeitung der organisatorischen Bearbeitung eingehender Anfragen dient, erfolgt sie außerdem auf Grundlage unseres berechtigten Interesses gemäß Art. 6 Abs. 1 lit. f DSGVO.
                            </p>

                            <p style={{ marginBottom: '32px' }}>
                                Für die Bereitstellung und Verarbeitung unserer E-Mail-Kommunikation nutzen wir Dienste der IONOS SE, Elgendorfer Str. 57, 56410 Montabaur, Deutschland. Soweit IONOS personenbezogene Daten in unserem Auftrag verarbeitet, erfolgt dies auf Grundlage eines Vertrags zur Auftragsverarbeitung gemäß Art. 28 DSGVO.
                            </p>

                            <h3 style={{
                                fontFamily: 'Cinzel, serif',
                                fontSize: '24px',
                                color: '#800020',
                                marginTop: '32px',
                                marginBottom: '16px'
                            }}>
                                Reservierungsanfragen über das Reservierungsformular
                            </h3>

                            <p style={{ marginBottom: '24px' }}>
                                Wenn Sie das Reservierungsformular auf unserer Website nutzen, verarbeiten wir die von Ihnen eingegebenen Daten, insbesondere Name, E-Mail-Adresse, Telefonnummer, gewünschtes Datum, gewünschte Uhrzeit, Anzahl der Personen sowie gegebenenfalls weitere Angaben aus dem Nachrichtenfeld.
                            </p>

                            <p style={{ marginBottom: '24px' }}>
                                Die über das Formular übermittelten Daten werden in unserem Website- bzw. Datenbanksystem gespeichert, damit unser Personal die Anfrage einsehen, bearbeiten, bestätigen oder ablehnen kann. Je nach technischer Umsetzung kann zusätzlich eine Benachrichtigung per E-Mail an uns versendet werden.
                            </p>

                            <p style={{ marginBottom: '24px' }}>
                                Auch eine über das Formular gestellte Reservierung stellt zunächst lediglich eine Anfrage dar. Eine verbindliche Reservierung kommt erst zustande, wenn wir diese ausdrücklich bestätigen.
                            </p>

                            <p style={{ marginBottom: '32px' }}>
                                Die Verarbeitung erfolgt zum Zweck der Bearbeitung Ihrer Reservierungsanfrage und der damit verbundenen Kommunikation. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, soweit die Verarbeitung zur Bearbeitung Ihrer Anfrage oder zur Durchführung vorvertraglicher Maßnahmen erforderlich ist. Ergänzend kann die Verarbeitung auf Grundlage unseres berechtigten Interesses an einer geordneten Bearbeitung und Verwaltung eingehender Reservierungsanfragen gemäß Art. 6 Abs. 1 lit. f DSGVO erfolgen.
                            </p>

                            <h3 style={{
                                fontFamily: 'Cinzel, serif',
                                fontSize: '24px',
                                color: '#800020',
                                marginTop: '32px',
                                marginBottom: '16px'
                            }}>
                                Zugriff auf Reservierungsdaten
                            </h3>

                            <p style={{ marginBottom: '32px' }}>
                                Zugriff auf Reservierungsdaten erhalten nur die Personen, die diese Daten zur Bearbeitung der Anfrage benötigen. Der Zugriff auf das interne Verwaltungssystem ist durch geeignete technische und organisatorische Maßnahmen geschützt.
                            </p>

                            <h3 style={{
                                fontFamily: 'Cinzel, serif',
                                fontSize: '24px',
                                color: '#800020',
                                marginTop: '32px',
                                marginBottom: '16px'
                            }}>
                                Speicherdauer
                            </h3>

                            <p style={{ marginBottom: '32px' }}>
                                Wir speichern personenbezogene Daten nur so lange, wie dies für die Bearbeitung Ihrer Anfrage, die Durchführung der Reservierung oder zur Erfüllung gesetzlicher Pflichten erforderlich ist. Reservierungsanfragen werden gelöscht, sobald sie für die genannten Zwecke nicht mehr benötigt werden, sofern keine gesetzlichen Aufbewahrungspflichten entgegenstehen.
                            </p>

                            <h3 style={{
                                fontFamily: 'Cinzel, serif',
                                fontSize: '24px',
                                color: '#800020',
                                marginTop: '32px',
                                marginBottom: '16px'
                            }}>
                                Weitergabe von Daten
                            </h3>

                            <p style={{ marginBottom: '32px' }}>
                                Eine Weitergabe Ihrer personenbezogenen Daten an Dritte erfolgt nur, soweit dies zur Bearbeitung Ihrer Anfrage erforderlich ist, eine gesetzliche Verpflichtung besteht oder wir hierfür eine Rechtsgrundlage nach der DSGVO haben. Eine darüber hinausgehende Weitergabe zu Werbezwecken erfolgt nicht.
                            </p>

                            <h3 style={{
                                fontFamily: 'Cinzel, serif',
                                fontSize: '24px',
                                color: '#800020',
                                marginTop: '32px',
                                marginBottom: '16px'
                            }}>
                                Betroffenenrechte
                            </h3>

                            <p style={{ marginBottom: '24px' }}>
                                Sie haben im Rahmen der gesetzlichen Voraussetzungen das Recht auf Auskunft über die zu Ihrer Person gespeicherten Daten, das Recht auf Berichtigung unrichtiger Daten, das Recht auf Löschung, das Recht auf Einschränkung der Verarbeitung, das Recht auf Datenübertragbarkeit sowie das Recht auf Widerspruch gegen bestimmte Verarbeitungen.
                            </p>

                            <p style={{ marginBottom: '24px' }}>
                                Soweit eine Verarbeitung auf Ihrer Einwilligung beruht, können Sie diese Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen.
                            </p>

                            <p style={{ marginBottom: '48px' }}>
                                Außerdem haben Sie das Recht, sich bei einer zuständigen Datenschutzaufsichtsbehörde zu beschweren, wenn Sie der Ansicht sind, dass die Verarbeitung Ihrer personenbezogenen Daten gegen datenschutzrechtliche Vorschriften verstößt.
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
                        <p>© 2024 Café Wagner. Alle Rechte vorbehalten.</p>
                        <a href="/impressum">Impressum</a>
                    </div>
                </footer>
            </div>
        </>
    );
}
