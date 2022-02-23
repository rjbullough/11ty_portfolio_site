---
title: About
description: About yours truly
layout: default.njk
heroText: Hi, I'm Ryan.
heroDescription: I'm a user experience designer && web developer based in Canberra, Australia.
eleventyNavigation:
  key: About
  order: 100
---
{% block hero %}
  {% include 'hero.njk' %}
{% endblock hero %}

<section class="grid grid-cols-1 sm:grid-cols-2 max-w-screen-xl m-auto px-5 gap-6 w-m">

<div class="bl h-max w-fit mx-auto">
{% respimg "ryan", "Me", "zoomable" %}
</div>

<div class="">

# ABOUT{.text-2xl .font-bold .mb-12}

Starry-eyed pragmatist.{.font-serif .py-8 .md:py-14 .text-4xl .md:text-7xl}

<br>Ryan Bullough is an independent Australian designer/engineer.

<br>As a consultant, he works directly with organisations to build well-considered, functional products and design systems.

<br>He believes the trifecta of accessibility, performance, and good design can work symbiotically to improve our social landscape digitally and physically.

<br>When Ryan can successfully :q vim, he spends time with his Australian Shepherd, Texas.

<br>Open to both human-centred design and frontend engineering contracts/roles - remote or on-location.

</div>

</section>