// Simple enhancements: search, section collapse, keyboard shortcut, year
(function(){
  const $ = (s, ctx=document)=>ctx.querySelector(s);
  const $$ = (s, ctx=document)=>Array.from(ctx.querySelectorAll(s));

  const searchInput = $('#search');
  const sectionFilter = $('#sectionFilter');
  const toggleAllBtn = $('#toggleAll');
  const sections = $$('.recipe-section');
  const year = $('#year');
  if (year) year.textContent = new Date().getFullYear();

  // Active link highlight
  const path = location.pathname.split('/').pop() || 'index.html';
  $$('.site-nav a').forEach(a=>{
    const href = a.getAttribute('href');
    if (href === path && !a.classList.contains('active')) a.classList.add('active');
  });

  // Start with all category sections open, but recipe detail blocks collapsed
  sections.forEach(section=>{
    const btn = $('.collapse-btn', section);
    const content = $('.section-content', section);
    if (btn && content){
      btn.setAttribute('aria-expanded','true');
      content.style.display = '';
    }
  });
  // Close all <details> by default (ingredients, methods, etc.) so each recipe box is compact
  $$('details').forEach(d=>{ d.open = false; });
  if (toggleAllBtn) toggleAllBtn.textContent = 'Collapse all';

  // Collapse buttons per section
  $$('.collapse-btn').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      const section = btn.closest('.recipe-section');
      const content = $('.section-content', section);
      if (!expanded) {
        content.style.display = '';
      } else {
        content.style.display = 'none';
      }
    });
  });

  // Toggle all sections
  toggleAllBtn?.addEventListener('click', ()=>{
    const anyExpanded = $$('.collapse-btn').some(b=>b.getAttribute('aria-expanded')==='true');
    $$('.collapse-btn').forEach(b=>{
      b.setAttribute('aria-expanded', String(!anyExpanded));
      const content = $('.section-content', b.closest('.recipe-section'));
      content.style.display = anyExpanded ? 'none' : '';
    });
    toggleAllBtn.textContent = anyExpanded ? 'Expand all' : 'Collapse all';
  });

  // Focus search with "/" key
  document.addEventListener('keydown', (e)=>{
    if (e.key === '/' && document.activeElement !== searchInput){
      e.preventDefault();
      searchInput?.focus();
    }
  });

  // Filtering by text + section
  function normalize(s){ return (s||'').toLowerCase(); }
  function recipeMatches(recipeEl, query){
    if (!query) return true;
    const title = recipeEl.dataset.title || '';
    const text = recipeEl.textContent || '';
    const hay = `${title} ${text}`;
    return normalize(hay).includes(normalize(query));
  }
  function sectionMatches(sectionEl, sectionValue){
    if (!sectionValue) return true;
    return (sectionEl.dataset.section||'') === sectionValue;
  }

  function applyFilters(){
    const query = searchInput?.value.trim() || '';
    const sel = sectionFilter?.value || '';
    let anyVisible = false;
    sections.forEach(section=>{
      const content = $('.section-content', section);
      const recipes = $$('.recipe-card', section);
      const sectionOk = sectionMatches(section, sel);
      let sectionHasVisible = false;
      recipes.forEach(card=>{
        const visible = sectionOk && recipeMatches(card, query);
        card.classList.toggle('is-hidden', !visible);
        if (visible) sectionHasVisible = true;
      });
      // hide whole section if no visible recipes
      section.classList.toggle('is-hidden', !sectionHasVisible);
      if (sectionHasVisible) anyVisible = true;
    });
    // If no results, show a subtle message
    let empty = $('#noResults');
    if (!anyVisible){
      if (!empty){
        empty = document.createElement('p');
        empty.id = 'noResults';
        empty.textContent = 'No recipes match your search.';
        empty.style.color = '#6b7280';
        empty.style.margin = '14px 0';
        $('main')?.prepend(empty);
      }
    } else {
      empty?.remove();
    }
  }

  searchInput?.addEventListener('input', applyFilters);
  sectionFilter?.addEventListener('change', applyFilters);
})();


