---
title: Apps
layout: main-page
contentClass: regular-text
headerClass: header-text
---

{% for app in site.apps %}
# {{app.title}} #

---
    
{{app.content}}

#### Links: ####
{% for link in app.links%}
{% for link-data in link%}
* [{{link-data[0]}}]({{link-data[1]}})
{% endfor %}
{% endfor %}
<br>
<br>

{% endfor %}
