import { notFound } from "next/navigation";
import Image from "next/image";
import Navbar from "../../components/Navbar";
import { INITIAL_POSTS, getAllPosts, getPostBySlug } from "../blogData";
import "../blog.css";

export async function generateStaticParams() {
  return INITIAL_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug) || INITIAL_POSTS.find((p) => p.slug === slug);
  if (!post) {
    return { title: "Blog Article | Karnish Tourism" };
  }
  return {
    title: `${post.title} | Karnish Travel Journal`,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug) || INITIAL_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const allPosts = getAllPosts();
  const relatedPosts = allPosts
    .filter((p) => p.slug !== post.slug && (p.category === post.category || p.featured))
    .slice(0, 3);

  const isVisaPost = post.category === "Visa Updates" || post.tags?.includes("Visa");
  const isTourPost = post.category === "Destination Guides";

  return (
    <div className="kt-blog-page">
      <Navbar />

      {/* 1. Article Header */}
      <header className="kt-blog-hero" style={{ minHeight: "360px", padding: "120px 0 50px" }}>
        <Image
          src={post.image}
          alt={post.title}
          fill
          priority
          sizes="100vw"
          className="kt-blog-hero-bg"
        />
        <div className="kt-blog-hero-overlay" />
        <div className="kt-blog-container">
          <div className="kt-visa-breadcrumb" style={{ marginBottom: "16px" }}>
            <a href="/">Home</a>
            <i className="ti-angle-right" />
            <a href="/blog">Travel Journal</a>
            <i className="ti-angle-right" />
            <span>{post.category}</span>
          </div>

          <div className="d-flex align-items-center gap-2 mb-3">
            <span className="kt-category-pill" style={{ background: "rgba(32,149,174,0.3)", color: "#7fd0df" }}>
              {post.category}
            </span>
            <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "12px" }}>
              {post.date} • {post.readTime}
            </span>
          </div>

          <h1 style={{ fontSize: "clamp(30px, 3.8vw, 52px)" }}>{post.title}</h1>
          <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "16px" }}>{post.excerpt}</p>
        </div>
      </header>

      {/* 2. Reading Layout */}
      <main className="kt-blog-container">
        <div className="kt-article-layout">
          {/* Main Article Content */}
          <article className="kt-article-content">
            {/* Cover image banner */}
            <div className="kt-article-hero-banner">
              <Image
                src={post.image}
                alt={post.title}
                fill
                sizes="(max-width: 992px) 100vw, 800px"
              />
            </div>

            {/* Key Takeaways */}
            {post.keyTakeaways && post.keyTakeaways.length > 0 && (
              <div className="kt-article-takeaways">
                <div className="kt-takeaways-head">
                  <i className="ti-light-bulb" /> Key Intelligence &amp; Takeaways
                </div>
                <ul className="kt-takeaways-list">
                  {post.keyTakeaways.map((point, idx) => (
                    <li key={idx}>
                      <i className="ti-check" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Article Content */}
            <div
              className="kt-article-body"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="d-flex gap-2 flex-wrap my-4">
                <strong style={{ color: "#0f2454", fontSize: "13px", alignSelf: "center" }}>Tags:</strong>
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      background: "#f1f5f9",
                      padding: "4px 10px",
                      borderRadius: "6px",
                      fontSize: "12px",
                      color: "#475569",
                    }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Social Share Bar */}
            <div className="kt-article-share-bar">
              <span style={{ fontSize: "13px", fontWeight: "600", color: "#0f2454" }}>
                Share this intelligence:
              </span>
              <div className="kt-share-links">
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(`${post.title} - https://karnishtourism.com/blog/${post.slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="kt-share-btn"
                  title="Share on WhatsApp"
                >
                  <i className="fa-brands fa-whatsapp" />
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://karnishtourism.com/blog/${post.slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="kt-share-btn"
                  title="Share on X / Twitter"
                >
                  <i className="fa-brands fa-x-twitter" />
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://karnishtourism.com/blog/${post.slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="kt-share-btn"
                  title="Share on LinkedIn"
                >
                  <i className="fa-brands fa-linkedin" />
                </a>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="kt-article-sidebar">
            {/* Author Profile */}
            <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "24px" }}>
              <div className="d-flex align-items-center gap-3 mb-3">
                <div className="kt-author-avatar" style={{ width: "44px", height: "44px", fontSize: "16px" }}>
                  <i className="ti-user" />
                </div>
                <div>
                  <strong style={{ color: "#0f2454", display: "block", fontSize: "14px" }}>{post.author}</strong>
                  <small style={{ color: "#64748b" }}>Karnish Editorial Specialist</small>
                </div>
              </div>
              <p style={{ fontSize: "12px", color: "#64748b", margin: 0, lineHeight: "1.5" }}>
                Curating verified travel intel, consular guidelines, and bespoke luxury itineraries for discerning voyagers.
              </p>
            </div>

            {/* Contextual Action Card */}
            {isVisaPost ? (
              <div className="kt-sidebar-cta">
                <span style={{ color: "#d39948", fontSize: "10px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.1em", display: "block", marginBottom: "6px" }}>
                  Official Consular Desk
                </span>
                <h4>Need Visa Clearance for Your Trip?</h4>
                <p>
                  Lodge your e-Visa application online with direct document upload and 99.4% approval guarantee.
                </p>
                <a href="/visas" className="kt-btn-cta-full">
                  Apply Online Now <i className="ti-arrow-right" />
                </a>
              </div>
            ) : isTourPost ? (
              <div className="kt-sidebar-cta">
                <span style={{ color: "#d39948", fontSize: "10px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.1em", display: "block", marginBottom: "6px" }}>
                  Handcrafted Journeys
                </span>
                <h4>Ready to Visit This Destination?</h4>
                <p>
                  Explore curated boutique packages with verified hotels, private transfers, and personalized itineraries.
                </p>
                <a href="/tours" className="kt-btn-cta-full">
                  Explore Tour Packages <i className="ti-arrow-right" />
                </a>
              </div>
            ) : (
              <div className="kt-sidebar-cta">
                <span style={{ color: "#d39948", fontSize: "10px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.1em", display: "block", marginBottom: "6px" }}>
                  Bespoke Planning
                </span>
                <h4>Planning Your Next Adventure?</h4>
                <p>
                  Speak with our destination specialists for tailored quotes, luxury resort vouchers, and full concierge support.
                </p>
                <a href="/tours/inquiry" className="kt-btn-cta-full">
                  Get a Custom Quote <i className="ti-arrow-right" />
                </a>
              </div>
            )}
          </aside>
        </div>

        {/* 3. Related Stories */}
        {relatedPosts.length > 0 && (
          <section style={{ borderTop: "1px solid #e2e8f0", paddingTop: "50px", marginBottom: "80px" }}>
            <h3 style={{ color: "#0f2454", fontSize: "24px", marginBottom: "25px" }}>Related Intelligence &amp; Stories</h3>
            <div className="kt-blog-grid" style={{ marginBottom: 0 }}>
              {relatedPosts.map((rel) => (
                <article key={rel.slug} className="kt-blog-card">
                  <div className="kt-blog-card-img" style={{ height: "180px" }}>
                    <Image src={rel.image} alt={rel.title} fill sizes="350px" />
                    <div className="kt-blog-card-badge">
                      <span className="kt-category-pill">{rel.category}</span>
                    </div>
                  </div>
                  <div className="kt-blog-card-body" style={{ padding: "18px" }}>
                    <small style={{ color: "#94a3b8", display: "block", marginBottom: "6px" }}>{rel.date}</small>
                    <h4 style={{ fontSize: "16px", color: "#0f2454", lineHeight: "1.3" }}>
                      <a href={`/blog/${rel.slug}`}>{rel.title}</a>
                    </h4>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
