"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { BLOG_CATEGORIES, getAllPosts } from "./blogData";
import { fetchPublic } from "@/lib/api";
import "./blog.css";

export default function BlogHubPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All Stories");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    let active = true;
    fetchPublic("posts", { limit: 100 })
      .then((data) => {
        if (active) {
          const items = Array.isArray(data?.items) ? data.items : [];
          setPosts(items);
        }
      })
      .catch(() => {
        if (active) setPosts([]);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, []);

  const normalizedPosts = posts.map((post) => ({
    ...post,
    image: post.imageUrl || post.image || "/images/destination-02.jpg",
    excerpt: post.summary || post.excerpt || (post.content ? post.content.replace(/<[^>]*>/g, "").slice(0, 160) + "..." : ""),
    date: post.date || (post.publishedAt ? new Date(post.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "Recent"),
    author: post.author || "Karnish Editorial",
    readTime: post.readTime || "5 min read",
  }));

  const filteredPosts = normalizedPosts.filter((post) => {
    const matchesCat =
      selectedCategory === "All Stories" || post.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      (post.title || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (post.excerpt || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags?.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const featuredPost = normalizedPosts.find((p) => p.featured) || normalizedPosts[0];
  const gridPosts = filteredPosts.filter((p) => p.slug !== featuredPost?.slug);

  return (
    <div className="kt-blog-page">

      {/* 1. Hero */}
      <header className="kt-blog-hero">
        <Image
          src="/images/destination-02.jpg"
          alt="Travel journal and guides"
          fill
          priority
          sizes="100vw"
          className="kt-blog-hero-bg"
        />
        <div className="kt-blog-hero-overlay" />
        <div className="kt-blog-container">
          <span className="kt-blog-kicker">
            <i className="ti-bookmark" /> Karnish Travel Journal &amp; Intelligence
          </span>
          <h1>
            Destination Guides, <em>Visa Updates</em> &amp; Travel Insights
          </h1>
          <p>
            Curated intelligence from seasoned voyagers: consular updates, packing masterclasses, zero-markup currency strategies, and uncrowded alpine itineraries.
          </p>
        </div>
      </header>

      {/* 2. Controls & Categories */}
      <main className="kt-blog-container">
        <div className="kt-blog-controls">
          <div className="kt-blog-tabs">
            {BLOG_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                suppressHydrationWarning
                className={`kt-blog-tab ${selectedCategory === cat ? "active" : ""}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="d-flex align-items-center gap-3">
            <div className="kt-blog-search">
              <i className="ti-search" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search guides, visas, tips..."
              />
            </div>
            <Link
              href="/admin/blog"
              className="kt-blog-tab d-none d-md-inline-flex align-items-center gap-1"
              title="Editorial Admin CMS"
            >
              <i className="ti-settings" /> Admin CMS
            </Link>
          </div>
        </div>

        {loading ? (
          <div style={{ padding: "80px 0", textAlign: "center", color: "#64748b" }}>
            <p>Loading journal articles...</p>
          </div>
        ) : normalizedPosts.length === 0 ? (
          <div style={{ padding: "80px 20px", textAlign: "center" }}>
            <i className="ti-bookmark-alt" style={{ fontSize: "40px", color: "#2095ae", marginBottom: "16px", display: "block" }} />
            <h3 style={{ color: "#0f2454", fontSize: "24px", marginBottom: "8px" }}>No Articles Published Yet</h3>
            <p style={{ color: "#64748b", fontSize: "15px", maxWidth: "500px", margin: "0 auto 20px" }}>
              Articles published via the Admin Portal will appear here live.
            </p>
            <Link href="/admin/blog" className="kt-read-more-btn" style={{ display: "inline-flex" }}>
              Create First Article in Admin CMS <i className="ti-arrow-right" />
            </Link>
          </div>
        ) : (
          <>
            {/* 3. Featured Post (shown if All Stories or matching category) */}
            {featuredPost &&
              (selectedCategory === "All Stories" ||
                featuredPost.category === selectedCategory) &&
              !searchQuery && (
                <article className="kt-featured-post">
                  <div className="kt-featured-img-wrap">
                    <Image
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      fill
                      priority
                      sizes="(max-width: 992px) 100vw, 600px"
                    />
                    <span className="kt-featured-badge">Featured Story</span>
                  </div>
                  <div className="kt-featured-content">
                    <div className="kt-featured-meta">
                      <span className="kt-category-pill">{featuredPost.category}</span>
                      <span>{featuredPost.date}</span>
                      <span>• {featuredPost.readTime}</span>
                    </div>
                    <h2>
                      <a href={`/blog/${featuredPost.slug}`}>{featuredPost.title}</a>
                    </h2>
                    <p>{featuredPost.excerpt}</p>
                    <div className="kt-featured-footer">
                      <div className="kt-author-info">
                        <div className="kt-author-avatar">
                          <i className="ti-user" />
                        </div>
                        <span>{featuredPost.author}</span>
                      </div>
                      <a href={`/blog/${featuredPost.slug}`} className="kt-read-more-btn">
                        Read Full Story <i className="ti-arrow-right" />
                      </a>
                    </div>
                  </div>
                </article>
              )}

            {/* 4. Article Grid */}
            {gridPosts.length > 0 ? (
              <div className="kt-blog-grid" key={`${selectedCategory}-${searchQuery}`}>
                {gridPosts.map((post, idx) => (
                  <article key={post.slug || post.id || post._id || `blog-${idx}`} className="kt-blog-card">
                    <div className="kt-blog-card-img">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 400px"
                      />
                      <div className="kt-blog-card-badge">
                        <span className="kt-category-pill">{post.category}</span>
                      </div>
                    </div>
                    <div className="kt-blog-card-body">
                      <div className="kt-blog-card-meta">
                        <span>{post.date}</span>
                        <span>• {post.readTime}</span>
                      </div>
                      <h3>
                        <a href={`/blog/${post.slug}`}>{post.title}</a>
                      </h3>
                      <p>{post.excerpt}</p>
                      <div className="kt-blog-card-footer">
                        <span style={{ color: "#64748b", fontWeight: "500" }}>{post.author}</span>
                        <a href={`/blog/${post.slug}`} className="kt-read-more-btn">
                          Read <i className="ti-arrow-right" />
                        </a>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div style={{ padding: "60px 0", textAlign: "center" }}>
                <i className="ti-search" style={{ fontSize: "36px", color: "#94a3b8", marginBottom: "12px", display: "block" }} />
                <h4 style={{ color: "#0f2454" }}>No articles found for &quot;{searchQuery}&quot;</h4>
                <p style={{ color: "#64748b", fontSize: "14px" }}>Try selecting another category or clearing your search term.</p>
                <button
                  type="button"
                  suppressHydrationWarning
                  className="kt-blog-tab active"
                  onClick={() => {
                    setSelectedCategory("All Stories");
                    setSearchQuery("");
                  }}
                >
                  Reset Filters
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
