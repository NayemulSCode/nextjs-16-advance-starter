```project-root/
│
├── public/
│   ├── fonts/
│   ├── images/
│   │   ├── placeholders/
│   │   └── logos/
│   ├── locales/
│   │   ├── en/
│   │   │   ├── common.json
│   │   │   ├── tours.json
│   │   │   ├── hotels.json
│   │   │   └── buses.json
│   │   ├── es/
│   │   ├── fr/
│   │   └── bn/
│   ├── manifest.json
│   └── robots.txt
│
├── src/
│   │
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── (auth)/
│   │   │   │   ├── login/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── register/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── forgot-password/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── layout.tsx
│   │   │   │
│   │   │   ├── (main)/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── tours/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   ├── [id]/
│   │   │   │   │   │   ├── page.tsx
│   │   │   │   │   │   └── loading.tsx
│   │   │   │   │   └── loading.tsx
│   │   │   │   ├── hotels/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   ├── [id]/
│   │   │   │   │   │   ├── page.tsx
│   │   │   │   │   │   └── loading.tsx
│   │   │   │   │   └── loading.tsx
│   │   │   │   ├── buses/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   ├── search/
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   └── loading.tsx
│   │   │   │   ├── booking/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   └── [bookingId]/
│   │   │   │   │       └── page.tsx
│   │   │   │   ├── profile/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   └── bookings/
│   │   │   │   │       └── page.tsx
│   │   │   │   └── layout.tsx
│   │   │   │
│   │   │   ├── layout.tsx
│   │   │   ├── loading.tsx
│   │   │   ├── error.tsx
│   │   │   └── not-found.tsx
│   │   │
│   │   ├── api/
│   │   │   └── auth/
│   │   │       └── [...nextauth]/
│   │   │           └── route.ts
│   │   │
│   │   ├── layout.tsx
│   │   ├── global-error.tsx
│   │   └── manifest.ts
│   │
│   ├── components/
│   │   ├── ui/
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── form.tsx
│   │   │   ├── select.tsx
│   │   │   ├── skeleton.tsx
│   │   │   └── toast.tsx
│   │   │
│   │   ├── shared/
│   │   │   ├── Header/
│   │   │   │   ├── Header.tsx
│   │   │   │   ├── Navigation.tsx
│   │   │   │   ├── UserMenu.tsx
│   │   │   │   └── LanguageSwitcher.tsx
│   │   │   ├── Footer/
│   │   │   │   └── Footer.tsx
│   │   │   ├── ImageWithPlaceholder/
│   │   │   │   └── ImageWithPlaceholder.tsx
│   │   │   ├── LoadingSpinner/
│   │   │   │   └── LoadingSpinner.tsx
│   │   │   ├── ErrorBoundary/
│   │   │   │   └── ErrorBoundary.tsx
│   │   │   ├── CurrencySwitcher/
│   │   │   │   └── CurrencySwitcher.tsx
│   │   │   └── ScrollToTop/
│   │   │       └── ScrollToTop.tsx
│   │   │
│   │   ├── features/
│   │   │   ├── tours/
│   │   │   │   ├── TourCard.tsx
│   │   │   │   ├── TourList.tsx
│   │   │   │   ├── TourDetails.tsx
│   │   │   │   ├── TourBookingForm.tsx
│   │   │   │   └── TourFilters.tsx
│   │   │   ├── hotels/
│   │   │   │   ├── HotelCard.tsx
│   │   │   │   ├── HotelList.tsx
│   │   │   │   ├── HotelDetails.tsx
│   │   │   │   ├── RoomSelection.tsx
│   │   │   │   └── HotelFilters.tsx
│   │   │   ├── buses/
│   │   │   │   ├── BusCard.tsx
│   │   │   │   ├── BusList.tsx
│   │   │   │   ├── SeatSelection.tsx
│   │   │   │   └── BusSearchForm.tsx
│   │   │   ├── booking/
│   │   │   │   ├── BookingForm.tsx
│   │   │   │   ├── BookingSummary.tsx
│   │   │   │   ├── PaymentForm.tsx
│   │   │   │   └── BookingConfirmation.tsx
│   │   │   └── auth/
│   │   │       ├── LoginForm.tsx
│   │   │       ├── RegisterForm.tsx
│   │   │       └── SocialLogin.tsx
│   │   │
│   │   └── providers/
│   │       ├── Providers.tsx
│   │       ├── AuthProvider.tsx
│   │       ├── QueryProvider.tsx
│   │       ├── ThemeProvider.tsx
│   │       └── ToastProvider.tsx
│   │
│   ├── lib/
│   │   ├── api/
│   │   │   ├── client.ts
│   │   │   ├── tours.ts
│   │   │   ├── hotels.ts
│   │   │   ├── buses.ts
│   │   │   └── bookings.ts
│   │   │
│   │   ├── auth/
│   │   │   ├── auth.config.ts
│   │   │   └── auth-options.ts
│   │   │
│   │   ├── query/
│   │   │   ├── client.ts
│   │   │   ├── server.ts
│   │   │   ├── prefetch.ts
│   │   │   └── mutations/
│   │   │       ├── tours.ts
│   │   │       ├── hotels.ts
│   │   │       ├── buses.ts
│   │   │       └── bookings.ts
│   │   │
│   │   ├── validations/
│   │   │   ├── auth.schema.ts
│   │   │   ├── tour.schema.ts
│   │   │   ├── hotel.schema.ts
│   │   │   ├── bus.schema.ts
│   │   │   └── booking.schema.ts
│   │   │
│   │   ├── i18n/
│   │   │   ├── config.ts
│   │   │   ├── request.ts
│   │   │   └── routing.ts
│   │   │
│   │   └── utils/
│   │       ├── cn.ts
│   │       ├── currency.ts
│   │       ├── date.ts
│   │       ├── format.ts
│   │       ├── image.ts
│   │       └── seo.ts
│   │
│   ├── hooks/
│   │   ├── use-toast.tsx
│   │   ├── use-device-width.tsx
│   │   ├── use-scroll-position.tsx
│   │   ├── use-intersection-observer.tsx
│   │   ├── use-media-query.tsx
│   │   ├── use-debounce.tsx
│   │   ├── use-currency.tsx
│   │   ├── use-locale.tsx
│   │   └── queries/
│   │       ├── use-tours.tsx
│   │       ├── use-hotels.tsx
│   │       ├── use-buses.tsx
│   │       └── use-bookings.tsx
│   │
│   ├── store/
│   │   ├── index.ts
│   │   └── slices/
│   │       ├── auth.slice.ts
│   │       ├── booking.slice.ts
│   │       ├── currency.slice.ts
│   │       ├── locale.slice.ts
│   │       └── ui.slice.ts
│   │
│   ├── types/
│   │   ├── index.ts
│   │   ├── auth.types.ts
│   │   ├── tour.types.ts
│   │   ├── hotel.types.ts
│   │   ├── bus.types.ts
│   │   ├── booking.types.ts
│   │   ├── api.types.ts
│   │   └── next-auth.d.ts
│   │
│   ├── constants/
│   │   ├── routes.ts
│   │   ├── currencies.ts
│   │   ├── locales.ts
│   │   ├── api-endpoints.ts
│   │   └── seo.ts
│   │
│   ├── config/
│   │   ├── site.config.ts
│   │   ├── navigation.config.ts
│   │   └── seo.config.ts
│   │
│   └── middleware.ts
│
├── .husky/
│   ├── pre-commit
│   └── pre-push
│
├── scripts/
│   └── generate-sitemap.ts
│
├── .env.local
├── .env.example
├── .eslintrc.json
├── .prettierrc
├── .gitignore
├── next.config.ts
├── tsconfig.json
├── postcss.config.mjs
├── components.json
├── package.json
└── README.md
```
current project structure

```
src/
├── app/
│   ├── [locale]/
│   │   ├── (auth)/
│   │   │   ├── login/page.tsx
│   │   │   └── layout.tsx
│   │   ├── (main)/
│   │   │   ├── page.tsx
│   │   │   └── layout.tsx
│   │   ├── layout.tsx
│   │   └── not-found.tsx
│   ├── api/auth/[...nextauth]/route.ts
│   └── layout.tsx
├── components/
│   ├── ui/
│   ├── shared/
│   └── providers/
├── lib/
│   ├── api/
│   ├── auth/
│   ├── i18n/
│   ├── query/
│   ├── validations/
│   └── utils/
├── hooks/
├── store/
├── types/
├── constants/
└── middleware.ts
```

### shadcn/ui
Selected options:
- Style: Default
- Base color: Slate
- CSS variables: Yes

