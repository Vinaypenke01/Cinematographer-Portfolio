import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar } from "lucide-react";
import client from "../../tina/__generated__/client";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import Navbar from "@/components/Navbar";

const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await client.queries.post({ relativePath: `${id}.md` });
        setPost(response.data.post);
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex flex-col justify-center items-center h-screen text-center px-4">
          <h1 className="font-display text-4xl text-foreground mb-4">Post Not Found</h1>
          <Link to="/" className="text-primary hover:underline font-body tracking-wider uppercase text-sm">Return Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      
      <main className="pt-32 pb-24 px-6 max-w-4xl mx-auto">
        <Link 
          to="/#blog" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary font-body text-sm mb-12 transition-colors uppercase tracking-widest"
          onClick={() => {
            setTimeout(() => {
              const el = document.getElementById("blog");
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 100);
          }}
        >
          <ArrowLeft size={16} /> Back to Journal
        </Link>
        
        <article className="glass-card rounded-3xl p-6 md:p-12 mb-12">
          {post.coverImage && (
            <div className="w-full aspect-[21/9] rounded-2xl overflow-hidden mb-12 bg-muted">
              <img 
                src={post.coverImage} 
                alt={post.title} 
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <header className="mb-12">
            {post.date && (
              <div className="flex items-center gap-2 text-primary text-sm font-body tracking-wider uppercase mb-4">
                <Calendar size={14} />
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric"
                })}
              </div>
            )}
            <h1 className="font-display text-4xl md:text-6xl text-foreground mb-6 leading-tight">
              {post.title}
            </h1>
            {post.excerpt && (
              <p className="font-body text-xl text-muted-foreground border-l-2 border-primary pl-6 py-2">
                {post.excerpt}
              </p>
            )}
          </header>

          <div className="prose prose-invert prose-lg max-w-none font-body text-muted-foreground prose-headings:font-display prose-headings:text-foreground prose-a:text-primary prose-img:rounded-xl">
            <TinaMarkdown content={post.body} />
          </div>
        </article>
      </main>
    </div>
  );
};

export default Post;
