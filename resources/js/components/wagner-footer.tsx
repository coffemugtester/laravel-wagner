export default function WagnerFooter() {
    return (
        <footer className="footer">
            <div className="footer-grid container">
                <div>
                    <h3>WAGNER</h3>
                    <p>
                        "Wo kulinarische Kunst auf musikalisches Genie
                        trifft"
                    </p>
                </div>
                <div>
                    <h4>Kontakt</h4>
                    <p>
                        Richard-Wagner-Platz, 04109 Leipzig, Deutschland
                    </p>
                    <p>0341 99 99 49 48</p>
                    <p>info@wagner-cafe.de</p>
                </div>
                <div>
                    <h4>Offnungszeiten</h4>
                    <p>Mo-Sa: 09:00 - bis open end</p>
                    <p>So: 09:00 - 18:00 Uhr</p>
                    <p>Mit netten Gäste bleiben wir gerne länger</p>
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
    );
}
