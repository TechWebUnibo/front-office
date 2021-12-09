export function seo(data = {}) {
    data.title = data.title || 'Cater';
    data.metaDescription = data.metaDescription || 'Noleggio di attrezzature da street food';
  
    document.title = data.title;
    document.querySelector('meta[name="description"]').setAttribute('content', data.metaDescription);
  }