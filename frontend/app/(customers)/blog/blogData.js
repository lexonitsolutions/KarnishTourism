export const BLOG_CATEGORIES = [
  "All Stories",
  "Destination Guides",
  "Visa Updates",
  "Travel Tips",
  "Packing Guides",
  "Tourism News",
];

export const INITIAL_POSTS = [];

export function getAllPosts() {
  if (typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem("karnish_blog_posts");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      // ignore
    }
  }
  return INITIAL_POSTS;
}

export function getPostBySlug(slug) {
  const posts = getAllPosts();
  return posts.find((p) => p.slug === slug) || null;
}

export function savePost(newPost) {
  if (typeof window === "undefined") return false;
  try {
    const posts = getAllPosts();
    const existingIdx = posts.findIndex((p) => p.slug === newPost.slug);
    let updated;
    if (existingIdx >= 0) {
      updated = [...posts];
      updated[existingIdx] = { ...posts[existingIdx], ...newPost };
    } else {
      updated = [newPost, ...posts];
    }
    localStorage.setItem("karnish_blog_posts", JSON.stringify(updated));
    return true;
  } catch (err) {
    console.error("Failed to save post:", err);
    return false;
  }
}

export function deletePost(slug) {
  if (typeof window === "undefined") return false;
  try {
    const posts = getAllPosts();
    const updated = posts.filter((p) => p.slug !== slug);
    localStorage.setItem("karnish_blog_posts", JSON.stringify(updated));
    return true;
  } catch (err) {
    console.error("Failed to delete post:", err);
    return false;
  }
}
