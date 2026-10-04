'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { PHOTOS, AMENITIES, REVIEWS, HOST, LISTING } from '@/lib/data';

// ─── SVG Icons ────────────────────────────────────────────────────────────────
const AirbnbStarIcon = ({ size = 12, color = '#FF385C' }: { size?: number; color?: string }) => (
  <svg viewBox="0 0 32 32" width={size} height={size} fill={color} aria-hidden="true">
    <path d="M15.094 1.579l-4.124 8.885-9.86 1.27a1 1 0 00-.542 1.736l7.293 6.565-1.965 9.852a1 1 0 001.483 1.061L16 25.951l8.625 5.004a1 1 0 001.483-1.06l-1.965-9.853 7.293-6.565a1 1 0 00-.541-1.735l-9.86-1.271-4.125-8.885a1 1 0 00-1.816 0z" fillRule="evenodd" />
  </svg>
);
const StarFilled = ({ size = 10 }: { size?: number }) => (
  <svg viewBox="0 0 32 32" width={size} height={size} fill="#222222" aria-hidden="true">
    <path d="M15.094 1.579l-4.124 8.885-9.86 1.27a1 1 0 00-.542 1.736l7.293 6.565-1.965 9.852a1 1 0 001.483 1.061L16 25.951l8.625 5.004a1 1 0 001.483-1.06l-1.965-9.853 7.293-6.565a1 1 0 00-.541-1.735l-9.86-1.271-4.125-8.885a1 1 0 00-1.816 0z" fillRule="evenodd" />
  </svg>
);
const AirbnbLogo = () => (
  // eslint-disable-next-line @next/next/no-img-element
  <img
    src="/airbnb-logo.webp"
    alt="Airbnb"
    className="h-[32px] w-auto flex-shrink-0"
    style={{ objectFit: 'contain' }}
  />
);

const ShareIcon = () => (
  <svg viewBox="0 0 32 32" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
    <path d="M27 5L15 17M27 5H19M27 5V13M13 7H7a2 2 0 00-2 2v16a2 2 0 002 2h16a2 2 0 002-2v-6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const HeartIcon = ({ filled = false }: { filled?: boolean }) => (
  <svg viewBox="0 0 32 32" width="14" height="14" fill={filled ? '#FF385C' : 'none'} stroke={filled ? '#FF385C' : 'currentColor'} strokeWidth="2.5" aria-hidden="true">
    <path d="M16 28S4 20 4 12a6 6 0 0112-1.527A6 6 0 0128 12c0 8-12 16-12 16z" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const ChevronLeftIcon = ({ size = 16 }: { size?: number }) => (
  <svg viewBox="0 0 32 32" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
    <path d="M20 28L8 16l12-12" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ChevronRightIcon = ({ size = 16 }: { size?: number }) => (
  <svg viewBox="0 0 32 32" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
    <path d="M12 4l12 12-12 12" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const CloseIcon = ({ size = 16 }: { size?: number }) => (
  <svg viewBox="0 0 32 32" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
    <path d="M6 6l20 20M26 6L6 26" strokeLinecap="round" />
  </svg>
);
const MenuIcon = () => (
  <svg viewBox="0 0 32 32" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
    <path d="M4 8h24M4 16h24M4 24h24" strokeLinecap="round" />
  </svg>
);
const UserIcon = () => (
  <svg viewBox="0 0 32 32" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <circle cx="16" cy="12" r="6" /><path d="M4 28c0-8 5.4-12 12-12s12 4 12 12" />
  </svg>
);
const GlobeIcon = () => (
  <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor" aria-hidden="true">
    <path d="M8 0C3.58 0 0 3.58 0 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm5.94 5h-2.13A12.86 12.86 0 0010.1 1.36 6.51 6.51 0 0113.94 5zM8 1.56c.83 1.2 1.48 2.53 1.9 3.44H6.1c.42-.91 1.07-2.24 1.9-3.44zM1.56 9A6.56 6.56 0 011.5 8c0-.34.03-.68.08-1H4.1a14.49 14.49 0 000 2H1.56zM2.06 11H4.2a12.86 12.86 0 001.71 3.64A6.51 6.51 0 012.06 11zm2.13-6H2.06A6.51 6.51 0 015.9 1.36 12.86 12.86 0 004.19 5zM8 14.44c-.83-1.2-1.48-2.53-1.9-3.44h3.8c-.42.91-1.07 2.24-1.9 3.44zM9.97 9H6.03a13.84 13.84 0 010-2h3.94a13.84 13.84 0 010 2zm.2 4.64A12.86 12.86 0 0011.8 11h2.13a6.51 6.51 0 01-3.76 2.64zM11.9 9a14.49 14.49 0 000-2h2.52c.05.32.08.66.08 1s-.03.68-.08 1H11.9z"/>
  </svg>
);

type ViewMode = 'listing' | 'photo-tour' | 'lightbox';
type Modal = 'none' | 'amenities' | 'reviews';

// ─── Amenity Icon Map ──────────────────────────────────────────────────────────
const AMENITY_ICONS: Record<string, React.ReactNode> = {
  pool: (<svg viewBox="0 0 32 32" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 28c4-4 8-4 12 0s8 4 12 0M4 21c4-4 8-4 12 0s8 4 12 0M4 8a4 4 0 014-4h16a4 4 0 014 4v10"/></svg>),
  wifi: (<svg viewBox="0 0 32 32" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M1 9C7.36 3.36 15.03 1 16 1s8.64 2.36 15 8M5 13c3.03-2.72 7.04-4 11-4s7.97 1.28 11 4M9 17c1.83-1.54 4.13-2.5 7-2.5s5.17.96 7 2.5"/><circle cx="16" cy="23" r="2" fill="currentColor"/></svg>),
  tv: (<svg viewBox="0 0 32 32" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="4" width="28" height="20" rx="3"/><path d="M10 28h12M16 24v4"/></svg>),
  ac: (<svg viewBox="0 0 32 32" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="8" width="28" height="12" rx="3"/><path d="M10 20v4M16 20v4M22 20v4M7 14h18"/></svg>),
  kitchen: (<svg viewBox="0 0 32 32" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="10" width="24" height="18" rx="2"/><path d="M4 14h24M11 8V4M16 8V4M21 8V4"/></svg>),
  washer: (<svg viewBox="0 0 32 32" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="3" width="24" height="26" rx="3"/><circle cx="16" cy="18" r="7"/><circle cx="16" cy="18" r="4"/><circle cx="8" cy="8" r="1.5" fill="currentColor"/></svg>),
  parking: (<svg viewBox="0 0 32 32" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="4" width="24" height="24" rx="4"/><path d="M12 8h6a4 4 0 010 8h-6V8zM12 16v8"/></svg>),
  security: (<svg viewBox="0 0 32 32" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M16 3l-12 4v10c0 8 12 12 12 12s12-4 12-12V7L16 3z"/><path d="M11 16l3 3 7-7"/></svg>),
  elevator: (<svg viewBox="0 0 32 32" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="4" width="24" height="24" rx="2"/><path d="M14 4v24M10 10l4-4 4 4M10 22l4 4 4-4"/></svg>),
  checkin: (<svg viewBox="0 0 32 32" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="10" width="16" height="18" rx="2"/><path d="M14 19h14M22 15l6 4-6 4"/><circle cx="12" cy="19" r="1.5" fill="currentColor"/></svg>),
  workspace: (<svg viewBox="0 0 32 32" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="6" width="28" height="18" rx="2"/><path d="M10 24v4M22 24v4M6 28h20M8 12h16M8 16h10"/></svg>),
  bathtub: (<svg viewBox="0 0 32 32" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 20h24v3a5 5 0 01-5 5H9a5 5 0 01-5-5v-3zM4 20V8a3 3 0 016 0v2"/><path d="M10 10h18"/></svg>),
  star: (<svg viewBox="0 0 32 32" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M16 3l3.09 6.26L26 10.27l-5 4.87 1.18 6.88L16 18.77l-6.18 3.25L11 15.14 6 10.27l6.91-1.01L16 3z"/></svg>),
  key: (<svg viewBox="0 0 32 32" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="14" r="8"/><path d="M18.5 9.5L28 19M24 15l2 2M20 17l2 2" strokeLinecap="round"/></svg>),
  location: (<svg viewBox="0 0 32 32" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M16 3a9 9 0 019 9c0 7-9 17-9 17S7 19 7 12a9 9 0 019-9z"/><circle cx="16" cy="12" r="3"/></svg>),
};

// ─── Rating Bar ────────────────────────────────────────────────────────────────
function RatingBar({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center gap-3 text-sm">
      <span className="w-28 text-[#222222] text-sm">{label}</span>
      <div className="flex-1 bg-[#DDDDDD] rounded-full h-[2px] relative">
        <div className="bg-[#222222] h-full rounded-full absolute top-0 left-0" style={{ width: `${(value / 5) * 100}%` }} />
      </div>
      <span className="w-6 text-right text-[#222222] text-sm font-medium">{value}</span>
    </div>
  );
}

// ─── Header ───────────────────────────────────────────────────────────────────
function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  return (
    <header className={`sticky top-0 z-40 w-full bg-white transition-shadow duration-200 ${scrolled ? 'shadow-md' : 'border-b border-[#DDDDDD]'}`}>
      <div className="max-w-[1280px] mx-auto px-10 h-[80px] flex items-center justify-between gap-4">
        {/* Logo */}
        <a href="/" className="flex-shrink-0" aria-label="Airbnb home">
          <AirbnbLogo />
        </a>

        {/* Search bar */}
        <div className="hidden md:flex items-center border border-[#DDDDDD] rounded-full shadow-sm hover:shadow-md transition-shadow cursor-pointer divide-x divide-[#DDDDDD]">
          <button className="px-4 py-2.5 text-sm font-semibold text-[#222222] hover:bg-[#F7F7F7] rounded-l-full transition-colors">Anywhere</button>
          <button className="px-4 py-2.5 text-sm font-semibold text-[#222222] hover:bg-[#F7F7F7] transition-colors">Any week</button>
          <div className="flex items-center gap-2 pl-4 pr-1 py-1">
            <button className="text-sm text-[#717171] hover:bg-[#F7F7F7] py-1.5 px-2 rounded-full transition-colors">Add guests</button>
            <div className="w-8 h-8 bg-[#FF385C] rounded-full flex items-center justify-center hover:bg-[#E31C5F] transition-colors flex-shrink-0" aria-label="Search">
              <svg viewBox="0 0 32 32" width="12" height="12" fill="white" aria-hidden="true">
                <path d="M13 0C5.82 0 0 5.82 0 13s5.82 13 13 13c3.09 0 5.93-1.08 8.16-2.87l7.36 7.36 2.83-2.83-7.28-7.28A12.96 12.96 0 0026 13C26 5.82 20.18 0 13 0zm0 2c6.07 0 11 4.93 11 11S19.07 24 13 24 2 19.07 2 13 6.93 2 13 2z"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Right nav */}
        <div className="flex items-center gap-1">
          <a href="/" className="hidden md:block px-4 py-2.5 text-sm font-semibold text-[#222222] hover:bg-[#F7F7F7] rounded-full transition-colors whitespace-nowrap">
            Airbnb your home
          </a>
          <button className="p-2.5 text-[#222222] hover:bg-[#F7F7F7] rounded-full transition-colors" aria-label="Choose a language">
            <GlobeIcon />
          </button>
          <button className="flex items-center gap-3 border border-[#DDDDDD] rounded-full px-3 py-2 hover:shadow-md transition-shadow text-[#222222] ml-1">
            <MenuIcon />
            <div className="w-8 h-8 bg-[#717171] rounded-full flex items-center justify-center text-white flex-shrink-0">
              <UserIcon />
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}

// ─── Photo Gallery ─────────────────────────────────────────────────────────────
function PhotoGallery({ onShowAll, onPhotoClick }: { onShowAll: () => void; onPhotoClick: (i: number) => void; }) {
  return (
    <div className="relative rounded-xl overflow-hidden">
      <div className="grid grid-cols-4 grid-rows-2 gap-2 h-[484px]">
        {/* Main big photo */}
        <button
          className="col-span-2 row-span-2 relative overflow-hidden bg-[#F7F7F7] group"
          onClick={() => onPhotoClick(0)}
          aria-label={`View photo 1: ${PHOTOS[0].alt}`}
        >
          <img src={PHOTOS[0].src} alt={PHOTOS[0].alt} className="w-full h-full object-cover group-hover:brightness-95 transition-all duration-300" />
        </button>
        {/* 4 thumbnails */}
        {PHOTOS.slice(1, 5).map((photo, i) => (
          <button
            key={photo.id}
            className="relative overflow-hidden bg-[#F7F7F7] group"
            onClick={() => onPhotoClick(i + 1)}
            aria-label={`View photo ${i + 2}: ${photo.alt}`}
          >
            <img src={photo.src} alt={photo.alt} className="w-full h-full object-cover group-hover:brightness-95 transition-all duration-300" />
          </button>
        ))}
      </div>

      {/* Share & Save buttons */}
      <div className="absolute top-4 right-4 flex gap-2">
        <button className="flex items-center gap-2 bg-white text-[#222222] text-sm font-semibold px-3.5 py-2 rounded-lg hover:bg-[#F7F7F7] transition-colors shadow-sm" aria-label="Share listing">
          <ShareIcon />Share
        </button>
        <button className="flex items-center gap-2 bg-white text-[#222222] text-sm font-semibold px-3.5 py-2 rounded-lg hover:bg-[#F7F7F7] transition-colors shadow-sm" aria-label="Save listing">
          <HeartIcon />Save
        </button>
      </div>

      {/* Show all photos */}
      <button
        className="absolute bottom-4 right-4 flex items-center gap-2 bg-white text-[#222222] text-sm font-semibold px-4 py-2.5 rounded-lg border border-[#222222] hover:bg-[#F7F7F7] transition-colors"
        onClick={onShowAll}
        id="show-all-photos-btn"
        aria-label="Show all photos"
      >
        <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <rect x="1" y="1" width="6" height="6" rx="1"/><rect x="9" y="1" width="6" height="6" rx="1"/>
          <rect x="1" y="9" width="6" height="6" rx="1"/><rect x="9" y="9" width="6" height="6" rx="1"/>
        </svg>
        Show all photos
      </button>
    </div>
  );
}

// ─── Booking Card ─────────────────────────────────────────────────────────────
function BookingCard({ onReviewsClick }: { onReviewsClick: () => void }) {
  const [checkin, setCheckin] = useState('');
  const [checkout, setCheckout] = useState('');
  const [guests, setGuests] = useState(1);
  const [showGuests, setShowGuests] = useState(false);

  const nights = checkin && checkout
    ? Math.max(0, Math.round((new Date(checkout).getTime() - new Date(checkin).getTime()) / 86400000))
    : 0;
  const nightlyTotal = LISTING.price * (nights || 1);
  const total = nightlyTotal + LISTING.cleaningFee + LISTING.serviceFee;

  return (
    <div className="border border-[#DDDDDD] rounded-xl p-6 shadow-[0_6px_16px_rgba(0,0,0,0.12)]">
      {/* Price */}
      <div className="flex items-baseline justify-between mb-5">
        <div>
          <span className="text-[22px] font-semibold text-[#222222]">₹{LISTING.price.toLocaleString('en-IN')}</span>
          <span className="text-base text-[#717171] font-normal"> night</span>
        </div>
        <button onClick={onReviewsClick} className="flex items-center gap-1 text-sm text-[#222222] underline hover:no-underline">
          <AirbnbStarIcon size={12} />
          <span className="font-semibold">{LISTING.rating}</span>
          <span className="text-[#717171]">·</span>
          <span className="text-[#717171]">{LISTING.reviewCount} reviews</span>
        </button>
      </div>

      {/* Date / Guest picker */}
      <div className="border border-[#DDDDDD] rounded-xl overflow-hidden mb-3 focus-within:border-[#222222] focus-within:ring-1 focus-within:ring-[#222222] transition-all">
        <div className="grid grid-cols-2 border-b border-[#DDDDDD]">
          <div className="p-3 border-r border-[#DDDDDD] hover:bg-[#F7F7F7] cursor-pointer transition-colors">
            <div className="text-[10px] font-bold text-[#222222] uppercase tracking-widest mb-1">Check-in</div>
            <input
              type="date"
              value={checkin}
              onChange={e => setCheckin(e.target.value)}
              className="w-full text-sm text-[#222222] bg-transparent cursor-pointer outline-none"
              id="checkin-date"
              aria-label="Check-in date"
            />
          </div>
          <div className="p-3 hover:bg-[#F7F7F7] cursor-pointer transition-colors">
            <div className="text-[10px] font-bold text-[#222222] uppercase tracking-widest mb-1">Checkout</div>
            <input
              type="date"
              value={checkout}
              min={checkin}
              onChange={e => setCheckout(e.target.value)}
              className="w-full text-sm text-[#222222] bg-transparent cursor-pointer outline-none"
              id="checkout-date"
              aria-label="Checkout date"
            />
          </div>
        </div>
        <div
          className="p-3 flex justify-between items-center hover:bg-[#F7F7F7] cursor-pointer transition-colors"
          onClick={() => setShowGuests(!showGuests)}
          role="button"
          tabIndex={0}
          onKeyDown={e => e.key === 'Enter' && setShowGuests(!showGuests)}
          aria-expanded={showGuests}
          aria-label="Guests picker"
        >
          <div>
            <div className="text-[10px] font-bold text-[#222222] uppercase tracking-widest mb-1">Guests</div>
            <div className="text-sm text-[#222222]">{guests} guest{guests !== 1 ? 's' : ''}</div>
          </div>
          <span className={`text-[#717171] transition-transform duration-200 ${showGuests ? 'rotate-180' : ''}`}>
            <svg viewBox="0 0 32 32" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
              <path d="M4 12l12 12 12-12" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </div>
        {showGuests && (
          <div className="p-4 border-t border-[#DDDDDD] bg-white animate-[fadeInDown_0.15s_ease]">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold text-[#222222]">Adults</div>
                <div className="text-xs text-[#717171]">Ages 13 or above</div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={e => { e.stopPropagation(); setGuests(g => Math.max(1, g - 1)); }}
                  disabled={guests === 1}
                  className="w-8 h-8 rounded-full border border-[#B0B0B0] flex items-center justify-center text-lg text-[#717171] hover:border-[#222222] hover:text-[#222222] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  aria-label="Decrease guests"
                  id="guests-decrease-btn"
                >−</button>
                <span className="w-6 text-center text-sm font-medium text-[#222222]" aria-live="polite">{guests}</span>
                <button
                  onClick={e => { e.stopPropagation(); setGuests(g => Math.min(LISTING.maxGuests, g + 1)); }}
                  disabled={guests === LISTING.maxGuests}
                  className="w-8 h-8 rounded-full border border-[#B0B0B0] flex items-center justify-center text-lg text-[#717171] hover:border-[#222222] hover:text-[#222222] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  aria-label="Increase guests"
                  id="guests-increase-btn"
                >+</button>
              </div>
            </div>
            <p className="text-xs text-[#717171] mt-3">This place has a maximum of {LISTING.maxGuests} guests, not including infants.</p>
          </div>
        )}
      </div>

      {/* Reserve button */}
      <button
        className="w-full bg-gradient-to-r from-[#E61E4D] via-[#E31C5F] to-[#C13584] text-white font-semibold py-[14px] rounded-xl text-base hover:opacity-90 transition-opacity active:scale-[0.98] transition-transform"
        id="reserve-btn"
        aria-label="Reserve this listing"
      >
        Reserve
      </button>
      <p className="text-center text-sm text-[#717171] mt-3">You won&apos;t be charged yet</p>

      {/* Price breakdown */}
      <div className="mt-5 space-y-4">
        <div className="flex justify-between text-base text-[#222222]">
          <span className="underline cursor-pointer hover:no-underline">₹{LISTING.price.toLocaleString('en-IN')} × {nights || 1} night{(nights || 1) !== 1 ? 's' : ''}</span>
          <span>₹{nightlyTotal.toLocaleString('en-IN')}</span>
        </div>
        <div className="flex justify-between text-base text-[#222222]">
          <span className="underline cursor-pointer hover:no-underline">Airbnb service fee</span>
          <span>₹{LISTING.serviceFee.toLocaleString('en-IN')}</span>
        </div>
        <div className="flex justify-between text-base text-[#222222]">
          <span className="underline cursor-pointer hover:no-underline">Cleaning fee</span>
          <span>₹{LISTING.cleaningFee.toLocaleString('en-IN')}</span>
        </div>
        <div className="border-t border-[#DDDDDD] pt-4 flex justify-between font-semibold text-base text-[#222222]">
          <span>Total before taxes</span>
          <span>₹{total.toLocaleString('en-IN')}</span>
        </div>
      </div>
    </div>
  );
}

// ─── Photo Tour Overlay ────────────────────────────────────────────────────────
function PhotoTour({ onClose, onPhotoClick }: { onClose: () => void; onPhotoClick: (i: number) => void; }) {
  const rooms = [...new Set(PHOTOS.map(p => p.room))];
  const [activeRoom, setActiveRoom] = useState(rooms[0]);
  const roomRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKey);
    };
  }, [onClose]);

  const scrollToRoom = (room: string) => {
    setActiveRoom(room);
    const el = roomRefs.current[room];
    const container = scrollRef.current;
    if (el && container) container.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
  };

  const handleScroll = () => {
    const container = scrollRef.current;
    if (!container) return;
    let current = rooms[0];
    for (const room of rooms) {
      const ref = roomRefs.current[room];
      if (ref && ref.offsetTop - container.scrollTop - 120 <= 0) current = room;
    }
    setActiveRoom(current);
  };

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col" role="dialog" aria-modal="true" aria-label="Photo tour">
      {/* Top bar */}
      <div className="flex items-center justify-between px-10 py-4 border-b border-[#DDDDDD] flex-shrink-0">
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-[#222222] font-semibold hover:bg-[#F7F7F7] rounded-lg px-3 py-2 -ml-3 transition-colors"
          id="photo-tour-close-btn"
          aria-label="Close photo tour"
        >
          <ChevronLeftIcon size={14} />
          <span className="text-sm">All photos</span>
        </button>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 text-sm font-semibold text-[#222222] hover:bg-[#F7F7F7] rounded-lg px-3.5 py-2 border border-[#DDDDDD] transition-colors">
            <ShareIcon />Share
          </button>
          <button className="flex items-center gap-2 text-sm font-semibold text-[#222222] hover:bg-[#F7F7F7] rounded-lg px-3.5 py-2 border border-[#DDDDDD] transition-colors">
            <HeartIcon />Save
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-[260px] border-r border-[#DDDDDD] overflow-y-auto py-6 flex-shrink-0">
          <div className="px-6">
            <h2 className="text-xl font-semibold text-[#222222] mb-4">Photos</h2>
            <nav className="space-y-1" aria-label="Room navigation">
              {rooms.map(room => {
                const count = PHOTOS.filter(p => p.room === room).length;
                return (
                  <button
                    key={room}
                    onClick={() => scrollToRoom(room)}
                    className={`w-full text-left px-3 py-2.5 rounded-xl text-sm transition-colors ${
                      activeRoom === room ? 'bg-[#F7F7F7] font-semibold text-[#222222]' : 'text-[#717171] hover:bg-[#F7F7F7] hover:text-[#222222]'
                    }`}
                    aria-current={activeRoom === room ? 'true' : undefined}
                  >
                    {room}
                    <span className="ml-2 text-xs text-[#B0B0B0]">({count})</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Photo grid */}
        <div className="flex-1 overflow-y-auto" ref={scrollRef} onScroll={handleScroll}>
          <div className="max-w-[860px] mx-auto px-8 py-8">
            {rooms.map(room => {
              const roomPhotos = PHOTOS.filter(p => p.room === room);
              return (
                <section key={room} ref={(el) => { roomRefs.current[room] = el; }} className="mb-12" aria-labelledby={`room-${room}`}>
                  <h3 id={`room-${room}`} className="text-2xl font-semibold text-[#222222] mb-4">{room}</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {roomPhotos.map((photo, i) => {
                      const globalIdx = PHOTOS.findIndex(p => p.id === photo.id);
                      const isFullWidth = roomPhotos.length === 1 || (i === 0 && roomPhotos.length % 2 !== 0);
                      return (
                        <button
                          key={photo.id}
                          className={`relative overflow-hidden rounded-xl bg-[#F7F7F7] group cursor-pointer ${isFullWidth ? 'col-span-2 h-[440px]' : 'h-[300px]'}`}
                          onClick={() => onPhotoClick(globalIdx)}
                          aria-label={`View full size: ${photo.alt}`}
                        >
                          <img src={photo.src} alt={photo.alt} className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300" />
                        </button>
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Lightbox ─────────────────────────────────────────────────────────────────
function Lightbox({ currentIndex, onClose, onPrev, onNext, onJumpTo }: {
  currentIndex: number; onClose: () => void; onPrev: () => void; onNext: () => void; onJumpTo: (i: number) => void;
}) {
  const photo = PHOTOS[currentIndex];
  const thumbsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    document.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKey);
    };
  }, [onClose, onPrev, onNext]);

  useEffect(() => {
    const el = thumbsRef.current?.querySelector('[data-active="true"]');
    el?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }, [currentIndex]);

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col" role="dialog" aria-modal="true" aria-label={`Photo ${currentIndex + 1} of ${PHOTOS.length}`}>
      {/* Top bar */}
      <div className="flex items-center justify-between px-8 py-4 flex-shrink-0">
        <button
          onClick={onClose}
          className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#F7F7F7] transition-colors text-[#222222]"
          aria-label="Close lightbox"
          id="lightbox-close-btn"
        >
          <CloseIcon size={16} />
        </button>
        <span className="text-sm font-medium text-[#717171]" aria-live="polite">{currentIndex + 1} / {PHOTOS.length}</span>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 text-sm font-semibold text-[#222222] hover:bg-[#F7F7F7] rounded-lg px-3.5 py-2 border border-[#DDDDDD] transition-colors">
            <ShareIcon />Share
          </button>
          <button className="flex items-center gap-2 text-sm font-semibold text-[#222222] hover:bg-[#F7F7F7] rounded-lg px-3.5 py-2 border border-[#DDDDDD] transition-colors">
            <HeartIcon />Save
          </button>
        </div>
      </div>

      {/* Main photo */}
      <div className="flex-1 flex items-center justify-center relative px-16 overflow-hidden min-h-0">
        <button
          onClick={onPrev}
          disabled={currentIndex === 0}
          className="absolute left-4 z-10 w-10 h-10 rounded-full bg-white border border-[#DDDDDD] shadow-md flex items-center justify-center hover:scale-105 transition-transform disabled:opacity-30 disabled:cursor-not-allowed text-[#222222]"
          aria-label="Previous photo"
          id="lightbox-prev-btn"
        >
          <ChevronLeftIcon size={14} />
        </button>

        <div className="w-full h-full flex items-center justify-center p-4">
          <img
            key={photo.id}
            src={photo.src}
            alt={photo.alt}
            className="max-w-full max-h-full object-contain rounded-2xl"
            style={{ maxHeight: 'calc(100vh - 220px)' }}
          />
        </div>

        <button
          onClick={onNext}
          disabled={currentIndex === PHOTOS.length - 1}
          className="absolute right-4 z-10 w-10 h-10 rounded-full bg-white border border-[#DDDDDD] shadow-md flex items-center justify-center hover:scale-105 transition-transform disabled:opacity-30 disabled:cursor-not-allowed text-[#222222]"
          aria-label="Next photo"
          id="lightbox-next-btn"
        >
          <ChevronRightIcon size={14} />
        </button>
      </div>

      {/* Caption */}
      <p className="text-center text-sm text-[#717171] py-2 px-8 truncate">{photo.alt}</p>

      {/* Thumbnail strip */}
      <div ref={thumbsRef} className="flex gap-2 px-8 pb-4 pt-2 overflow-x-auto flex-shrink-0 scrollbar-thin" role="list" aria-label="Photo thumbnails">
        {PHOTOS.map((p, i) => (
          <button
            key={p.id}
            role="listitem"
            data-active={i === currentIndex ? 'true' : 'false'}
            onClick={() => onJumpTo(i)}
            className={`flex-shrink-0 w-[70px] h-[52px] rounded-lg overflow-hidden transition-all ${
              i === currentIndex ? 'ring-2 ring-offset-1 ring-[#222222]' : 'opacity-50 hover:opacity-80'
            }`}
            aria-label={`Go to photo ${i + 1}`}
            aria-pressed={i === currentIndex}
            id={`lightbox-thumb-${i}`}
          >
            <img src={p.src} alt={p.alt} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Amenities Modal ───────────────────────────────────────────────────────────
function AmenitiesModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    return () => { document.body.style.overflow = ''; document.removeEventListener('keydown', handleKey); };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} aria-hidden="true" />
      <div className="relative bg-white rounded-2xl w-full max-w-[568px] max-h-[85vh] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center px-6 py-5 border-b border-[#DDDDDD] flex-shrink-0">
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#F7F7F7] transition-colors mr-4" aria-label="Close amenities modal" id="amenities-modal-close">
            <CloseIcon size={14} />
          </button>
          <h2 className="text-base font-semibold text-[#222222]">What this place offers</h2>
        </div>
        {/* Body */}
        <div className="overflow-y-auto flex-1 px-6 py-6">
          <div className="space-y-5">
            {AMENITIES.map(a => (
              <div key={a.label} className={`flex items-center gap-4 ${a.unavailable ? 'opacity-40' : ''}`}>
                <span className="flex-shrink-0 text-[#222222] w-6">{AMENITY_ICONS[a.icon] || AMENITY_ICONS['checkin']}</span>
                <div>
                  <div className={`text-base text-[#222222] ${a.unavailable ? 'line-through' : ''}`}>{a.label}</div>
                  {a.description && <div className="text-sm text-[#717171]">{a.description}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Reviews Modal ─────────────────────────────────────────────────────────────
function ReviewsModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    return () => { document.body.style.overflow = ''; document.removeEventListener('keydown', handleKey); };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} aria-hidden="true" />
      <div className="relative bg-white rounded-2xl w-full max-w-[780px] max-h-[85vh] flex flex-col shadow-2xl">
        <div className="flex items-center px-6 py-5 border-b border-[#DDDDDD] flex-shrink-0">
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#F7F7F7] transition-colors mr-4" aria-label="Close reviews modal" id="reviews-modal-close">
            <CloseIcon size={14} />
          </button>
          <div className="flex items-center gap-2">
            <AirbnbStarIcon size={18} /><span className="text-lg font-semibold">{LISTING.rating}</span>
            <span className="text-[#717171]">·</span><span className="text-lg font-semibold">{LISTING.reviewCount} reviews</span>
          </div>
        </div>
        <div className="overflow-y-auto flex-1 px-6 py-6">
          {/* Rating bars */}
          <div className="grid grid-cols-2 gap-4 mb-8 pb-8 border-b border-[#DDDDDD]">
            <RatingBar label="Cleanliness" value={4.9} />
            <RatingBar label="Accuracy" value={4.8} />
            <RatingBar label="Check-in" value={5.0} />
            <RatingBar label="Communication" value={5.0} />
            <RatingBar label="Location" value={4.9} />
            <RatingBar label="Value" value={4.8} />
          </div>
          <div className="grid grid-cols-2 gap-6">
            {REVIEWS.map(review => (
              <article key={review.id} aria-label={`Review by ${review.author}`}>
                <div className="flex items-center gap-3 mb-3">
                  <img src={review.avatar} alt={review.author} className="w-10 h-10 rounded-full object-cover" width={40} height={40} />
                  <div>
                    <div className="font-semibold text-sm text-[#222222]">{review.author}</div>
                    <div className="text-xs text-[#717171]">{review.location} · {review.date}</div>
                  </div>
                </div>
                <div className="flex items-center gap-0.5 mb-2">
                  {[1,2,3,4,5].map(i => <StarFilled key={i} size={i <= review.rating ? 10 : 10} />)}
                </div>
                <p className="text-sm text-[#222222] leading-relaxed">{review.text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main ListingPage ──────────────────────────────────────────────────────────
export default function ListingPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('listing');
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [modal, setModal] = useState<Modal>('none');
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [saved, setSaved] = useState(false);

  const openPhotoTour = useCallback(() => setViewMode('photo-tour'), []);
  const openLightbox = useCallback((index: number) => { setLightboxIndex(index); setViewMode('lightbox'); }, []);
  const closeTour = useCallback(() => setViewMode('listing'), []);
  const closeLightbox = useCallback(() => setViewMode('listing'), []);
  const prevPhoto = useCallback(() => setLightboxIndex(i => Math.max(0, i - 1)), []);
  const nextPhoto = useCallback(() => setLightboxIndex(i => Math.min(PHOTOS.length - 1, i + 1)), []);
  const jumpToPhoto = useCallback((i: number) => setLightboxIndex(i), []);

  const descParagraphs = LISTING.description.split('\n\n');

  return (
    <>
      {/* Overlays */}
      {viewMode === 'photo-tour' && <PhotoTour onClose={closeTour} onPhotoClick={i => { closeTour(); openLightbox(i); }} />}
      {viewMode === 'lightbox' && <Lightbox currentIndex={lightboxIndex} onClose={closeLightbox} onPrev={prevPhoto} onNext={nextPhoto} onJumpTo={jumpToPhoto} />}
      {modal === 'amenities' && <AmenitiesModal onClose={() => setModal('none')} />}
      {modal === 'reviews' && <ReviewsModal onClose={() => setModal('none')} />}

      <div className="min-h-screen bg-white">
        <Header />

        <main className="max-w-[1280px] mx-auto px-10 pt-6 pb-24" id="main-content">
          {/* Title row */}
          <div className="mb-4">
            <h1 className="text-[26px] font-semibold text-[#222222] leading-tight mb-2">{LISTING.title}</h1>
            <div className="flex items-center flex-wrap gap-x-1.5 gap-y-1 text-sm text-[#222222]">
              <AirbnbStarIcon size={12} />
              <span className="font-semibold">{LISTING.rating}</span>
              <span className="text-[#717171]">·</span>
              <button onClick={() => setModal('reviews')} className="underline font-semibold hover:text-[#717171] transition-colors">{LISTING.reviewCount} reviews</button>
              <span className="text-[#717171]">·</span>
              <span className="flex items-center gap-1">
                <svg viewBox="0 0 12 12" width="11" height="11" fill="currentColor" aria-hidden="true"><path d="M6 0L7.3 3.6 11 4.1l-2.5 2.4.6 3.4L6 8.3 2.9 9.9l.6-3.4L1 4.1l3.7-.5z"/></svg>
                Superhost
              </span>
              <span className="text-[#717171]">·</span>
              <a href="#location" className="underline font-semibold hover:text-[#717171] transition-colors">{LISTING.location}</a>
            </div>
          </div>

          {/* Photo Gallery */}
          <PhotoGallery onShowAll={openPhotoTour} onPhotoClick={openLightbox} />

          {/* Content Grid */}
          <div className="grid grid-cols-[1fr_380px] gap-[88px] mt-10">
            {/* ── Left Column ── */}
            <div className="min-w-0">

              {/* Property type + host avatar */}
              <div className="flex items-center justify-between pb-6 border-b border-[#DDDDDD]">
                <div>
                  <h2 className="text-2xl font-semibold text-[#222222] mb-1">{LISTING.tagline}</h2>
                  <p className="text-base text-[#717171]">
                    {LISTING.guests} guests · {LISTING.bedrooms} bedroom · {LISTING.beds} bed · {LISTING.baths} bath
                  </p>
                </div>
                <div className="relative flex-shrink-0 ml-4">
                  <img src={HOST.avatar} alt={HOST.name} className="w-14 h-14 rounded-full object-cover" width={56} height={56} />
                  {HOST.isSuperhost && (
                    <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#FF385C] rounded-full flex items-center justify-center shadow">
                      <svg viewBox="0 0 12 12" width="10" height="10" fill="white" aria-hidden="true"><path d="M6 0L7.3 3.6 11 4.1l-2.5 2.4.6 3.4L6 8.3 2.9 9.9l.6-3.4L1 4.1l3.7-.5z"/></svg>
                    </span>
                  )}
                </div>
              </div>

              {/* Highlights */}
              <div className="py-6 border-b border-[#DDDDDD] space-y-5">
                {LISTING.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-5">
                    <div className="flex-shrink-0 text-[#222222]">{AMENITY_ICONS[h.icon]}</div>
                    <div>
                      <div className="font-semibold text-[#222222] text-base">{h.title}</div>
                      <div className="text-sm text-[#717171] mt-0.5">{h.subtitle}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Description */}
              <section className="py-6 border-b border-[#DDDDDD]" aria-labelledby="about-heading">
                <h2 id="about-heading" className="sr-only">About this place</h2>
                <div className={`text-base text-[#222222] leading-7 space-y-4 ${!showFullDesc ? '[display:-webkit-box] [-webkit-line-clamp:8] [-webkit-box-orient:vertical] overflow-hidden' : ''}`}>
                  {descParagraphs.map((para, i) => <p key={i}>{para}</p>)}
                </div>
                {!showFullDesc && (
                  <button
                    onClick={() => setShowFullDesc(true)}
                    className="mt-4 flex items-center gap-1 font-semibold text-[#222222] underline hover:no-underline text-base"
                    id="show-more-desc-btn"
                  >
                    Show more <ChevronRightIcon size={12} />
                  </button>
                )}
              </section>

              {/* Amenities */}
              <section className="py-6 border-b border-[#DDDDDD]" aria-labelledby="amenities-heading">
                <h2 id="amenities-heading" className="text-2xl font-semibold text-[#222222] mb-5">What this place offers</h2>
                <div className="grid grid-cols-2 gap-4">
                  {AMENITIES.slice(0, 10).map(a => (
                    <div key={a.label} className={`flex items-center gap-4 ${a.unavailable ? 'opacity-40' : ''}`}>
                      <span className="flex-shrink-0 text-[#222222]">{AMENITY_ICONS[a.icon] || AMENITY_ICONS['checkin']}</span>
                      <div>
                        <div className={`text-base text-[#222222] ${a.unavailable ? 'line-through' : ''}`}>{a.label}</div>
                        {a.description && <div className="text-sm text-[#717171]">{a.description}</div>}
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setModal('amenities')}
                  className="mt-6 px-6 py-3 border border-[#222222] rounded-xl text-[#222222] font-semibold text-sm hover:bg-[#F7F7F7] transition-colors"
                  id="show-all-amenities-btn"
                >
                  Show all {AMENITIES.length} amenities
                </button>
              </section>

              {/* Reviews */}
              <section id="reviews" className="py-6 border-b border-[#DDDDDD]" aria-labelledby="reviews-heading">
                <div className="flex items-center gap-2 mb-6">
                  <AirbnbStarIcon size={24} />
                  <h2 id="reviews-heading" className="text-2xl font-semibold text-[#222222]">{LISTING.rating}</h2>
                  <span className="text-[#717171] text-2xl">·</span>
                  <span className="text-2xl font-semibold text-[#222222]">{LISTING.reviewCount} reviews</span>
                </div>

                {/* Rating categories */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <RatingBar label="Cleanliness" value={4.9} />
                  <RatingBar label="Accuracy" value={4.8} />
                  <RatingBar label="Check-in" value={5.0} />
                  <RatingBar label="Communication" value={5.0} />
                  <RatingBar label="Location" value={4.9} />
                  <RatingBar label="Value" value={4.8} />
                </div>

                {/* Review cards */}
                <div className="grid grid-cols-2 gap-6">
                  {REVIEWS.slice(0, 6).map(review => (
                    <article key={review.id} aria-label={`Review by ${review.author}`}>
                      <div className="flex items-center gap-3 mb-3">
                        <img src={review.avatar} alt={review.author} className="w-11 h-11 rounded-full object-cover flex-shrink-0" width={44} height={44} />
                        <div>
                          <div className="font-semibold text-sm text-[#222222]">{review.author}</div>
                          <div className="text-xs text-[#717171]">{review.location} · {review.date}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-0.5 mb-2" aria-label={`Rating: ${review.rating} out of 5 stars`}>
                        {[1,2,3,4,5].map(i => <StarFilled key={i} size={10} />)}
                      </div>
                      <p className="text-sm text-[#222222] leading-relaxed line-clamp-4">{review.text}</p>
                    </article>
                  ))}
                </div>

                <button
                  onClick={() => setModal('reviews')}
                  className="mt-8 px-6 py-3.5 border border-[#222222] rounded-xl text-[#222222] font-semibold text-sm hover:bg-[#F7F7F7] transition-colors"
                  id="show-all-reviews-btn"
                >
                  Show all {LISTING.reviewCount} reviews
                </button>
              </section>

              {/* Location */}
              <section id="location" className="py-6 border-b border-[#DDDDDD]" aria-labelledby="location-heading">
                <h2 id="location-heading" className="text-2xl font-semibold text-[#222222] mb-1">Where you&apos;ll be</h2>
                <p className="text-base text-[#717171] mb-4">{LISTING.location}</p>
                <div className="rounded-2xl overflow-hidden h-[360px] bg-[#F7F7F7]">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15307.48!2d73.7550!3d15.5189!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbfef8d03f1abab%3A0x7e01b5a71b6f57e9!2sCandolim%2C%20Goa!5e0!3m2!1sen!2sin!4v1234567890"
                    className="w-full h-full border-0"
                    loading="lazy"
                    title="Property location in Candolim, Goa"
                    aria-label="Map showing property location"
                  />
                </div>
                <div className="mt-4">
                  <button className="font-semibold text-[#222222] underline hover:no-underline text-base flex items-center gap-1">
                    Show more <ChevronRightIcon size={12} />
                  </button>
                  <p className="text-sm text-[#717171] mt-2 leading-relaxed">
                    Candolim, North Goa — 5-min drive to the beach, close to restaurants, clubs, and markets. The exact address is shared after booking.
                  </p>
                </div>
              </section>

              {/* Host */}
              <section className="py-6 border-b border-[#DDDDDD]" aria-labelledby="host-heading">
                <div className="flex items-start gap-4 mb-5">
                  <div className="relative flex-shrink-0">
                    <img src={HOST.avatar} alt={HOST.name} className="w-16 h-16 rounded-full object-cover" width={64} height={64} />
                    {HOST.isSuperhost && (
                      <span className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#FF385C] rounded-full flex items-center justify-center shadow">
                        <svg viewBox="0 0 12 12" width="12" height="12" fill="white" aria-hidden="true"><path d="M6 0L7.3 3.6 11 4.1l-2.5 2.4.6 3.4L6 8.3 2.9 9.9l.6-3.4L1 4.1l3.7-.5z"/></svg>
                      </span>
                    )}
                  </div>
                  <div>
                    <h2 id="host-heading" className="text-2xl font-semibold text-[#222222]">Hosted by {HOST.name}</h2>
                    <p className="text-sm text-[#717171]">Joined in {HOST.joinedYear}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6 text-sm font-medium text-[#222222] mb-5">
                  <span>{HOST.reviewCount} Reviews</span>
                  <span className="flex items-center gap-1"><AirbnbStarIcon size={12} /> {HOST.rating} rating</span>
                  {HOST.isSuperhost && (
                    <span className="flex items-center gap-1">
                      <svg viewBox="0 0 12 12" width="12" height="12" fill="currentColor" aria-hidden="true"><path d="M6 0L7.3 3.6 11 4.1l-2.5 2.4.6 3.4L6 8.3 2.9 9.9l.6-3.4L1 4.1l3.7-.5z"/></svg>
                      Superhost
                    </span>
                  )}
                </div>

                <p className="text-base text-[#222222] leading-7 mb-5">{HOST.about}</p>

                <div className="space-y-2 text-sm text-[#717171] mb-6">
                  <p><strong className="text-[#222222]">Response rate:</strong> {HOST.responseRate}</p>
                  <p><strong className="text-[#222222]">Response time:</strong> {HOST.responseTime}</p>
                </div>

                <button
                  className="px-6 py-3.5 border border-[#222222] rounded-xl font-semibold text-[#222222] text-sm hover:bg-[#F7F7F7] transition-colors"
                  id="contact-host-btn"
                >
                  Contact host
                </button>

                <div className="flex items-start gap-3 mt-6 p-4 bg-[#F7F7F7] rounded-2xl">
                  <svg viewBox="0 0 32 32" width="16" height="16" fill="none" stroke="#717171" strokeWidth="2" className="flex-shrink-0 mt-0.5" aria-hidden="true">
                    <path d="M16 3l-12 4v10c0 8 12 12 12 12s12-4 12-12V7L16 3z"/>
                  </svg>
                  <p className="text-xs text-[#717171] leading-relaxed">
                    To protect your payment, never transfer money or communicate outside of the Airbnb website or app.
                  </p>
                </div>
              </section>

              {/* Things to know */}
              <section className="py-6" aria-labelledby="things-heading">
                <h2 id="things-heading" className="text-2xl font-semibold text-[#222222] mb-6">Things to know</h2>
                <div className="grid grid-cols-3 gap-8">
                  <div>
                    <h3 className="font-semibold text-[#222222] mb-4 text-base">House rules</h3>
                    <ul className="space-y-3 text-sm text-[#717171]">
                      <li>Check-in: {LISTING.checkin}</li>
                      <li>Checkout before {LISTING.checkout}</li>
                      <li>Self check-in with smart lock</li>
                      <li>{LISTING.maxGuests} guests maximum</li>
                      <li>{LISTING.minNights} nights minimum stay</li>
                      <li>No smoking</li>
                      <li>No pets</li>
                    </ul>
                    <button className="mt-4 font-semibold text-[#222222] underline hover:no-underline text-sm flex items-center gap-1">
                      Show more <ChevronRightIcon size={10} />
                    </button>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#222222] mb-4 text-base">Safety &amp; property</h3>
                    <ul className="space-y-3 text-sm text-[#717171]">
                      <li>Security camera/recording device</li>
                      <li>Carbon monoxide alarm</li>
                      <li>Smoke alarm</li>
                      <li>24-hour security</li>
                    </ul>
                    <button className="mt-4 font-semibold text-[#222222] underline hover:no-underline text-sm flex items-center gap-1">
                      Show more <ChevronRightIcon size={10} />
                    </button>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#222222] mb-4 text-base">Cancellation policy</h3>
                    <p className="text-sm text-[#717171] leading-relaxed">Free cancellation before 2:00 PM on day of check-in. After that, the reservation is non-refundable.</p>
                    <button className="mt-4 font-semibold text-[#222222] underline hover:no-underline text-sm flex items-center gap-1">
                      Show more <ChevronRightIcon size={10} />
                    </button>
                  </div>
                </div>
              </section>
            </div>

            {/* ── Right: Sticky Booking Card ── */}
            <aside aria-label="Booking panel">
              <BookingCard onReviewsClick={() => setModal('reviews')} />
            </aside>
          </div>
        </main>
      </div>
    </>
  );
}
