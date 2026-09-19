import { useEffect } from 'react';
import { SEOMetadata } from './seo';

export function useSEO(metadata: SEOMetadata) {
  useEffect(() => {
    // Title
    document.title = metadata.title;

    // Meta tags
    const updateMetaTag = (name: string, content: string) => {
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('name', name);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    const updateProperty = (property: string, content: string) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    // Standard meta tags
    updateMetaTag('description', metadata.description);
    if (metadata.keywords) {
      updateMetaTag('keywords', metadata.keywords.join(', '));
    }
    if (metadata.author) {
      updateMetaTag('author', metadata.author);
    }

    // Open Graph tags
    updateProperty('og:title', metadata.ogTitle || metadata.title);
    updateProperty('og:description', metadata.ogDescription || metadata.description);
    if (metadata.ogImage) {
      updateProperty('og:image', metadata.ogImage);
    }
    if (metadata.ogUrl) {
      updateProperty('og:url', metadata.ogUrl);
    }

    // Twitter tags
    if (metadata.twitterCard) {
      updateMetaTag('twitter:card', metadata.twitterCard);
    }
    if (metadata.twitterTitle) {
      updateMetaTag('twitter:title', metadata.twitterTitle);
    }
    if (metadata.twitterDescription) {
      updateMetaTag('twitter:description', metadata.twitterDescription);
    }
    if (metadata.twitterImage) {
      updateMetaTag('twitter:image', metadata.twitterImage);
    }

    // Canonical
    if (metadata.canonical) {
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link');
        link.rel = 'canonical';
        document.head.appendChild(link);
      }
      link.href = metadata.canonical;
    }

    // Structured data
    if (metadata.structuredData) {
      let script = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement;
      if (!script) {
        script = document.createElement('script');
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(metadata.structuredData);
    }
  }, [metadata]);
}
