import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import '../../css/wagner.css';

interface MenuSection {
    title: string;
    subtitle: string;
    items: [string, string, string][];
}

interface Event {
    id: number;
    name: string;
    date: string;
    time_from: string;
    time_to: string;
    notes?: string;
    image?: string;
}

interface WelcomeProps {
    menuSections: MenuSection[];
    events: Event[];
}

export default function Welcome({ menuSections = [], events = [] }: WelcomeProps) {
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
    const [reservationForm, setReservationForm] = useState({
        name: '',
        email: '',
        phone: '',
        guests: '',
        date: '',
        time: '',
    });

    const toggleSection = (sectionTitle: string) => {
        setExpandedSections(prev => ({
            ...prev,
            [sectionTitle]: !prev[sectionTitle]
        }));
    };

    const handleSubmitReservation = (e: React.FormEvent) => {
        e.preventDefault();

        router.post('/reservations', {
            name: reservationForm.name,
            phone: reservationForm.phone,
            guests: parseInt(reservationForm.guests) || 1,
            date: reservationForm.date,
            time: reservationForm.time,
            notes: reservationForm.email ? `E-Mail: ${reservationForm.email}` : '',
        }, {
            onSuccess: () => {
                setShowConfirmation(true);
                setReservationForm({
                    name: '',
                    email: '',
                    phone: '',
                    guests: '',
                    date: '',
                    time: '',
                });
            },
        });
    };
    return (
        <>
            <Head title="Café Wagner">
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500&family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&display=swap"
                />
            </Head>
            <div className="wagner-page page">
                <header className="nav">
                    <div className="logo">WAGNER</div>
                    <nav>
                        <a href="#home">Home</a>
                        <a href="#geschichte">Cafe Wagner</a>
                        <a href="#speisekarte">Speisekarte</a>
                        <a href="#galerie">Galerie</a>
                        <a href="#reservierung">Reservierung</a>
                        <a href="#veranstaltungen">Veranstaltungen</a>
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
                        {menuSections.map((section) => {
                            const isExpanded = expandedSections[section.title];
                            const hasMoreItems = section.items.length > 3;
                            const itemsToShow = isExpanded || !hasMoreItems
                                ? section.items
                                : section.items.slice(0, 3);

                            return (
                                <article
                                    key={section.title}
                                    className="menu-section"
                                >
                                    <h3>{section.title}</h3>
                                    <p className="menu-type">{section.subtitle}</p>
                                    {itemsToShow.map(([name, desc, price]) => (
                                        <div key={name} className="menu-item">
                                            <div>
                                                <h4>{name}</h4>
                                                <p>{desc}</p>
                                            </div>
                                            <span>{price}</span>
                                        </div>
                                    ))}
                                    {hasMoreItems && (
                                        <button
                                            onClick={() => toggleSection(section.title)}
                                            className="show-more-button"
                                        >
                                            {isExpanded ? 'Weniger anzeigen' : 'Mehr anzeigen'}
                                        </button>
                                    )}
                                </article>
                            );
                        })}
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
                            Senden Sie uns eine Reservierungsanfrage - wir melden uns zeitnah zur Bestätigung
                        </p>
                        <form className="reservation-form" onSubmit={handleSubmitReservation}>
                            <input
                                placeholder="Name"
                                value={reservationForm.name}
                                onChange={(e) => setReservationForm({ ...reservationForm, name: e.target.value })}
                                required
                            />
                            <input
                                type="email"
                                placeholder="E-Mail"
                                value={reservationForm.email}
                                onChange={(e) => setReservationForm({ ...reservationForm, email: e.target.value })}
                            />
                            <input
                                type="tel"
                                placeholder="Telefon"
                                value={reservationForm.phone}
                                onChange={(e) => setReservationForm({ ...reservationForm, phone: e.target.value })}
                                required
                            />
                            <input
                                type="number"
                                min="1"
                                placeholder="Anzahl der Gäste"
                                value={reservationForm.guests}
                                onChange={(e) => setReservationForm({ ...reservationForm, guests: e.target.value })}
                                required
                            />
                            <div style={{ position: 'relative', gridColumn: 'span 1' }}>
                                <input
                                    type="date"
                                    placeholder="Datum"
                                    value={reservationForm.date}
                                    onChange={(e) => setReservationForm({ ...reservationForm, date: e.target.value })}
                                    required
                                    style={{ width: '100%', paddingRight: '40px' }}
                                />
                                <img
                                    src="/icons/calendar.svg"
                                    alt=""
                                    style={{
                                        position: 'absolute',
                                        right: '12px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        width: '16px',
                                        height: '16px',
                                        cursor: 'pointer',
                                        filter: 'invert(11%) sepia(73%) saturate(5348%) hue-rotate(336deg) brightness(78%) contrast(117%)'
                                    }}
                                    onClick={() => document.querySelector('input[type="date"]')?.showPicker?.()}
                                />
                            </div>
                            <div style={{ position: 'relative', gridColumn: 'span 1' }}>
                                <input
                                    type="time"
                                    placeholder="Uhrzeit"
                                    value={reservationForm.time}
                                    onChange={(e) => setReservationForm({ ...reservationForm, time: e.target.value })}
                                    required
                                    style={{ width: '100%', paddingRight: '40px' }}
                                />
                                <img
                                    src="/icons/clock.svg"
                                    alt=""
                                    style={{
                                        position: 'absolute',
                                        right: '12px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        width: '16px',
                                        height: '16px',
                                        cursor: 'pointer',
                                        filter: 'invert(11%) sepia(73%) saturate(5348%) hue-rotate(336deg) brightness(78%) contrast(117%)'
                                    }}
                                    onClick={() => document.querySelector('input[type="time"]')?.showPicker?.()}
                                />
                            </div>
                            <button className="button" type="submit">
                                Reservierungsanfrage senden
                            </button>
                        </form>
                        <p className="reservation-notice">
                            Ihre Reservierung ist erst nach unserer Bestätigung verbindlich.
                            <br /><br />
                            Mit dem Absenden der Anfrage nehmen Sie zur Kenntnis, dass Ihre Angaben zur Bearbeitung Ihrer Reservierungsanfrage verarbeitet werden. Weitere Informationen finden Sie in unserer <a href="/datenschutz">Datenschutzerklärung</a>.
                        </p>
                        <p className="contact-line">0341 99 99 49 48</p>
                        <p className="contact-line">info@wagner-cafe.de</p>
                    </div>
                </section>

                <section id="veranstaltungen" className="section">
                    <div className="events container">
                        <h2>Veranstaltungen</h2>
                        <p className="caption">
                            Erleben Sie besondere Momente bei unseren exklusiven Events
                        </p>

                        {events.length === 0 ? (
                            <div className="no-events">
                                <p className="empty-message">
                                    Bleiben Sie dran für kommende Veranstaltungen
                                </p>
                            </div>
                        ) : (
                            <div className="events-grid">
                                {events.map((event) => (
                                    <div key={event.id} className="event-card">
                                        {event.image && (
                                            <img
                                                src={`/storage/${event.image}`}
                                                alt={event.name}
                                                className="event-image"
                                            />
                                        )}
                                        <h3 className="event-name">{event.name}</h3>
                                        <div className="event-details">
                                            <div className="event-detail">
                                                <span className="event-icon">📅</span>
                                                <span>{event.date}</span>
                                            </div>
                                            <div className="event-detail">
                                                <span className="event-icon">🕐</span>
                                                <span>{event.time_from} - {event.time_to}</span>
                                            </div>
                                        </div>
                                        {event.notes && (
                                            <p className="event-description">{event.notes}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
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
                    <div className="footer-bottom container">
                        <p>© 2013 Café Wagner. Alle Rechte vorbehalten.</p>
                        <div style={{ display: 'flex', gap: '16px' }}>
                            <a href="/impressum">Impressum</a>
                            <a href="/datenschutz">Datenschutz</a>
                        </div>
                    </div>
                </footer>

                {/* Confirmation Modal */}
                {showConfirmation && (
                    <div
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 9999,
                        }}
                        onClick={() => setShowConfirmation(false)}
                    >
                        <div
                            style={{
                                backgroundColor: '#faf8f5',
                                borderRadius: '10px',
                                padding: '40px',
                                maxWidth: '500px',
                                width: '90%',
                                textAlign: 'center',
                                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div
                                style={{
                                    fontSize: '48px',
                                    marginBottom: '20px',
                                }}
                            >
                                ✓
                            </div>
                            <h2
                                style={{
                                    fontFamily: "'Cinzel', serif",
                                    fontSize: '24px',
                                    marginBottom: '20px',
                                    color: '#800020',
                                }}
                            >
                                Reservierungsanfrage erhalten
                            </h2>
                            <p
                                style={{
                                    fontFamily: "'Cormorant Garamond', serif",
                                    fontSize: '18px',
                                    lineHeight: '1.6',
                                    marginBottom: '30px',
                                    color: '#2d1b1b',
                                }}
                            >
                                Vielen Dank für Ihre Anfrage! Wir haben Ihre Reservierungsdaten erhalten und werden uns zeitnah bei Ihnen melden, um die Reservierung zu bestätigen.
                            </p>
                            <button
                                onClick={() => setShowConfirmation(false)}
                                style={{
                                    backgroundColor: '#800020',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '10px',
                                    padding: '12px 32px',
                                    fontSize: '16px',
                                    fontFamily: "'Cormorant Garamond', serif",
                                    cursor: 'pointer',
                                    transition: 'background-color 0.3s',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = '#600018';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = '#800020';
                                }}
                            >
                                Verstanden
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
