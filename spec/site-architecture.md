# Site Architecture & URL Structure

## URL Slug Map (Relative Paths)

| Slug | Page | H1 Tag |
|------|------|--------|
| `/` | Homepage | CAF Patronato Fondi – 730, ISEE e Assistenza Fiscale |
| `/caf-730-online` | CAF 730 Online | CAF 730 Online a Fondi e Latina – Prenotazione e Assistenza |
| `/caf-isee` | Calcolo ISEE | CAF ISEE a Fondi – Prenotazione e Calcolo Online |
| `/patronato-inps` | Patronato INPS | Patronato CAF Fondi – Pensioni, NASpI e Pratiche INPS |
| `/caf-dichiarazione-redditi` | Dichiarazione Redditi | CAF Dichiarazione Redditi a Fondi – Consulenza Fiscale Completa |
| `/servizi` | All Services | Servizi CAF e Patronato a Fondi – 730, ISEE, Pensioni e Consulenza |
| `/chi-siamo` | About Us | Chi Siamo – CAF Patronato Fondi, Tutela Fiscale dal 2005 |
| `/contatto` | Contact | Contattaci – Prenotazione Appuntamento CAF a Fondi |

## Header Navigation Structure
```
Home | Chi Siamo | Servizi (dropdown) | Contatto | [CTA: Prenota Appuntamento]
                      ├── CAF 730 Online
                      ├── Calcolo ISEE
                      ├── Patronato INPS
                      ├── CAF Dichiarazione Redditi
                      └── Tutti i Servizi
```

## Internal Linking Matrix

Each service page links to 3 related services via "Servizi Correlati" section:

| Page | Links To |
|------|----------|
| CAF 730 | ISEE, Patronato, Dichiarazione |
| ISEE | 730, Patronato, Dichiarazione |
| Patronato | 730, ISEE, Dichiarazione |
| Dichiarazione | 730, ISEE, Patronato |

## JSON-LD Schema Per Page
- `/` → `LocalBusiness` + `AggregateRating`
- `/caf-730-online` → `Service` (type: CAF 730)
- `/caf-isee` → `Service` (type: Calcolo ISEE)
- `/patronato-inps` → `Service` (type: Patronato INPS)
- `/caf-dichiarazione-redditi` → `Service` (type: Dichiarazione Redditi)
- `/servizi` → `Service` (multiple types)
- `/contatto` → `LocalBusiness` + `openingHours`
