---
title: 'Tag Archive'
layout: tags
pagination:
  data: collections
  size: 1
  alias: tag
  filter:
    - works
addAllPagesToCollections: true
eleventyComputed:
  metaTitle: "Works tagged '{{ tag }}'"
  metaDescription: "Everything about {{ tag }}"
  title: "{{ tag }}"
  description: "Everything tagged under {{ tag }}."
permalink: '/tag/{{ tag | slug }}/'
---
