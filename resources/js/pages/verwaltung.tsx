import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

interface Reservation {
    id: number;
    name: string;
    date: string;
    date_raw: string;
    time: string;
    guests: number;
    phone: string;
    notes?: string;
    processed: boolean;
}

interface Event {
    id: number;
    name: string;
    date: string;
    date_raw: string;
    time_from: string;
    time_to: string;
    notes?: string;
    image?: string;
}

interface MenuItem {
    id: number;
    name: string;
    category: string;
    price: number | string;
    description: string;
    available: boolean;
}

const mockReservations: Reservation[] = [
    {
        id: 1,
        name: 'Sarah Müller',
        date: '10. Mai 2026',
        time: '19:00',
        guests: 4,
        phone: '030 123-4567',
        notes: 'Fensterplatz bevorzugt',
    },
    {
        id: 2,
        name: 'Michael Schmidt',
        date: '10. Mai 2026',
        time: '20:00',
        guests: 2,
        phone: '030 234-5678',
    },
    {
        id: 3,
        name: 'Emma Fischer',
        date: '11. Mai 2026',
        time: '18:30',
        guests: 6,
        phone: '030 345-6789',
        notes: 'Jubiläumsfeier',
    },
    {
        id: 4,
        name: 'Thomas Weber',
        date: '11. Mai 2026',
        time: '19:30',
        guests: 3,
        phone: '030 456-7890',
    },
];

const categories = [
    'Alle',
    'Unsere geschützten Spezialitäten',
    'Frühstück',
    'Sandwich',
    'Suppen',
    'Salate',
    'Anti Pasta',
    'Sweets und Crepes',
    'Kuchen und Torten',
    'Heiße Getränke',
    'Teekarte',
    'Alkoholfreie Getränke',
    'Säfte, Nektare, Fruchtsäfte',
    'Biere',
    'Sekt - Champagner - Prosecco',
    'Aperitif',
    'Weissweine',
    'Rotweine',
    'Likör',
    'Gin',
    'Tequila',
    'Scotch Whiskey',
    'Irish Whiskey',
    'Malt Whiskey',
    'American Whiskey',
    'Bitter',
    'Digestif',
    'Grappa',
    'Rum',
    'Klare und Brände',
    'Cocktails and Drinks',
    'Non Alcoholic Drinks',
] as const;

interface VerwaltungProps {
    menuItems: MenuItem[];
    reservations: Reservation[];
    events: Event[];
}

export default function Verwaltung({ menuItems = [], reservations = [], events = [] }: VerwaltungProps) {
    const [activeTab, setActiveTab] = useState<'reservierungen' | 'veranstaltungen' | 'speisekarte'>('reservierungen');
    const [selectedCategory, setSelectedCategory] = useState<(typeof categories)[number]>('Alle');
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingReservation, setEditingReservation] = useState<Reservation | null>(null);
    const [isReservationAddModalOpen, setIsReservationAddModalOpen] = useState(false);
    const [newReservation, setNewReservation] = useState<Omit<Reservation, 'id'>>({
        name: '',
        date: '',
        time: '',
        guests: 2,
        phone: '',
        notes: '',
    });
    const [isEventEditModalOpen, setIsEventEditModalOpen] = useState(false);
    const [editingEvent, setEditingEvent] = useState<Event | null>(null);
    const [editingEventImage, setEditingEventImage] = useState<File | null>(null);
    const [isEventAddModalOpen, setIsEventAddModalOpen] = useState(false);
    const [newEvent, setNewEvent] = useState<Omit<Event, 'id'>>({
        name: '',
        date: '',
        date_raw: '',
        time_from: '',
        time_to: '',
        notes: '',
    });
    const [newEventImage, setNewEventImage] = useState<File | null>(null);
    const [isMenuEditModalOpen, setIsMenuEditModalOpen] = useState(false);
    const [editingMenuItem, setEditingMenuItem] = useState<MenuItem | null>(null);
    const [isMenuAddModalOpen, setIsMenuAddModalOpen] = useState(false);
    const [newMenuItem, setNewMenuItem] = useState<Omit<MenuItem, 'id'>>({
        name: '',
        category: categories[1], // First non-"Alle" category
        price: 0,
        description: '',
        available: true,
    });

    const openEditModal = (reservation: Reservation) => {
        setEditingReservation({ ...reservation });
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setEditingReservation(null);
    };

    const handleUpdateReservation = () => {
        if (editingReservation) {
            router.put(`/reservations/${editingReservation.id}`, {
                name: editingReservation.name,
                date: editingReservation.date_raw,
                time: editingReservation.time,
                guests: editingReservation.guests,
                phone: editingReservation.phone,
                notes: editingReservation.notes,
            }, {
                onSuccess: () => closeEditModal(),
            });
        }
    };

    const openReservationAddModal = () => {
        setIsReservationAddModalOpen(true);
    };

    const closeReservationAddModal = () => {
        setIsReservationAddModalOpen(false);
        setNewReservation({
            name: '',
            date: '',
            time: '',
            guests: 2,
            phone: '',
            notes: '',
        });
    };

    const handleAddReservation = () => {
        router.post('/reservations', newReservation, {
            onSuccess: () => closeReservationAddModal(),
        });
    };

    const toggleReservationProcessed = (id: number) => {
        router.patch(`/reservations/${id}/toggle`);
    };

    const openEventEditModal = (event: Event) => {
        setEditingEvent({ ...event });
        setIsEventEditModalOpen(true);
    };

    const closeEventEditModal = () => {
        setIsEventEditModalOpen(false);
        setEditingEvent(null);
        setEditingEventImage(null);
    };

    const handleUpdateEvent = () => {
        if (editingEvent) {
            router.post(`/events/${editingEvent.id}`, {
                _method: 'put',
                name: editingEvent.name,
                date: editingEvent.date_raw,
                time_from: editingEvent.time_from,
                time_to: editingEvent.time_to,
                notes: editingEvent.notes || '',
                image: editingEventImage,
            }, {
                onSuccess: () => closeEventEditModal(),
            });
        }
    };

    const openEventAddModal = () => {
        setIsEventAddModalOpen(true);
    };

    const closeEventAddModal = () => {
        setIsEventAddModalOpen(false);
        setNewEvent({
            name: '',
            date: '',
            date_raw: '',
            time_from: '',
            time_to: '',
            notes: '',
        });
        setNewEventImage(null);
    };

    const handleAddEvent = () => {
        console.log('handleAddEvent called', {
            name: newEvent.name,
            date: newEvent.date,
            time_from: newEvent.time_from,
            time_to: newEvent.time_to,
            notes: newEvent.notes,
            image: newEventImage,
        });

        router.post('/events', {
            name: newEvent.name,
            date: newEvent.date,
            time_from: newEvent.time_from,
            time_to: newEvent.time_to,
            notes: newEvent.notes || '',
            image: newEventImage,
        }, {
            onSuccess: () => {
                console.log('Event created successfully');
                closeEventAddModal();
            },
            onError: (errors) => {
                console.error('Error creating event:', errors);
            },
        });
    };

    const openMenuEditModal = (menuItem: MenuItem) => {
        setEditingMenuItem({ ...menuItem });
        setIsMenuEditModalOpen(true);
    };

    const closeMenuEditModal = () => {
        setIsMenuEditModalOpen(false);
        setEditingMenuItem(null);
    };

    const handleUpdateMenuItem = () => {
        if (editingMenuItem) {
            router.put(`/menu-items/${editingMenuItem.id}`, editingMenuItem, {
                onSuccess: () => closeMenuEditModal(),
            });
        }
    };

    const openMenuAddModal = () => {
        setIsMenuAddModalOpen(true);
    };

    const closeMenuAddModal = () => {
        setIsMenuAddModalOpen(false);
        setNewMenuItem({
            name: '',
            category: categories[1],
            price: 0,
            description: '',
            available: true,
        });
    };

    const handleAddMenuItem = () => {
        router.post('/menu-items', newMenuItem, {
            onSuccess: () => closeMenuAddModal(),
        });
    };

    const toggleAvailability = (id: number) => {
        router.patch(`/menu-items/${id}/toggle`);
    };

    const filteredMenuItems =
        selectedCategory === 'Alle'
            ? menuItems
            : menuItems.filter((item) => item.category === selectedCategory);

    const groupedMenuItems = filteredMenuItems.reduce(
        (acc, item) => {
            if (!acc[item.category]) {
                acc[item.category] = [];
            }
            acc[item.category].push(item);
            return acc;
        },
        {} as Record<string, MenuItem[]>
    );

    return (
        <>
            <Head title="Restaurantverwaltung">
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap"
                />
            </Head>

            <div className="min-h-screen bg-white font-['Inter',sans-serif]">
                {/* Header */}
                <header className="bg-[#800020] shadow-md">
                    <div className="mx-auto max-w-7xl px-8 py-4">
                        <div className="flex items-center gap-2">
                            <img src="/icons/utensils.svg" alt="" className="h-6 w-6" />
                            <h1 className="text-2xl font-medium text-white tracking-[0.0703px]">
                                Restaurantverwaltung
                            </h1>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="mx-auto max-w-7xl px-8 py-6">
                    {/* Tab Navigation */}
                    <div className="border-b border-[rgba(128,0,32,0.15)]">
                        <div className="flex gap-1">
                            <button
                                onClick={() => setActiveTab('reservierungen')}
                                className={`flex items-center gap-2 px-6 py-3 text-base font-medium tracking-[-0.3125px] transition-colors ${
                                    activeTab === 'reservierungen'
                                        ? 'border-b-2 border-[#800020] text-[#800020]'
                                        : 'border-b-2 border-transparent text-[#2d1b1b] hover:text-[#800020]'
                                }`}
                            >
                                <img src="/icons/calendar-check.svg" alt="" className="h-4 w-4" />
                                Reservierungen
                            </button>
                            <button
                                onClick={() => setActiveTab('veranstaltungen')}
                                className={`flex items-center gap-2 px-6 py-3 text-base font-medium tracking-[-0.3125px] transition-colors ${
                                    activeTab === 'veranstaltungen'
                                        ? 'border-b-2 border-[#800020] text-[#800020]'
                                        : 'border-b-2 border-transparent text-[#2d1b1b] hover:text-[#800020]'
                                }`}
                            >
                                <img src="/icons/calendar-check.svg" alt="" className="h-4 w-4" />
                                Veranstaltungen
                            </button>
                            <button
                                onClick={() => setActiveTab('speisekarte')}
                                className={`flex items-center gap-2 px-6 py-3 text-base font-medium tracking-[-0.3125px] transition-colors ${
                                    activeTab === 'speisekarte'
                                        ? 'border-b-2 border-[#800020] text-[#800020]'
                                        : 'border-b-2 border-transparent text-[#2d1b1b] hover:text-[#800020]'
                                }`}
                            >
                                <img src="/icons/menu.svg" alt="" className="h-4 w-4" />
                                Speisekarte
                            </button>
                        </div>
                    </div>

                    {/* Tab Content */}
                    {activeTab === 'reservierungen' && (
                        <div className="mt-6 space-y-6">
                            {/* Header with Add Button */}
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-medium text-[#2d1b1b] tracking-[-0.4492px]">
                                    Reservierungen
                                </h2>
                                <button
                                    onClick={openReservationAddModal}
                                    className="flex items-center gap-2 rounded-[10px] bg-[#800020] px-4 py-2 text-base font-medium text-white tracking-[-0.3125px] transition-colors hover:bg-[#600018]"
                                >
                                    <img src="/icons/plus.svg" alt="" className="h-4 w-4" />
                                    Reservierung hinzufügen
                                </button>
                            </div>

                            {/* Pending Reservations */}
                            <div className="space-y-3">
                                <h3 className="text-lg font-medium text-[#800020] tracking-[-0.4395px]">
                                    Offene Anfragen
                                </h3>
                                {reservations.filter(r => !r.processed).length === 0 ? (
                                    <p className="text-sm text-[#6b6b6b] tracking-[-0.1504px]">
                                        Keine offenen Anfragen
                                    </p>
                                ) : (
                                    reservations.filter(r => !r.processed).map((reservation) => (
                                    <div
                                        key={reservation.id}
                                        className="rounded-[10px] border border-[rgba(128,0,32,0.15)] bg-white p-4"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex-1 space-y-2">
                                                {/* Name */}
                                                <h3 className="text-lg font-medium text-[#2d1b1b] tracking-[-0.4395px]">
                                                    {reservation.name}
                                                </h3>

                                                {/* Date, Time, Guests */}
                                                <div className="flex items-center gap-4 text-sm text-[#6b6b6b] tracking-[-0.1504px]">
                                                    <div className="flex items-center gap-1.5">
                                                        <img src="/icons/calendar.svg" alt="" className="h-4 w-4" />
                                                        {reservation.date}
                                                    </div>
                                                    <div className="flex items-center gap-1.5">
                                                        <img src="/icons/clock.svg" alt="" className="h-4 w-4" />
                                                        {reservation.time}
                                                    </div>
                                                    <div className="flex items-center gap-1.5">
                                                        <img src="/icons/users.svg" alt="" className="h-4 w-4" />
                                                        {reservation.guests} Gäste
                                                    </div>
                                                </div>

                                                {/* Phone */}
                                                <div className="text-sm text-[#6b6b6b] tracking-[-0.1504px]">
                                                    {reservation.phone}
                                                </div>

                                                {/* Notes */}
                                                {reservation.notes && (
                                                    <div className="rounded border-l-2 border-[#800020] bg-[rgba(247,231,206,0.5)] px-3 py-2 text-sm text-[#2d1b1b] tracking-[-0.1504px]">
                                                        {reservation.notes}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="flex flex-col gap-3">
                                                {/* Processed Checkbox */}
                                                <label className="flex items-center gap-2 cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        checked={reservation.processed}
                                                        onChange={() => toggleReservationProcessed(reservation.id)}
                                                        className="h-4 w-4 rounded border-[rgba(128,0,32,0.15)] text-[#800020] focus:ring-[#800020]"
                                                    />
                                                    <span className="text-sm text-[#2d1b1b] tracking-[-0.1504px]">
                                                        Bearbeitet
                                                    </span>
                                                </label>

                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => openEditModal(reservation)}
                                                        className="rounded-[10px] p-2 text-[#2d1b1b] transition-colors hover:bg-gray-100"
                                                        aria-label="Bearbeiten"
                                                    >
                                                        <img src="/icons/edit.svg" alt="" className="h-4 w-4" />
                                                    </button>
                                                    <button
                                                        className="rounded-[10px] p-2 text-[#800020] transition-colors hover:bg-gray-100"
                                                        aria-label="Löschen"
                                                    >
                                                        <img src="/icons/trash.svg" alt="" className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                                )}
                            </div>

                            {/* Processed Reservations */}
                            <div className="space-y-3">
                                <h3 className="text-lg font-medium text-[#2d1b1b] tracking-[-0.4395px]">
                                    Bearbeitete Reservierungen
                                </h3>
                                {reservations.filter(r => r.processed).length === 0 ? (
                                    <p className="text-sm text-[#6b6b6b] tracking-[-0.1504px]">
                                        Keine bearbeiteten Reservierungen
                                    </p>
                                ) : (
                                    reservations.filter(r => r.processed).map((reservation) => (
                                    <div
                                        key={reservation.id}
                                        className="rounded-[10px] border border-[rgba(128,0,32,0.15)] bg-white p-4 opacity-60"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex-1 space-y-2">
                                                {/* Name */}
                                                <h3 className="text-lg font-medium text-[#2d1b1b] tracking-[-0.4395px]">
                                                    {reservation.name}
                                                </h3>

                                                {/* Date, Time, Guests */}
                                                <div className="flex items-center gap-4 text-sm text-[#6b6b6b] tracking-[-0.1504px]">
                                                    <div className="flex items-center gap-1.5">
                                                        <img src="/icons/calendar.svg" alt="" className="h-4 w-4" />
                                                        {reservation.date}
                                                    </div>
                                                    <div className="flex items-center gap-1.5">
                                                        <img src="/icons/clock.svg" alt="" className="h-4 w-4" />
                                                        {reservation.time}
                                                    </div>
                                                    <div className="flex items-center gap-1.5">
                                                        <img src="/icons/users.svg" alt="" className="h-4 w-4" />
                                                        {reservation.guests} Gäste
                                                    </div>
                                                </div>

                                                {/* Phone */}
                                                <div className="text-sm text-[#6b6b6b] tracking-[-0.1504px]">
                                                    {reservation.phone}
                                                </div>

                                                {/* Notes */}
                                                {reservation.notes && (
                                                    <div className="rounded border-l-2 border-[#800020] bg-[rgba(247,231,206,0.5)] px-3 py-2 text-sm text-[#2d1b1b] tracking-[-0.1504px]">
                                                        {reservation.notes}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="flex flex-col gap-3">
                                                {/* Processed Checkbox */}
                                                <label className="flex items-center gap-2 cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        checked={reservation.processed}
                                                        onChange={() => toggleReservationProcessed(reservation.id)}
                                                        className="h-4 w-4 rounded border-[rgba(128,0,32,0.15)] text-[#800020] focus:ring-[#800020]"
                                                    />
                                                    <span className="text-sm text-[#2d1b1b] tracking-[-0.1504px]">
                                                        Bearbeitet
                                                    </span>
                                                </label>

                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => openEditModal(reservation)}
                                                        className="rounded-[10px] p-2 text-[#2d1b1b] transition-colors hover:bg-gray-100"
                                                        aria-label="Bearbeiten"
                                                    >
                                                        <img src="/icons/edit.svg" alt="" className="h-4 w-4" />
                                                    </button>
                                                    <button
                                                        className="rounded-[10px] p-2 text-[#800020] transition-colors hover:bg-gray-100"
                                                        aria-label="Löschen"
                                                    >
                                                        <img src="/icons/trash.svg" alt="" className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                                )}
                            </div>
                        </div>
                    )}

                    {activeTab === 'veranstaltungen' && (
                        <div className="mt-6 space-y-6">
                            {/* Header with Add Button */}
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-medium text-[#2d1b1b] tracking-[-0.4492px]">
                                    Veranstaltungen
                                </h2>
                                <button
                                    onClick={openEventAddModal}
                                    className="flex items-center gap-2 rounded-[10px] bg-[#800020] px-4 py-2 text-base font-medium text-white tracking-[-0.3125px] transition-colors hover:bg-[#600018]"
                                >
                                    <img src="/icons/plus.svg" alt="" className="h-4 w-4" />
                                    Veranstaltung hinzufügen
                                </button>
                            </div>

                            {/* Events List */}
                            <div className="space-y-3">
                                {events.map((event) => (
                                    <div
                                        key={event.id}
                                        className="rounded-[10px] border border-[rgba(128,0,32,0.15)] bg-white p-4"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex-1 space-y-2">
                                                {/* Name */}
                                                <h3 className="text-lg font-medium text-[#2d1b1b] tracking-[-0.4395px]">
                                                    {event.name}
                                                </h3>

                                                {/* Date, Time */}
                                                <div className="flex items-center gap-4 text-sm text-[#6b6b6b] tracking-[-0.1504px]">
                                                    <div className="flex items-center gap-1.5">
                                                        <img src="/icons/calendar.svg" alt="" className="h-4 w-4" />
                                                        {event.date}
                                                    </div>
                                                    <div className="flex items-center gap-1.5">
                                                        <img src="/icons/clock.svg" alt="" className="h-4 w-4" />
                                                        {event.time_from} - {event.time_to}
                                                    </div>
                                                </div>

                                                {/* Notes */}
                                                {event.notes && (
                                                    <div className="rounded border-l-2 border-[#800020] bg-[rgba(247,231,206,0.5)] px-3 py-2 text-sm text-[#2d1b1b] tracking-[-0.1504px]">
                                                        {event.notes}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => openEventEditModal(event)}
                                                    className="rounded-[10px] p-2 text-[#2d1b1b] transition-colors hover:bg-gray-100"
                                                    aria-label="Bearbeiten"
                                                >
                                                    <img src="/icons/edit.svg" alt="" className="h-4 w-4" />
                                                </button>
                                                <button
                                                    className="rounded-[10px] p-2 text-[#800020] transition-colors hover:bg-gray-100"
                                                    aria-label="Löschen"
                                                >
                                                    <img src="/icons/trash.svg" alt="" className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'speisekarte' && (
                        <div className="mt-6 space-y-6">
                            {/* Header with Add Button */}
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-medium text-[#2d1b1b] tracking-[-0.4492px]">
                                    Speisekarte
                                </h2>
                                <button
                                    onClick={openMenuAddModal}
                                    className="flex items-center gap-2 rounded-[10px] bg-[#800020] px-4 py-2 text-base font-medium text-white tracking-[-0.3125px] transition-colors hover:bg-[#600018]"
                                >
                                    <img src="/icons/plus.svg" alt="" className="h-4 w-4" />
                                    Artikel hinzufügen
                                </button>
                            </div>

                            {/* Category Filters */}
                            <div className="flex gap-2 overflow-x-auto pb-2">
                                {categories.map((category) => (
                                    <button
                                        key={category}
                                        onClick={() => setSelectedCategory(category)}
                                        className={`rounded-[10px] px-4 py-2 text-base font-medium tracking-[-0.3125px] transition-colors whitespace-nowrap ${
                                            selectedCategory === category
                                                ? 'bg-[#800020] text-white'
                                                : 'bg-[#f7e7ce] text-[#800020] hover:bg-[#eed9b8]'
                                        }`}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>

                            {/* Menu Items by Category */}
                            <div className="space-y-6">
                                {Object.entries(groupedMenuItems).map(([category, items]) => (
                                    <div key={category} className="space-y-3">
                                        <h3 className="text-lg font-medium text-[#800020] tracking-[-0.4395px]">
                                            {category}
                                        </h3>
                                        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                                            {items.map((item) => (
                                                <div
                                                    key={item.id}
                                                    className={`rounded-[10px] border border-[rgba(128,0,32,0.15)] bg-white p-4 ${
                                                        !item.available ? 'opacity-60' : ''
                                                    }`}
                                                >
                                                    {/* Header */}
                                                    <div className="mb-2 flex items-start justify-between">
                                                        <div className="flex-1 space-y-1">
                                                            <h4 className="text-base font-medium text-[#2d1b1b] tracking-[-0.3125px]">
                                                                {item.name}
                                                            </h4>
                                                            <div className="flex items-center gap-2">
                                                                <span className="rounded bg-[#f7e7ce] px-2 py-0.5 text-sm text-[#800020] tracking-[-0.1504px]">
                                                                    {item.category}
                                                                </span>
                                                                {!item.available && (
                                                                    <span className="rounded bg-[rgba(212,24,61,0.1)] px-2 py-0.5 text-sm text-[#d4183d] tracking-[-0.1504px]">
                                                                        Nicht verfügbar
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-1 text-base text-[#800020] tracking-[-0.3125px]">
                                                            <img src="/icons/euro.svg" alt="€" className="h-4 w-4" />
                                                            {typeof item.price === 'number' ? item.price.toFixed(2) : item.price}
                                                        </div>
                                                    </div>

                                                    {/* Description */}
                                                    <p className="mb-3 text-sm text-[#6b6b6b] tracking-[-0.1504px]">
                                                        {item.description}
                                                    </p>

                                                    {/* Actions */}
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => toggleAvailability(item.id)}
                                                            className={`flex-1 rounded px-3 py-1.5 text-sm font-medium tracking-[-0.1504px] transition-colors ${
                                                                item.available
                                                                    ? 'bg-[#f5f5f5] text-[#2d1b1b] hover:bg-[#e5e5e5]'
                                                                    : 'bg-[#800020] text-white hover:bg-[#600018]'
                                                            }`}
                                                        >
                                                            {item.available
                                                                ? 'Als nicht verfügbar markieren'
                                                                : 'Als verfügbar markieren'}
                                                        </button>
                                                        <button
                                                            onClick={() => openMenuEditModal(item)}
                                                            className="rounded p-2 text-[#2d1b1b] transition-colors hover:bg-gray-100"
                                                            aria-label="Bearbeiten"
                                                        >
                                                            <img src="/icons/edit.svg" alt="" className="h-4 w-4" />
                                                        </button>
                                                        <button
                                                            className="rounded p-2 text-[#800020] transition-colors hover:bg-gray-100"
                                                            aria-label="Löschen"
                                                        >
                                                            <img src="/icons/trash.svg" alt="" className="h-4 w-4" />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </main>

                {/* Edit Reservation Modal */}
                {isEditModalOpen && editingReservation && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        {/* Backdrop */}
                        <div
                            className="absolute inset-0 bg-black/50"
                            onClick={closeEditModal}
                        />

                        {/* Modal */}
                        <div className="relative z-10 w-full max-w-md rounded-[10px] bg-white p-6 shadow-xl">
                            <h2 className="mb-4 text-xl font-medium text-[#2d1b1b] tracking-[-0.4492px]">
                                Reservierung bearbeiten
                            </h2>

                            <div className="space-y-4">
                                {/* Gästename */}
                                <div className="space-y-1.5">
                                    <label className="block text-base font-medium text-[#2d1b1b] tracking-[-0.3125px]">
                                        Gästename
                                    </label>
                                    <input
                                        type="text"
                                        value={editingReservation.name}
                                        onChange={(e) =>
                                            setEditingReservation({ ...editingReservation, name: e.target.value })
                                        }
                                        className="w-full rounded-[10px] border border-[rgba(128,0,32,0.15)] bg-[#faf8f5] px-3 py-2 text-base text-[#2d1b1b] tracking-[-0.3125px] focus:border-[#800020] focus:outline-none"
                                    />
                                </div>

                                {/* Datum and Uhrzeit */}
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="space-y-1.5">
                                        <label className="block text-base font-medium text-[#2d1b1b] tracking-[-0.3125px]">
                                            Datum
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="date"
                                                value={editingReservation.date_raw}
                                                onChange={(e) =>
                                                    setEditingReservation({ ...editingReservation, date_raw: e.target.value, date: e.target.value })
                                                }
                                                className="w-full rounded-[10px] border border-[rgba(128,0,32,0.15)] bg-[#faf8f5] px-3 py-2 pr-10 text-base text-[#2d1b1b] tracking-[-0.3125px] focus:border-[#800020] focus:outline-none"
                                            />
                                            <img
                                                src="/icons/calendar.svg"
                                                alt=""
                                                className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 cursor-pointer"
                                                style={{ filter: 'invert(11%) sepia(73%) saturate(5348%) hue-rotate(336deg) brightness(78%) contrast(117%)' }}
                                                onClick={() => document.querySelector(`input[value="${editingReservation.date_raw}"]`)?.showPicker?.()}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="block text-base font-medium text-[#2d1b1b] tracking-[-0.3125px]">
                                            Uhrzeit
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="time"
                                                value={editingReservation.time}
                                                onChange={(e) =>
                                                    setEditingReservation({ ...editingReservation, time: e.target.value })
                                                }
                                                className="w-full rounded-[10px] border border-[rgba(128,0,32,0.15)] bg-[#faf8f5] px-3 py-2 pr-10 text-base text-[#2d1b1b] tracking-[-0.3125px] focus:border-[#800020] focus:outline-none"
                                            />
                                            <img
                                                src="/icons/clock.svg"
                                                alt=""
                                                className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 cursor-pointer"
                                                style={{ filter: 'invert(11%) sepia(73%) saturate(5348%) hue-rotate(336deg) brightness(78%) contrast(117%)' }}
                                                onClick={() => document.querySelector(`input[value="${editingReservation.time}"]`)?.showPicker?.()}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Anzahl der Gäste */}
                                <div className="space-y-1.5">
                                    <label className="block text-base font-medium text-[#2d1b1b] tracking-[-0.3125px]">
                                        Anzahl der Gäste
                                    </label>
                                    <input
                                        type="number"
                                        value={editingReservation.guests}
                                        onChange={(e) =>
                                            setEditingReservation({
                                                ...editingReservation,
                                                guests: parseInt(e.target.value) || 0,
                                            })
                                        }
                                        className="w-full rounded-[10px] border border-[rgba(128,0,32,0.15)] bg-[#faf8f5] px-3 py-2 text-base text-[#2d1b1b] tracking-[-0.3125px] focus:border-[#800020] focus:outline-none"
                                    />
                                </div>

                                {/* Telefonnummer */}
                                <div className="space-y-1.5">
                                    <label className="block text-base font-medium text-[#2d1b1b] tracking-[-0.3125px]">
                                        Telefonnummer
                                    </label>
                                    <input
                                        type="tel"
                                        value={editingReservation.phone}
                                        onChange={(e) =>
                                            setEditingReservation({ ...editingReservation, phone: e.target.value })
                                        }
                                        className="w-full rounded-[10px] border border-[rgba(128,0,32,0.15)] bg-[#faf8f5] px-3 py-2 text-base text-[#2d1b1b] tracking-[-0.3125px] focus:border-[#800020] focus:outline-none"
                                    />
                                </div>

                                {/* Notizen */}
                                <div className="space-y-1.5">
                                    <label className="block text-base font-medium text-[#2d1b1b] tracking-[-0.3125px]">
                                        Notizen (Optional)
                                    </label>
                                    <textarea
                                        value={editingReservation.notes || ''}
                                        onChange={(e) =>
                                            setEditingReservation({ ...editingReservation, notes: e.target.value })
                                        }
                                        placeholder="Sonderwünsche, Allergien, usw."
                                        rows={3}
                                        className="w-full rounded-[10px] border border-[rgba(128,0,32,0.15)] bg-[#faf8f5] px-3 py-2 text-base text-[#2d1b1b] placeholder:text-[rgba(45,27,27,0.5)] tracking-[-0.3125px] focus:border-[#800020] focus:outline-none resize-none"
                                    />
                                </div>

                                {/* Action Buttons */}
                                <div className="mt-6 flex gap-3">
                                    <button
                                        onClick={handleUpdateReservation}
                                        className="flex-1 rounded-[10px] bg-[#800020] px-4 py-2.5 text-base font-medium text-white tracking-[-0.3125px] transition-colors hover:bg-[#600018]"
                                    >
                                        Reservierung aktualisieren
                                    </button>
                                    <button
                                        onClick={closeEditModal}
                                        className="rounded-[10px] border border-[rgba(128,0,32,0.15)] px-4 py-2.5 text-base font-medium text-[#2d1b1b] tracking-[-0.3125px] transition-colors hover:bg-gray-50"
                                    >
                                        Abbrechen
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Add Reservation Modal */}
                {isReservationAddModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        {/* Backdrop */}
                        <div
                            className="absolute inset-0 bg-black/50"
                            onClick={closeReservationAddModal}
                        />

                        {/* Modal */}
                        <div className="relative z-10 w-full max-w-md rounded-[10px] bg-white p-6 shadow-xl">
                            <h2 className="mb-4 text-xl font-medium text-[#2d1b1b] tracking-[-0.4492px]">
                                Neue Reservierung
                            </h2>

                            <div className="space-y-4">
                                {/* Name */}
                                <div className="space-y-1.5">
                                    <label className="block text-base font-medium text-[#2d1b1b] tracking-[-0.3125px]">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        value={newReservation.name}
                                        onChange={(e) =>
                                            setNewReservation({ ...newReservation, name: e.target.value })
                                        }
                                        placeholder="z.B. Max Mustermann"
                                        className="w-full rounded-[10px] border border-[rgba(128,0,32,0.15)] bg-[#faf8f5] px-3 py-2 text-base text-[#2d1b1b] placeholder:text-[rgba(45,27,27,0.5)] tracking-[-0.3125px] focus:border-[#800020] focus:outline-none"
                                    />
                                </div>

                                {/* Datum and Uhrzeit */}
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="space-y-1.5">
                                        <label className="block text-base font-medium text-[#2d1b1b] tracking-[-0.3125px]">
                                            Datum
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="date"
                                                value={newReservation.date}
                                                onChange={(e) =>
                                                    setNewReservation({ ...newReservation, date: e.target.value })
                                                }
                                                className="w-full rounded-[10px] border border-[rgba(128,0,32,0.15)] bg-[#faf8f5] px-3 py-2 pr-10 text-base text-[#2d1b1b] tracking-[-0.3125px] focus:border-[#800020] focus:outline-none"
                                            />
                                            <img
                                                src="/icons/calendar.svg"
                                                alt=""
                                                className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 cursor-pointer"
                                                style={{ filter: 'invert(11%) sepia(73%) saturate(5348%) hue-rotate(336deg) brightness(78%) contrast(117%)' }}
                                                onClick={() => document.querySelector(`input[value="${newReservation.date}"]`)?.showPicker?.()}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="block text-base font-medium text-[#2d1b1b] tracking-[-0.3125px]">
                                            Uhrzeit
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="time"
                                                value={newReservation.time}
                                                onChange={(e) =>
                                                    setNewReservation({ ...newReservation, time: e.target.value })
                                                }
                                                className="w-full rounded-[10px] border border-[rgba(128,0,32,0.15)] bg-[#faf8f5] px-3 py-2 pr-10 text-base text-[#2d1b1b] tracking-[-0.3125px] focus:border-[#800020] focus:outline-none"
                                            />
                                            <img
                                                src="/icons/clock.svg"
                                                alt=""
                                                className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 cursor-pointer"
                                                style={{ filter: 'invert(11%) sepia(73%) saturate(5348%) hue-rotate(336deg) brightness(78%) contrast(117%)' }}
                                                onClick={() => document.querySelector(`input[value="${newReservation.time}"]`)?.showPicker?.()}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Anzahl der Gäste */}
                                <div className="space-y-1.5">
                                    <label className="block text-base font-medium text-[#2d1b1b] tracking-[-0.3125px]">
                                        Anzahl der Gäste
                                    </label>
                                    <input
                                        type="number"
                                        min="1"
                                        value={newReservation.guests}
                                        onChange={(e) =>
                                            setNewReservation({
                                                ...newReservation,
                                                guests: parseInt(e.target.value) || 1,
                                            })
                                        }
                                        placeholder="2"
                                        className="w-full rounded-[10px] border border-[rgba(128,0,32,0.15)] bg-[#faf8f5] px-3 py-2 text-base text-[#2d1b1b] placeholder:text-[rgba(45,27,27,0.5)] tracking-[-0.3125px] focus:border-[#800020] focus:outline-none"
                                    />
                                </div>

                                {/* Telefonnummer */}
                                <div className="space-y-1.5">
                                    <label className="block text-base font-medium text-[#2d1b1b] tracking-[-0.3125px]">
                                        Telefonnummer
                                    </label>
                                    <input
                                        type="tel"
                                        value={newReservation.phone}
                                        onChange={(e) =>
                                            setNewReservation({ ...newReservation, phone: e.target.value })
                                        }
                                        placeholder="+49 123 456789"
                                        className="w-full rounded-[10px] border border-[rgba(128,0,32,0.15)] bg-[#faf8f5] px-3 py-2 text-base text-[#2d1b1b] placeholder:text-[rgba(45,27,27,0.5)] tracking-[-0.3125px] focus:border-[#800020] focus:outline-none"
                                    />
                                </div>

                                {/* Notizen */}
                                <div className="space-y-1.5">
                                    <label className="block text-base font-medium text-[#2d1b1b] tracking-[-0.3125px]">
                                        Notizen (Optional)
                                    </label>
                                    <textarea
                                        value={newReservation.notes || ''}
                                        onChange={(e) =>
                                            setNewReservation({ ...newReservation, notes: e.target.value })
                                        }
                                        placeholder="Sonderwünsche, Allergien, usw."
                                        rows={3}
                                        className="w-full rounded-[10px] border border-[rgba(128,0,32,0.15)] bg-[#faf8f5] px-3 py-2 text-base text-[#2d1b1b] placeholder:text-[rgba(45,27,27,0.5)] tracking-[-0.3125px] focus:border-[#800020] focus:outline-none resize-none"
                                    />
                                </div>

                                {/* Action Buttons */}
                                <div className="mt-6 flex gap-3">
                                    <button
                                        onClick={handleAddReservation}
                                        className="flex-1 rounded-[10px] bg-[#800020] px-4 py-2.5 text-base font-medium text-white tracking-[-0.3125px] transition-colors hover:bg-[#600018]"
                                    >
                                        Reservierung hinzufügen
                                    </button>
                                    <button
                                        onClick={closeReservationAddModal}
                                        className="rounded-[10px] border border-[rgba(128,0,32,0.15)] px-4 py-2.5 text-base font-medium text-[#2d1b1b] tracking-[-0.3125px] transition-colors hover:bg-gray-50"
                                    >
                                        Abbrechen
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Edit Menu Item Modal */}
                {isMenuEditModalOpen && editingMenuItem && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        {/* Backdrop */}
                        <div
                            className="absolute inset-0 bg-black/50"
                            onClick={closeMenuEditModal}
                        />

                        {/* Modal */}
                        <div className="relative z-10 w-full max-w-md rounded-[10px] bg-white p-6 shadow-xl">
                            <h2 className="mb-4 text-xl font-medium text-[#2d1b1b] tracking-[-0.4492px]">
                                Artikel bearbeiten
                            </h2>

                            <div className="space-y-4">
                                {/* Artikelname */}
                                <div className="space-y-1.5">
                                    <label className="block text-base font-medium text-[#2d1b1b] tracking-[-0.3125px]">
                                        Artikelname
                                    </label>
                                    <input
                                        type="text"
                                        value={editingMenuItem.name}
                                        onChange={(e) =>
                                            setEditingMenuItem({ ...editingMenuItem, name: e.target.value })
                                        }
                                        className="w-full rounded-[10px] border border-[rgba(128,0,32,0.15)] bg-[#faf8f5] px-3 py-2 text-base text-[#2d1b1b] tracking-[-0.3125px] focus:border-[#800020] focus:outline-none"
                                    />
                                </div>

                                {/* Kategorie and Preis */}
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="space-y-1.5">
                                        <label className="block text-base font-medium text-[#2d1b1b] tracking-[-0.3125px]">
                                            Kategorie
                                        </label>
                                        <select
                                            value={editingMenuItem.category}
                                            onChange={(e) =>
                                                setEditingMenuItem({
                                                    ...editingMenuItem,
                                                    category: e.target.value,
                                                })
                                            }
                                            className="w-full rounded-[10px] border border-[rgba(128,0,32,0.15)] bg-[#faf8f5] px-3 py-2 text-base text-[#2d1b1b] tracking-[-0.3125px] focus:border-[#800020] focus:outline-none"
                                        >
                                            {categories.filter(c => c !== 'Alle').map((category) => (
                                                <option key={category} value={category}>
                                                    {category}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="block text-base font-medium text-[#2d1b1b] tracking-[-0.3125px]">
                                            Preis (€)
                                        </label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            value={editingMenuItem.price}
                                            onChange={(e) =>
                                                setEditingMenuItem({
                                                    ...editingMenuItem,
                                                    price: parseFloat(e.target.value) || 0,
                                                })
                                            }
                                            className="w-full rounded-[10px] border border-[rgba(128,0,32,0.15)] bg-[#faf8f5] px-3 py-2 text-base text-[#2d1b1b] tracking-[-0.3125px] focus:border-[#800020] focus:outline-none"
                                        />
                                    </div>
                                </div>

                                {/* Beschreibung */}
                                <div className="space-y-1.5">
                                    <label className="block text-base font-medium text-[#2d1b1b] tracking-[-0.3125px]">
                                        Beschreibung
                                    </label>
                                    <textarea
                                        value={editingMenuItem.description}
                                        onChange={(e) =>
                                            setEditingMenuItem({ ...editingMenuItem, description: e.target.value })
                                        }
                                        placeholder="Gericht beschreiben"
                                        rows={3}
                                        className="w-full rounded-[10px] border border-[rgba(128,0,32,0.15)] bg-[#faf8f5] px-3 py-2 text-base text-[#2d1b1b] placeholder:text-[rgba(45,27,27,0.5)] tracking-[-0.3125px] focus:border-[#800020] focus:outline-none resize-none"
                                    />
                                </div>

                                {/* Verfügbar zum Bestellen */}
                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id="available-checkbox"
                                        checked={editingMenuItem.available}
                                        onChange={(e) =>
                                            setEditingMenuItem({ ...editingMenuItem, available: e.target.checked })
                                        }
                                        className="h-4 w-4 rounded border-[rgba(128,0,32,0.15)] text-[#800020] focus:ring-[#800020]"
                                    />
                                    <label
                                        htmlFor="available-checkbox"
                                        className="text-base font-medium text-[#2d1b1b] tracking-[-0.3125px]"
                                    >
                                        Verfügbar zum Bestellen
                                    </label>
                                </div>

                                {/* Action Buttons */}
                                <div className="mt-6 flex gap-3">
                                    <button
                                        onClick={handleUpdateMenuItem}
                                        className="flex-1 rounded-[10px] bg-[#800020] px-4 py-2.5 text-base font-medium text-white tracking-[-0.3125px] transition-colors hover:bg-[#600018]"
                                    >
                                        Artikel aktualisieren
                                    </button>
                                    <button
                                        onClick={closeMenuEditModal}
                                        className="rounded-[10px] border border-[rgba(128,0,32,0.15)] px-4 py-2.5 text-base font-medium text-[#2d1b1b] tracking-[-0.3125px] transition-colors hover:bg-gray-50"
                                    >
                                        Abbrechen
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Add Menu Item Modal */}
                {isMenuAddModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        {/* Backdrop */}
                        <div
                            className="absolute inset-0 bg-black/50"
                            onClick={closeMenuAddModal}
                        />

                        {/* Modal */}
                        <div className="relative z-10 w-full max-w-md rounded-[10px] bg-white p-6 shadow-xl">
                            <h2 className="mb-4 text-xl font-medium text-[#2d1b1b] tracking-[-0.4492px]">
                                Artikel hinzufügen
                            </h2>

                            <div className="space-y-4">
                                {/* Artikelname */}
                                <div className="space-y-1.5">
                                    <label className="block text-base font-medium text-[#2d1b1b] tracking-[-0.3125px]">
                                        Artikelname
                                    </label>
                                    <input
                                        type="text"
                                        value={newMenuItem.name}
                                        onChange={(e) =>
                                            setNewMenuItem({ ...newMenuItem, name: e.target.value })
                                        }
                                        placeholder="z.B. Caesar Salat"
                                        className="w-full rounded-[10px] border border-[rgba(128,0,32,0.15)] bg-[#faf8f5] px-3 py-2 text-base text-[#2d1b1b] placeholder:text-[rgba(45,27,27,0.5)] tracking-[-0.3125px] focus:border-[#800020] focus:outline-none"
                                    />
                                </div>

                                {/* Kategorie and Preis */}
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="space-y-1.5">
                                        <label className="block text-base font-medium text-[#2d1b1b] tracking-[-0.3125px]">
                                            Kategorie
                                        </label>
                                        <select
                                            value={newMenuItem.category}
                                            onChange={(e) =>
                                                setNewMenuItem({
                                                    ...newMenuItem,
                                                    category: e.target.value,
                                                })
                                            }
                                            className="w-full rounded-[10px] border border-[rgba(128,0,32,0.15)] bg-[#faf8f5] px-3 py-2 text-base text-[#2d1b1b] tracking-[-0.3125px] focus:border-[#800020] focus:outline-none"
                                        >
                                            {categories.filter(c => c !== 'Alle').map((category) => (
                                                <option key={category} value={category}>
                                                    {category}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="block text-base font-medium text-[#2d1b1b] tracking-[-0.3125px]">
                                            Preis (€)
                                        </label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            value={newMenuItem.price}
                                            onChange={(e) =>
                                                setNewMenuItem({
                                                    ...newMenuItem,
                                                    price: parseFloat(e.target.value) || 0,
                                                })
                                            }
                                            placeholder="0.00"
                                            className="w-full rounded-[10px] border border-[rgba(128,0,32,0.15)] bg-[#faf8f5] px-3 py-2 text-base text-[#2d1b1b] placeholder:text-[rgba(45,27,27,0.5)] tracking-[-0.3125px] focus:border-[#800020] focus:outline-none"
                                        />
                                    </div>
                                </div>

                                {/* Beschreibung */}
                                <div className="space-y-1.5">
                                    <label className="block text-base font-medium text-[#2d1b1b] tracking-[-0.3125px]">
                                        Beschreibung
                                    </label>
                                    <textarea
                                        value={newMenuItem.description}
                                        onChange={(e) =>
                                            setNewMenuItem({ ...newMenuItem, description: e.target.value })
                                        }
                                        placeholder="Gericht beschreiben"
                                        rows={3}
                                        className="w-full rounded-[10px] border border-[rgba(128,0,32,0.15)] bg-[#faf8f5] px-3 py-2 text-base text-[#2d1b1b] placeholder:text-[rgba(45,27,27,0.5)] tracking-[-0.3125px] focus:border-[#800020] focus:outline-none resize-none"
                                    />
                                </div>

                                {/* Verfügbar zum Bestellen */}
                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id="available-checkbox-add"
                                        checked={newMenuItem.available}
                                        onChange={(e) =>
                                            setNewMenuItem({ ...newMenuItem, available: e.target.checked })
                                        }
                                        className="h-4 w-4 rounded border-[rgba(128,0,32,0.15)] text-[#800020] focus:ring-[#800020]"
                                    />
                                    <label
                                        htmlFor="available-checkbox-add"
                                        className="text-base font-medium text-[#2d1b1b] tracking-[-0.3125px]"
                                    >
                                        Verfügbar zum Bestellen
                                    </label>
                                </div>

                                {/* Action Buttons */}
                                <div className="mt-6 flex gap-3">
                                    <button
                                        onClick={handleAddMenuItem}
                                        className="flex-1 rounded-[10px] bg-[#800020] px-4 py-2.5 text-base font-medium text-white tracking-[-0.3125px] transition-colors hover:bg-[#600018]"
                                    >
                                        Artikel hinzufügen
                                    </button>
                                    <button
                                        onClick={closeMenuAddModal}
                                        className="rounded-[10px] border border-[rgba(128,0,32,0.15)] px-4 py-2.5 text-base font-medium text-[#2d1b1b] tracking-[-0.3125px] transition-colors hover:bg-gray-50"
                                    >
                                        Abbrechen
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Edit Event Modal */}
                {isEventEditModalOpen && editingEvent && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        {/* Backdrop */}
                        <div
                            className="absolute inset-0 bg-black/50"
                            onClick={closeEventEditModal}
                        />

                        {/* Modal */}
                        <div className="relative z-10 w-full max-w-md rounded-[10px] bg-white p-6 shadow-xl">
                            <h2 className="mb-4 text-xl font-medium text-[#2d1b1b] tracking-[-0.4492px]">
                                Veranstaltung bearbeiten
                            </h2>

                            <div className="space-y-4">
                                {/* Veranstaltungsname */}
                                <div className="space-y-1.5">
                                    <label className="block text-base font-medium text-[#2d1b1b] tracking-[-0.3125px]">
                                        Veranstaltungsname
                                    </label>
                                    <input
                                        type="text"
                                        value={editingEvent.name}
                                        onChange={(e) =>
                                            setEditingEvent({ ...editingEvent, name: e.target.value })
                                        }
                                        className="w-full rounded-[10px] border border-[rgba(128,0,32,0.15)] bg-[#faf8f5] px-3 py-2 text-base text-[#2d1b1b] tracking-[-0.3125px] focus:border-[#800020] focus:outline-none"
                                    />
                                </div>

                                {/* Datum */}
                                <div className="space-y-1.5">
                                    <label className="block text-base font-medium text-[#2d1b1b] tracking-[-0.3125px]">
                                        Datum
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="date"
                                            value={editingEvent.date_raw}
                                            onChange={(e) =>
                                                setEditingEvent({ ...editingEvent, date_raw: e.target.value, date: e.target.value })
                                            }
                                            className="w-full rounded-[10px] border border-[rgba(128,0,32,0.15)] bg-[#faf8f5] px-3 py-2 pr-10 text-base text-[#2d1b1b] tracking-[-0.3125px] focus:border-[#800020] focus:outline-none"
                                        />
                                        <img
                                            src="/icons/calendar.svg"
                                            alt=""
                                            className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 cursor-pointer"
                                            style={{ filter: 'invert(11%) sepia(73%) saturate(5348%) hue-rotate(336deg) brightness(78%) contrast(117%)' }}
                                            onClick={() => document.querySelector(`input[value="${editingEvent.date_raw}"]`)?.showPicker?.()}
                                        />
                                    </div>
                                </div>

                                {/* Uhrzeit Von - Bis */}
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="space-y-1.5">
                                        <label className="block text-base font-medium text-[#2d1b1b] tracking-[-0.3125px]">
                                            Von
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="time"
                                                value={editingEvent.time_from}
                                                onChange={(e) =>
                                                    setEditingEvent({ ...editingEvent, time_from: e.target.value })
                                                }
                                                placeholder="19:00"
                                                className="w-full rounded-[10px] border border-[rgba(128,0,32,0.15)] bg-[#faf8f5] px-3 py-2 pr-10 text-base text-[#2d1b1b] tracking-[-0.3125px] focus:border-[#800020] focus:outline-none"
                                            />
                                            <img
                                                src="/icons/clock.svg"
                                                alt=""
                                                className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 cursor-pointer"
                                                style={{ filter: 'invert(11%) sepia(73%) saturate(5348%) hue-rotate(336deg) brightness(78%) contrast(117%)' }}
                                                onClick={() => document.querySelector(`input[value="${editingEvent.time_from}"]`)?.showPicker?.()}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="block text-base font-medium text-[#2d1b1b] tracking-[-0.3125px]">
                                            Bis
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="time"
                                                value={editingEvent.time_to}
                                                onChange={(e) =>
                                                    setEditingEvent({ ...editingEvent, time_to: e.target.value })
                                                }
                                                placeholder="22:00"
                                                className="w-full rounded-[10px] border border-[rgba(128,0,32,0.15)] bg-[#faf8f5] px-3 py-2 pr-10 text-base text-[#2d1b1b] tracking-[-0.3125px] focus:border-[#800020] focus:outline-none"
                                            />
                                            <img
                                                src="/icons/clock.svg"
                                                alt=""
                                                className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 cursor-pointer"
                                                style={{ filter: 'invert(11%) sepia(73%) saturate(5348%) hue-rotate(336deg) brightness(78%) contrast(117%)' }}
                                                onClick={() => document.querySelector(`input[value="${editingEvent.time_to}"]`)?.showPicker?.()}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Beschreibung */}
                                <div className="space-y-1.5">
                                    <label className="block text-base font-medium text-[#2d1b1b] tracking-[-0.3125px]">
                                        Beschreibung (Optional)
                                    </label>
                                    <textarea
                                        value={editingEvent.notes || ''}
                                        onChange={(e) =>
                                            setEditingEvent({ ...editingEvent, notes: e.target.value })
                                        }
                                        placeholder="Besondere Anforderungen, Programm, usw."
                                        rows={3}
                                        className="w-full rounded-[10px] border border-[rgba(128,0,32,0.15)] bg-[#faf8f5] px-3 py-2 text-base text-[#2d1b1b] placeholder:text-[rgba(45,27,27,0.5)] tracking-[-0.3125px] focus:border-[#800020] focus:outline-none resize-none"
                                    />
                                </div>

                                {/* Bild */}
                                <div className="space-y-1.5">
                                    <label className="block text-base font-medium text-[#2d1b1b] tracking-[-0.3125px]">
                                        Bild (Optional)
                                    </label>
                                    {editingEvent.image && !editingEventImage && (
                                        <div className="mb-2">
                                            <p className="text-sm text-[#6b6b6b] tracking-[-0.1504px] mb-1">
                                                Aktuelles Bild:
                                            </p>
                                            <img
                                                src={`/storage/${editingEvent.image}`}
                                                alt="Event"
                                                className="h-32 object-cover rounded border border-[rgba(128,0,32,0.15)]"
                                            />
                                        </div>
                                    )}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => setEditingEventImage(e.target.files?.[0] || null)}
                                        className="w-full rounded-[10px] border border-[rgba(128,0,32,0.15)] bg-[#faf8f5] px-3 py-2 text-base text-[#2d1b1b] tracking-[-0.3125px] focus:border-[#800020] focus:outline-none file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-sm file:font-medium file:bg-[#800020] file:text-white hover:file:bg-[#600018]"
                                    />
                                    {editingEventImage && (
                                        <p className="text-sm text-[#6b6b6b] tracking-[-0.1504px]">
                                            Neues Bild ausgewählt: {editingEventImage.name}
                                        </p>
                                    )}
                                </div>

                                {/* Action Buttons */}
                                <div className="mt-6 flex gap-3">
                                    <button
                                        onClick={handleUpdateEvent}
                                        className="flex-1 rounded-[10px] bg-[#800020] px-4 py-2.5 text-base font-medium text-white tracking-[-0.3125px] transition-colors hover:bg-[#600018]"
                                    >
                                        Veranstaltung aktualisieren
                                    </button>
                                    <button
                                        onClick={closeEventEditModal}
                                        className="rounded-[10px] border border-[rgba(128,0,32,0.15)] px-4 py-2.5 text-base font-medium text-[#2d1b1b] tracking-[-0.3125px] transition-colors hover:bg-gray-50"
                                    >
                                        Abbrechen
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Add Event Modal */}
                {isEventAddModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        {/* Backdrop */}
                        <div
                            className="absolute inset-0 bg-black/50"
                            onClick={closeEventAddModal}
                        />

                        {/* Modal */}
                        <div className="relative z-10 w-full max-w-md rounded-[10px] bg-white p-6 shadow-xl">
                            <h2 className="mb-4 text-xl font-medium text-[#2d1b1b] tracking-[-0.4492px]">
                                Neue Veranstaltung
                            </h2>

                            <div className="space-y-4">
                                {/* Veranstaltungsname */}
                                <div className="space-y-1.5">
                                    <label className="block text-base font-medium text-[#2d1b1b] tracking-[-0.3125px]">
                                        Veranstaltungsname
                                    </label>
                                    <input
                                        type="text"
                                        value={newEvent.name}
                                        onChange={(e) =>
                                            setNewEvent({ ...newEvent, name: e.target.value })
                                        }
                                        placeholder="z.B. Live Jazz Abend"
                                        className="w-full rounded-[10px] border border-[rgba(128,0,32,0.15)] bg-[#faf8f5] px-3 py-2 text-base text-[#2d1b1b] placeholder:text-[rgba(45,27,27,0.5)] tracking-[-0.3125px] focus:border-[#800020] focus:outline-none"
                                    />
                                </div>

                                {/* Datum */}
                                <div className="space-y-1.5">
                                    <label className="block text-base font-medium text-[#2d1b1b] tracking-[-0.3125px]">
                                        Datum
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="date"
                                            value={newEvent.date}
                                            onChange={(e) =>
                                                setNewEvent({ ...newEvent, date: e.target.value })
                                            }
                                            className="w-full rounded-[10px] border border-[rgba(128,0,32,0.15)] bg-[#faf8f5] px-3 py-2 pr-10 text-base text-[#2d1b1b] tracking-[-0.3125px] focus:border-[#800020] focus:outline-none"
                                        />
                                        <img
                                            src="/icons/calendar.svg"
                                            alt=""
                                            className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 cursor-pointer"
                                            style={{ filter: 'invert(11%) sepia(73%) saturate(5348%) hue-rotate(336deg) brightness(78%) contrast(117%)' }}
                                            onClick={() => document.querySelector(`input[value="${newEvent.date}"]`)?.showPicker?.()}
                                        />
                                    </div>
                                </div>

                                {/* Uhrzeit Von - Bis */}
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="space-y-1.5">
                                        <label className="block text-base font-medium text-[#2d1b1b] tracking-[-0.3125px]">
                                            Von
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="time"
                                                value={newEvent.time_from}
                                                onChange={(e) =>
                                                    setNewEvent({ ...newEvent, time_from: e.target.value })
                                                }
                                                placeholder="19:00"
                                                className="w-full rounded-[10px] border border-[rgba(128,0,32,0.15)] bg-[#faf8f5] px-3 py-2 pr-10 text-base text-[#2d1b1b] placeholder:text-[rgba(45,27,27,0.5)] tracking-[-0.3125px] focus:border-[#800020] focus:outline-none"
                                            />
                                            <img
                                                src="/icons/clock.svg"
                                                alt=""
                                                className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 cursor-pointer"
                                                style={{ filter: 'invert(11%) sepia(73%) saturate(5348%) hue-rotate(336deg) brightness(78%) contrast(117%)' }}
                                                onClick={() => document.querySelector(`input[value="${newEvent.time_from}"]`)?.showPicker?.()}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="block text-base font-medium text-[#2d1b1b] tracking-[-0.3125px]">
                                            Bis
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="time"
                                                value={newEvent.time_to}
                                                onChange={(e) =>
                                                    setNewEvent({ ...newEvent, time_to: e.target.value })
                                                }
                                                placeholder="22:00"
                                                className="w-full rounded-[10px] border border-[rgba(128,0,32,0.15)] bg-[#faf8f5] px-3 py-2 pr-10 text-base text-[#2d1b1b] placeholder:text-[rgba(45,27,27,0.5)] tracking-[-0.3125px] focus:border-[#800020] focus:outline-none"
                                            />
                                            <img
                                                src="/icons/clock.svg"
                                                alt=""
                                                className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 cursor-pointer"
                                                style={{ filter: 'invert(11%) sepia(73%) saturate(5348%) hue-rotate(336deg) brightness(78%) contrast(117%)' }}
                                                onClick={() => document.querySelector(`input[value="${newEvent.time_to}"]`)?.showPicker?.()}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Beschreibung */}
                                <div className="space-y-1.5">
                                    <label className="block text-base font-medium text-[#2d1b1b] tracking-[-0.3125px]">
                                        Beschreibung (Optional)
                                    </label>
                                    <textarea
                                        value={newEvent.notes || ''}
                                        onChange={(e) =>
                                            setNewEvent({ ...newEvent, notes: e.target.value })
                                        }
                                        placeholder="Besondere Anforderungen, Programm, usw."
                                        rows={3}
                                        className="w-full rounded-[10px] border border-[rgba(128,0,32,0.15)] bg-[#faf8f5] px-3 py-2 text-base text-[#2d1b1b] placeholder:text-[rgba(45,27,27,0.5)] tracking-[-0.3125px] focus:border-[#800020] focus:outline-none resize-none"
                                    />
                                </div>

                                {/* Bild */}
                                <div className="space-y-1.5">
                                    <label className="block text-base font-medium text-[#2d1b1b] tracking-[-0.3125px]">
                                        Bild (Optional)
                                    </label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => setNewEventImage(e.target.files?.[0] || null)}
                                        className="w-full rounded-[10px] border border-[rgba(128,0,32,0.15)] bg-[#faf8f5] px-3 py-2 text-base text-[#2d1b1b] tracking-[-0.3125px] focus:border-[#800020] focus:outline-none file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-sm file:font-medium file:bg-[#800020] file:text-white hover:file:bg-[#600018]"
                                    />
                                    {newEventImage && (
                                        <p className="text-sm text-[#6b6b6b] tracking-[-0.1504px]">
                                            Ausgewählt: {newEventImage.name}
                                        </p>
                                    )}
                                </div>

                                {/* Action Buttons */}
                                <div className="mt-6 flex gap-3">
                                    <button
                                        onClick={handleAddEvent}
                                        className="flex-1 rounded-[10px] bg-[#800020] px-4 py-2.5 text-base font-medium text-white tracking-[-0.3125px] transition-colors hover:bg-[#600018]"
                                    >
                                        Veranstaltung hinzufügen
                                    </button>
                                    <button
                                        onClick={closeEventAddModal}
                                        className="rounded-[10px] border border-[rgba(128,0,32,0.15)] px-4 py-2.5 text-base font-medium text-[#2d1b1b] tracking-[-0.3125px] transition-colors hover:bg-gray-50"
                                    >
                                        Abbrechen
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
