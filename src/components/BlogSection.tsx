import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import client from "../../tina/__generated__/client";

const BlogSection = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await client.queries.postConnection();
        const edges = response.data.postConnection.edges || [];
        setPosts(edges.map((edge: any) => edge.node));
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <section id="blog" className="section-padding flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </section>
    );
  }

  return (
    <section id="blog" className="section-padding">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <p className="font-body text-xs tracking-[0.4em] uppercase text-primary mb-4">
          Latest Updates
        </p>
        <h2 className="font-display text-5xl md:text-7xl text-foreground">
          The Journal
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {posts.map((post, i) => (
          <motion.div
            key={post._sys.filename}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="group block"
          >
            <Link to={`/post/${post._sys.filename}`}>
              <div className="glass-card rounded-xl overflow-hidden hover:border-primary/50 transition-colors h-full flex flex-col">
                {/* Cover Image */}
                <div className="aspect-video w-full overflow-hidden relative bg-muted flex items-center justify-center">
                  {post.coverImage ? (
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="text-muted-foreground font-display text-xl opacity-20">SKB</div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  {post.date && (
                    <div className="flex items-center gap-2 text-muted-foreground text-xs font-body mb-3">
                      <Calendar size={12} />
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                  )}
                  <h3 className="font-display text-2xl mb-3 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground mb-6 line-clamp-3">
                    {post.excerpt || "Click to read the full story..."}
                  </p>
                  
                  <div className="mt-auto flex items-center gap-2 text-primary font-body text-xs tracking-widest uppercase">
                    Read Article <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
      
      {posts.length === 0 && (
        <div className="text-center text-muted-foreground font-body py-12">
          No posts found. Start by creating one in the Tina CMS admin.
        </div>
      )}
    </section>
  );
};

export default BlogSection;
