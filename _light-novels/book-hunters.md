---
layout: light-novel
title: Book Hunters
urlComponent: book-hunters
navbar:
    - Back: light-novels
sinopse: |
    Our main character finds out that he can gain strange powers from reading manuscript books. He soon discovers he's not
    the only one.
chapters:
    - "Chapter 1: The Original": chapter-1
---

## Chapters

{% for bhc in site.book-hunters %}
- [{{bhc.title}}]({{bhc.id}}) <br>
{% endfor %}
