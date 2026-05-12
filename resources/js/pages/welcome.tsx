import { Head } from '@inertiajs/react';
import '../../css/wagner.css';

const menuSections = [
    {
        title: 'Unsere geschützten Spezialitäten',
        subtitle: '',
        items: [
            [
                'Żurek',
                'Herzhafte polnische Mehlsuppe mit Würstchen und Kartoffeln',
                '€8,90',
            ],
            [
                'Bigos',
                'Krauteintopf aus gedunstetem Sauerkraut mit verschieden Fleisch und Wurstsorten',
                '€10,90',
            ],
            [
                'Pierogi Ruskie',
                'Teigtaschen gefüllt mit Quark und Kartoffeln',
                '€12,90',
            ],
        ],
    },
    {
        title: 'Frühstück',
        subtitle: '',
        items: [
            [
                'Sweet',
                'zwei Buttercroissant, Marmelade, Honig, Nutella, Butter und verschiedene Brotsorten',
                '€10,90',
            ],
            [
                'Ideal',
                'Parmaschinken, Coppa, Salami, Emmentaler, Ei, Marmelade, Butter und verschiedene Brotsorten',
                '€14,90',
            ],
            [
                'Formaggio',
                'verschiedene Käsesorten, Buttermilch, Butter und verschiedene Brotsorten',
                '€14,90',
            ],
            [
                'Toskana',
                'Parmaschinken, Coppa, Caprese, Antipasti und verschiedene Brotsorten',
                '€14,90',
            ],
        ],
    },
    {
        title: 'Salate',
        subtitle: '',
        items: [
            [
                'Gemischter Salat',
                'mit Hähnchenstreifen und Hausdressing',
                '€14,90',
            ],
            ['Caprese', 'mit Tomaten, Mozarella und Olivenöl', '€9,90'],
            ['Rucola', 'mit Ziegenkäse, Walnüssen und Hausdressing', '€14,90'],
        ],
    },
];

export default function Welcome() {
    return (
        <>
            <Head title="Café Wagner">
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500&family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&display=swap"
                />
            </Head>
            <div className="page">
                <header className="nav">
                    <div className="logo">WAGNER</div>
                    <nav>
                        <a href="#home">Home</a>
                        <a href="#geschichte">Cafe Wagner</a>
                        <a href="#speisekarte">Speisekarte</a>
                        <a href="#galerie">Galerie</a>
                        <a href="#reservierung">Reservierung</a>
                    </nav>
                </header>

                <section id="home" className="hero">
                    <img src="/1.jpg" alt="Restaurant interior" />
                    <div className="overlay" />
                    <div className="hero-copy">
                        <h1>CAFÉ WAGNER</h1>
                        <p className="sub">
                            eine Hommage an den großen Komponisten der
                            Messemetropole
                        </p>
                        <p className="intro">
                            Eine barocke Atmosphäre, gepaart mit modernem
                            Purismus – als stilvolles Kleinod heißt das Café
                            WAGNER seine Gäste herzlich willkommen!
                        </p>
                        <a href="#reservierung" className="button">
                            Tisch reservieren
                        </a>
                    </div>
                </section>

                <section id="geschichte" className="about section section-soft">
                    <div className="two-col container">
                        <div>
                            <h2>Unsere Geschichte</h2>
                            <p>
                                Ob geschäftliche Unterredung, der Treff zum
                                Mittagssnack, ein klassisches Rendezvous oder
                                die Verabredung zu Kaffee und Kuchen mit der
                                Familie oder Freunden – im Café WAGNER in
                                Leipzig ist jeder und immer herzlich willkommen!
                            </p>
                            <p>
                                Die bekannte Gastronomin Celina Kutylo hat sich
                                in den vergangenen Jahren einen Namen in der
                                kulinarischen Landschaft Leipzigs gemacht.
                            </p>

                            <p>
                                Wer einmal bei ihr und ihrem Team einkehrt, der
                                spürt, worin der Charme des Cafés besteht:
                            </p>
                            <p>
                                familiäres Wohlfühlambiente, Leidenschaft für
                                Service und Dienstleistung, wahre Freude an der
                                Begegnung mit Menschen und die Fähigkeit, die
                                unterschiedlichsten Leute auch mal miteinander
                                bekannt zu machen.
                            </p>
                            <p>
                                Das alles, gepaart mit guter Kommunikation,
                                Fingerspitzengefühl und auch Diskretion, macht
                                die Atmosphäre des Café WAGNERS so angenehm und
                                sorgt dafür, dass aus vielen Gästen Stammgäste
                                werden und man sich beim erneuten Einkehren im
                                Café WAGNER eher wie ein Freund des Hauses
                                fühlt.
                            </p>
                            <p>
                                Doch das Café WAGNER ist nicht nur ein Ort, wo
                                sich interessante und angenehme Menschen
                                treffen, es ist auch eine Umgebung, in der zudem
                                der kulinarische Genuss nicht zu kurz kommt.
                            </p>
                            <p>
                                Kuchen, herzhafte Snacks, Suppen oder Salat: die
                                Speisekarte hält eine stets feine Auswahl an
                                Speisen bereit. Und wer die Abendstimmung auf
                                dem Wagner-Platz bei einem guten Glas Wein
                                genießen möchte, wird auf der Weinkarte des
                                ansprechenden Kleinods ganz bestimmt fündig.
                            </p>
                            <p>
                                Menschen, die gern in einer niveauvollen
                                Atmosphäre feiern und auf gleichgesinnte
                                Zeitgenossen treffen möchten, lädt das Café
                                WAGNER in regelmäßigen Abständen zu verschiedene
                                Veranstaltungen ein. Egal, ob Sommer oder
                                Winter: bittet Inhaberin Kutylo zu ihren
                                begehrten Events, sind kurzweilige Abende,
                                leckere kulinarische Highlights und neue
                                Kontakte zu anderen, spannenden Gästen
                                garantiert!
                            </p>
                            <p>
                                So mancher fand hier schon seine große Liebe,
                                traf auf interessierte Geschäftspartner oder
                                lernte neue Leute kennen, die heute zu seinem
                                Freundeskreis gehören.
                            </p>
                            <p>
                                Getreu dem Motto „die Mischung machts“ sind
                                Veranstaltungen im Café WAGNER immer ein Garant,
                                seine Zeit intensiv und sinnvoll mit
                                niveauvollen und interessanten Menschen zu
                                verbringen.
                            </p>
                            <p>Wann dürfen wir Sie bei uns begrüßen?</p>
                            <p>
                                Herzlichst,
                                <br />
                                Celina Kutylo & Team
                            </p>
                        </div>
                        <img
                            src="/wagner-kuchen.jpeg"
                            alt="Dining hall"
                            className="about-photo"
                        />
                    </div>
                </section>

                <section id="speisekarte" className="section">
                    <div className="menu container">
                        <h2>Unsere Speisekarte</h2>
                        <p className="caption">
                            Eine kulinarische Oper in drei Akten
                        </p>
                        {menuSections.map((section) => (
                            <article
                                key={section.title}
                                className="menu-section"
                            >
                                <h3>{section.title}</h3>
                                <p className="menu-type">{section.subtitle}</p>
                                {section.items.map(([name, desc, price]) => (
                                    <div key={name} className="menu-item">
                                        <div>
                                            <h4>{name}</h4>
                                            <p>{desc}</p>
                                        </div>
                                        <span>{price}</span>
                                    </div>
                                ))}
                            </article>
                        ))}
                    </div>
                </section>

                <section id="galerie" className="section section-soft">
                    <div className="container">
                        <h2>Galerie</h2>
                        <p className="caption">
                            Momente aus unserem kulinarischen Theater
                        </p>
                        <div className="gallery-grid">
                            {['6', '4', '3_clean', '2'].map((id) => (
                                <img key={id} src={`/${id}.jpg`} alt="" />
                            ))}
                        </div>
                    </div>
                </section>

                <section id="reservierung" className="section">
                    <div className="reservation container">
                        <h2>Reservierung</h2>
                        <p className="caption">
                            Reservieren Sie Ihren Tisch fur ein unvergessliches
                            Erlebnis
                        </p>
                        <form className="reservation-form">
                            <input placeholder="Name" />
                            <input placeholder="E-Mail" />
                            <input placeholder="Telefon" />
                            <input placeholder="Anzahl der Gaste" />
                            <input placeholder="Datum" />
                            <input placeholder="Uhrzeit" />
                            <button className="button" type="button">
                                Jetzt reservieren
                            </button>
                        </form>
                        <p className="contact-line">0341 99 99 49 48</p>
                        <p className="contact-line">info@wagner-cafe.de</p>
                    </div>
                </section>

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
                </footer>
            </div>
        </>
    );
}
