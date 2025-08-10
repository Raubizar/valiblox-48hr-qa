import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useWebhook } from "@/hooks/useWebhook";
import { WebhookModal } from "@/components/WebhookModal";
import { Helmet } from "react-helmet";

// Import article images
import hiddenCostsImage from "@/assets/articles/hidden-costs-design-errors.jpg";
import bimQaImage from "@/assets/articles/bim-quality-assurance.jpg";
import independentQaImage from "@/assets/articles/independent-vs-inhouse-qa.jpg";
import dataSecurityImage from "@/assets/articles/data-security-qa.jpg";
import roiQaImage from "@/assets/articles/roi-professional-qa.jpg";
import futureAiImage from "@/assets/articles/future-ai-validation.jpg";

const articles = [
  {
    id: 1,
    title: "The Hidden Costs of Design Errors in Data Center Projects",
    excerpt: "Discover how early QA validation can prevent million-dollar mistakes and project delays in critical infrastructure projects.",
    author: "Team Valiblox",
    publishDate: "Jan/2025",
    readTime: "8 min read",
    category: "Cost Analysis",
    image: hiddenCostsImage,
    featured: true
  },
  {
    id: 2,
    title: "BIM Quality Assurance: Best Practices for 2024",
    excerpt: "Essential guidelines for ensuring BIM model accuracy and compliance with the latest industry standards and regulations.",
    author: "Team Valiblox",
    publishDate: "Feb/2025",
    readTime: "12 min read",
    category: "Best Practices",
    image: bimQaImage
  },
  {
    id: 3,
    title: "Independent QA vs In-House Validation: A Comprehensive Comparison",
    excerpt: "Analyzing the benefits, costs, and effectiveness of external QA services versus internal validation processes.",
    author: "Team Valiblox",
    publishDate: "Mar/2025",
    readTime: "10 min read",
    category: "Industry Insights",
    image: independentQaImage
  },
  {
    id: 4,
    title: "Data Security in External QA: What You Need to Know",
    excerpt: "Understanding NDA protocols, data handling procedures, and security measures in third-party QA validation services.",
    author: "Team Valiblox",
    publishDate: "Apr/2025",
    readTime: "6 min read",
    category: "Security",
    image: dataSecurityImage
  },
  {
    id: 5,
    title: "ROI of Professional QA: Case Studies from Fortune 500 Companies",
    excerpt: "Real-world examples showing how professional QA validation delivers measurable returns on investment.",
    author: "Team Valiblox",
    publishDate: "May/2025",
    readTime: "15 min read",
    category: "Case Studies",
    image: roiQaImage
  },
  {
    id: 6,
    title: "Future of Design Validation: AI and Machine Learning Trends",
    excerpt: "Exploring how artificial intelligence is revolutionizing quality assurance in architecture and engineering.",
    author: "Team Valiblox",
    publishDate: "Jun/2025",
    readTime: "11 min read",
    category: "Technology",
    image: futureAiImage
  }
];

const categories = ["All", "Best Practices", "Cost Analysis", "Industry Insights", "Security", "Case Studies", "Technology"];

const Articles = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All");

  const readArticleWebhook = useWebhook({
    source: "articles-read-full-article",
    title: "Access Full Article",
    description: "Get access to the complete article with detailed insights and analysis."
  });

  const subscribeWebhook = useWebhook({
    source: "articles-subscribe-newsletter",
    title: "Subscribe to Updates",
    description: "Stay updated with the latest industry insights and best practices."
  });

  const handleReadMore = (articleId: number) => {
    if (articleId === 1) {
      navigate('/articles/hidden-costs-design-errors');
    } else if (articleId === 5) {
      navigate('/articles/roi-professional-qa');
    } else {
      navigate(`/articles/${articleId}`);
    }
  };

  const filteredArticles = selectedCategory === "All" 
    ? articles 
    : articles.filter(article => article.category === selectedCategory);

  return (
    <main className="min-h-screen bg-background">
      <Helmet>
        <title>Articles & Insights | Valiblox</title>
        <meta name="description" content="Industry insights, best practices, and case studies on QA validation for data center projects." />
        <link rel="canonical" href={(typeof window!=="undefined"?window.location.origin:"") + "/articles"} />
      </Helmet>
      <Header />
      {/* Header */}
      <section className="bg-gradient-subtle py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Industry Insights & Best Practices
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Stay informed with expert analysis, case studies, and practical guidance 
            for data center design validation and quality assurance.
          </p>
          <Button variant="outline" size="lg">
            Subscribe to Updates
          </Button>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-8 border-b border-border">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={category === selectedCategory ? "default" : "secondary"}
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors px-4 py-2"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Article */}
      {filteredArticles.filter(article => article.featured).map((article) => (
        <section key={article.id} className="py-16 bg-accent/20">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge className="mb-4">{article.category}</Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  {article.title}
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  {article.excerpt}
                </p>
                <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {article.author}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {new Date(article.publishDate).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {article.readTime}
                  </div>
                </div>
                <Button variant="cta" size="lg" onClick={() => handleReadMore(article.id)}>
                  Read Full Article
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
              <div className="aspect-video rounded-lg overflow-hidden shadow-card">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Articles Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">
            Latest Articles
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.filter(article => !article.featured).map((article) => (
              <Card key={article.id} className="group hover:shadow-card transition-all duration-300 hover:-translate-y-1">
                <div className="aspect-video overflow-hidden rounded-t-lg">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary">{article.category}</Badge>
                    <span className="text-sm text-muted-foreground">{article.readTime}</span>
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {article.title}
                  </CardTitle>
                  <CardDescription>
                    {article.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{article.author}</span>
                      <span>{new Date(article.publishDate).toLocaleDateString()}</span>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-primary hover:text-primary-hover"
                      onClick={() => handleReadMore(article.id)}
                    >
                      Read More
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-accent/30">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Stay Updated with Industry Insights
            </h2>
            <p className="text-muted-foreground mb-8">
              Get the latest articles, case studies, and best practices delivered to your inbox monthly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-lg border border-border bg-background text-foreground"
              />
              <Button 
                variant="cta" 
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  subscribeWebhook.openModal();
                }}
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>
      <Footer />

      {/* Webhook Modals */}
      <WebhookModal
        isOpen={readArticleWebhook.isModalOpen}
        onClose={readArticleWebhook.closeModal}
        onSubmit={readArticleWebhook.handleSubmit}
        {...readArticleWebhook.modalProps}
      />
      <WebhookModal
        isOpen={subscribeWebhook.isModalOpen}
        onClose={subscribeWebhook.closeModal}
        onSubmit={subscribeWebhook.handleSubmit}
        {...subscribeWebhook.modalProps}
      />
    </main>
  );
};

export default Articles;