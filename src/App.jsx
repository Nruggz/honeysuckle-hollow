import { useMemo, useState } from "react";
import "./app.css";
import logo from "./assets/logo-transparent.png";

const OWNER_PHONE = "+1-555-555-5555"; // TODO: replace
const OWNER_EMAIL = "hello@honeysucklehollow.com"; // TODO: replace

const GALLERY_ITEMS = [
  // Weddings
  {
    id: "w1",
    category: "Weddings",
    alt: "Wedding ceremony in the barn",
    src: "https://images.unsplash.com/photo-1520857014576-2c4f4c972b57?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "w2",
    category: "Weddings",
    alt: "Bride and groom outdoors",
    src: "https://images.unsplash.com/photo-1523438097201-512ae7d59b71?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "w3",
    category: "Weddings",
    alt: "Reception table setting",
    src: "https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=1600&q=80",
  },

  // Venue + Land
  {
    id: "v1",
    category: "Venue & Land",
    alt: "Rustic barn exterior",
    src: "https://images.unsplash.com/photo-1516455207990-7a41ce80f7ee?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "v2",
    category: "Venue & Land",
    alt: "Country landscape at golden hour",
    src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "v3",
    category: "Venue & Land",
    alt: "Pond and trees",
    src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1600&q=80",
  },
];

export default function App() {
  return (
    <div className="page" id="top">
      <Header />
      <main>
        <Hero />
        <Highlights />
        <Gallery items={GALLERY_ITEMS} />
        <Contact ownerPhone={OWNER_PHONE} ownerEmail={OWNER_EMAIL} />
      </main>
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="header">
      <div className="container headerInner">
        <a className="brand" href="#top" aria-label="Honeysuckle Hollow Home">
          <img className="brandLogo" src={logo} alt="Honeysuckle Hollow" />
        </a>

        <nav className="nav" aria-label="Primary navigation">
          <a href="#gallery">Gallery</a>
          <a href="#contact">Contact</a>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="container heroDramatic">
        <img className="heroLogo" src={logo} alt="Honeysuckle Hollow Wedding Venue" />

        <div className="heroDivider" />

        <p className="kicker">Kentucky • Rustic Countryside Venue</p>

        <h1 className="heroTitle">A countryside setting where love grows wild.</h1>

        <p className="heroSubtitle">
          Exchange vows beside the ponds, celebrate in the barn, and gather your favorite
          people for a weekend to remember at Honeysuckle Hollow.
        </p>

        <div className="heroCtas">
          <a className="btn primary" href="#contact">
            Check Availability
          </a>
          <a className="btn ghost" href="#gallery">
            View Gallery
          </a>
        </div>

        <div className="pillRow" aria-label="Venue highlights">
          <span className="pill">Barn + Outdoor spaces</span>
          <span className="pill">Ponds + Scenic land</span>
          <span className="pill">On-site lodging</span>
        </div>
      </div>
    </section>
  );
}

function Highlights() {
  const items = [
    {
      title: "Rustic countryside charm",
      text: "Open skies, peaceful land, and a natural setting made for photos.",
    },
    {
      title: "Space for your whole weekend",
      text: "Celebrate, gather, and unwind together with room to spread out.",
    },
    {
      title: "Simple planning",
      text: "Reach out for availability, pricing, and details in just a few minutes.",
    },
  ];

  return (
    <section className="section">
      <div className="container">
        <h2 className="sectionTitle">Why couples choose Honeysuckle Hollow</h2>
        <p className="sectionSubtitle">
          A warm, welcoming venue with the flexibility to make your day feel truly yours.
        </p>

        <div className="cardGrid">
          {items.map((it) => (
            <article key={it.title} className="card">
              <h3 className="cardTitle">{it.title}</h3>
              <p className="cardText">{it.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Gallery({ items }) {
  const [filter, setFilter] = useState("All");
  const [active, setActive] = useState(null);

  const filters = useMemo(
    () => ["All", ...Array.from(new Set(items.map((i) => i.category)))],
    [items]
  );

  const visible = useMemo(() => {
    if (filter === "All") return items;
    return items.filter((i) => i.category === filter);
  }, [items, filter]);

  return (
    <section className="section alt" id="gallery">
      <div className="container">
        <div className="sectionHeadRow">
          <div>
            <h2 className="sectionTitle">Gallery</h2>
            <p className="sectionSubtitle">
              Previous weddings, the land, and the venue — tap a photo to enlarge.
            </p>
          </div>

          <div className="filters" role="tablist" aria-label="Gallery filters">
            {filters.map((f) => (
              <button
                key={f}
                className={`chip ${filter === f ? "active" : ""}`}
                onClick={() => setFilter(f)}
                type="button"
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="masonry" aria-label="Photo gallery">
          {visible.map((img) => (
            <button
              key={img.id}
              className="tile"
              type="button"
              onClick={() => setActive(img)}
              aria-label={`Open image: ${img.alt}`}
            >
              <img src={img.src} alt={img.alt} loading="lazy" />
              <span className="badge">{img.category}</span>
            </button>
          ))}
        </div>

        {active && (
          <Lightbox
            item={active}
            onClose={() => setActive(null)}
            onPrev={() => {
              const idx = visible.findIndex((x) => x.id === active.id);
              setActive(visible[(idx - 1 + visible.length) % visible.length]);
            }}
            onNext={() => {
              const idx = visible.findIndex((x) => x.id === active.id);
              setActive(visible[(idx + 1) % visible.length]);
            }}
          />
        )}
      </div>
    </section>
  );
}

function Lightbox({ item, onClose, onPrev, onNext }) {
  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
      onClick={onClose}
    >
      <div className="lightboxInner" onClick={(e) => e.stopPropagation()}>
        <div className="lightboxTop">
          <div className="lightboxMeta">
            <span className="lightboxTitle">{item.category}</span>
            <span className="lightboxSub">{item.alt}</span>
          </div>
          <button className="iconBtn" type="button" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        <img className="lightboxImg" src={item.src} alt={item.alt} />

        <div className="lightboxControls">
          <button className="btn ghost" type="button" onClick={onPrev} aria-label="Previous image">
            ← Prev
          </button>
          <button className="btn ghost" type="button" onClick={onNext} aria-label="Next image">
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}

function Contact({ ownerPhone, ownerEmail }) {
  return (
    <section className="section" id="contact">
      <div className="container contactGrid">
        <div>
          <h2 className="sectionTitle">Contact the owner</h2>
          <p className="sectionSubtitle">
            Share your date, estimated guest count, and what you’re envisioning.
          </p>

          <div className="contactCards">
            <a className="contactCard" href={`tel:${ownerPhone.replaceAll("-", "")}`}>
              <div className="contactLabel">Phone</div>
              <div className="contactValue">{ownerPhone}</div>
              <div className="contactHint">Tap to call</div>
            </a>

            <a className="contactCard" href={`mailto:${ownerEmail}`}>
              <div className="contactLabel">Email</div>
              <div className="contactValue">{ownerEmail}</div>
              <div className="contactHint">Tap to email</div>
            </a>
          </div>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}

function ContactForm() {
  const [status, setStatus] = useState({ state: "idle", message: "" });

  return (
    <form
      className="form"
      onSubmit={async (e) => {
        e.preventDefault();
        setStatus({ state: "loading", message: "Sending..." });

        // Demo only — replace with real form handler later
        await new Promise((r) => setTimeout(r, 700));
        setStatus({
          state: "success",
          message: "Message sent! (Demo) Hook this to email when ready.",
        });
        e.currentTarget.reset();
      }}
    >
      <label className="field">
        <span>Name</span>
        <input name="name" required placeholder="Your name" />
      </label>

      <label className="field">
        <span>Email</span>
        <input name="email" type="email" required placeholder="you@domain.com" />
      </label>

      <div className="fieldRow">
        <label className="field">
          <span>Date</span>
          <input name="date" type="date" />
        </label>
        <label className="field">
          <span>Guest count</span>
          <input name="guests" type="number" min="1" placeholder="e.g. 120" />
        </label>
      </div>

      <label className="field">
        <span>Message</span>
        <textarea name="message" rows="5" required placeholder="Tell us what you’re planning..." />
      </label>

      <button className="btn primary full" type="submit" disabled={status.state === "loading"}>
        {status.state === "loading" ? "Sending..." : "Send message"}
      </button>

      {status.message ? (
        <p className={`formStatus ${status.state}`}>{status.message}</p>
      ) : (
        <p className="finePrint">This form is front-end only right now.</p>
      )}
    </form>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container footerInner">
        <p>© {year} Honeysuckle Hollow Wedding Venue</p>
        <div className="footerLinks">
          <a href="#gallery">Gallery</a>
          <a href="#contact">Contact</a>
          <a href="#top">Back to top</a>
        </div>
      </div>
    </footer>
  );
}
