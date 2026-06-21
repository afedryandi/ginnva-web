import React from 'react';
import ContactBanner from '@/components/contact/ContactBanner';
import ContactContent from '@/components/contact/ContactContent';

export default function ContactPage() {
  return (
    <main data-page="contact" data-nav="brand">
      <ContactBanner />
      <ContactContent />
    </main>
  );
}