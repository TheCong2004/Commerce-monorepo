"use client";

import BlogNavbar from "@/features/blog/component/BlogNavbar";
import FeaturedPosts from "@/features/blog/component/FeaturedPosts";
import BlogHero from "@/features/blog/component/Hero";
import RecentPosts from "@/features/blog/component/RecentPosts";
import FadeIn from "../../../components/ui/FadeIn";


export default function AboutUsPage() {
  return (
    <div className="pt-14 bg-white">
      <BlogNavbar />
      
      <FadeIn direction="down">
        <BlogHero />
      </FadeIn>

      <div className="max-w-5xl mx-auto px-4 py-12 space-y-20">
        <FadeIn direction="up" delay={0.1}>
          <FeaturedPosts />
        </FadeIn>

        <FadeIn direction="up" delay={0.2}>
          <RecentPosts />
        </FadeIn>
      </div>
    </div>
  );
}