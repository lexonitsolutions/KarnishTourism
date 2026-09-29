"use client";

import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import { BLOG_CATEGORIES, getAllPosts, savePost, deletePost } from "../../blog/blogData";
import "../../blog/blog.css";

export default function AdminBlogCMSPage() {
  const [posts, setPosts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [notification, setNotification] = useState("");

  const defaultForm = {
    slug: "",
    title: "",
    category: "Visa Updates",
    excerpt: "",
    image: "/images/destination-01.jpg",
    author: "Karnish Editorial Team",
    readTime: "5 min read",
    tags: "Visa, Travel, Guide",
    keyTakeawaysText: "Key point 1\nKey point 2\nKey point 3",
    content: "<h3>Overview</h3>\n<p>Write your detailed article content here...</p>",
  };

  const [form, setForm] = useState(defaultForm);

  useEffect(() => {
    refreshPosts();
  }, []);

  const refreshPosts = () => {
    setPosts(getAllPosts());
  };

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(""), 3500);
  };

  const handleTitleChange = (val) => {
    const slug = val
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-");
    setForm((prev) => ({ ...prev, title: val, slug: prev.slug ? prev.slug : slug }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.slug.trim()) {
      showNotification("Please provide both a Title and a URL Slug.");
      return;
    }

    const payload = {
      slug: form.slug.toLowerCase().trim(),
      title: form.title.trim(),
      category: form.category,
      excerpt: form.excerpt.trim() || form.title.trim(),
      image: form.image || "/images/destination-01.jpg",
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      readTime: form.readTime || "5 min read",
      author: form.author || "Karnish Editorial Desk",
      featured: false,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      keyTakeaways: form.keyTakeawaysText
        .split("\n")
        .map((k) => k.trim())
        .filter(Boolean),
      content: form.content,
    };

    const success = savePost(payload);
    if (success) {
      showNotification(`Article "${payload.title}" published successfully!`);
      refreshPosts();
      setIsEditing(false);
      setForm(defaultForm);
    } else {
      showNotification("Failed to save post. Please try again.");
    }
  };

  const handleDelete = (slug, title) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      deletePost(slug);
      refreshPosts();
      showNotification(`Deleted article "${title}".`);
    }
  };

  const handleEditClick = (post) => {
    setForm({
      slug: post.slug,
      title: post.title,
      category: post.category,
      excerpt: post.excerpt,
      image: post.image,
      author: post.author,
      readTime: post.readTime,
      tags: post.tags?.join(", ") || "",
      keyTakeawaysText: post.keyTakeaways?.join("\n") || "",
      content: post.content,
    });
    setIsEditing(true);
  };

  const filteredPosts = posts.filter((p) => {
    const matchesCat = activeTab === "all" || p.category === activeTab;
    const matchesSearch =
      searchTerm === "" ||
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="kt-blog-page" style={{ minHeight: "100vh", background: "#f8fafc" }}>
      <Navbar />

      {/* Admin Sub-Header */}
      <div style={{ background: "#0f2454", color: "#ffffff", padding: "100px 0 30px" }}>
        <div className="kt-blog-container">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
            <div>
              <span style={{ color: "#d39948", fontSize: "11px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                Editorial Content Management System
              </span>
              <h2 style={{ color: "#ffffff", fontSize: "28px", margin: "4px 0 0" }}>
                Karnish Blog &amp; Visa Intelligence Admin
              </h2>
            </div>
            <div className="d-flex gap-2">
              <a
                href="/blog"
                style={{
                  background: "rgba(255,255,255,0.15)",
                  color: "#ffffff",
                  padding: "9px 18px",
                  borderRadius: "20px",
                  fontSize: "13px",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <i className="ti-eye" /> View Live Blog
              </a>
              <button
                type="button"
                onClick={() => {
                  setForm(defaultForm);
                  setIsEditing(!isEditing);
                }}
                style={{
                  background: isEditing ? "#64748b" : "#2095ae",
                  color: "#ffffff",
                  border: "none",
                  padding: "9px 20px",
                  borderRadius: "20px",
                  fontSize: "13px",
                  fontWeight: "600",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <i className={isEditing ? "ti-close" : "ti-plus"} />
                {isEditing ? "Close Editor" : "Create New Post"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="kt-blog-container" style={{ padding: "40px 0 80px" }}>
        {notification && (
          <div
            style={{
              padding: "14px 20px",
              background: "#dcfce7",
              color: "#166534",
              border: "1px solid #bbf7d0",
              borderRadius: "8px",
              marginBottom: "25px",
              fontSize: "14px",
              fontWeight: "500",
            }}
          >
            <i className="ti-check" style={{ marginRight: "8px" }} />
            {notification}
          </div>
        )}

        {/* 1. Quick Stats */}
        <div className="row g-3 mb-4">
          <div className="col-md-3 col-6">
            <div style={{ background: "#ffffff", padding: "18px 22px", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
              <small style={{ color: "#64748b", textTransform: "uppercase", fontSize: "11px" }}>Total Articles</small>
              <h3 style={{ color: "#0f2454", margin: "4px 0 0", fontSize: "28px" }}>{posts.length}</h3>
            </div>
          </div>
          <div className="col-md-3 col-6">
            <div style={{ background: "#ffffff", padding: "18px 22px", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
              <small style={{ color: "#64748b", textTransform: "uppercase", fontSize: "11px" }}>Visa Updates</small>
              <h3 style={{ color: "#2095ae", margin: "4px 0 0", fontSize: "28px" }}>
                {posts.filter((p) => p.category === "Visa Updates").length}
              </h3>
            </div>
          </div>
          <div className="col-md-3 col-6">
            <div style={{ background: "#ffffff", padding: "18px 22px", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
              <small style={{ color: "#64748b", textTransform: "uppercase", fontSize: "11px" }}>Destination Guides</small>
              <h3 style={{ color: "#0f2454", margin: "4px 0 0", fontSize: "28px" }}>
                {posts.filter((p) => p.category === "Destination Guides").length}
              </h3>
            </div>
          </div>
          <div className="col-md-3 col-6">
            <div style={{ background: "#ffffff", padding: "18px 22px", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
              <small style={{ color: "#64748b", textTransform: "uppercase", fontSize: "11px" }}>Tips &amp; News</small>
              <h3 style={{ color: "#d39948", margin: "4px 0 0", fontSize: "28px" }}>
                {posts.filter((p) => ["Travel Tips", "Packing Guides", "Tourism News"].includes(p.category)).length}
              </h3>
            </div>
          </div>
        </div>

        {/* 2. Editor Form (When expanded) */}
        {isEditing && (
          <div style={{ background: "#ffffff", padding: "32px", borderRadius: "12px", border: "1px solid #e2e8f0", marginBottom: "40px", boxShadow: "0 10px 30px rgba(0,0,0,0.06)" }}>
            <h3 style={{ color: "#0f2454", marginBottom: "20px" }}>
              {form.slug && posts.some((p) => p.slug === form.slug) ? "Edit Article" : "Publish New Article"}
            </h3>
            <form onSubmit={handleSave}>
              <div className="row g-3">
                <div className="col-md-8">
                  <label className="form-label" style={{ fontSize: "12px", fontWeight: "600", color: "#475569" }}>Article Title *</label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    value={form.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="e.g. New UAE 60-Day Visa Rules and Application Procedures"
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label" style={{ fontSize: "12px", fontWeight: "600", color: "#475569" }}>Category *</label>
                  <select
                    className="form-select"
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                  >
                    {BLOG_CATEGORIES.filter((c) => c !== "All Stories").map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-6">
                  <label className="form-label" style={{ fontSize: "12px", fontWeight: "600", color: "#475569" }}>URL Slug (Permanent Link) *</label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    placeholder="e.g. uae-60-day-visa-rules"
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label" style={{ fontSize: "12px", fontWeight: "600", color: "#475569" }}>Cover Image URL</label>
                  <select
                    className="form-select"
                    value={form.image}
                    onChange={(e) => setForm({ ...form, image: e.target.value })}
                  >
                    <option value="/images/destination-01.jpg">Destination 01 (Dubai / Luxury)</option>
                    <option value="/images/destination-02.jpg">Destination 02 (Tropical / Beach)</option>
                    <option value="/images/destination-03.jpg">Destination 03 (Alpine / Switzerland)</option>
                    <option value="/images/destination-hero.jpg">Destination Hero Banner</option>
                  </select>
                </div>

                <div className="col-12">
                  <label className="form-label" style={{ fontSize: "12px", fontWeight: "600", color: "#475569" }}>Excerpt (Summary for cards &amp; SEO)</label>
                  <textarea
                    rows={2}
                    className="form-control"
                    value={form.excerpt}
                    onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                    placeholder="Concise 1-2 sentence overview of the article..."
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label" style={{ fontSize: "12px", fontWeight: "600", color: "#475569" }}>Author Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={form.author}
                    onChange={(e) => setForm({ ...form, author: e.target.value })}
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label" style={{ fontSize: "12px", fontWeight: "600", color: "#475569" }}>Read Time</label>
                  <input
                    type="text"
                    className="form-control"
                    value={form.readTime}
                    onChange={(e) => setForm({ ...form, readTime: e.target.value })}
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label" style={{ fontSize: "12px", fontWeight: "600", color: "#475569" }}>Tags (Comma separated)</label>
                  <input
                    type="text"
                    className="form-control"
                    value={form.tags}
                    onChange={(e) => setForm({ ...form, tags: e.target.value })}
                    placeholder="Visa, Dubai, Tips"
                  />
                </div>

                <div className="col-12">
                  <label className="form-label" style={{ fontSize: "12px", fontWeight: "600", color: "#475569" }}>Key Takeaways (One per line)</label>
                  <textarea
                    rows={3}
                    className="form-control"
                    value={form.keyTakeawaysText}
                    onChange={(e) => setForm({ ...form, keyTakeawaysText: e.target.value })}
                    placeholder="Bullet point 1&#10;Bullet point 2"
                  />
                </div>

                <div className="col-12">
                  <label className="form-label" style={{ fontSize: "12px", fontWeight: "600", color: "#475569" }}>Full Article Content (HTML / Text)</label>
                  <textarea
                    rows={8}
                    required
                    className="form-control"
                    value={form.content}
                    onChange={(e) => setForm({ ...form, content: e.target.value })}
                    placeholder="Use <h3>, <p>, <ul>, <li> tags to structure the content..."
                  />
                </div>

                <div className="col-12 d-flex justify-content-end gap-2 mt-4">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary" style={{ background: "#2095ae", borderColor: "#2095ae" }}>
                    Publish Article <i className="ti-check" />
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* 3. Post Management Table */}
        <div style={{ background: "#ffffff", borderRadius: "12px", border: "1px solid #e2e8f0", overflow: "hidden" }}>
          {/* Controls Bar */}
          <div style={{ padding: "20px 24px", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "15px" }}>
            <div className="d-flex gap-2 flex-wrap">
              {["all", ...BLOG_CATEGORIES.filter((c) => c !== "All Stories")].map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  style={{
                    padding: "6px 14px",
                    borderRadius: "16px",
                    border: "1px solid #e2e8f0",
                    background: activeTab === tab ? "#0f2454" : "#ffffff",
                    color: activeTab === tab ? "#ffffff" : "#475569",
                    fontSize: "12px",
                    fontWeight: "600",
                    cursor: "pointer",
                  }}
                >
                  {tab === "all" ? "All Categories" : tab}
                </button>
              ))}
            </div>

            <div style={{ minWidth: "220px" }}>
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Table */}
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0" style={{ fontSize: "13px" }}>
              <thead style={{ background: "#f8fafc", color: "#64748b" }}>
                <tr>
                  <th style={{ padding: "14px 20px" }}>Title &amp; Excerpt</th>
                  <th>Category</th>
                  <th>Author</th>
                  <th>Published Date</th>
                  <th style={{ textAlign: "right", paddingRight: "20px" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPosts.map((post) => (
                  <tr key={post.slug}>
                    <td style={{ padding: "16px 20px", maxWidth: "420px" }}>
                      <strong style={{ color: "#0f2454", display: "block", fontSize: "14px" }}>
                        {post.title}
                      </strong>
                      <small style={{ color: "#64748b", display: "block", marginTop: "4px" }}>
                        /blog/{post.slug}
                      </small>
                    </td>
                    <td>
                      <span className="kt-category-pill">{post.category}</span>
                    </td>
                    <td style={{ color: "#475569" }}>{post.author}</td>
                    <td style={{ color: "#64748b" }}>{post.date}</td>
                    <td style={{ textAlign: "right", paddingRight: "20px" }}>
                      <div className="d-inline-flex gap-2">
                        <a
                          href={`/blog/${post.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-sm btn-outline-primary"
                          style={{ fontSize: "11px", padding: "4px 10px" }}
                          title="View on site"
                        >
                          <i className="ti-arrow-top-right" /> View
                        </a>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-secondary"
                          style={{ fontSize: "11px", padding: "4px 10px" }}
                          onClick={() => handleEditClick(post)}
                          title="Edit article"
                        >
                          <i className="ti-pencil" /> Edit
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-danger"
                          style={{ fontSize: "11px", padding: "4px 10px" }}
                          onClick={() => handleDelete(post.slug, post.title)}
                          title="Delete article"
                        >
                          <i className="ti-trash" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredPosts.length === 0 && (
                  <tr>
                    <td colSpan={5} style={{ padding: "40px", textAlign: "center", color: "#64748b" }}>
                      No articles found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
