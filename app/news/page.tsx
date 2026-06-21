import React from 'react';
import NewsBanner from '@/components/news/NewsBanner';
import NewsGrid from '@/components/news/NewsGrid';

export default function NewsPage() {
  return (
    <main data-page="news" data-nav="brand">
      <NewsBanner />
      <NewsGrid />
    </main>
  );
}